"use client";

import React from "react";
import { useForm } from "react-hook-form";

type User = {
  id: number;
  name: string;
  role: string;
};

function Login() {
  const { register, handleSubmit } = useForm();
  const roles = ["admin", "user"];
  const [user, setUser] = React.useState<User | null>(null);

  const onSubmit = async (data: any) => {
    const response = await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify(data),
    });
    const user = await response.json();
    setUser(user);
  };

  return (
    <>
      <h2>ログイン</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">ユーザー名</label>
          <input
            id="name"
            type="text"
            {...register("name")}
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input
            id="password"
            type="password"
            {...register("password")}
          />
        </div>
        <div>
          <label htmlFor="role">権限</label>
          <select
            id="role"
            {...register("role")}
          >
            {roles.map((role) => (
              <option
                key={role}
                value={role}
              >
                {role}
              </option>
            ))}
          </select>
        </div>
        <button type="submit">新規登録</button>
      </form>
      {user ? <p>ようこそ、{user.name}さん</p> : null}
    </>
  );
}

export default Login;
