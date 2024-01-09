import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import { ObjectId } from "mongodb";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("되닝?");
  if (req.method === "DELETE") {
    try {
      const db = (await connectDB).db("forum");
      let reqBody = JSON.parse(req.body);

      let result = await db
        .collection("post")
        .deleteOne({ _id: new ObjectId(reqBody.postId) });

      res.status(200).json({ message: "Post deleted successfully" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  } else {
    res.status(405).json({ message: "Method Not Allowed" });
  }
}
