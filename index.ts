import 'reflect-metadata'

import { createConnection } from 'typeorm'

const main = async () => {
  const connection = await createConnection()
  console.log(connection)
  await connection.close()
}

main()
