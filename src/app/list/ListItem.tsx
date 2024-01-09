"use client";

import type { WithId, Document } from "mongodb";
import Link from "next/link";
import { usePathname, useRouter, useParams } from "next/navigation";

export default function ListItem({ result }: { result: WithId<Document>[] }) {
  //검색엔진 노출을 위해 props로 내려주는게좋음
  let router = useRouter();

  //Link태그는 prefetch를 사용해서 미리 불러오는 기능이 있음
  //이걸 안사용하려면 router.prefetch를 사용하면됨\

  //삭제시 form 태그 사용 혹은 ajax사용

  return (
    <div>
      {result.map((post, index) => {
        return (
          <div className="list-item" key={`post-${index}`}>
            <Link href={`/detail/${post._id}`}>
              <h4>{post.title}</h4>
            </Link>
            <Link href={`/edit/${post._id}`}>
              <div>수정</div>
            </Link>
            <div
              onClick={() => {
                fetch("/api/post/delete", {
                  method: "DELETE",
                  body: JSON.stringify({ postId: post._id }),
                });
              }}
            >
              삭제
            </div>
          </div>
        );
      })}
    </div>
  );
}
