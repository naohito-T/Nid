import { Application } from '@/app';

// DIにすればいい
const app = new Application();
app
  .setup()
  .then((_) => {
    app.getApp.listen(3100, () => {
      console.log(
        'Express server has Started!!! on port 3100. Open http://localhost:3100/users to see results',
      );
    });
  })
  .catch((e: unknown) => console.log(e));
