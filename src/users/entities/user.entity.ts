type UserWithoutPassword = Omit<UserEntity, 'password'>;

export class UserEntity implements UserWithoutPassword {
  id: number;
  names: string;
  lastNames: string;
  identification: string;
  email: string;
  address: string;
  phone: string;
  password: string;
  birthDate: Date;
  gender: string;
  job: string;
  isActive: boolean;
}
