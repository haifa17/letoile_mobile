"use client";

import axios from "axios";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User, Mail, CalendarDays, KeyRound, ShieldCheck } from "lucide-react";
import { toast } from "react-toastify";

const fetchMe = async () => {
  const res = await axios.get("/api/me");
  return res.data;
};

const resetPassword = async (data: {
  currentPassword: string;
  newPassword: string;
}) => {
  const res = await axios.post("/api/auth/reset-password", data);
  return res.data;
};

const InfoPage = () => {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { data: user, isLoading } = useQuery({
    queryKey: ["me"],
    queryFn: fetchMe,
  });

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: resetPassword,
    onSuccess: () => {
      toast.success("Mot de passe mis à jour avec succès");
      setOpen(false);
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
    },
    onError: (error: any) => {
      toast.error(error.response?.data?.error ?? "Une erreur est survenue");
    },
  });

  const handleSubmit = () => {
    if (newPassword !== confirmPassword) {
      toast.error("Les mots de passe ne correspondent pas");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("Le mot de passe doit contenir au moins 6 caractères");
      return;
    }
    changePassword({ currentPassword, newPassword });
  };

  if (isLoading) return <p className="p-6">Chargement...</p>;

  return (
    <div className=" space-y-6">
      <h1 className="text-2xl font-heading font-bold">Mon compte</h1>

      {/* User info card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Informations personnelles
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">

          {/* Avatar */}
          <div className="flex items-center gap-4 pb-4 border-b">
            <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="w-6 h-6 text-primary" />
            </div>
            <div>
              <p className="font-semibold text-foreground">{user?.email}</p>
              <p className="text-xs text-muted-foreground">Administrateur</p>
            </div>
          </div>

          {/* Details */}
          <div className="space-y-3 text-sm">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                <Mail className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Adresse email</p>
                <p className="font-medium">{user?.email}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                <ShieldCheck className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Identifiant</p>
                <p className="font-medium font-mono text-xs">{user?.id}</p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center shrink-0">
                <CalendarDays className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-xs text-muted-foreground">Membre depuis</p>
                <p className="font-medium">
                  {new Date(user?.createdAt).toLocaleDateString("fr-FR", {
                    day: "2-digit",
                    month: "long",
                    year: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Security card */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold text-foreground">
            Sécurité
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-md bg-muted flex items-center justify-center">
                <KeyRound className="w-4 h-4 text-muted-foreground" />
              </div>
              <div>
                <p className="text-sm font-medium">Mot de passe</p>
                <p className="text-xs text-muted-foreground">
                  Modifier votre mot de passe de connexion
                </p>
              </div>
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button className="cursor-pointer" variant="outline" size="sm">
                  Réinitialiser
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle className="font-heading">
                    Réinitialiser le mot de passe
                  </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 pt-2">
                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">Mot de passe actuel</p>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">Nouveau mot de passe</p>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                    />
                  </div>

                  <div className="space-y-1.5">
                    <p className="text-xs text-muted-foreground">Confirmer le mot de passe</p>
                    <Input
                      type="password"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <Button
                    className="w-full cursor-pointer"
                    onClick={handleSubmit}
                    disabled={isPending || !currentPassword || !newPassword || !confirmPassword}
                  >
                    {isPending ? "Mise à jour..." : "Mettre à jour"}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InfoPage;