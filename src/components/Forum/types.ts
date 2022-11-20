/**
 * @body Content of the discussion
 * @title Title of the discussion
 * @context Context of the discussion, in our case the guild address
 * @master Relevant if the discussion is a comment
 * @mentions Array of mentioned users, either did or username
 * @data Custom data for the discussion we want to send
 */

export interface DiscussionContent {
  body: string;
  title: string;
  context?: string;
  master?: string | null;
  replyTo?: string | null;
  mentions?: string[];
  data?: Record<string, string>;
}

export interface Discussion {
  stream_id: string;
  creator: string;
  creator_details: CreatorDetails;
  content: DiscussionContent;
  context: string | null;
  context_details: ContextDetails;
  master: string | null;
  timestamp: number;
  group_id: string | null;
  reply_to: string | null;
  reply_to_details?: Discussion;
  count_likes: number;
  count_haha: number;
  count_downvotes: number;
  count_replies: number;
  type: string | null;
}

export interface CreatorDetails {
  did: string;
  profile: {
    username: string;
    pfp: string;
  };
  metadata: {
    address: string;
    chain: string | number;
    ensName: string | null;
  };
}

export interface ContextDetails {
  group_id: string | null;
  group_details: Record<string, string> | null;
  channel_id: string | null;
  channel_details: Record<string, string> | null;
}
