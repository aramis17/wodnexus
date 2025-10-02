"use client";

import { ReactNode, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser, useFirestore, useDoc, useMemoFirebase } from "@/firebase";
import { doc } from "firebase/firestore";

export function CoachGuard({ children }: { children: ReactNode }) {
  const { user, isUserLoading } = useUser();
  const firestore = useFirestore();
  const router = useRouter();

  const coachRoleRef = useMemoFirebase(
    () => (user ? doc(firestore, "roles_coach", user.uid) : null),
    [user, firestore]
  );
  
  const { data: coachRole, isLoading: isRoleLoading } = useDoc(coachRoleRef);

  const isLoading = isUserLoading || isRoleLoading;

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        // No user, redirect to login
        router.replace("/login");
      } else if (!coachRole) {
        // User exists, but is not a coach, redirect to home
        console.log("Acceso denegado: el usuario no tiene el rol de coach.");
        router.replace("/");
      }
    }
  }, [user, coachRole, isLoading, router]);

  if (isLoading || !user || !coachRole) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Verificando acceso...</p>
      </div>
    );
  }

  return <>{children}</>;
}
