import Image from "next/image";
import styles from "./page.module.css";
import { MongoClient, Db } from "mongodb";
import { connectDB } from "../../util/database";

export default async function Home() {
  return <div>게시판만들기 프로젝트 시작</div>;
}
