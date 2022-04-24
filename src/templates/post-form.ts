import { html } from '@popeindustries/lit-html-server';
import config from '../config';

export function postFormTemplate(slug: string, threadId?: number) {
  const postFormUrl =
    typeof threadId !== 'undefined' && threadId !== null && threadId !== 0
      ? `${config.ssr.host}/api/v1/boards/${slug}/threads/${threadId}/posts`
      : `${config.ssr.host}/api/v1/boards/${slug}/threads`;

  return html`<div class="postarea">
    <form id="postform" name="postform" action=${postFormUrl} method="post">
      <table class="postform">
        <tbody>
          <tr>
            <td class="postblock">Name</td>
            <td>
              <input type="text" name="name" size="28" maxlength="75" accesskey="n" />
              <input type="submit" value="Submit" accesskey="z" />
            </td>
          </tr>

          <tr>
            <td class="postblock">Subject</td>
            <td>
              <input type="text" name="subject" size="40" maxlength="75" accesskey="s" autocomplete="off" />
            </td>
          </tr>

          <tr>
            <td class="postblock">Message</td>
            <td><textarea id="message" name="message" cols="48" rows="4" accesskey="m"></textarea></td>
          </tr>

          <tr>
            <td class="postblock">File</td>
            <td><input type="file" name="files" size="35" accesskey="f" multiple /></td>
          </tr>
        </tbody>
      </table>
    </form>
  </div>`;
}

export default postFormTemplate;
