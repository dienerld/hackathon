"use client";

import { SplashScreen } from "@/components/SplashScreen";
import { useUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";

import { useEffect } from "react";

export default function Redirect() {
  const user = useUser();

  async function fetchData() {
    console.log(user.user);

    const res = await fetch(
      `http://localhost:8080/users/${user.user?.externalId}`
    );

    const json = await res.json();
    if (!res.ok) {
      return {
        error: json,
        data: null,
      };
    }
    return {
      data: json,
      error: null,
    };
  }
  useEffect(() => {
    if (!user.user) {
      return;
    }
    fetchData().then((res) => {
      if (res.error) {
        redirect("/app?first_login=true");
      }
      redirect("/app");
    });
  }, [user.user]);

  return (
    <div className="flex flex-col justify-center items-center gap-10 py-24">
      <h1>Redirecting...</h1>
      <SplashScreen />
    </div>
  );
}
