"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth, useFirestore, useUser } from "@/firebase";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { setDoc, doc } from "firebase/firestore";

export default function SignupPage() {
  const [email, setEmail] = useState("aramis17@hotmail.com");
  const [password, setPassword] = useState("aramis123");
  const [name, setName] = useState("Aramis");
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    // If the user is loaded and exists, redirect to dashboard.
    if (!isUserLoading && user) {
      router.replace('/dashboard');
    }
  }, [user, isUserLoading, router]);

  // While loading, or if the user is already being redirected, show a loading state.
  if (isUserLoading || user) {
    return <div>Cargando...</div>;
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!firestore || !auth) {
        toast({
            variant: "destructive",
            title: "Error",
            description: "Servicios de Firebase no disponibles.",
        });
        return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const newUser = userCredential.user;

      // Create coach document
      await setDoc(doc(firestore, "coaches", newUser.uid), {
        id: newUser.uid,
        name: name,
        email: newUser.email,
      });

      // Create role document
      await setDoc(doc(firestore, "roles_coach", newUser.uid), {
        role: "coach",
      });

      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta de coach ha sido creada exitosamente. Redirigiendo...",
      });

      // The useEffect will handle the redirect once the user state is updated by onAuthStateChanged
      // but we can try to push it here for a faster redirect.
      router.push('/dashboard');

    } catch (error: any) {
        const errorCode = error.code;
        const errorMessage = error.message;
        toast({
            variant: "destructive",
            title: "Error al registrarse",
            description: errorMessage,
        });
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Crear cuenta de Coach</CardTitle>
          <CardDescription>
            Ingresa tus datos para registrarte como coach.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSignup} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input
                id="name"
                type="text"
                placeholder="Tu nombre"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="coach@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Contraseña</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Crear Cuenta
            </Button>
          </form>
           <div className="mt-4 text-center text-sm">
            ¿Ya tienes una cuenta?{" "}
            <Link href="/login" className="underline">
              Inicia Sesión
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
