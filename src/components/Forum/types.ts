/**
 * @body Content of the post
 * @title Title of the post
 * @context Context of the post, in our case the guild address
 * @master Relevant if the post is a comment
 * @mentions Array of mentioned users, either did or username
 * @data Custom data for the post we want to send
 */

export interface PostContent {
  body: string;
  title: string;
  context?: string;
  master?: string;
  replyTo?: string;
  mentions?: string[];
  data?: Record<string, string>;
}

export interface Post {
  stream_id: string;
  creator: string;
  creator_details: CreatorDetails;
  content: PostContent;
  context: string | null;
  context_details: ContextDetails;
  master: string | null;
  reply_to: string | null;
  reply_to_details?: Post;
  count_likes: number;
  count_haha: number;
  count_downvotes: number;
  count_replies: number;
  type: string /** Will be deprecated or improved soon, according to the docs */;
}

export interface CreatorDetails {
  did: string;
  profile: {
    username: string;
    pfp: string;
  };
  metadata: {
    address: string;
    chain: number;
    ensName: string | null;
  };
}

export interface ContextDetails {
  group_id: string | null;
  group_details: Record<string, string> | null;
  channel_id: string | null;
  channel_details: Record<string, string> | null;
}
