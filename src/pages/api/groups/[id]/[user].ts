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
  if (req.method === "DELETE") {
    if(groups.get(req.query.id)) {
      groups.get(req.query.id)?.members.delete(req.query.user);
      res.status(200).json({ groups: [...groups.values()].map((g) => ({ ...g, members: [...g.members] })) });
    } else {
      res.status(404).json({ error: "Opps, the group you have submitted can not be found...🔍" });
    }
    
  } else if (req.method === "PUT") {
    //Check if the group exists 
    if(groups.get(req.query.id)) {
      groups.get(req.query.id)?.members.add(req.query.user);
      res.status(201).json({ groups: [...groups.values()].map((g) => ({ ...g, members: [...g.members] })) });
    } else {
      res.status(404).json({ error: "Opps, the group you have submitted can not be found...🔍 The member was not added" });
    }
  } else {
    res.status(405).json({error: "Unable to add the user"});
  }
};

export default handler;
