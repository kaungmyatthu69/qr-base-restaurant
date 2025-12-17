import { Exclude, Expose } from 'class-transformer';
import { UserRole } from 'src/common/enums/user-role.enum';
@Exclude()
export class UserResponseDto {
  @Expose()
  id: number;
  @Expose()
  name: string;
  @Expose()
  email: string;
  @Expose()
  role: UserRole;
}
