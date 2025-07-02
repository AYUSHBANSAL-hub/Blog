"use client";
import { useEffect, useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "../lib/store";
import { setUser } from "@/lib/features/UserSlice";

export default function UserProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  useEffect(() => {
    const email = localStorage.getItem('email');
    if (!email) return;

    const fetchUser = async () => {
        const encodedEmail = encodeURIComponent(email);
      try {
        const res = await fetch(`/api/users/${encodedEmail}`);
        if (!res.ok) return;
        const data = await res.json();
        storeRef.current?.dispatch(setUser({id: data.user.user_id, fullName: data.user.fullName, email:data.user.email, phone: data.user.phone, role: data?.user.role || 'user'}));
      } catch (err) {
        console.error('User fetch error:', err);
      }
    };

    fetchUser();
  }, []);

  return <Provider store={storeRef.current}>{children}</Provider>;
}