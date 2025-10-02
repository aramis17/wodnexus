"use client";

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/dashboard/wods');
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center">
        <p>Redirigiendo...</p>
      </div>
  );
}
