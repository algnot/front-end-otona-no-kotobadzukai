import Head from "next/head";
import Link from "next/link";
import React from "react";

export default function Topbar({ href = "/", title = "", showBack = true }) {
  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
        />
      </Head>
      <div className="flex items-center gap-5 bg-[#0C2237] rounded-b-lg py-8 px-9">
        {showBack && (
          <Link href={href} className="material-symbols-outlined font-bold">
            arrow_back_ios
          </Link>
        )}
        <div className="text-xl">{title}</div>
      </div>
    </>
  );
}
