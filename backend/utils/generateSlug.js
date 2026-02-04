import { nanoid } from "nanoid";

export const generateSlug = () => {
  return nanoid(6);
};
