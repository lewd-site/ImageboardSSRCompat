import { html, TemplateResult } from '@popeindustries/lit-html-server';
import Board from '../models/board';

interface LayoutProps {
  readonly path: string;
  readonly title: string;
  readonly boards: Board[];
  readonly content?: TemplateResult | string;
}

export function layout({ title, path, boards, content }: LayoutProps) {
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

        <link rel="stylesheet" href="/index.css" />

        <script src="/Dollchan_Extension_Tools.es6.user.js"></script>
      </head>

      <body>
        <div class="adminbar"></div>
        <div class="logo">${title}</div>
        <hr width="90%" />
        ${content}
      </body>
    </html>`;
}

export default layout;
