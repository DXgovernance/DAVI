import SidebarInfoCardWrapper from 'Modules/Guilds/Wrappers/SidebarInfoCardWrapper';
import { IconButton } from 'old-components/Guilds/common/Button';
import Input from 'old-components/Guilds/common/Form/Input';
import { Box, Flex } from 'Components/Primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import contentHash from 'content-hash';
import { useTransactions } from 'contexts/Guilds';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { BigNumber } from 'ethers';
import { useERC20Guild } from 'hooks/Guilds/contracts/useContract';
import { bulkEncodeCallsFromOptions } from 'hooks/Guilds/contracts/useEncodedCall';
import useIPFSNode from 'hooks/Guilds/ipfs/useIPFSNode';
import { ActionsBuilder } from 'Components/ActionsBuilder';
import { Call, Option } from 'Components/ActionsBuilder/types';
import { useTextEditor } from 'Components/Editor';
import { Loading } from 'Components/Primitives/Loading';
import React, { useContext, useMemo, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { MdOutlinePreview, MdOutlineModeEdit, MdLink } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import styled from 'styled-components';
import { ZERO_ADDRESS, ZERO_HASH } from 'utils';
import { useTranslation } from 'react-i18next';
import { useTheme } from 'styled-components';
import { toast } from 'react-toastify';
import { isValidProposal } from 'utils';

const PageContainer = styled(Box)`
  display: grid;
  grid-template-columns: 1fr;

  @media only screen and (min-width: 768px) {
    grid-template-columns: minmax(0, 1fr) 300px;
  }
`;

const SidebarContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-left: 1rem;
  }
  @media only screen and (max-width: 768px) {
    margin-top: 1rem;
  }
`;

const PageContent = styled(Box)`
  @media only screen and (min-width: 768px) {
    margin-right: 1rem;
  }
`;

const StyledButton = styled(IconButton)<{
  marginLeft?: string;
  size?: number | string;
}>`
  margin: 0;
  padding: 0.5rem 0.8rem;
  margin-left: ${props => props.marginLeft}; || 0
`;

const Label = styled.span<{
  color?: string;
  size?: number | string;
}>`
  font-family: Inter;
  font-style: normal;
  font-weight: 500;
  font-size: ${({ size }) => (size ? size : `14px`)};
  line-height: 20px;
  display: flex;
  color: ${({ color }) => (color ? color : '#BDC0C7')};
  margin: 12px 0px;
`;

const InputWrapper = styled(Flex)`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const EMPTY_CALL: Call = {
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

  const history = useHistory();
  const { t } = useTranslation();
  const theme = useTheme();
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState('');
  const [referenceLink, setReferenceLink] = useState('');
  const [options, setOptions] = useState<Option[]>([
    {
      id: `option-1-For`,
      label: t('for', { defaultValue: 'For' }),
      color: theme?.colors?.votes?.[1],
      decodedActions: [],
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

  const handleToggleEditMode = () => {
    // TODO: add proper validation if toggle from edit to preview without required fields
    if (editMode && !title.trim() && !proposalBodyMd.trim()) return;
    setEditMode(v => !v);
  };

  const handleBack = () => history.push(`/${chain}/${guildId}/proposalType`);

  const ipfs = useIPFSNode();

  const uploadToIPFS = async () => {
    const content = {
      description: proposalBodyHTML,
      url: referenceLink,
      voteOptions: ['', ...options.map(({ label }) => label)],
    };
    const cid = await ipfs.add(JSON.stringify(content));
    await ipfs.pin(cid);
    return contentHash.fromIpfs(cid);
  };

  const { createTransaction } = useTransactions();
  const { guildId: guildAddress } = useTypedParams();
  const guildContract = useERC20Guild(guildAddress);

  const handleCreateProposal = async () => {
    const contentHash = await uploadToIPFS();

    const encodedOptions = bulkEncodeCallsFromOptions(options);
    const totalActions = encodedOptions.length;
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
    const valueArray = calls.map(call => call.value);

    const { isValid, error } = isValidProposal({
      toArray,
      dataArray,
      valueArray,
      totalActions,
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
            totalActions,
            title,
            `0x${contentHash}`
          );
        },
        true,
        err => {
          if (!err) {
            editMode && clear();
            history.push(`/${chain}/${guildId}`);
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
            Change proposal type
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
              <Label>Title</Label>
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
        <Box margin="0px 0px 24px">
          {editMode ? (
            <>
              <Label>Reference link (optional)</Label>
              <InputWrapper>
                <Input
                  placeholder="https://daotalk.org/..."
                  value={referenceLink}
                  onChange={e => setReferenceLink(e.target.value)}
                  icon={<MdLink size={18} />}
                  data-testid="create-proposal-link"
                />
                <StyledButton variant="secondary" marginLeft={'1rem'}>
                  Import
                </StyledButton>
              </InputWrapper>
            </>
          ) : referenceLink ? (
            <>
              <Label size="16px">{referenceLink}</Label>
              <StyledButton> Import </StyledButton>
            </>
          ) : null}
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
            disabled={!isValid}
            data-testid="create-proposal-action-button"
          >
            Create Proposal
          </StyledButton>
        </Box>
      </PageContent>
      <SidebarContent>
        <SidebarInfoCardWrapper />
      </SidebarContent>
    </PageContainer>
  );
};

export default CreateProposalPage;
