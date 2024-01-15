import { connectDB } from "../../../../util/database";
import { ObjectId } from "mongodb";
import styles from "./page.module.css";
import Link from "next/link";
import DeleteBtn from "./deleteBtn";
import Comment from "./comment";

export const dynamic = "force-dynamic";

export default async function Detail({
  params,
}: {
  params: { route: number };
}) {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db
    .collection("post")
    .findOne({ _id: new ObjectId(params.route) });
  const emailAddress = result?.author;
  const username =
    emailAddress === undefined ? "익명" : emailAddress.split("@")[0];

  return (
    <div className={styles.container}>
      <div className={styles.button_wrapper}>
        <button className={styles.list_btn}>목록</button>
        <div className={styles.user_btns}>
          <Link className={`remove_linkstyle`} href={`/edit/${result?._id}`}>
            <button className={styles.edit_btn}>수정</button>
          </Link>
          <DeleteBtn postId={String(result?._id)} />
        </div>
      </div>

      <div className={styles.title}>
        <div>{result?.title}</div>
      </div>
      <div className={styles.author}>{username}</div>
      <div className={styles.content_textBox}>
        <div>{result?.content}</div>
      </div>

      <Comment id={params.route} />
    </div>
  );
}
