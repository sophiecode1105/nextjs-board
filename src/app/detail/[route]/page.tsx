import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";

export default async function Detail({
  params,
}: {
  params: { route: number };
}) {
  console.log("props?", params.route);
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.route) });

  return (
    <div>
      <h4>상세페이지</h4>
      <div>{result?.title}</div>
      <div>{result?.content}</div>
    </div>
  );
}
