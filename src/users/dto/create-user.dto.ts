import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateUserDto {
  id: number;
  @IsEmail()
  email: string;
  @IsNotEmpty()
  name: string;
  @IsNotEmpty()
  password: string;
  created_at: Date;
}
