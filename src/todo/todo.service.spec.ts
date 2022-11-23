import { Test, TestingModule } from "@nestjs/testing";
import { TodoService } from "./todo.service";


describe('TodoService', () => {
  let todoService: TodoService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,

      ]
    }).compile();

    todoService = moduleRef.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });
});
