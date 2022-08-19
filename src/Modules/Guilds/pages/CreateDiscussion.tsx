import SidebarInfoCardWrapper from 'Modules/Guilds/Wrappers/SidebarInfoCardWrapper';
import Input from 'old-components/Guilds/common/Form/Input';
import { Box, Flex } from 'Components/Primitives/Layout';
import { useTypedParams } from 'Modules/Guilds/Hooks/useTypedParams';
import { GuildAvailabilityContext } from 'contexts/Guilds/guildAvailability';
import { useTextEditor } from 'Components/Editor';
import { Loading } from 'Components/Primitives/Loading';
import { useContext, useMemo, useState, useEffect, useRef } from 'react';
import { FiChevronLeft } from 'react-icons/fi';
import { MdOutlinePreview, MdOutlineModeEdit } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import sanitizeHtml from 'sanitize-html';
import { useTranslation } from 'react-i18next';
import {
  PageContainer,
  PageContent,
  StyledButton,
  SidebarContent,
  Label,
} from '../styles';
import { Orbis } from '@orbisclub/orbis-sdk';
import {
  connect,
  isConnected,
  createPost,
  postTemplate,
} from 'Components/Forum';
import { Post } from 'Components/Forum/types';

const CreateDiscussionPage: React.FC = () => {
  let orbis = useRef(new Orbis());

  const { guildId, chainName: chain } = useTypedParams();
  const { isLoading: isGuildAvailabilityLoading } = useContext(
    GuildAvailabilityContext
  );

  const navigate = useNavigate();
  const { t } = useTranslation();
  const [user, setUser] = useState('');
  const [editMode, setEditMode] = useState(true);
  const [title, setTitle] = useState('');

  useEffect(() => {
    isConnected(orbis.current).then(res => {
      if (res) {
        console.log('Already connected with: ', res.did);
      } else {
        connect(orbis.current).then(did => {
          setUser(did);
        });
      }
    });
  }, [user]);

  const {
    Editor,
    EditorConfig,
    md: discussionBodyMd,
    html: discussionBodyHtml,
  } = useTextEditor(
    `${guildId}/create-discussion`,
    345600000,
    t('forum.discussionPlaceholder')
  );

  const handleToggleEditMode = () => {
    // TODO: add proper validation if toggle from edit to preview without required fields
    if (editMode && !title.trim() && !discussionBodyMd.trim()) return;
    setEditMode(v => !v);
  };

  const handleBack = () => navigate(`/${chain}/${guildId}/`);

  const handleCreateDiscussion = async (post: Post) => {
    if (postTemplate(post)) {
      const res = await createPost(orbis.current, post);
      handleBack();
      console.log({ res, post });
      return {
        res,
        postTemplate,
      };
    } else {
      return 'Something went wrong when trying to create a discussion';
    }
  };

  const isValid = useMemo(() => {
    if (!title) return false;
    if (!discussionBodyHtml) return false;

    return true;
  }, [title, discussionBodyHtml]);

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
            disabled={!title || !discussionBodyMd}
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
            dangerouslySetInnerHTML={{
              __html: sanitizeHtml(discussionBodyHtml),
            }}
          />
        )}
        <Box margin="16px 0px">
          <StyledButton
            onClick={() =>
              handleCreateDiscussion({
                title,
                body: discussionBodyMd,
                context: guildId,
                master: '',
                replyTo: '',
                mentions: [],
                data: {},
              })
            }
            variant="secondary"
            disabled={!isValid}
            data-testid="create-proposal-action-button"
          >
            {t('forum.createDiscussion')}
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
