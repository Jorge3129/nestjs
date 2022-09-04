
# @heorhii.sanchenko/nestjs

A simplified clone of NestJS

Current features: HTTP method decorators, dependency injection with plain, class, value and alias providers.

To be done: module imports, exceptions, factory providers etc.

## Usage example

Entities:

#### user.entity.ts

```typescript
export interface User {
  id: number;
  name: string;
  age: number;
}
```

Services:

#### app.service.ts

```typescript
import {Injectable} from "@heorhii.sanchenko/nestjs";

@Injectable()
export class AppService {
}
```

#### user.service.ts

```typescript
import { Inject, Injectable } from "@heorhii.sanchenko/nestjs";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class UserService {
   constructor(
       @Inject(UserRepository) private userRepo: UserRepository,
       @Inject("AliasUserRepo") private aliasUserRepo: UserRepository
   ) {}

   public getUsers(filters: {
      startAge: number;
      endAge: number;
   }): Promise<User[]> {
      return this.userRepo.getUsers(filters);
   }

   public getUser(id: number): Promise<User | null> {
      return this.userRepo.getUser(id);
   }

   public saveUser(user: User): Promise<User> {
      return Promise.resolve(user);
   }
}
```

#### user.repository.ts

```typescript
import { Inject, Injectable } from "@heorhii.sanchenko/nestjs";
import { User } from "./user.entity";

const users: User[] = [
  { id: 1, name: "Foo", age: 20 },
  { id: 2, name: "Bar", age: 30 },
  { id: 3, name: "Baz", age: 40 },
  { id: 4, name: "Alex", age: 50 },
];

@Injectable()
export class UserRepository {
  constructor(
    @Inject("CONNECTION")
    private connection: string
  ) {}

  public getUsers(filters: {
    startAge: number;
    endAge: number;
  }): Promise<User[]> {
    const { endAge, startAge } = filters;

    const filteredUsers = users.filter(
      (user) => user.age >= startAge && user.age <= endAge
    );

    return Promise.resolve(filteredUsers);
  }

  public async getUser(id: number): Promise<User | null> {
    return users.find((user) => user.id === id) ?? null;
  }
}
```

Controllers:

#### app.controller.ts

```typescript
import { Controller, Get } from "@heorhii.sanchenko/nestjs";
import { Observable, of } from "rxjs";
import { AppService } from "./app.service";

@Controller()
export class AppController {
  constructor(private service: AppService) {}

  @Get("hello")
  public getHello(): Observable<string> {
    return of("Hello");
  }
}
```

#### user.controller.ts

```typescript
import { Body, Controller, Get, Inject, Param, ParseIntPipe, Post, Query,} from "@heorhii.sanchenko/nestjs";
import { UserService } from "./user.service";
import { User } from "./user.entity";

@Controller("/users")
export class UserController {
   constructor(
       @Inject(UserService)
       private userService: UserService
   ) {}

   @Get()
   public getUsers(
       @Query("startAge", ParseIntPipe) startAge: number,
       @Query("endAge", ParseIntPipe) endAge: number
   ): Promise<User[]> {
      return this.userService.getUsers({ startAge, endAge });
   }

   @Get("/:id")
   public getUser(@Param("id", ParseIntPipe) id: number): Promise<User | null> {
      return this.userService.getUser(id);
   }

   @Post()
   public async saveUser(@Body() user: User): Promise<User> {
      return await this.userService.saveUser(user);
   }
}
```

Create a module and register all controllers and providers:

#### app.module.ts

```typescript
import { Module } from "@heorhii.sanchenko/nestjs";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { UserService } from "./user/user.service";
import { UserRepository } from "./user/user.repository";
import { UserController } from "./user/user.controller";

@Module({
   controllers: [AppController, UserController],
   providers: [
      AppService,
      UserRepository,
      {
         provide: UserService,
         useClass: UserService,
      },
      { provide: "CONNECTION", useValue: "myConnection" },

      {
         provide: "AliasUserRepo",
         useExisting: UserRepository,
      },
   ],
})
export class AppModule {}
```

Bootstrap the app:

#### main.ts

```typescript
import {NestFactory} from "@heorhii.sanchenko/nestjs";
import {AppModule} from "./app.module";

async function bootstrap() {
   const app = await NestFactory.create(AppModule);
   await app.listen(3000);
}
bootstrap();
```
