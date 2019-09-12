require('dotenv/config')

const config = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/_migrations/*.ts'],
  migrationsTableName: '_migrations',
  cli: {
    migrationsDir: 'src/_migrations',
  },
}

module.exports = config
