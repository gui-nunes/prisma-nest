import { Test, TestingModule } from '@nestjs/testing';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { CreateTodoDto } from './dto/create-todo.dto';
import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus } from '@nestjs/common';

describe('UNIT: TodosController', () => {
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

  const mockUpdatedTodo: CreateTodoDto = {
    ...mockTodo,
  };

  const mockError = new HttpException('error', HttpStatus.BAD_REQUEST);

  let controller: TodosController;
  let service: TodosService;

  beforeEach(async () => {
    let mockPrisma: any;
    service = new TodosService(mockPrisma);
    controller = new TodosController(service);

    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [TodosController],
      providers: [
        {
          provide: TodosService,
          useValue: {
            create: jest.fn(),
            findAll: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            remove: jest.fn(),
          },
        },
      ],
    }).compile();

    service = moduleRef.get<TodosService>(TodosService);
    controller = moduleRef.get<TodosController>(TodosController);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should return a todo', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockTodo);

      expect(controller.create(mockTodo)).toBeDefined();
      expect(await controller.create(mockTodo)).toBe(mockTodo);
      expect(service.create).toBeCalledTimes(2);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(mockError);

      expect(controller.create(mockTodo)).rejects.toThrow('error');
      expect(service.create).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a todo list', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockTodosArray);

      expect(controller.findAll()).toBeDefined();
      expect(await controller.findAll()).toBe(mockTodosArray);
      expect(service.findAll).toBeCalledTimes(2);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(mockError);

      expect(controller.findAll()).rejects.toThrow('error');
      expect(service.findAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a todo', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockTodo);

      expect(controller.findOne(String(mockTodo.id))).toBeDefined();
      expect(await controller.findOne(String(mockTodo.id))).toBe(mockTodo);
      expect(service.findOne).toBeCalledTimes(2);
    });

    it('shuold throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(mockError);

      expect(controller.findOne(String(mockTodo.id))).rejects.toThrow('error');
      expect(service.findOne).toBeCalledTimes(1);
    });
  });
  describe('update', () => {
    it('should return a todo updated', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUpdatedTodo);

      expect(controller.update(String(mockTodo.id), mockTodo)).toBeDefined();
      expect(await controller.update(String(mockTodo.id), mockTodo)).toBe(
        mockUpdatedTodo,
      );
      expect(service.update).toBeCalledTimes(2);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(mockError);

      expect(controller.update(String(mockTodo.id), mockTodo)).rejects.toThrow(
        'error',
      );
      expect(service.update).toBeCalledTimes(1);
    });
  });
  describe('remove', () => {
    it('should return a todo removed', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockTodo);

      expect(controller.remove(String(mockTodo.id))).toBeDefined();
      expect(await controller.remove(String(mockTodo.id))).toBe(mockTodo);
      expect(service.remove).toBeCalledTimes(2);
    });

    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(mockError);

      expect(controller.remove(String(mockTodo.id))).rejects.toThrow('error');
      expect(service.remove).toBeCalledTimes(1);
    });
  });
});
