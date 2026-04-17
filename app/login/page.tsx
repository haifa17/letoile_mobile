import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";
import React from "react";
import LoginForm from "./components/login-form";
import Link from "next/link";

const page = () => {
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
                src="/logo.svg"
                alt="LETOILE MOBILE"
                className="object-contain w-full h-full"
              />
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent hidden sm:block">
              LETOILE MOBILE
            </span>
          </Link>
          <CardDescription>Plateforme Admin </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
      </Card>
    </main>
  );
};

export default page;
