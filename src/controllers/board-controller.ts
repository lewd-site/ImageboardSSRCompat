import Koa from 'koa';
import { renderToStream } from '@popeindustries/lit-html-server';
import ApiClient from '../api/client';
import indexPage from '../templates/pages/index';
import boardPage from '../templates/pages/board';

export class BoardController {
  public constructor(protected readonly apiClient: ApiClient) {}

  public index = async (ctx: Koa.Context) => {
    const boards = await this.apiClient.browseBoards();

    ctx.set('Content-Type', 'text/html');
    ctx.body = renderToStream(indexPage({ path: ctx.path, boards }));
  };

  public show = async (ctx: Koa.Context) => {
    const slug = String(ctx.params.slug || '').trim();

    const [boards, threads] = await Promise.all([
      await this.apiClient.browseBoards(),
      await this.apiClient.browseThreads(slug),
    ]);

    const board = boards.find((board) => board.slug === slug);
    if (typeof board === 'undefined') {
      throw new Error();
    }

    ctx.set('Content-Type', 'text/html');
    ctx.body = renderToStream(boardPage({ path: ctx.path, boards, board, threads }));
  };
}
