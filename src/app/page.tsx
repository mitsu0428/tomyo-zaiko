"use client";

import React from "react";
import styles from "./page.module.css";
import Link from "next/link";
import InventoryList from "./components/InventoryList";
import InventoryDelete from "./components/InventoryDelete";
import InventoryAdd from "./components/InventoryAdd";

export interface User {
  id: number;
  name: string;
}

export default function Home() {
  const [user, setUser] = React.useState<User | null>(null);

  React.useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch("/api/users");
      const users = await response.json();
      setUser(users);
    };
    fetchUsers();
  }, []);

  return (
    <main className={styles.main}>
      <div>
        <h1>TOMYO 在庫管理</h1>
        <p>このサイトは、TOMYOの在庫を管理するためのサイトです。</p>
        {user ? <p>ようこそ、{user.name}さん</p> : <p>ようこそ、ゲストさん</p>}
        {user ? null : (
          <>
            <Link href="/login">新規登録</Link>
            <br />
            <Link href="/login">ログイン</Link>
          </>
        )}
      </div>
      <div>
        <InventoryList />
        <InventoryAdd />
        <InventoryDelete />
      </div>
    </main>
  );
}
