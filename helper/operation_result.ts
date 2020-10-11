/* eslint-disable no-unused-expressions */
export class OpResult {
    status: any
    data: any
    message: any
    httpCodeStatus: number
    flag: any
    route: any
    errorCode: any
    customKey: string

    constructor () {
      this.status;
      this.data;
      this.message;
      this.httpCodeStatus;
      this.customKey;
    }

    setStatus (status: any) {
      this.status = status;
    }

    setData (data: any) {
      this.data = data;
    }

    setMessage (message: any) {
      this.message = message;
    }

    setFlag (flag: any) {
      this.flag = flag;
    }

    setRoute (route: any) {
      this.route = route;
    }

    setError (error: any) {
      this.status = false;
      this.message = error.name;
      this.errorCode = error.code;
    }

    static success (data: any, isNestedObject?: boolean, customKey?: string) {
      let op = new OpResult();
      op.status = true;
      if (data) {
        op.message = data.message;
        if (isNestedObject) {
          op = { ...op, ...data };
        } else {
          if (customKey) {
            delete data.message;
            op[customKey] = data;
          } else {
            op.data = data;
          }
        }
      }
      return op;
    }

    /** get OpResult object that this.status is set to false by default
     * @param message set the message for the failed result
     * @returns OpResult object
     */
    static failed (message: any, data?: any, fieldName?: string) {
      const op = new OpResult();
      op.status = false;
      if (message) {
        op.message = message;
      }
      if (data) {
        op[fieldName] = data;
      }
      return op;
    }

    /**
     * get OpResult object from error class
     * @param {Error} error error class
     */
    static error (error: any) {
      const op = new OpResult();
      op.setError(error);
      return op;
    }
}

// export const opResult = new OpResult();
