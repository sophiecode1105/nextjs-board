import { NextApiRequest, NextApiResponse } from "next";
import { connectDB } from "../../../util/database";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/[...nextauth]";
import { Session } from "inspector";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getServerSession(req, res, authOptions);

  if (session) {
    req.body.author = session.user?.email;
  }
  if (req.method === "POST") {
    //요청이 빈칸이면 db저장안함
    if (req.body.title === "") {
      return res.status(500).json({ message: "please fill title" });
    }

    const client = await connectDB;
    const db = client.db("forum");
    let result = await db.collection("post").insertOne(req.body);

    return res.redirect(302, "/list");
  }
}
