import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';
import { faker } from '@faker-js/faker';
import { NotFoundException } from '@nestjs/common';

describe('TodosController', () => {
  let controller: TodosController;

  const mockTodoList: Todo[] = [
    {
      id: 0,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: 0,
      done: false,
    },
    {
      id: 1,
      title: faker.lorem.sentence(),
      content: faker.lorem.paragraph(),
      authorId: 0,
      done: false,
    },
  ];

  const TodosServiceMock = {
    create: jest.fn().mockResolvedValue(mockTodoList[0]),
    findAll: jest.fn().mockResolvedValue(mockTodoList),
    findOne: jest.fn().mockResolvedValue(mockTodoList[0]),
    update: jest.fn().mockResolvedValue(''),
    remove: jest.fn().mockResolvedValue(''),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        TodosController,
        {
          provide: TodosService,
          useValue: TodosServiceMock,
        },
      ],
    }).compile();

    controller = module.get<TodosController>(TodosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of todos', async () => {
      jest.spyOn(TodosServiceMock, 'findAll').mockResolvedValue(mockTodoList);

      const result = await controller.findAll();
      expect(result).toEqual(mockTodoList);
      expect(result.length).toBe(2);
      expect(TodosServiceMock.findAll).toHaveBeenCalled();
    });
    it('should throw an error with code 404', async () => {
      jest
        .spyOn(TodosServiceMock, 'findAll')
        .mockRejectedValue('Internal Server Error');

      const result = await controller.findAll();
      console.log(result);
      // expect(result).toThrowError(new NotFoundException());
    });
  });
  // it('should throw an error with code 500', async () => {
  //   const response = TodosServiceMock.findAll.mockRejectedValue(new Error());
  //   await expect(controller.findAll()).rejects.toThrow(new Error());
  //   expect(response).toHaveBeenCalled();
  //   expect(response).rejects.toThrow(new Error());
  // });
});
