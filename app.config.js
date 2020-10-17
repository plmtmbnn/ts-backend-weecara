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
        DB_NAME: 'pinjammodal',
        DB_USER: 'U2FsdGVkX1+fqpyhWWLYpxbfm72pAJWILsASrTJxq+s=',
        DB_PASS: 'U2FsdGVkX19ppaXgX8bL4EHUvxZyT2MQxLRSMUF1Jz8=',
        DB_PORT: 5432,
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: 6379,
        REDIS_CRYPT: 'U2FsdGVkX1+75qEKxsZ7wNwUGFKkKYKJbxyjnXWXaGJ8ksfvuJIONvpAV3TL4AvWhc3ddatS3D6lZPmnRBxK8A=='
      },
      env_development: {
        NODE_ENV: 'development',
        BE_PORT: 1234,
        DB_HOST: 'localhost',
        DB_NAME: 'pinjammodal',
        DB_USER: 'U2FsdGVkX1+fqpyhWWLYpxbfm72pAJWILsASrTJxq+s=',
        DB_PASS: 'U2FsdGVkX19ppaXgX8bL4EHUvxZyT2MQxLRSMUF1Jz8=',
        DB_PORT: 5432,
        REDIS_HOST: 'pinjammodal-public.redis.ap-southeast-5.rds.aliyuncs.com',
        REDIS_PORT: 6379,
        REDIS_CRYPT: 'U2FsdGVkX19e1LchQkEa3XgFa9tfP1M44O4a8iMQ/64='
      },
      env_production: {
        NODE_ENV: 'production',
        BE_PORT: 1234,
        DB_HOST: 'localhost',
        DB_NAME: 'pinjammodal',
        DB_USER: 'U2FsdGVkX1+fqpyhWWLYpxbfm72pAJWILsASrTJxq+s=',
        DB_PASS: 'U2FsdGVkX18wHOTxl1Wc+gYaNydWP0vWTv3oqMxwCIWa+RW69Yq2/kelhaMv9g54',
        DB_PORT: 5432,
        REDIS_HOST: '127.0.0.1',
        REDIS_PORT: 6379,
        REDIS_CRYPT: 'U2FsdGVkX1+75qEKxsZ7wNwUGFKkKYKJbxyjnXWXaGJ8ksfvuJIONvpAV3TL4AvWhc3ddatS3D6lZPmnRBxK8A=='
      }
    }
  ]
};
