import File, { FileDto } from './file';
import { Node } from './markup';

export interface PostDto {
  readonly id: number;
  readonly slug: string;
  readonly parent_id: number;
  readonly name: string | null;
  readonly tripcode: string | null;
  readonly message: string;
  readonly message_parsed: Node[];
  readonly files: FileDto[];
  readonly created_at: string;
}

export class Post {
  public constructor(
    public readonly id: number,
    public readonly slug: string,
    public readonly parentId: number,
    public readonly name: string | null,
    public readonly tripcode: string | null,
    public readonly message: string,
    public readonly parsedMessage: Node[],
    public readonly files: File[],
    public readonly createdAt: Date
  ) {}

  public getData(): PostDto {
    return {
      id: +this.id,
      slug: this.slug,
      parent_id: +this.parentId,
      name: this.name,
      tripcode: this.tripcode,
      message: this.message,
      message_parsed: this.parsedMessage,
      files: this.files.map((file) => file.getData()),
      created_at: this.createdAt.toISOString(),
    };
  }
}

export default Post;
