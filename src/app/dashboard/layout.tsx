import type { ReactNode } from "react";
import Link from "next/link";
import { Dumbbell, Users } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarInset,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/firebase";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import { CoachGuard } from "@/components/auth/coach-guard";

function DashboardLayout({ children }: { children: ReactNode }) {
  const auth = useAuth();
  const router = useRouter();

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/login");
  };

  return (
    <SidebarProvider>
      <Sidebar>
        <SidebarHeader>
          <div className="flex items-center gap-2">
            <Dumbbell className="size-6 text-primary" />
            <h1 className="text-xl font-semibold">WODNexus</h1>
          </div>
        </SidebarHeader>
        <SidebarContent>
          <SidebarMenu>
            <SidebarMenuItem>
              <Link href="/dashboard/wods" legacyBehavior passHref>
                <SidebarMenuButton tooltip={{ children: "WODs" }}>
                  <Dumbbell />
                  <span>WODs</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <Link href="/dashboard/athletes" legacyBehavior passHref>
                <SidebarMenuButton tooltip={{ children: "Atletas" }}>
                  <Users />
                  <span>Atletas</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarContent>
      </Sidebar>
      <SidebarInset>
        <header className="sticky top-0 z-10 flex h-14 items-center justify-between gap-4 border-b bg-background px-4 sm:px-6">
          <SidebarTrigger className="md:hidden" />
          <div className="flex-1">
            {/* Puedes agregar breadcrumbs o título de la página aquí si lo deseas */}
          </div>
          <Button onClick={handleLogout} variant="outline">
            Cerrar Sesión
          </Button>
        </header>
        <main className="flex-1 p-4 sm:p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}

export default function GuardedDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <CoachGuard>
      <DashboardLayout>{children}</DashboardLayout>
    </CoachGuard>
  );
}
