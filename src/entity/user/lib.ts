"use server";

import { cookies } from "next/headers";
import type { ApiResponse, UserDTO } from "shared/api";

export type PreloadedState = {
  userSlice: { user: UserDTO | null };
};

const getDefaultState = (user: UserDTO | null = null): PreloadedState => ({
  userSlice: { user },
});

export async function preloadState(): Promise<PreloadedState> {
  const cookieStore = await cookies();
  const jwt = cookieStore.get("jwt")?.value;

  if (!jwt) {
    return getDefaultState();
  }

  let meRes: null | Response = null;
  try {
    meRes = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users/me`, {
      method: "GET",
      cache: "no-store",
      headers: {
        Cookie: `jwt=${jwt}`,
      },
    });
  } catch (err) {
    console.error("Failed to fetch /users/me", err);
    return getDefaultState();
  }

  if (!meRes.ok) {
    console.warn("me endpoint not ok", meRes.status);
    return getDefaultState();
  }

  let user: UserDTO | undefined;
  try {
    const meData: ApiResponse<UserDTO> = await meRes.json();
    user = meData.data;
  } catch (err) {
    console.error("Failed to parse user", err);
    return getDefaultState();
  }

  if (!user) {
    return getDefaultState();
  }

  return getDefaultState(user);
}
