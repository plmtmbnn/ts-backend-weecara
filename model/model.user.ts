import { NodePostgres } from '../connection/pg.conn';

export class UserModel extends NodePostgres {
  constructor (client: any) {
    super();
    this.client = client;
  }

  async checkUser (email: string): Promise<any> {
    const result: any = await this.query(
    `
    SELECT
      t1.id,
      t1.password,
      t2.name
    FROM tw_user t1
    INNER JOIN tw_user_detail t2 ON t1.id = t2.user_id 
    WHERE t1.status = 'ACTIVE' AND t1.email = $1;
    `
    , [email]);

    return result;
  }
}
