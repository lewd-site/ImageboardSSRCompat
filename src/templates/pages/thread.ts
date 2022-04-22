import { html } from '@popeindustries/lit-html-server';
import Board from '../../models/board';
import Post from '../../models/post';
import Thread from '../../models/thread';
import layout from '../layout';
import postTemplate from '../post';
import postFormTemplate from '../post-form';

interface ThreadPageProps {
  readonly path: string;
  readonly boards: Board[];
  readonly board: Board;
  readonly thread: Thread;
  readonly posts: Post[];
}

export function threadPage({ path, boards, board, thread, posts }: ThreadPageProps) {
  const title = `/${board.slug}/ — ${thread.subject ?? `Тред #${thread.id}`}`;
  const replies = posts.filter((post) => post.id !== thread.id);

  return layout({
    path,
    title,
    boards,
    content: html`${postFormTemplate(thread.slug, thread.id)}
      <hr />

      <form id="delform" action="imgboard.php?delete" method="post">
        <input type="hidden" name="board" value=${board.slug} />

        ${postTemplate({ post: thread })}
        ${replies.map(
          (post) => html`<table>
            <tbody>
              <tr>
                <td class="doubledash"></td>
                <td id=${`reply${post.id}`} class="reply">${postTemplate({ post })}</td>
              </tr>
            </tbody>
          </table>`
        )}

        <hr />

        <table class="userdelete"></table>
      </form>

      <table border="1"></table>

      <div class="footer"></div>`,
  });
}

export default threadPage;
