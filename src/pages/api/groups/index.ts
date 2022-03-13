import { NextApiRequest, NextApiResponse } from "next";
import { v4 as uuidv4 } from "uuid";
import { Brand } from "../../util";
import { UserId } from "./users";

export type GroupId = Brand<string, "GroupId">;
export type Group = {
  uuid: GroupId;
  name: string;
  desc: string;
  members: Set<UserId>;
};

export const groups = new Map<string, Group>();


const addGroup = (name: string, desc: string): Group => {
  const uuid = uuidv4() as GroupId;
  groups.set(uuid, {
    uuid,
    name,
    desc,
    members: new Set(),
  });
  return groups.get(uuid)!;
};

const addMembers = (g: Group, users: UserId[]) => {
  users.forEach((u) => g.members.add(u));
};

addMembers(addGroup("Admin", "This group is for administrators of the platform."), [
  "alex",
  "mary",
  "kathy",
] as UserId[]);
addMembers(addGroup("Employee", "This group is for internal users."), [
  "mary",
] as UserId[]);
;
addGroup("Client", "This group is for clients of the platform.");
addGroup("Expert", "This group is for experts on the platform.");

/**
 * @swagger
 * /api/groups:
 *   get:
 *     description: Gets all groups in the system
 *     responses:
 *       200:
 *         description: The groups
 */
const handler = (_req: NextApiRequest, res: NextApiResponse) => {
  res
    .status(200)
    .json({ groups: [...groups.values()].map((g) => ({ ...g, members: [...g.members] })) });
};

export default handler;
