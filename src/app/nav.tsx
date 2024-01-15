"use client";

import { useEffect, useState } from "react";
import { signIn, signOut } from "next-auth/react";
import styles from "./nav.module.css";
import logo from "../assets/logo.png";
import Image from "next/image";
import Link from "next/link";
import mypage from "../assets/mypage.png";

export default function Nav({ isLogin }: { isLogin: boolean }) {
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    console.log("클라이언트 측 이펙트");
  }, []); // 빈 종속성 배열은 마운트 시에만 실행됨(클라이언트 측).

  return (
    <nav className={styles.container}>
      <Link href="/" className={styles.logo_wrapper}>
        <div>NextJs study forum</div>
        <Image className={styles.logo_img} src={logo} alt="logo" />
      </Link>

      {isLogin ? (
        <div className={styles.maypage_wrapper}>
          <Image
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
            className={styles.mypage_icon}
            src={mypage}
            alt="logo"
          />
          <div
            style={{ display: showDropdown ? "flex" : "none" }}
            className={styles.dropdown}
            onClick={() => {
              signOut();
            }}
          >
            로그아웃
          </div>
        </div>
      ) : (
        <button
          className={styles.login_btn}
          onClick={() => {
            signIn();
          }}
        >
          로그인
        </button>
      )}
    </nav>
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
