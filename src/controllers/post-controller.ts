import Koa from 'koa';
import { renderToStream } from '@popeindustries/lit-html-server';
import ApiClient from '../api/client';
import threadPage from '../templates/pages/thread';

export class PostController {
  public constructor(protected readonly apiClient: ApiClient) {}

  public index = async (ctx: Koa.Context) => {
    const slug = String(ctx.params.slug || '').trim();
    const threadId = +(ctx.params.threadId || '').replace(/\.html$/i, '');

    const [boards, thread, posts] = await Promise.all([
      await this.apiClient.browseBoards(),
      await this.apiClient.readThread(slug, threadId),
      await this.apiClient.browsePosts(slug, threadId),
    ]);

    const board = boards.find((board) => board.slug === slug);
    if (typeof board === 'undefined') {
      throw new Error();
    }

    ctx.set('Content-Type', 'text/html');
    ctx.body = renderToStream(threadPage({ path: ctx.path, boards, board, thread, posts }));
  };
}

export default PostController;
