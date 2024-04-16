import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';

/*import * as express from 'express';

import * as cors from 'cors';

import { router } from './routes/operation';

const PORT = process.env['PORT'] ?? 2132;

const app = express();
app.use(express.json());
app.use(cors());

app.use('/operations', router);

app.listen(PORT, () => {
  console.log(`server listening on port http://localhost:${PORT}`)
});*/
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
