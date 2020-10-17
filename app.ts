import { NodePostgres } from './connection/pg.conn';
const router = require('./routes/router');
var cors = require('cors');
var express = require('express');
class App {
    app: any;

    constructor () {
      this.app = express();
      this.config();
    }

    async config (): Promise<void> {
      this.app.use(cors());
      this.app.use(express.json({ limit: '100mb' }));
      this.app.use(express.urlencoded({ limit: '100mb' }));
      this.app.use('/', router);
      // const db = new NodePostgres();
      // await db.init();
    }
}

export default new App().app;
