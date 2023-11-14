import { Exclude } from 'class-transformer';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, unique: true, nullable: false })
  email: string;

  @Column({ type: String, nullable: false })
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ type: String, nullable: true })
  firstName: string | null;

  @Column({ type: String, nullable: true })
  lastName: string | null;

  @Column({ type: 'date', nullable: true })
  dob: Date | null;

  @CreateDateColumn({
    type: 'timestamp',
    transformer: {
      to(value: Date | string | null): string {
        return value instanceof Date ? value.toISOString() : value;
      },
      from(value: string | null): Date {
        return value ? new Date(`${value}Z`) : null;
      },
    },
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    transformer: {
      to(value: Date | string | null): string {
        return value instanceof Date ? value.toISOString() : value;
      },
      from(value: string | null): Date {
        return value ? new Date(`${value}Z`) : null;
      },
    },
  })
  updatedAt: Date;
}
