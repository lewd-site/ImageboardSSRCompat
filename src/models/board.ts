export interface BoardDto {
  readonly slug: string;
  readonly title: string;
  readonly created_at: string;
  readonly post_count: number;
}

export class Board {
  public constructor(
    public readonly slug: string,
    public readonly title: string,
    public readonly createdAt: Date,
    public readonly postCount: number
  ) {}

  public getData(): BoardDto {
    return {
      slug: this.slug,
      title: this.title,
      created_at: this.createdAt.toISOString(),
      post_count: +this.postCount,
    };
  }
}

export default Board;
