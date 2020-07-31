const { Pool } = require('pg');
const CryptoJS = require('crypto-js');

var poolConnection: any;

export class NodePostgres {
    client: any;

    async init (): Promise<void> {
      poolConnection = await new Pool({
        user: CryptoJS.AES.decrypt(process.env.DB_USER.toString(), 'FIT999').toString(CryptoJS.enc.Utf8),
        host: process.env.DB_HOST,
        database: process.env.DB_NAME,
        password: CryptoJS.AES.decrypt(process.env.DB_PASS.toString(), 'FIT999').toString(CryptoJS.enc.Utf8),
        port: process.env.DB_PORT,
        max: 40,
        idleTimeoutMillis: 60000,
        application_name: 'ts_e_logistic'
      });
    }

    async getClient (): Promise<void> {
      this.client = await poolConnection.connect();
      console.log('pool Connection : ' + poolConnection.totalCount);
      return this.client;
    }

    getPoolConnection () {
      return poolConnection;
    }

    async query (queryString: string, param: any[]): Promise<void> {
      try {
        let result: any = null;
        const paramLength: Number = param.length;
        if (paramLength > 0) {
          result = await this.client.query(queryString, param);
        } else {
          result = await this.client.query(queryString);
        }
        return result;
      } catch (error) {
        console.log('[DB_QUERY] ', error, 'QUERY: ', queryString, param);
        return error;
      }
    }

    async beginTransaction (): Promise<void> {
      await this.client.query('BEGIN');
    }

    async commitTransaction (): Promise<void> {
      await this.client.query('COMMIT');
      await this.client.release();
    }

    async rollbackTransaction (): Promise<void> {
      await this.client.query('ROLLBACK');
      await this.client.release();
    }

    async releaseClient (): Promise<void> {
      return this.client.release();
    }
}
