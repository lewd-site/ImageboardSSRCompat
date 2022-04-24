import { html, TemplateResult } from '@popeindustries/lit-html-server';
import { unsafeHTML } from '@popeindustries/lit-html-server/directives/unsafe-html.js';
import config from '../config';
import Board from '../models/board';
import header from './header';
import sidebar from './sidebar';

interface LayoutProps {
  readonly path: string;
  readonly title: string;
  readonly boards: Board[];
  readonly content?: TemplateResult | string;
}

export function layout({ title, path, boards, content }: LayoutProps) {
  let matches;
  const titleUrl = (matches = path.match(/\/([0-9a-z]+)\/res\/\d+/i)) !== null ? `/${matches[1]}` : `/`;

  return html`<!DOCTYPE html>
    <html lang="ru">
      <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="msapplication-TileColor" content="#b91d47" />
        <meta name="theme-color" content="#ffffff" />

        <title>${title}</title>

        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#2f3136" />

        ${process.env.NODE_ENV === 'development'
          ? html`<script src="${config.dev.host}/assets/bundle.js"></script>`
          : html`<link rel="stylesheet" href="/assets/bundle.css" />
              <script type="module" src="/assets/bundle.js" defer></script>`}

        <script src="/dayjs.min.js"></script>
        <script src="/locale/ru.js"></script>
        <script src="/plugin/localizedFormat.js"></script>
        <script src="/plugin/utc.js"></script>

        <script>
          dayjs.extend(window.dayjs_plugin_localizedFormat);
          dayjs.extend(window.dayjs_plugin_utc);
          dayjs.locale('ru');

          window.config = ${unsafeHTML(JSON.stringify({ ssr: config.ssr, sse: config.sse, site: config.site }))};
        </script>

        <script src="/Dollchan_Extension_Tools.es6.user.js"></script>
      </head>

      <body>
        <div class="layout">
          ${header({ className: 'layout__header' })}
          ${sidebar({ className: 'layout__sidebar layout__sidebar_hidden', path, boards })}
          <div class="adminbar"></div>
          <div class="logo"></div>
          <hr width="90%" />
          ${content}
        </div>
      </body>
    </html>`;
}

export default layout;
