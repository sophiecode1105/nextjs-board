import Link from "next/link";
import { connectDB } from "../../../util/database";
import DetailLink from "./DetailLink";

export default async function List() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  console.log(result);
  //비동기를 동기로 바꿔주는 await

  return (
    <div className="list-bg">
      {result.map((post, index) => {
        return (
          <div key={`post-${index}`} className="list-item">
            <h4>{post.title}</h4>
            <DetailLink routeId={post._id} />
          </div>
        );
      })}
    </div>
  );
}
