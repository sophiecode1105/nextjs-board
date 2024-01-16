import { connectDB } from "../../../util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const id = req.query.id as string;
  const db = (await connectDB).db("forum");
  let result = await db
    .collection("comment")
    .find({ parent: new ObjectId(id) })
    .toArray();

  res.status(200).json({ comments: result });
}
