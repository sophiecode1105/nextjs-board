import { connectDB } from "../../../util/database";
import ListItem from "./ListItem";
import { ObjectId } from "mongodb";

export const dynamic = "force-dynamic";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();

  result = result.map((a) => {
    a._id = a._id.toString() as unknown as ObjectId;
    return a;
  });

  //비동기를 동기로 바꿔주는 await

  return (
    <div className="list-bg">
      <ListItem result={result} />
    </div>
  );
}
