"use client";

import { useState } from "react";

export default function Comment({ id }: { id: number }) {
  const [comment, setComment] = useState("");
  return (
    <div>
      <div>댓글목록보여줄부분</div>
      <input
        onChange={(e) => {
          setComment(e.target.value);
        }}
      ></input>
      <button
        onClick={() => {
          fetch("/api/comment/new", {
            method: "POST",
            body: JSON.stringify({ comment: comment, _id: id }),
          });
        }}
      >
        댓글전송
      </button>
    </div>
  );
}
