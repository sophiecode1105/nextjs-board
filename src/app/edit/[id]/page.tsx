import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";

export default async function Edit({ params }: { params: { id: number } }) {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.id) });

  return (
    <div>
      <h4>수정페이지</h4>
      <form action="/api/post/edit" method="POST">
        <input type="text" name="title" defaultValue={result?.title}></input>
        <input
          type="text"
          name="content"
          defaultValue={result?.content}
        ></input>
        <input
          type="text"
          name="id"
          style={{ display: "none" }}
          defaultValue={params.id}
        ></input>
        <button type="submit">수정완료 버튼</button>
      </form>
    </div>
  );
}
