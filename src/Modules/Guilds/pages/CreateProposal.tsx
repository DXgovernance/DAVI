import SidebarInfoCardWrapper from 'Modules/Guilds/Wrappers/SidebarInfoCardWrapper';
import { Input } from 'components/primitives/Forms/Input';
import { Box, Flex } from 'components/primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import contentHash from '@ensdomains/content-hash';
import { useTransactions } from 'contexts/Guilds';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { BigNumber } from 'ethers';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { bulkEncodeCallsFromOptions } from 'hooks/Guilds/contracts/useEncodedCall';
import useIPFSNode from 'hooks/Guilds/ipfs/useIPFSNode';
import { ActionsBuilder } from 'components/ActionsBuilder';
import { Call, Option } from 'components/ActionsBuilder/types';
import { useTextEditor } from 'components/Editor';
import { Loading } from 'components/primitives/Loading';
import React, { useContext, useEffect, useMemo, useState } from 'react';
import { FiChevronLeft, FiX } from 'react-icons/fi';
import { MdOutlinePreview, MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { preventEmptyString, ZERO_ADDRESS, ZERO_HASH } from 'utils';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { toast } from 'react-toastify';
import { isValidProposal } from 'utils';
import {
  PageContainer,
  PageContent,
  StyledButton,
  SidebarContent,
  Label,
} from '../styles';
import usePinataIPFS from 'hooks/Guilds/ipfs/usePinataIPFS';
import { Modal } from 'components/primitives/Modal';
import { WarningCircle } from 'components/primitives/StatusCircles';

export const EMPTY_CALL: Call = {
  data: ZERO_HASH,
  from: ZERO_ADDRESS,
  to: ZERO_ADDRESS,
  value: BigNumber.from(0),
};

const CreateProposalPage: React.FC = () => {
  const { guildId, chainName: chain } = useTypedParams();
  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );

  const navigate = useNavigate();
  const { t } = useTranslation();
  const theme = useTheme();
  const [editMode, setEditMode] = useState(true);
  const [isCreatingProposal, setIsCreatingProposal] = useState(false);
  const [title, setTitle] = useState('');
  const [options, setOptions] = useState<Option[]>([
    {
      id: `option-1-For`,
      label: t('for', { defaultValue: 'For' }),
      color: theme?.colors?.votes?.[1],
      decodedActions: [],
      permissions: [],
    },
  ]);
  const {
    Editor,
    EditorConfig,
    md: proposalBodyMd,
    html: proposalBodyHTML,
    clear,
  } = useTextEditor(
    `${guildId}/create-proposal`,
    345600000,
    t('enterProposalDescription')
  );

  const [ipfsError, setIpfsError] = useState('');
  const [isIpfsErrorModalOpen, setIsIpfsErrorModalOpen] = useState(false);
  const [skipUploadToIPFs, setSkipUploadToIPFs] = useState(false);

  const handleToggleEditMode = () => {
    // TODO: add proper validation if toggle from edit to preview without required fields
    if (editMode && !title.trim() && !proposalBodyMd.trim()) return;
    setEditMode(v => !v);
  };

  const handleBack = () => navigate(`/${chain}/${guildId}`);

  const ipfs = useIPFSNode();
  const { pinToPinata } = usePinataIPFS();

  const uploadToIPFS = async () => {
    const content = {
      description: proposalBodyHTML,
      voteOptions: ['', ...options.map(({ label }) => label)],
    };
    const cid = await ipfs.add(JSON.stringify(content));
    await ipfs.pin(cid);
    const pinataPinResult = await pinToPinata(cid, content);

    if (pinataPinResult.IpfsHash !== `${cid}`) {
      throw new Error(t('ipfs.hashNotTheSame'));
    }
    return contentHash.fromIpfs(cid);
  };

  const handleSkipUploadToIPFS = () => {
    setIsIpfsErrorModalOpen(false);
    setSkipUploadToIPFs(true);
  };

  useEffect(() => {
    if (skipUploadToIPFs && !isIpfsErrorModalOpen) handleCreateProposal();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [skipUploadToIPFs, isIpfsErrorModalOpen]);

  const handleRetryUploadToIPFS = () => {
    setIsIpfsErrorModalOpen(false);
    handleCreateProposal();
  };

  const { createTransaction } = useTransactions();
  const { guildId: guildAddress } = useTypedParams();
  const guildContract = useERC20Guild(guildAddress);

  const handleCreateProposal = async () => {
    let contentHash: Promise<string>;
    setIsCreatingProposal(true);
    if (!skipUploadToIPFs) {
      try {
        contentHash = await uploadToIPFS();
      } catch (e) {
        console.log(e);
        setIpfsError(e.message);
        setIsIpfsErrorModalOpen(true);
        return;
      }
    }
    setSkipUploadToIPFs(false);
    setIsIpfsErrorModalOpen(false);

    const encodedOptions = bulkEncodeCallsFromOptions(options);
    const totalOptions = encodedOptions.length;
    const maxActionsPerOption = encodedOptions.reduce(
      (acc, cur) => (acc < cur.actions.length ? cur.actions.length : acc),
      0
    );

    const calls = encodedOptions
      .map(option => {
        const actions = option.actions;
        if (option.actions.length < maxActionsPerOption) {
          // Pad array with empty calls
          return actions.concat(
            Array(maxActionsPerOption - option.actions.length).fill(EMPTY_CALL)
          );
        } else {
          return actions;
        }
      })
      .reduce((acc, actions) => acc.concat(actions), [] as Call[]);

    const toArray = calls.map(call => call.to);
    const dataArray = calls.map(call => call.data);
    const valueArray = calls.map(call => preventEmptyString(call.value));

    if (
      toArray.length === 0 &&
      dataArray.length === 0 &&
      valueArray.length === 0
    ) {
      toArray.push(ZERO_ADDRESS);
      dataArray.push(ZERO_HASH);
      valueArray.push(BigNumber.from(0));
    }

    const { isValid, error } = isValidProposal({
      toArray,
      dataArray,
      valueArray,
      totalOptions,
      title,
    });

    if (!isValid) {
      toast.error(error);
    } else {
      createTransaction(
        `Create proposal ${title}`,
        async () => {
          return guildContract.createProposal(
            toArray,
            dataArray,
            valueArray,
            totalOptions,
            title,
            `0x${contentHash}`
          );
        },
        true,
        err => {
          setIsCreatingProposal(false);
          if (!err) {
            editMode && clear();
            navigate(`/${chain}/${guildId}`);
          }
        }
      );
    }
  };

  const isValid = useMemo(() => {
    if (!title) return false;
    if (!proposalBodyHTML) return false;

    return true;
  }, [title, proposalBodyHTML]);

  if (isGuildAvailabilityLoading) return <Loading loading />;

  return (
    <PageContainer>
      <PageContent>
        <Flex
          direction="row"
          justifyContent="space-between"
          margin="0px 0px 24px"
        >
          <StyledButton iconLeft onClick={handleBack}>
            <FiChevronLeft />
            {t('backToOverview')}
          </StyledButton>

          <StyledButton
            onClick={handleToggleEditMode}
            disabled={!title || !proposalBodyMd}
            data-testid="create-proposal-editor-toggle-button"
          >
            {editMode ? (
              <MdOutlinePreview size={18} />
            ) : (
              <MdOutlineModeEdit size={18} />
            )}
          </StyledButton>
        </Flex>
        <Box margin="0px 0px 24px">
          {editMode ? (
            <>
              <Label>{t('title')}</Label>
              <Input
                data-testid="create-proposal-title"
                placeholder="Proposal Title"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
            </>
          ) : (
            <Label size="24px"> {title}</Label>
          )}
        </Box>
        {editMode ? (
          <Editor EditorConfig={EditorConfig} />
        ) : (
          <div
            dangerouslySetInnerHTML={{ __html: sanitizeHtml(proposalBodyHTML) }}
          />
        )}
        <Box margin="16px 0px 24px">
          <ActionsBuilder
            options={options}
            onChange={setOptions}
            editable={editMode}
          />
        </Box>
        <Box margin="16px 0px">
          <StyledButton
            onClick={handleCreateProposal}
            variant="secondary"
            disabled={!isValid || isCreatingProposal}
            data-testid="create-proposal-action-button"
          >
            {t('createProposal')}
          </StyledButton>
        </Box>
      </PageContent>
      <SidebarContent>
        <SidebarInfoCardWrapper />
      </SidebarContent>
      <Modal
        isOpen={isIpfsErrorModalOpen}
        onDismiss={() => setIsIpfsErrorModalOpen(false)}
        header={t('ipfs.errorWhileUploading')}
        maxWidth={390}
      >
        <Flex padding={'1.5rem'}>
          <Flex>
            <WarningCircle>
              <FiX size={40} />
            </WarningCircle>
            <Flex padding={'1.5rem 0'}>{ipfsError}</Flex>
          </Flex>
          <Flex direction="row" style={{ columnGap: '1rem' }}>
            <StyledButton onClick={handleRetryUploadToIPFS}>
              {t('retry')}
            </StyledButton>
            <StyledButton onClick={handleSkipUploadToIPFS} variant="secondary">
              {t('createAnyway')}
            </StyledButton>
            <StyledButton
              onClick={() => setIsIpfsErrorModalOpen(false)}
              variant="secondary"
            >
              {t('close')}
            </StyledButton>
          </Flex>
        </Flex>
      </Modal>
    </PageContainer>
  );
};

export default CreateProposalPage;
