const jwt = require('jsonwebtoken');

function dateSecret () {
  var dateObj = new Date();
  var month = (dateObj.getUTCMonth() + 1).toString(); // months from 1-12
  var day = dateObj.getUTCDate().toString();
  var year = dateObj.getUTCFullYear().toString();
  var result = day + month + year + 'weecara';
  result = Buffer.from(result).toString('base64');
  return result;
}

export function token (user_id: any): string {
  const userParam: any = user_id;
  var encodedToken = jwt.sign({ data: userParam }, dateSecret(), { expiresIn: '23h' });
  return encodedToken;
}

export function verifyToken (token) {
  var userLogin = null;
  try {
    var decodedToken = jwt.verify(token, dateSecret());
    userLogin = decodedToken.data;
    return userLogin;
  } catch (e) {
    console.log('verifyToken', e);
    return 'error';
  }
}

export function verifyTokenAccess (token) {
  var userLogin = null;
  var result = {};
  try {
    var decodedToken = jwt.verify(token, dateSecret());
\
    userLogin = Buffer.from(decodedToken.data, 'base64').toString('ascii');
    result = { userLogin };
    return result;
  } catch (e) {
    console.log('verifyTokenAccess', e.message);
    return 'error';
  }
}
