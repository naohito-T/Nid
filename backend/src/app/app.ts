import express from 'express';
import * as bodyParser from 'body-parser';
import cors from 'cors';
import { Request, Response } from 'express';
import { AppDataSource } from '@/db/setting/db.setting';
import { Routes } from '@/routers/routes';
import { User } from '@/db/entity/User';
import { corsOptions } from '@/libs/cors';

export class Application {
  private app: express.Express;

  public constructor() {
    this.app = express();
  }

  public get getApp() {
    return this.app;
  }

  public setup = async () => {
    // TODO DIで注入できたらいいね。
    await this.dbConnection();
    await this.launchApp();
  };

  // ここではsetDatabaseはコネクションにとどめる。
  private dbConnection = async () => {
    await AppDataSource.initialize();
  };

  private launchApp = async () => {
    this.app.use(cors(corsOptions));
    // post対応
    this.app.use(bodyParser.json());

    // register express routes from defined application routes
    Routes.forEach((route) => {
      this.app[route.method](route.route, (req: Request, res: Response, next: Function) => {
        const result = new (route.controller as any)()[route.action](req, res, next);
        if (result instanceof Promise) {
          result.then((result) =>
            result !== null && result !== undefined ? res.send(result) : undefined,
          );
        } else if (result !== null && result !== undefined) {
          res.json(result);
        }
      });
    });

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: 'Timber',
        lastName: 'Saw',
        age: 27,
      }),
    );

    await AppDataSource.manager.save(
      AppDataSource.manager.create(User, {
        firstName: 'Phantom',
        lastName: 'Assassin',
        age: 24,
      }),
    );
  };
}

// AppDataSource.initialize()
//   .then(async () => {
//     // create express app
//     const app = express();
//     // cors
//     app.use(cors(corsOptions));
//     // post対応
//     app.use(bodyParser.json());

//     // register express routes from defined application routes
//     Routes.forEach((route) => {
//       app[route.method](route.route, (req: Request, res: Response, next: Function) => {
//         const result = new (route.controller as any)()[route.action](req, res, next);
//         if (result instanceof Promise) {
//           result.then((result) =>
//             result !== null && result !== undefined ? res.send(result) : undefined,
//           );
//         } else if (result !== null && result !== undefined) {
//           res.json(result);
//         }
//       });
//     });
//     // start express server
//     app.listen(3100);

//     // 分離した方がいい。

//     // insert new users for test
//     await AppDataSource.manager.save(
//       AppDataSource.manager.create(User, {
//         firstName: 'Timber',
//         lastName: 'Saw',
//         age: 27,
//       }),
//     );

//     await AppDataSource.manager.save(
//       AppDataSource.manager.create(User, {
//         firstName: 'Phantom',
//         lastName: 'Assassin',
//         age: 24,
//       }),
//     );

//     console.log(
//       'Express server has Started!!! on port 3100. Open http://localhost:3100/users to see results',
//     );
//   })
//   .catch((error) => console.log(error));

// AppDataSource.initialize()
//   .then(async () => {
//     // create express app
//     const app = express();
//     // cors
//     app.use(cors(corsOptions));
//     // post対応
//     app.use(bodyParser.json());

//     // register express routes from defined application routes
//     Routes.forEach((route) => {
//       app[route.method](route.route, (req: Request, res: Response, next: Function) => {
//         const result = new (route.controller as any)()[route.action](req, res, next);
//         if (result instanceof Promise) {
//           result.then((result) =>
//             result !== null && result !== undefined ? res.send(result) : undefined,
//           );
//         } else if (result !== null && result !== undefined) {
//           res.json(result);
//         }
//       });
//     });

//     // setup express app here
//     // ...

//     // start express server
//     app.listen(3100);

//     // 分離した方がいい。

//     // insert new users for test
//     await AppDataSource.manager.save(
//       AppDataSource.manager.create(User, {
//         firstName: 'Timber',
//         lastName: 'Saw',
//         age: 27,
//       }),
//     );

//     await AppDataSource.manager.save(
//       AppDataSource.manager.create(User, {
//         firstName: 'Phantom',
//         lastName: 'Assassin',
//         age: 24,
//       }),
//     );

//     console.log(
//       'Express server has Started!!! on port 3100. Open http://localhost:3100/users to see results',
//     );
//   })
//   .catch((error) => console.log(error));
