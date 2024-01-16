import { connectDB } from "../../../util/database";
import { NextApiRequest, NextApiResponse } from "next";
import { ObjectId } from "mongodb";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
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
    console.log("저장안되민?", result);
    res.status(200).json("saved");
  }
}
