export class CreateTodoDto {
  id: number;
  title: string;
  content: string;
  authorId: number;
  done: boolean;
  created_at: Date;
  updated_at: Date;
}
