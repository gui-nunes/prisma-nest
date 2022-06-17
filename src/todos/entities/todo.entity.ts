export class TodoEntity {
  id: number;
  title: string;
  content: string;
  authorId: number;
  done: boolean;

  constructor(
    id: number,
    title: string,
    content: string,
    authorId: number,
    done: boolean,
  ) {
    this.id = id;
    this.title = title;
    this.content = content;
    this.authorId = authorId;
    this.done = done;
  }
}
