import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';

describe('UNIT: UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockError = new HttpException('error', HttpStatus.BAD_REQUEST);

  const mockUser: CreateUserDto = {
    id: 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
  };

  const mockUserArray: CreateUserDto[] = [
    {
      id: 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
    },
    {
      id: 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
    },
  ];

  const mockUpdatedTodo: UpdateUserDto = {
    ...mockUser,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
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

    controller = module.get<UsersController>(UsersController);
    service = module.get<UsersService>(UsersService);
  });

  afterEach(async () => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'create').mockResolvedValue(mockUser);
      expect(await controller.create(mockUser)).toBe(mockUser);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'create').mockRejectedValue(mockError);

      expect(controller.create(mockUser)).rejects.toThrow('error');
      expect(service.create).toBeCalledTimes(1);
    });
  });

  describe('findAll', () => {
    it('should return a user list', async () => {
      jest.spyOn(service, 'findAll').mockResolvedValue(mockUserArray);
      expect(await controller.findAll()).toBe(mockUserArray);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findAll').mockRejectedValue(mockError);

      expect(controller.findAll()).rejects.toThrow('error');
      expect(service.findAll).toBeCalledTimes(1);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(service, 'findOne').mockResolvedValue(mockUser);
      expect(await controller.findOne('1')).toBe(mockUser);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'findOne').mockRejectedValue(mockError);

      expect(controller.findOne('1')).rejects.toThrow('error');
    });
  });

  describe('update', () => {
    it('should return a updated user', async () => {
      jest.spyOn(service, 'update').mockResolvedValue(mockUser);
      expect(await controller.update('1', mockUser)).toBe(mockUser);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'update').mockRejectedValue(mockError);

      expect(controller.update('1', mockUpdatedTodo)).rejects.toThrow('error');
    });
  });

  describe('delete', () => {
    it('should return a user deleted', async () => {
      jest.spyOn(service, 'remove').mockResolvedValue(mockUser);
      expect(await controller.remove('1')).toBe(mockUser);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(service, 'remove').mockRejectedValue(mockError);

      expect(controller.remove('1')).rejects.toThrow('error');
    });
  });
});
