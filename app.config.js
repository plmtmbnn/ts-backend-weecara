module.exports = {
  apps: [
    {
      name: 'ts-backend-weecara',
      script: 'server.js',
      instances: 2,
      exec_mode: 'cluster',
      autorestart: true,
      watch: ['server.js', 'app.config.js', 'connection', 'controllers', 'service', 'app.js'],
      watch_delay: 1000,
      ignore_watch: ['node_modules', 'logs'],
      exp_backoff_restart_delay: 1000,
      max_memory_restart: '100M',
      log_file: './logs/app.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      time: true,
      combine_logs: true,
      env: {
        NODE_ENV: 'local',
        BE_PORT: 1234,
        DB_HOST: 'localhost',
        DB_NAME: 'weecara',
        DB_USER: 'U2FsdGVkX18K7Dl1twyed11eTSOBsvuI4Z/6+Br66TA=',
        DB_PASS: 'U2FsdGVkX1+LyOt6+IP/a1Ir0bTgf8Gy8RtodNeQSoU=',
        DB_PORT: 5432,
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: 6379,
        REDIS_CRYPT: 'U2FsdGVkX1/fvJXR50topNwjYKnVg+/avzxsXoZ/j2Y='
      },
      env_development: {
        NODE_ENV: 'development',
        BE_PORT: 1234,
        DB_HOST: 'localhost',
        DB_NAME: 'weecara',
        DB_USER: 'U2FsdGVkX18K7Dl1twyed11eTSOBsvuI4Z/6+Br66TA=',
        DB_PASS: 'U2FsdGVkX1+LyOt6+IP/a1Ir0bTgf8Gy8RtodNeQSoU=',
        DB_PORT: 5432,
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: 6379,
        REDIS_CRYPT: 'U2FsdGVkX1/fvJXR50topNwjYKnVg+/avzxsXoZ/j2Y='
      },
      env_production: {
        NODE_ENV: 'production',
        BE_PORT: 1234,
        DB_HOST: 'localhost',
        DB_NAME: 'weecara',
        DB_USER: 'U2FsdGVkX18K7Dl1twyed11eTSOBsvuI4Z/6+Br66TA=',
        DB_PASS: 'U2FsdGVkX18wHOTxl1Wc+gYaNydWP0vWTv3oqMxwCIWa+RW69Yq2/kelhaMv9g54',
        DB_PORT: 5432,
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: 6379,
        REDIS_CRYPT: 'U2FsdGVkX1/fvJXR50topNwjYKnVg+/avzxsXoZ/j2Y='
      }
    }
  ]
};
