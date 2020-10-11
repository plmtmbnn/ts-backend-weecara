const ResponseHandler = require('../response_handler');
// import { errorObj } from '../exception/error_code';
const errorObj = require('./exception/error_code');

class CustomError extends Error {
    response: any;
    constructor (errorObj: any) {
      super(errorObj.name);
      Error.captureStackTrace(this, CustomError);
      this.response = new ResponseHandler();
      this.response.setError(errorObj);
      console.log('this.stack', this.stack);
    }
}

class RunTimeError extends Error {
    response: any;
    constructor (e: any) {
      super(e);
      console.log('e.stack', e.stack);
      Error.captureStackTrace(this, RunTimeError);
      this.response = new ResponseHandler();
      this.response.setError(errorObj.SYSTEM_ERROR);
    }
}

class DatabaseError extends Error {
    response: any;
    constructor (e: any) {
      super(e);
      Error.captureStackTrace(this, DatabaseError);
      this.response = new ResponseHandler();
      this.response.setError(errorObj.DATABASE_OPERATION_ERROR);
      console.log(this.stack);
    }
}

class GeneralError {
  static setErrorObj (e: any) {
    const flagError = customErrorList.findIndex(d => e instanceof d);
    const error = (flagError > -1) ? e : new RunTimeError(e);
    return error;
  }
}

const customErrorList = [CustomError, DatabaseError, RunTimeError];

module.exports = { CustomError, DatabaseError, GeneralError };
