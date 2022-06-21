import { HttpException, HttpStatus } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersService } from './users.service';
import { faker } from '@faker-js/faker';

describe('UsersService', () => {
  let service: UsersService;

  const mockError = new HttpException('error', HttpStatus.BAD_REQUEST);

  const mockUser: CreateUserDto = {
    id: 1,
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    created_at: faker.date.past(),
    updated_at: faker.date.past(),
  };

  const mockUserArray: CreateUserDto[] = [
    {
      id: 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
    },
    {
      id: 1,
      name: faker.name.findName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      created_at: faker.date.past(),
      updated_at: faker.date.past(),
    },
  ];

  const mockUpdatedTodo: UpdateUserDto = {
    ...mockUser,
    updated_at: new Date(),
  };

  const prismaMock = {
    user: {
      create: jest.fn().mockResolvedValue(mockUser),
      findMany: jest.fn().mockResolvedValue(mockUserArray),
      findUnique: jest.fn().mockResolvedValue(mockUser),
      findFirst: jest.fn().mockResolvedValue(mockUser),
      update: jest.fn().mockResolvedValue(mockUser),
      delete: jest.fn().mockResolvedValue(mockUser),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersService],
      providers: [
        {
          provide: PrismaService,
          useValue: prismaMock,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a user', async () => {
      jest.spyOn(prismaMock.user, 'create').mockResolvedValue('ok');

      expect(await service.create(mockUser)).toBeDefined();
      expect(await service.create(mockUser)).toBe('ok');
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(prismaMock.user, 'create').mockRejectedValue(mockError);

      expect(service.create(mockUser)).rejects.toBe(mockError);
    });
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue(mockUserArray);

      expect(await service.findAll()).toBeDefined();
      expect(await service.findAll()).toBe(mockUserArray);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(prismaMock.user, 'findMany').mockRejectedValue(mockError);

      expect(service.findAll()).rejects.toBe(mockError);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      jest.spyOn(prismaMock.user, 'findFirst').mockResolvedValue(mockUser);

      expect(await service.findOne(1)).toBeDefined();
      expect(await service.findOne(1)).toBe(mockUser);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(prismaMock.user, 'findFirst').mockRejectedValue(mockError);

      expect(service.findOne(1)).rejects.toBe(mockError);
    });
  });
  describe('update', () => {
    it('should update a user', async () => {
      jest.spyOn(prismaMock.user, 'update').mockResolvedValue(mockUser);

      expect(await service.update(1, mockUpdatedTodo)).toBeDefined();
      expect(await service.update(1, mockUpdatedTodo)).toBe(mockUser);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(prismaMock.user, 'update').mockRejectedValue(mockError);

      expect(service.update(1, mockUpdatedTodo)).rejects.toBe(mockError);
    });
  });

  describe('delete', () => {
    it('should delete a user', async () => {
      jest.spyOn(prismaMock.user, 'delete').mockResolvedValue(mockUser);

      expect(await service.remove(1)).toBeDefined();
      expect(await service.remove(1)).toBe(mockUser);
    });
    it('should throw an error if an error occurs', async () => {
      jest.spyOn(prismaMock.user, 'delete').mockRejectedValue(mockError);

      expect(service.remove(1)).rejects.toBe(mockError);
    });
  });
});
