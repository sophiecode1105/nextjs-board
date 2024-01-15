import Image from "next/image";
import styles from "./page.module.css";
import { MongoClient, Db } from "mongodb";
import { connectDB } from "../../util/database";
import { ObjectId } from "mongodb";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import ListItem from "./list/listItem";

export default async function Home() {
  const client = await connectDB;
  const db = client.db("forum");
  let result = await db.collection("post").find().toArray();
  const session = await getServerSession(authOptions);

  result = result.map((list) => {
    list._id = list._id.toString() as unknown as ObjectId;
    return list;
  });
  return (
    <div className={styles.container}>
      <div className={styles.paragraph_wrapper}>
        <div className={styles.paragraph}>RECENT 5 posts</div>
        <div className={styles.button_wrapper}>
          <Link className="remove_linkstyle" href="/list">
            <button className={styles.button}>전체 게시글</button>
          </Link>
          <Link className="remove_linkstyle" href="/write">
            <button className={styles.button}>글쓰기</button>
          </Link>
        </div>
      </div>

      <div>
        <ListItem
          email={session?.user?.email}
          result={result.reverse().slice(0, 5)}
        />
      </div>
    </div>
  );
}
