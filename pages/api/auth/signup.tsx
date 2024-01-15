import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import bcrypt from "bcrypt";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    const hash = await bcrypt.hash(req.body.password, 10);
    req.body.password = hash;

    //이메일조회 중복체크 해보기

    let db = (await connectDB).db("forum");
    await db.collection("user_cred").insertOne(req.body);
    res.status(200).json("성공");
  }
}
