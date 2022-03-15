import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { Brand } from "../../../util";

export type UserId = Brand<string, "UserId">;
export type User = {
  uuid: UserId;
  name: string;
};

export const users: Map<string, User> = new Map();

export const addUser = (name: string, customId?: string): User => {
  const uuid = (customId ?? uuidv4()) as UserId;
  users.set(uuid, {
    uuid,
    name,
  });
  return users.get(uuid)!;
};

addUser("John", "john");
addUser("Mary", "mary");
addUser("Alex", "alex");
addUser("Kathy", "kathy");
addUser("Ali", "ali");
addUser("Kumar", "kumar");
addUser("Liv", "liv");
addUser("Penelope", "penelope");

/**
 * @swagger
 * /api/users:
 *   get:
 *     description: Gets all the users of the application
 *     responses:
 *       200:
 *         description: The users
 */
const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res.status(200).json({ users: [...users.values()] });
};

export default handler;
