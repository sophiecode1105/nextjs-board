"use client";

import { useEffect } from "react";
import { signIn } from "next-auth/react";

export default function LoginBtn() {
  useEffect(() => {
    console.log("클라이언트 측 이펙트");
  }, []); // 빈 종속성 배열은 마운트 시에만 실행됨(클라이언트 측).

  return (
    <button
      onClick={() => {
        signIn();
      }}
    >
      뭐셈
    </button>
  );
}

// "use client";

// export default function LoginBtn() {
//   console.log("뭐냐?");
//   return (
//     <div>
//       <button
//         onClick={() => {
//           console.log("안되는이유를 모르겟습");
//         }}
//       >
//         소셜로그인인데
//       </button>
//     </div>
//   );
// }
