import { html } from '@popeindustries/lit-html-server';
import config from '../config';
import Board from '../models/board';

interface SidebarProps {
  readonly className?: string;
  readonly path: string;
  readonly boards: Board[];
}

export function sidebar({ className, path, boards }: SidebarProps) {
  className = [className, 'sidebar'].filter((c) => c).join(' ');

  return html`<aside id="sidebar" class=${className}>
    <nav class="sidebar__inner">
      <a class="sidebar__title" href="/">
        <span class="icon icon_logo"></span>
        ${config.site.title}
      </a>

      <ul class="sidebar__list">
        ${boards.slice(0, 5).map(
          (board) => html`<li class="sidebar__item">
            <a
              class=${[
                'sidebar__link',
                path === `/${board.slug}` || path.startsWith(`/${board.slug}/`) ? 'sidebar__link_active' : null,
              ]
                .filter((c) => c)
                .join(' ')}
              href=${`/${board.slug}/`}
            >
              <span class="icon icon_discussion-mask"></span>
              <span class="sidebar__text">${board.title}</span>
            </a>
          </li>`
        )}
      </ul>
    </nav>
  </aside>`;
}

export default sidebar;
