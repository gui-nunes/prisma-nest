import * as request from 'supertest';
import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import { TodosModule } from './todos.module';
import { TodosService } from './todos.service';
import { faker } from '@faker-js/faker';

describe('Todos (e2e)', () => {
  let app: INestApplication;
  const service = { FindAll: () => ['test'] };

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [TodosModule],
    })
      .overrideProvider(TodosService)
      .useValue(service)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });
//   it('/ (GET)', async () => {
//     return await request(app.getHttpServer())
//       .get('/todos/1')
//       .expect(200)
//       .expect('test');
//   });
  it('/ (POST)', async () => {
    return await request(app.getHttpServer())
      .post('/todos')
      .send({
        title: faker.lorem.sentence(),
        content: faker.lorem.paragraphs(),
        authorId: 1,
        done: faker.datatype.boolean(),
      })
      .expect(201)
      .expect('test');
  });
});
