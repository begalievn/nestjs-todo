import { AuthController } from "./auth.controller";
import { Test } from '@nestjs/testing';
import { AuthService } from "./auth.service";

describe('AuthController', () => {
  let authController: AuthController;

  const mockAuthService = {
    login: jest.fn((user) => {
      return {
        access_token: 'eyasdfadsfasdfasdf'
      }
    }),
    register: jest.fn((body) => {
      return new Promise((resolve, reject) => {
        const result = {
          name: body.name,
          username: body.username
        }
        resolve(result);
      })
    })
  }

  beforeEach(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [AuthService]
    })
      .overrideProvider(AuthService)
      .useValue(mockAuthService)
      .compile();

    authController = moduleRef.get<AuthController>(AuthController);
  })

  it('authController should be defined', () => {
    expect(authController).toBeDefined();
  });

  it('should perform login', () => {

    const req = { user: { username: 'maria', password: 'guess' }}

    expect(authController.login(req))
      .toEqual({
        access_token: 'eyasdfadsfasdfasdf'
      })
  });

  it('should perform register', async () => {
    const body = {
      name: 'Elvin',
      username: 'elvin',
      password: 'header'
    }

    expect(await authController.register(body))
      .toEqual({
        name: 'Elvin',
        username: 'elvin'
      })
  })
})
