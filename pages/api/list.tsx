import { connectDB } from "../../util/database";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  if (req.method === "GET") {
    return res.status(200).json({ message: result });
  }
}
