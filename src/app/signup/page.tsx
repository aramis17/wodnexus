"use client";
import { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const auth = useAuth();
  const firestore = useFirestore();
  const { user, isUserLoading } = useUser();
  const router = useRouter();
  const { toast } = useToast();

  if (isUserLoading) {
    return <div>Loading...</div>
  }

  if(user) {
    router.push('/dashboard');
    return null;
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
      const user = userCredential.user;

      // Create coach document
      await setDoc(doc(firestore, "coaches", user.uid), {
        id: user.uid,
        name: name,
        email: user.email,
      });

      // Create role document
      await setDoc(doc(firestore, "roles_coach", user.uid), {
        role: "coach",
      });

      toast({
        title: "¡Cuenta creada!",
        description: "Tu cuenta de coach ha sido creada exitosamente.",
      });

      // Redirect to dashboard
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
