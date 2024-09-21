import { getAuth } from "firebase/auth";

const auth = getAuth();

export const getUserDisplayName = async (uid) => {
  const user = await auth.get(uid);
  return user.displayName;
};