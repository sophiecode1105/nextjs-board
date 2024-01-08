"use client";

import { ObjectId } from "mongodb";
import { usePathname, useRouter, useParams } from "next/navigation";

export default function DetailLink({ routeId }: { routeId: ObjectId }) {
  let router = useRouter();
  //Link태그는 prefetch를 사용해서 미리 불러오는 기능이 있음
  //이걸 안사용하려면 router.prefetch를 사용하면됨
  return (
    <button
      onClick={() => {
        router.push(`/detail/${routeId}`);
      }}
    >
      버튼누르면 뭔가되어짐
    </button>
  );
}
