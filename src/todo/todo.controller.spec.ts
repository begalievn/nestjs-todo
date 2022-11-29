import { Test, TestingModule } from '@nestjs/testing';
import { TodoController } from "./todo.controller";
import { TodoService } from './todo.service';
import { UpdateTodoDto } from "./dto/updateTodo.dto";

describe('TodoController', () => {
  let todoController: TodoController;

  const mockTodoService = {
    addTodo: jest.fn((user, todo) => {
      const newTodo = {
        ...todo,
        user
      }
      console.log("newTodo", newTodo);
      return newTodo;
    }),

    updateTodoById: jest.fn((searchQuery , dto: UpdateTodoDto) => ({
      title: 'test',
      description: 'some',
      completed: true,
      user: searchQuery.user
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
    const req = {user: {userId: '1234132klh12l3j4k1l23'}}
    const todo = { title: 'test', description: 'test description' }
    expect(todoController.addTodo(req, todo))
      .toEqual({
        title: 'test',
        description: 'test description',
        user: '1234132klh12l3j4k1l23',
      });

    expect(mockTodoService.addTodo).toHaveBeenCalledWith('1234132klh12l3j4k1l23', {title: 'test', description: 'test description'});
  });

  it('should update a todo', () => {
    let id = '12345'
    let todo = {
      completed: true
    }
    let req = {
      user: { userId: 'asdfasdfasdfkjasdf8'}
    }
    expect(todoController.updateTodo(req, id, todo))
      .toEqual({
        title: 'test',
        description: 'some',
        completed: true,
        user: req.user.userId
      })
  })
});
