"use client";

import { revalidatePath } from "next/cache";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function DeleteBtn({ postId }: { postId: string | undefined }) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);

    try {
      const res = await fetch("/api/post/delete", {
        method: "DELETE",
        body: JSON.stringify({ postId }),
      });
      console.log("왜삭제가안되는거요/?", res);
      if (res.ok) {
        router.push("/list");
        // 삭제 요청이 성공하면 리스트를 다시 불러와서 갱신
      } else {
        console.error("Failed to delete post");
      }
    } catch (error) {
      console.error("Error while deleting post:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div>
      <button
        disabled={isDeleting}
        onClick={handleDelete}
        // onClick={() => {
        //   fetch("/api/post/delete", {
        //     method: "DELETE",
        //     body: JSON.stringify({ postId: postId }),
        //   }).then((res) => {
        //     if (res.ok) {
        //       router.push("/list");
        //     }
        //   });
        // }}
      >
        삭제
      </button>
    </div>
  );
}
