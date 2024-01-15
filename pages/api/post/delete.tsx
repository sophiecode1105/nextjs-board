import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "DELETE") {
    const db = (await connectDB).db("forum");
    let reqBody = JSON.parse(req.body);

    let result = await db
      .collection("post")
      .deleteOne({ _id: new ObjectId(reqBody.postId) });

    if (result.acknowledged === true) {
      res.status(204).redirect("/list");
    }

    //     try {

    //     } catch (error) {
    //       console.error(error);
    //       res.status(500).json({ message: "Internal Server Error" });
    //     }
    //   } else {
    //     res.status(405).json({ message: "Method Not Allowed" });
  }
}
