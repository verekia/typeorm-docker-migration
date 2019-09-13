import 'dotenv/config'
import { series, scripts } from '@sharyn/scripts'
import { DOCKER_COMPOSE_UP, waitDockerPgReady } from '@sharyn/commands'

const { DATABASE_URL_DEV, DATABASE_URL_STAGING, DATABASE_URL_PROD } = process.env

const preparePg = [DOCKER_COMPOSE_UP, waitDockerPgReady('test-net')]

const migrationCmd = (dbUrl: string, cmd: string, useSsl: boolean = true) => ({
  cmd: `ts-node ./node_modules/typeorm/cli.js migration:${cmd}`,
  extraEnv: { DATABASE_URL: dbUrl, ...(useSsl ? { PG_USE_SSL: true } : {}) },
})

const migrationCmdDev = (cmd: string) => migrationCmd(DATABASE_URL_DEV, cmd, false)
const migrationCmdStaging = (cmd: string) => migrationCmd(DATABASE_URL_STAGING, cmd)
const migrationCmdProd = (cmd: string) => migrationCmd(DATABASE_URL_PROD, cmd)

scripts({
  showDev: () => series(...preparePg, migrationCmdDev('show')),
  showStaging: () => series(migrationCmdStaging('show')),
  showProd: () => series(migrationCmdProd('show')),
  migrateDev: () => series(...preparePg, migrationCmdDev('run')),
  migrateStaging: () => series(migrationCmdStaging('run')),
  migrateProd: () => series(migrationCmdProd('run')),
})
