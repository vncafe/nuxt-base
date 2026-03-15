// composables/useUser.ts

import { getUser } from "~/domain/user/service/user.service"

export async function useUser(id: number) {
  const user = await getUser(id)
  return user
}
