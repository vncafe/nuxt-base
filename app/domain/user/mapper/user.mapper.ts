// mappers/user.mapper.ts

import type { UserDto } from "../dto/user.dto"
import type { User } from "../entity/user"

export function mapUser(dto: UserDto): User {
  return {
    id: dto.user_id,
    fullName: `${dto.first_name} ${dto.last_name}`,
    createdAt: new Date(dto.created_at),
  }
}
