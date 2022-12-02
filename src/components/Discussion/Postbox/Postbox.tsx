import { useState, useRef, useContext, useEffect, KeyboardEvent } from 'react';
import { debounce } from 'lodash';
import { OrbisContext } from 'contexts/Guilds/orbis';
import { Button } from 'components/primitives/Button';
import { PostboxInput } from './Postbox.styled';
import { getUsername, getBadgeContent, highlightMentions } from 'utils/orbis';

const Postbox = ({
  context,
  replyTo = null,
  editPost = null,
  enterToShare = false,
  callback,
  cancelEdit,
  cancelReplyTo,
}: {
  context: string;
  replyTo?: any;
  editPost?: any;
  enterToShare?: boolean;
  callback: (value: any) => void;
  cancelEdit?: () => void;
  cancelReplyTo?: () => void;
}) => {
  const { orbis, profile } = useContext(OrbisContext);

  const postboxArea = useRef<any>(null);

  const [focusOffset, setFocusOffset] = useState<number>(0);
  const [focusNode, setFocusNode] = useState<Node | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [mentions, setMentions] = useState<any[]>([]);

  const saveCaretPos = () => {
    const sel = document.getSelection();
    if (sel) {
      setFocusOffset(sel.focusOffset);
      setFocusNode(sel.focusNode);
    }
  };

  const restoreCaretPos = () => {
    if (!postboxArea.current) return;
    postboxArea.current.focus();
    const sel = document.getSelection();
    if (sel) sel.collapse(focusNode, focusOffset);
  };

  const searchProfiles = debounce(async () => {
    setIsSearching(true);
    setSearchResults([]);
    const { data, error } = await orbis.getProfilesByUsername(searchText);
    if (data) {
      setSearchResults(data);
    } else {
      console.log(error);
    }
    setIsSearching(false);
  }, 1000);

  const addMention = (selected: any) => {
    // Restore cursor position
    restoreCaretPos();

    // Get username of selected profile
    const username = selected?.details?.profile?.username?.trim();

    // Check if username already mentioned
    const hasBeenMentioned = mentions?.find(
      (o: any) => username === o?.username
    );

    // Save selected to mentions
    if (!hasBeenMentioned) {
      setMentions([
        ...mentions,
        {
          username: '@' + username,
          did: selected.did,
        },
      ]);
    }

    // Add mention tag
    const htmlTag =
      '<span href="/profile/' +
      selected.did +
      '" class="text-lime-700" contenteditable="false" data-did="' +
      selected.did +
      '">@' +
      username +
      '</span><span> </span>';

    for (let i = 0; i < searchText.length + 1; i++) {
      document.execCommand('delete', false, '');
      if (i === searchText.length) {
        document.execCommand('insertHTML', false, htmlTag);
      }
    }

    setTimeout(() => {
      // Clear search text
      setSearchText('');

      // Focus back to postboxArea
      postboxArea.current.focus();

      postboxArea.current.innerHTML.replace(/&nbsp;$/, ' ');
    }, 100);
  };

  const share = async (): Promise<void> => {
    if (!orbis || !profile) return;

    const body = postboxArea.current.innerText;

    // Cleaning up mentions
    const _mentions = mentions.filter(o => body.includes(o.username));

    if (editPost) {
      const newContent = { ...editPost.content, body, mentions: _mentions };
      if (callback) callback(newContent);

      await orbis.editPost(editPost.stream_id, newContent);
    } else {
      const content = {
        body,
        context,
        master: replyTo ? replyTo.master || replyTo.stream_id : null,
        reply_to: replyTo ? replyTo.stream_id : null,
        mentions: _mentions || [],
      };

      const timestamp = Math.floor(Date.now() / 1000);

      const _callbackContent = {
        content,
        context,
        creator: profile.did,
        creator_details: {
          did: profile.did,
          profile: profile.details?.profile,
          metadata: profile.details?.metadata,
        },
        stream_id: 'new_post-' + timestamp,
        timestamp,
        master: replyTo ? replyTo.master || replyTo.stream_id : null,
        reply_to: replyTo ? replyTo.stream_id : null,
        reply_to_creator_details: replyTo ? replyTo.creator_details : null,
        reply_to_details: replyTo ? replyTo.content : null,
        count_commits: 1,
        count_likes: 0,
        count_haha: 0,
        count_downvotes: 0,
        count_replies: 0,
        type: replyTo ? 'reply' : null,
      };

      console.log(_callbackContent);

      if (callback) callback(_callbackContent);
      postboxArea.current.innerText = '';

      const res = await orbis.createPost(content);

      if (res.status === 200) {
        _callbackContent.stream_id = res.doc;
        if (callback) callback(_callbackContent);
      }
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    if (!e.key) return;

    if (enterToShare && e.key === 'Enter' && !e.shiftKey) {
      // Don't generate a new line
      e.preventDefault();
      share();
    }
  };

  useEffect(() => {
    if (!postboxArea.current) return;

    const body = postboxArea.current.innerText;
    if (!body) {
      setSearchText('');
      setIsSearching(false);
      setSearchResults([]);
    }

    /**
     * Check characters before caret
     * to determine if user's trying
     * to mention other user
     */
    let _string = '';
    for (let i = focusOffset; i > 0; i--) {
      const lastChar = focusNode?.textContent?.substring(i - 1, i)?.trim();
      _string = lastChar + _string;

      // If space found then it's false
      if (!lastChar) {
        setSearchText('');
        setIsSearching(false);
        setSearchResults([]);
        return;
      }

      // If @ found then it's true
      if (lastChar === '@') {
        setSearchText(_string.replace('@', ''));
        return;
      }

      // Default to false
      setIsSearching(false);
      setSearchText('');
    }
  }, [focusOffset, focusNode]);

  useEffect(() => {
    if (searchText) {
      searchProfiles();
    } else {
      setIsSearching(false);
      setSearchResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchText]);

  useEffect(() => {
    if (replyTo) {
      postboxArea.current.focus();
    }
  }, [replyTo]);

  useEffect(() => {
    if (editPost) {
      // Highlight all mentions
      let { body } = editPost.content;
      const { mentions: _mentions } = editPost.content;
      if (_mentions?.length) {
        setMentions(_mentions);
        body = highlightMentions(editPost.content);
      }
      postboxArea.current.innerHTML = body;

      // Focus to postbox
      setTimeout(() => {
        // setFocusOffset(body.length - 1)
        // saveCaretPos()
        postboxArea.current.focus();
        if (
          typeof window.getSelection != 'undefined' &&
          typeof document.createRange != 'undefined'
        ) {
          const range = document.createRange();
          range.selectNodeContents(postboxArea.current);
          range.collapse(false);
          const sel = window.getSelection();
          sel?.removeAllRanges();
          sel?.addRange(range);
        }
      }, 100);
    }
  }, [editPost]);

  return (
    <>
      {searchText && (
        <div>
          {isSearching ? (
            <div>Loading...</div>
          ) : (
            searchResults.map(p => (
              <div key={p.did} onClick={() => addMention(p)}>
                <span>{getUsername(p?.details)}</span>
                <span className="badge">{getBadgeContent(p?.details)}</span>
              </div>
            ))
          )}
        </div>
      )}

      <PostboxInput
        ref={postboxArea}
        contentEditable={true}
        data-placeholder="Thoughts?..."
        onKeyDown={handleKeyDown}
        onKeyUp={saveCaretPos}
        onMouseUp={saveCaretPos}
      />

      {editPost && (
        <div className="postbox__editmenu">
          <button onClick={() => cancelEdit && cancelEdit()}>Cancel</button>{' '}
          &bull; Enter to <button onClick={share}>Save</button>
        </div>
      )}

      {!enterToShare && <Button onClick={share}>Share</Button>}
    </>
  );
};

export default Postbox;
