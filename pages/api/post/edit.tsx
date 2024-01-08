import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("여기로들어오나요", req.body);
  if (req.method === "POST") {
    if (req.body.title === "") {
      return res.status(500).json({ message: "please fill title" });
    }

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection("post").updateOne(
      {
        _id: new ObjectId(req.body.id),
      },
      {
        $set: {
          title: req.body.title,
          content: req.body.content,
        },
      },
      {}
    );

    return res.redirect(302, "/list");
  }
}
