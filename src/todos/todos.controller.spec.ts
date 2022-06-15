import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { Todo } from '@prisma/client';

const todoListMock: Todo[] = [
  { id: 1, title: 'teste 1', content: 'Teste todo', done: true, authorId: 1 },
  { id: 2, title: 'teste 2', content: 'Teste todo', done: true, authorId: 1 },
  { id: 3, title: 'teste 3', content: 'Teste todo', done: false, authorId: 1 },
];

describe('TodosController', () => {
  let todoController: TodosController;
  let todoService: TodosService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn().mockResolvedValue(todoListMock),
            findOnde: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();
    todoController = module.get<TodosController>(TodosController);
    todoService = module.get<TodosService>(TodosService);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
    expect(todoService).toBeDefined();
  });

  describe('findeAll', () => {
    it('should call findall and sucess', async () => {
      const result = await todoController.findAll();

      expect(result).toEqual(todoListMock);
      expect(typeof result).toEqual('object');
      expect(todoService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      // Arrange
      todoController.findAll = jest
        .fn()
        .mockRejectedValueOnce(new Error('Error'));

      // Assert
      expect(todoController.findAll()).rejects.toThrowError();
    });
  });
});
