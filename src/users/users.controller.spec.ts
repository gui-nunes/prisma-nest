import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { faker } from '@faker-js/faker';

describe('UNIT: UsersController', () => {
  let controller: UsersController;
  let service: UsersService;

  const mockUser: CreateUserDto = {
    id: faker.datatype.number({max: 10}),
    name: faker.name.findName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [UsersService],
    }).compile();

    controller = module.get<UsersController>(UsersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
