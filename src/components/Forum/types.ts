/**
 * @body Content of the post
 * @title Title of the post
 * @context Context of the post, in our case the guild address
 * @master Relevant if the post is a comment
 * @mentions Array of mentioned users, either did or username
 * @data Custom data for the post we want to send
 */

export interface Post {
  body: string;
  title: string;
  context?: string;
  master?: string;
  replyTo?: string;
  mentions?: string[];
  data?: Record<string, string>;
}
