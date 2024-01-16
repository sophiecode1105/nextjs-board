"use client";

import { useEffect, useState } from "react";

export default function Comment({ id }: { id: number }) {
  const [comment, setComment] = useState("");
  const [serverData, setServerData] = useState<
    { author: string; content: string; parent: string; _id: string }[]
  >([]);
  const [connectNum, setConnectNum] = useState<number>(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/comment/list?id=${id}`);
        const data = await response.json();
        setServerData(data.comments);
      } catch (error) {
        console.error("에러:", error);
      }
    };

    fetchData();
  }, [connectNum]);

  return (
    <div>
      <div>
        {serverData.map((comment, key) => {
          return <div key={key}>{comment?.content}</div>;
        })}
      </div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          setComment("");
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: id }),
          }).then((res) => {
            setConnectNum(connectNum + 1);
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
