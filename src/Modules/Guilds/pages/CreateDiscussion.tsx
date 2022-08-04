import SidebarInfoCardWrapper from 'Modules/Guilds/Wrappers/SidebarInfoCardWrapper';
import Input from 'old-components/Guilds/common/Form/Input';
import { Box, Flex } from 'Components/Primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useTextEditor } from 'Components/Editor';
import { Loading } from 'Components/Primitives/Loading';
import { useContext, useMemo, useState } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { MdOutlinePreview, MdOutlineModeEdit } from 'react-icons/md';
import { useHistory } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import {
  PageContainer,
  PageContent,
  StyledButton,
  SidebarContent,
  Label,
} from '../styles';
// import { Orbis } from '@orbisclub/orbis-sdk';

const CreateDiscussionPage: React.FC = () => {
  //   let orbis = new Orbis();
  //   async function connect() {
  //     let res = await orbis.connect();
  //     if (res.status === 200) {
  //       console.log('Connected to Ceramic with: ', res.did);
  //       return res.did;
  //     } else {
  //       console.error('Error connecting to Ceramic: ', res.error);
  //     }
  //   }

  useEffect(() => {}, []);
  const { guildId, chainName: chain } = useTypedParams();
  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );

  const history = useHistory();
  const { t } = useTranslation();
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState('');

  //   console.log(connect);
  const {
    Editor,
    EditorConfig,
    md: proposalBodyMd,
    html: proposalBodyHTML,
  } = useTextEditor(
    `${guildId}/create-discussion`,
    345600000,
    t('enterProposalDescription')
  );

  const handleToggleEditMode = () => {
    // TODO: add proper validation if toggle from edit to preview without required fields
    if (editMode && !title.trim() && !proposalBodyMd.trim()) return;
    setEditMode(v => !v);
  };

  const handleBack = () => history.push(`/${chain}/${guildId}/`);

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
            {'Back'}
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
                data-testid="create-discussion-title"
                placeholder="Discussion Title"
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
        <Box margin="16px 0px">
          <StyledButton
            onClick={() => {}}
            variant="secondary"
            disabled={!isValid}
            data-testid="create-proposal-action-button"
          >
            {'Create Discussion'}
          </StyledButton>
        </Box>
      </PageContent>
      <SidebarContent>
        <SidebarInfoCardWrapper />
      </SidebarContent>
    </PageContainer>
  );
};

export default CreateDiscussionPage;
