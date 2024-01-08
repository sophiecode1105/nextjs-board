import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    //요청이 빈칸이면 db저장안함
    if (req.body.title === "") {
      return res.status(500).json({ message: "please fill title" });
    }

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection("post").insertOne(req.body);

    return res.status(200).redirect("/list");
  }
}
