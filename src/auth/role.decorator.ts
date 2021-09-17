import { SetMetadata } from "@nestjs/common";
import { UserRole } from "src/users/entities/user.entity";

// 로그인 되어있기만 하면 모든 사람이 모든 걸 할 수 도 있는 상황이 있을 수 도 있기 때문에 'Any' 필요
type AllowedRoles = keyof typeof UserRole | 'Any';

export const Role = (roles:AllowedRoles[]) =>  SetMetadata("roles",roles);