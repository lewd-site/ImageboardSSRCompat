import { html, TemplateResult } from '@popeindustries/lit-html-server';
import { Node } from '../models/markup';
import Post from '../models/post';
import Thread from '../models/thread';

function markupNode(post: Post | Thread, node: Node): TemplateResult | string | undefined {
  switch (node.type) {
    case 'text':
      return node.text;

    case 'newline':
      return html`<br />`;

    case 'link':
      return html`<a href="${node.url}" target="_blank" rel="ugc">${node.text}</a>`;

    case 'reflink':
      const url = `/${post.slug}/res/${(post as any).parentId || post.id}.html#${node.postID}`;

      return html`<a href=${url} rel="ugc">&gt;&gt;${node.postID}</a>`;

    case 'dice':
      let textContent = `##${node.count}d${node.max}##`;
      if (typeof node.result !== 'undefined') {
        textContent += ` = ${node.result.join(', ')}`;

        if (node.count > 1) {
          const sum = node.result.reduce((total, current) => total + current, 0);
          const min = Math.min(...node.result);
          const max = Math.max(...node.result);
          const average = +(sum / node.count).toFixed(3);

          textContent += ` (sum: ${sum}, min: ${min}, max: ${max}, avg: ${average})`;
        }
      }

      return html`<span class="dice">${textContent}</span>`;

    case 'style':
      const content = markup(post, node.children);

      switch (node.style) {
        case 'bold':
          return html`<strong>${content}</strong>`;

        case 'italic':
          return html`<em>${content}</em>`;

        case 'underline':
          return html`<span class="underline">${content}</span>`;

        case 'strike':
          return html`<del>${content}</del>`;

        case 'superscript':
          return html`<sup>${content}</sup>`;

        case 'subscript':
          return html`<sub>${content}</sub>`;

        case 'spoiler':
          return html`<span class="spoiler">${content}</span>`;

        case 'code':
          return html`<code>${content}</code>`;

        case 'size':
          return html`<span style="${`font-size: ${node.value}px;`}">${content}</span>`;

        case 'color':
          return html`<span style="${`color: ${node.value};`}">${content}</span>`;

        case 'quote':
          return html`<span class="quote">${content}</span>`;

        default:
          return html`${content}`;
      }

    default:
      return undefined;
  }
}

export function markup(post: Post | Thread, nodes: Node[]) {
  return nodes.map((node) => markupNode(post, node));
}

export default markup;
