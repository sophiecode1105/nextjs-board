"use client";

import { connectDB } from "../../../util/database";
import type { WithId, Document } from "mongodb";
import dynamic from "next/dynamic";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";
import deleteIcon from "../../assets/delete.png";
import Image from "next/image";
import styles from "./forum.module.css";
import { useEffect, useState } from "react";

export default function Forum({
  result,
  email,
}: {
  result: WithId<Document>[];
  email: string | null | undefined;
}) {
  //검색엔진 노출을 위해 props로 내려주는게좋음

  //Link태그는 prefetch를 사용해서 미리 불러오는 기능이 있음
  //이걸 안사용하려면 router.prefetch를 사용하면됨\

  //삭제시 form 태그 사용 혹은 ajax사용
  //get 요청에서 query string으로 데이터 보내거나, URL parameter로 데이터 보내거k

  return (
    <div>
      {result.map((post, index) => {
        return (
          <div
            className={`${styles.post_alignment} list-item`}
            key={`post-${index}`}
          >
            <Link
              className={`${styles.link_hover} remove_linkstyle`}
              href={`/detail/${post._id}`}
            >
              <h4>{post.title}</h4>
            </Link>
            <div
              className={styles.button_wrapper}
              style={{
                display: post.author && post.author === email ? "flex" : "none",
              }}
            >
              {/* <Link className="remove_linkstyle" href={`/edit/${post._id}`}>
                <div>수정</div>
              </Link> */}
              <div
                onClick={() => {
                  fetch("/api/post/delete", {
                    method: "DELETE",
                    body: JSON.stringify({ postId: post._id }),
                  }).then((res) => {
                    if (res.ok) {
                      window.location.reload();
                    }
                  });
                }}
              >
                <Image
                  className={styles.delete_icon}
                  src={deleteIcon}
                  alt="delete"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
