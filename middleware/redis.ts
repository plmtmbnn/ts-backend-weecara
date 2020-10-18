/* eslint-disable prefer-promise-reject-errors */
const redis = require('redis');
const client = redis.createClient({ host: process.env.REDIS_HOST, port: process.env.REDIS_PORT });

const CryptoJS = require('crypto-js');
const REDIS_CRYPT = CryptoJS.AES.decrypt(process.env.REDIS_CRYPT.toString(), 'weecara').toString(CryptoJS.enc.Utf8);
client.on('connect', () => {
  // client.auth(process.env.REDIS_CRYPT)
  client.auth(REDIS_CRYPT);
});
client.on('error', function (err) {
  console.log('Redis Error:', err);
});

export default class RedisController {
  updateValue (key, value, ttl) {
    console.log(key, value);

    return new Promise((resolve, reject) => {
      client.hmset(key, value, function (err, result) {
        if (err) {
          console.log('updateValue', err);
          reject(err);
        } else {
          client.expire(key, ttl);
          resolve(result);
        }
      });
    });
  }

  publishAll (name) {
    return new Promise((resolve, reject) => {
      client.hgetall(name, (err, reply) => {
        if (err) {
          console.log('publishAll', err);
          reject({});
        } else
        if (reply === null) {
          reject({});
        } else {
          resolve(reply);
        }
      });
    });
  }
}
