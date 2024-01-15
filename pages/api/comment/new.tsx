import { connectDB } from "../../../util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("아직~~");
  if (req.method === "POST") {
    const session = await getServerSession(req, res, authOptions);
    const reqBody = JSON.parse(req.body);
    const newComment = {
      content: reqBody.comment,
      parent: new ObjectId(reqBody._id),
      author: session.user.email,
    };
    const db = (await connectDB).db("forum");
    const result = await db.collection("comment").insertOne(newComment);
    res.status(200).json("저장완료");
  }
}
