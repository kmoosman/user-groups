import { NextApiRequest, NextApiResponse } from "next";
import { users, UserId } from "../../users"

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     description: Gets a user by id
 *     responses:
 *       200:
 *         description: The users
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *   post:
 *     description: Add a new user
 *     responses:
 *       201:
 *         description: If the operation was successful
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 * 
 * 
 */

const handler = (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const name = req.query.id
    // I left this as lowercase name because that is what was used for all the other users but I'd like to see this as a uuid instead
    const uuid = name.toLowerCase() as UserId;
    users.set(uuid, {
      uuid,
      name,
    });
    res.status(201).json({ userData: {users: [...users.values()]}  });
  } else {
      res.status(200).json({ user: users.get(req.query.id) });
    }
};

export default handler;
