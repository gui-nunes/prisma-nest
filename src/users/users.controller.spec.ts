import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { HttpException, HttpStatus } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { faker } from '@faker-js/faker';

describe('UNIT: UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockError = new HttpException(
    'error',
    HttpStatus.INTERNAL_SERVER_ERROR,
  );

  const mockUser: CreateUserDto = {
    id: 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: faker.date.past(),
  };

  const mockUserArray: CreateUserDto[] = [
    {
      id: 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past(),
    },
    {
      id: 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past(),
    },
  ];

  const mockUpdatedTodo: UpdateUserDto = {
    ...mockUser,
    updated_at: new Date(),
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
    jest.resetAllMocks();
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

    it('should throw a error if password is not provided', async () => {
      mockUser.password = null;
      const mockError_BAD_REQUEST = new HttpException(
        'Password is required',
        HttpStatus.BAD_REQUEST,
      );
      jest.spyOn(service, 'create').mockRejectedValue(mockError_BAD_REQUEST);
      expect(controller.create(mockUser)).rejects.toThrow(
        mockError_BAD_REQUEST,
      );
      mockUser.password = faker.internet.password();
    });
    it('should throw a error if email is not provided', async () => {
      mockUser.email = null;
      const mockError_BAD_REQUEST = new HttpException(
        'Email is required',
        HttpStatus.BAD_REQUEST,
      );
      jest.spyOn(service, 'create').mockRejectedValue(mockError_BAD_REQUEST);
      expect(controller.create(mockUser)).rejects.toThrow(
        mockError_BAD_REQUEST,
      );
    });
    it('should throw a error if email already existis', async () => {
      const mockError_PASSWORD = new HttpException(
        'Email already exists',
        HttpStatus.BAD_REQUEST,
      );
      jest.spyOn(service, 'create').mockRejectedValue(mockError_PASSWORD);
      expect(controller.create(mockUser)).rejects.toThrow(mockError_PASSWORD);
    });
    it('should throw a error if email is not acceptable', () => {
      mockUser.email = 'any_wrong_email';
      const mockError_NOT_ACCEPTABLE = new HttpException(
        'email must be an email',
        HttpStatus.BAD_REQUEST,
      );

      jest.spyOn(service, 'create').mockRejectedValue(mockError_NOT_ACCEPTABLE);
      expect(controller.create(mockUser)).rejects.toThrow(
        mockError_NOT_ACCEPTABLE,
      );
      mockUser.email = faker.internet.email();
    });
    it('should throw a error if name is not provide', () => {
      mockUser.name = null;
      const mockError_NULL_NAME = new HttpException(
        'name should not be empty',
        HttpStatus.BAD_REQUEST,
      );
      jest.spyOn(service, 'create').mockRejectedValue(mockError_NULL_NAME);
      expect(controller.create(mockUser)).rejects.toThrow(mockError_NULL_NAME);
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
      expect(await controller.update('1', mockUpdatedTodo)).toBe(mockUser);
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
