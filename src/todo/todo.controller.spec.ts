import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from "./todo.controller";
import { TodoService } from './todo.service';
import { UpdateTodoDto } from "./dto/updateTodo.dto";

describe('TodoController', () => {
  let todoController: TodoController;

  const mockTodoService = {
    addTodo: jest.fn(dto => {
      return {
        id: Date.now(),
        ...dto
      }
    }),

    updateTodoById: jest.fn((id: string, dto: UpdateTodoDto) => ({
      id,
      title: 'test',
      description: 'some',
      completed: true
    }))
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [TodoController],
      providers: [TodoService]
    })
      .overrideProvider(TodoService)
      .useValue(mockTodoService)
      .compile();

    todoController = moduleRef.get<TodoController>(TodoController);
  });

  it('should be defined', () => {
    expect(todoController).toBeDefined();
  });

  it('should create a todo', () => {
    expect(todoController.addTodo({ title: 'test', description: 'test description' }))
      .toEqual({
        id: expect.any(Number),
        title: 'test',
        description: 'test description'
      });

    expect(mockTodoService.addTodo).toHaveBeenCalledWith({title: 'test', description: 'test description'});
  });

  it('should update a todo', () => {
    let id = '12345'
    let todo = {
      completed: true
    }
    expect(todoController.updateTodo(id, todo))
      .toEqual({
        id: id,
        title: 'test',
        description: 'description',
        completed: true
      })

    expect(mockTodoService.updateTodoById).toHaveBeenCalled();
  })
});
