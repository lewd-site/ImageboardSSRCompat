import { html } from '@popeindustries/lit-html-server';

interface HeaderProps {
  readonly className?: string;
}

export function header({ className }: HeaderProps) {
  className = [className, 'header'].filter((c) => c).join(' ');

  return html`<header class=${className}>
    <div class="header__inner">
      <div class="header__left">
        <button type="button" id="header-menu" class="header__menu">
          <span class="icon icon_menu-mask"></span>
        </button>
      </div>

      <div class="header__main"></div>
      <div class="header__right"></div>
    </div>
  </header>`;
}

export default header;
