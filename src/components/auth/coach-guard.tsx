"use client";

import { useUser, useDoc, useFirestore, useMemoFirebase } from "@/firebase";
import { useRouter } from "next/navigation";
import { doc } from "firebase/firestore";
import { Skeleton } from "@/components/ui/skeleton";

export function CoachGuard({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const firestore = useFirestore();

  const coachRoleRef = useMemoFirebase(() => {
    if (!firestore || !user) return null;
    return doc(firestore, `roles_coach/${user.uid}`);
  }, [firestore, user]);

  const { data: coachRole, isLoading: isRoleLoading } = useDoc(coachRoleRef);

  const isLoading = isUserLoading || isRoleLoading;

  if (isLoading) {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <Skeleton className="h-8 w-64 mb-4" />
            <Skeleton className="h-4 w-80" />
        </div>
    );
  }

  if (!user) {
    router.replace("/login");
    return null;
  }
  
  if (!coachRole) {
    router.replace("/");
    // You can show an access denied message here
    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold text-destructive">Acceso Denegado</h1>
            <p className="text-muted-foreground">No tienes permisos para acceder a esta página.</p>
        </div>
    );
  }

  return <>{children}</>;
}
