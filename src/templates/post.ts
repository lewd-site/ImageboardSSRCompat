import { html } from '@popeindustries/lit-html-server';
import dayjs from 'dayjs';
import config from '../config';
import File from '../models/file';
import Post from '../models/post';
import Thread from '../models/thread';
import markup from './markup';

interface PostProps {
  readonly post: Post | Thread;
  readonly showReplyLink?: boolean;
}

const MAX_FILE_NAME_LENGTH = 20;

function formatFileName(name: string): string {
  if (name.length > MAX_FILE_NAME_LENGTH) {
    const nameParts = name.split('.');
    const extension = nameParts.length > 1 ? nameParts[nameParts.length - 1] : null;

    if (extension !== null) {
      return name.substring(0, MAX_FILE_NAME_LENGTH - 4 - extension.length) + '[…].' + extension;
    }

    return name.substring(0, MAX_FILE_NAME_LENGTH - 4) + '[…]';
  }

  return name;
}

function formatFileSize(size: number): string {
  const units = ['Б', 'КБ', 'МБ', 'ГБ', 'ТБ'];
  const index = size === 0 ? 0 : Math.floor((31 - Math.clz32(size)) / 10);
  return `${(size / Math.pow(1024, index)).toFixed(2)} ${units[index]}`;
}

function formatDuration(seconds: number): string {
  const ss = (Math.floor(seconds) % 60).toString().padStart(2, '0');
  const mm = (Math.floor(seconds / 60) % 60).toString().padStart(2, '0');
  const hh = (Math.floor(seconds / 3600) % 60).toString().padStart(2, '0');
  if (+hh > 0) {
    return `${hh}:${mm}:${ss}`;
  }

  return `${mm}:${ss}`;
}

function formatFileDimensions(file: File): string {
  const dimensions = [formatFileSize(file.size)];

  if (file.width !== null && file.height !== null) {
    dimensions.push(`${file.width}x${file.height}`);
  }

  if (file.length !== null) {
    dimensions.push(formatDuration(file.length));
  }

  return dimensions.join(', ');
}

export function postTemplate({ post, showReplyLink }: PostProps) {
  const className = [
    'post',
    typeof (post as any).parentId === 'undefined' || (post as any).parentId === 0 || (post as any).parentId === null
      ? 'post_op'
      : 'post_reply',
    post.files.length > 0 ? 'post_with-files' : null,
  ]
    .filter((c) => c)
    .join(' ');

  const filesClassName = ['post__files', post.files.length === 1 ? 'post__files_single' : null]
    .filter((c) => c)
    .join(' ');

  const files = post.files.map((file, index) => {
    const fileInfo = `${formatFileSize(file.size)}, ${formatFileDimensions(file)}`;
    const originalUrl = `${config.content.host}/${file.path}`;
    const thumbnailUrl = `${config.content.host}/thumbnails/${file.hash}.webp`;

    return html`<div class="post__file">
      <span class="post__file-info filesize">
        <a href=${originalUrl} target="_blank">${formatFileName(file.name)}</a><br />
        ${fileInfo}<span style="display: none;">, ${file.name}</span>
      </span>

      <br />

      <div id=${`thumbfile${post.id}_${index}`}>
        <a href=${originalUrl} target="_blank">
          <img
            id=${`thumbnail${post.id}_${index}`}
            class="post__thumb thumb"
            src=${thumbnailUrl}
            alt=${`${post.id}_${index}`}
          />
        </a>
      </div>
    </div>`;
  });

  const subject = (post as any).subject || '';
  const name = !post.name?.length && !post.tripcode?.length ? 'Anonymous' : post.name || '';
  const tripcode = post.tripcode || '';
  const date = dayjs.utc(post.createdAt).format('L LTS');

  return html`<div class=${className}>
    <div class=${filesClassName}>${files}</div>

    <a id=${post.id}></a>

    <label>
      <input type="checkbox" name="delete" value=${post.id} />
      <span class="post__subject filetitle">${subject}</span>
      <span class="post__name postername">${name}</span>
      <span class="post__tripcode postertrip">${tripcode}</span>
      <time class="post__date" datetime=${post.createdAt.toISOString()}>${date}</time>
    </label>

    <span class="reflink">
      <a href=${`#${post.id}`}>No.</a>
      <a href=${`#q${post.id}`}>${post.id}</a>
    </span>

    ${showReplyLink ? html`[<a href=${`/${post.slug}/res/${post.id}`}>Reply</a>]` : undefined}

    <div class="post__message message">${markup(post, post.parsedMessage)}</div>
  </div>`;
}

export default postTemplate;
