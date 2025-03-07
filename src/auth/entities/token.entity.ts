import { UserEntity } from 'src/users/entities/user.entity';

export class TokenEntity {
  accessToken: string;
  user: UserEntity;
}
