import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  result = result.map((list) => {
    list._id = list._id.toString() as unknown as ObjectId;
    return list;
  });

  res.status(200).json({ data: result });
}
