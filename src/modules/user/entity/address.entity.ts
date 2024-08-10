import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { UserEntity } from './user.entity';
import { EntityNames } from 'src/common/enum/entity-name.enum';

@Entity(EntityNames.UserAddress)
export class UserAddressEntity {
  @PrimaryGeneratedColumn('increment')
  id: number;
  @Column()
  title: string;
  @Column()
  province: string;
  @Column()
  city: string;
  @Column()
  address: string;
  @Column({ nullable: true })
  postal_code: string;
  @Column()
  userId: number;
  @CreateDateColumn({ type: 'timestamptz' })
  created_at: Date;
  @ManyToOne(() => UserEntity, (user) => user.addressList, { onDelete: 'CASCADE' })
  user: UserEntity;
}
