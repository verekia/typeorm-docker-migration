import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm'

@Entity('User')
class User {
  constructor(props?: Object) {
    Object.assign(this, props)
  }
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  auth0Id: string

  @Column()
  email: string

  @Column()
  lastLogin: Date

  @Column()
  emailVerified: boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

  @VersionColumn()
  version: number
}

export default User
