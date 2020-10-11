/* eslint-disable prefer-promise-reject-errors */
const fs = require('fs');

class FileHelper {
  static async copy (src, dest) {
    return new Promise((resolve, reject) => {
      fs.copyFile(src, dest, (err) => {
        if (err) {
          reject({
            status: false,
            message: err
          });
        }
        resolve({ status: true, data: { copy: 'success' } });
      });
    });
  }

  static async delete (src) {
    return new Promise((resolve, reject) => {
      fs.unlink(src, (err) => {
        if (err) {
          reject({
            status: false,
            message: err
          });
        }
        resolve({ status: true });
      });
    });
  }
}

export const fileHelper = new FileHelper();
