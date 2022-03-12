import { RewindIcon } from "@heroicons/react/outline";
import { NextApiRequest, NextApiResponse } from "next";
import { groups } from "../../groups";

/**
 * @swagger
 * /api/groups/{id}/{user}:
 *   delete:
 *     description: Removes a user from a group
 *     responses:
 *       204:
 *         description: If the operation was successful
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 *   put:
 *     description: Add a user to a group
 *     responses:
 *       201:
 *         description: If the operation was successful
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *       - in: path
 *         name: user
 *         schema:
 *           type: string
 */
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  const gId = req.query.id
  const userId = req.query.user
  if (req.method === "DELETE") {
    groups.get(req.query.id)?.members.delete(req.query.user);
    res.status(200).json({ id: gId, user: userId});
  } else if (req.method === "PUT") {
    groups.get(req.query.id)?.members.add(req.query.user);
    res.status(201).json({});
  } else {
    res.status(405).json({});
  }
};

export default handler;
