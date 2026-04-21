"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React, { useState } from "react";
import LoginForm from "./components/login-form";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ShieldAlert } from "lucide-react";
const SECRET_CODE = process.env.NEXT_PUBLIC_LOGIN_ACCESS_CODE;
const page = () => {
  const [accessCode, setAccessCode] = useState("");
  const [granted, setGranted] = useState(false);
  const [error, setError] = useState(false);
  const handleAccess = () => {
    if (accessCode === SECRET_CODE) {
      setGranted(true);
      setError(false);
    } else {
      setError(true);
    }
  };
  if (!granted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-full max-w-sm space-y-6 p-8 border rounded-2xl shadow-sm">
          <div className="flex flex-col items-center gap-2 text-center">
            <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
              <ShieldAlert className="w-6 h-6 text-primary" />
            </div>
            <h1 className="font-heading text-xl font-bold">Accès restreint</h1>
            <p className="text-sm text-muted-foreground">
              Entrez le code d'accès pour continuer
            </p>
          </div>

          <div className="space-y-3">
            <Input
              type="password"
              placeholder="Code d'accès"
              value={accessCode}
              onChange={(e) => setAccessCode(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleAccess()}
              className={
                error ? "border-red-500 focus-visible:ring-red-500" : ""
              }
            />
            {error && (
              <p className="text-xs text-red-500">Code d'accès incorrect</p>
            )}
            <Button className="w-full" onClick={handleAccess}>
              Vérifier
            </Button>
          </div>
        </div>
      </div>
    );
  }
  return (
    <main className="min-h-screen bg-muted flex items-center justify-center p-4">
      <Card className="w-full max-w-xl">
        <CardHeader className="text-center">
          <Link
            href="/"
            className="flex flex-col justify-center items-center gap-3 group hover:opacity-80 transition-opacity"
          >
            <div className="w-20 h-20 relative flex-shrink-0 group-hover:scale-110 transition-transform">
              <img
                src="/logo.jpg"
                alt="LETOILE MOBILE"
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-red-700 to-red-700/80 bg-clip-text text-transparent hidden sm:block">
              LETOILE MOBILE
            </span>
          </Link>
          <CardDescription>Plateforme Connexion Admin </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
