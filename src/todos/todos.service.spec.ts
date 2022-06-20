import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { TodosService } from './todos.service';

describe('UNIT TEST: TodosService', () => {
  const mockTodo: CreateTodoDto = {
    id: 1,
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    authorId: 1,
    done: faker.datatype.boolean(),
  };

  const mockTodosArray: CreateTodoDto[] = [
    {
      id: 1,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      authorId: 1,
      done: faker.datatype.boolean(),
    },
    {
      id: 1,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraphs(),
      authorId: 1,
      done: faker.datatype.boolean(),
    },
  ];

  const mockError = new HttpException('error', HttpStatus.BAD_REQUEST);
  let service: TodosService;
  const prismaMock = {
    todo: {
      create: jest.fn().mockResolvedValue(mockTodosArray[0]),
      findMany: jest.fn().mockResolvedValue(mockTodosArray),
      findUnique: jest.fn().mockResolvedValue(mockTodosArray[0]),
      findFirst: jest.fn().mockResolvedValue(mockTodosArray[0]),
      update: jest.fn().mockResolvedValue(mockTodosArray[1]),
      delete: jest.fn().mockResolvedValue(mockTodosArray[1]),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosService],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a todo', async () => {
      jest.spyOn(prismaMock.todo, 'create').mockResolvedValue('ok');

      expect(await service.create(mockTodo)).toBeDefined();
      expect(await service.create(mockTodo)).toBe('ok');
    });

    it('should throw an error', async () => {
      jest.spyOn(prismaMock.todo, 'create').mockRejectedValue(mockError);

      expect(service.create(mockTodo)).rejects.toThrow(mockError);
    });
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      jest.spyOn(prismaMock.todo, 'findMany').mockResolvedValue(mockTodosArray);

      expect(await service.findAll()).toBeDefined();
      expect(await service.findAll()).toBe(mockTodosArray);
    });

    it('should throw an error', async () => {
      jest.spyOn(prismaMock.todo, 'findMany').mockRejectedValue(mockError);

      expect(service.findAll()).rejects.toThrow(mockError);
    });
  });
  describe('findOne', () => {
    it('should return a todo', async () => {
      jest
        .spyOn(prismaMock.todo, 'findUnique')
        .mockResolvedValue(mockTodosArray[0]);

      expect(await service.findOne(1)).toBeDefined();
      expect(await service.findOne(1)).toBe(mockTodosArray[0]);
    });

    it('should throw an error', async () => {
      jest.spyOn(prismaMock.todo, 'findUnique').mockRejectedValue(mockError);

      expect(service.findOne(1)).rejects.toThrow(mockError);
    });
  });
  describe('update', () => {
    it('should update a todo', async () => {
      jest
        .spyOn(prismaMock.todo, 'update')
        .mockResolvedValue(mockTodosArray[1]);

      expect(await service.update(1, mockTodo)).toBeDefined();
      expect(await service.update(1, mockTodo)).toBe(mockTodosArray[1]);
    });
    it('should throw an error', async () => {
      jest.spyOn(prismaMock.todo, 'update').mockRejectedValue(mockError);

      expect(service.update(1, mockTodo)).rejects.toThrow(mockError);
    });
  });
  describe('delete', () => {
    it('should delete a todo', async () => {
      jest
        .spyOn(prismaMock.todo, 'delete')
        .mockResolvedValue(mockTodosArray[1]);

      expect(await service.remove(1)).toBeDefined();
      expect(await service.remove(1)).toBe(mockTodosArray[1]);
    });
    it('should throw an error', async () => {
      jest.spyOn(prismaMock.todo, 'delete').mockRejectedValue(mockError);

      expect(service.remove(1)).rejects.toThrow(mockError);
    });
  });
});
