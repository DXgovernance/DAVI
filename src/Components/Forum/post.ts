import { Post } from './types';
import type { Orbis as OrbisType } from '@orbisclub/orbis-sdk';

export const postTemplate = (post: Post): Post => {
  if (!post.title || !post.body) {
    throw Error('Missing post title or body')
  }
  return {
    title: post.title,
    body: post.body,
    context: post.context || '',
    master: post.master || '',
    replyTo: post.replyTo || '',
    mentions: post.mentions || [],
    data: post.data || {},
  };
};

export async function createPost(orbis: OrbisType, content: Post) {
  let res = await orbis.createPost(content);
  if (res.status === 200) {
    console.log('Post created: ', res);
    return res;
  } else {
    console.error('Error creating post: ', res.error);
  }
}

