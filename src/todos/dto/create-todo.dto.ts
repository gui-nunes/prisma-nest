import { Prisma } from '@prisma/client';

export class CreateTodoDto implements Prisma.TodoCreateInput {
  title: string;
}
