// services/user.service.ts

import { mapUser } from "../mapper/user.mapper"
import { fetchUser } from "../repository/user.repository"

export async function getUser(id: number) {
  const dto = await fetchUser(id)
  return mapUser(dto)
}
