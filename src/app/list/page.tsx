import Link from "next/link";
import { connectDB } from "../../../util/database";

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
          <Link href={`/detail/${post._id}`} key={`post-${index}`}>
            <div className="list-item">
              <h4>{post.title}</h4>
              <p>{post.content}</p>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
