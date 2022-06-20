import { Injectable } from '@nestjs/common';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo, Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TodosService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.TodoCreateInput): Promise<Todo> {
    return await this.prisma.todo.create({
      data,
    });
  }

  async findAll(): Promise<Todo[]> {
    return await this.prisma.todo.findMany();
  }

  async findByUserId(userId: number): Promise<Todo[]> {
    return await this.prisma.todo.findMany({
      where: {
        authorId: userId,
      },
    });
  }

  async findOne(id: number): Promise<Todo> {
    return await this.prisma.todo.findUnique({
      where: {
        id,
      },
    });
  }

  async update(id: number, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.prisma.todo.update({
      where: {
        id,
      },
      data: updateTodoDto,
    });
  }

  async remove(id: number): Promise<Todo> {
    return await this.prisma.todo.delete({
      where: {
        id,
      },
    });
  }
}
