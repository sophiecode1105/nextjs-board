"use client";

import { authOptions } from "../../../pages/api/auth/[...nextauth]";
import ListItem from "./listItem";
import type { WithId, Document } from "mongodb";
import { useEffect, useState } from "react";
import { getServerSideProps } from "next/dist/build/templates/pages";
import { getSession } from "next-auth/react";
import { Session } from "next-auth";

export const dynamic = "force-dynamic";

export default function List() {
  const [session, setSession] = useState<Session | null>(null);
  const [result, setResult] = useState<WithId<Document>[]>([]);

  useEffect(() => {
    async function getResutl() {
      const response = await fetch("/api/post/getlist", {
        method: "GET",
        cache: "no-store",
      });
      const resData = await response.json();
      setResult(resData.data.reverse());
    }
    getResutl();
    async function retrieveSession() {
      const session = await getSession();
      setSession(session);
    }
    retrieveSession();
  }, []);

  return (
    <div className="list-bg">
      <ListItem email={session?.user?.email} result={result} />
    </div>
  );
}
