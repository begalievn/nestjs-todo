import { Test, TestingModule } from "@nestjs/testing";
import { TodoService } from "./todo.service";
import { getModelToken } from "@nestjs/mongoose";
import { Todo } from './entities/todo.model';
import { CreateTodoDto } from "./dto/createTodo.dto";


describe('TodoService', () => {
  let todoService: TodoService;

  let mockTodoModel = {
    find: jest.fn().mockImplementation((searchQuery) => {
      return Promise.resolve([
        {
          _id: '1',
          title: '1',
          description: '1'
        }
      ]);
    }),
    create: jest.fn().mockImplementation((todo: CreateTodoDto) => {
      return Promise.resolve({
        title: 'test',
        description: 'test',
        _id: '1'
      });
    })
  }

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        TodoService,
        {
          provide: getModelToken(Todo.name),
          useValue: mockTodoModel
        }
      ]
    }).compile();

    todoService = moduleRef.get<TodoService>(TodoService);
  });

  it('should be defined', () => {
    expect(todoService).toBeDefined();
  });

  it('should return all todos', async () => {
    let result = [
      {
        title: '1',
        description: '1',
        _id: expect.any(String)
      }
    ]
    expect(await todoService.getAllTodos({_id: 'asdfasdf'})).toEqual(result);
  })
});
