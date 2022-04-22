import { html } from '@popeindustries/lit-html-server';
import Board from '../../models/board';
import Thread from '../../models/thread';
import layout from '../layout';
import postTemplate from '../post';
import postFormTemplate from '../post-form';

interface BoardPageProps {
  readonly path: string;
  readonly boards: Board[];
  readonly board: Board;
  readonly threads: Thread[];
}

export function boardPage({ path, boards, board, threads }: BoardPageProps) {
  const title = `/${board.slug}/ — ${board.title}`;

  return layout({
    path,
    title,
    boards,
    content: html`${postFormTemplate(board.slug)}
      <hr />
      <form id="delform" action="imgboard.php?delete" method="post">
        <input type="hidden" name="board" value=${board.slug} />

        ${threads.map(
          (thread) =>
            html`${postTemplate({ post: thread, showReplyLink: true })}
              <hr />`
        )}

        <table class="userdelete"></table>
      </form>

      <table border="1"></table>

      <div class="footer"></div>`,
  });
}

export default boardPage;
