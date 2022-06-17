export class CreateTodoDto {
  id: number;
  title: string;
  content: string;
  authorId: number;
  done: boolean;
}
