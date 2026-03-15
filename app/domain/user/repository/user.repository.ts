// repositories/user.repository.ts

import type { UserDto } from "../dto/user.dto"

export async function fetchUser(id: number): Promise<UserDto> {
  return $fetch(`/api/users/${id}`)
}
