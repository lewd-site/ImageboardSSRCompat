import File, { FileDto } from './file';
import { Node } from './markup';

export interface ThreadDto {
  readonly id: number;
  readonly slug: string;
  readonly subject: string | null;
  readonly name: string | null;
  readonly tripcode: string | null;
  readonly message: string;
  readonly message_parsed: Node[];
  readonly files: FileDto[];
  readonly created_at: string;
  readonly bumped_at: string;
  readonly post_count: number;
}

export class Thread {
  public constructor(
    public readonly id: number,
    public readonly slug: string,
    public readonly subject: string | null,
    public readonly name: string | null,
    public readonly tripcode: string | null,
    public readonly message: string,
    public readonly parsedMessage: Node[],
    public readonly files: File[],
    public readonly createdAt: Date,
    public readonly bumpedAt: Date,
    public readonly postCount: number
  ) {}

  public getData(): ThreadDto {
    return {
      id: +this.id,
      slug: this.slug,
      subject: this.subject,
      name: this.name,
      tripcode: this.tripcode,
      message: this.message,
      message_parsed: this.parsedMessage,
      files: this.files.map((file) => file.getData()),
      created_at: this.createdAt.toISOString(),
      bumped_at: this.bumpedAt.toISOString(),
      post_count: +this.postCount,
    };
  }
}

export default Thread;
