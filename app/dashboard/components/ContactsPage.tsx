"use client";

import axios from "axios";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useQuery } from "@tanstack/react-query";
import { ContactFormSubmission } from "@prisma/client";
import { useState } from "react";
import { Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const fetchForms = async () => {
  const res = await axios.get("/api/contact");
  return res.data;
};
const fetchFormById = async (id: string) => {
  const res = await axios.get(`/api/contact/${id}`);
  return res.data;
};
const FormsPage = () => {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  const { data: forms = [], isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: fetchForms,
  });
  const { data: selectedForm, isLoading: isLoadingDetail } = useQuery({
    queryKey: ["contacts", selectedId],
    queryFn: () => fetchFormById(selectedId!),
    enabled: !!selectedId,
  });
  const handleView = (id: string) => {
    setSelectedId(id);
    setOpen(true);
  };

  if (isLoading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-heading font-bold  mb-10">
        Formulaires de contact soumis
      </h1>

      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-red-700/60 font-heading">
              <TableHead>Nom complet</TableHead>
              <TableHead>Numéro</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date création</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {forms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center text-gray-500">
                  No submissions yet
                </TableCell>
              </TableRow>
            ) : (
              forms.map((form: ContactFormSubmission) => (
                <TableRow key={form.id}>
                  <TableCell>{form.fullName}</TableCell>
                  <TableCell>{form.phone}</TableCell>
                  <TableCell>{form.email}</TableCell>
                  <TableCell>{form.message}</TableCell>

                  <TableCell>
                    {new Date(form.createdAt).toLocaleDateString("fr-FR")}
                  </TableCell>
                  <TableCell>
                    <button
                      onClick={() => handleView(form.id)}
                      className="flex cursor-pointer items-center gap-1.5 px-3 py-1.5 text-xs font-extrabold rounded-md border hover:bg-muted transition"
                    >
                      <Eye size={15} />
                    </button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="font-heading">
              Détail du formulaire
            </DialogTitle>
          </DialogHeader>

          {isLoadingDetail ? (
            <p className="text-sm text-muted-foreground py-4">Chargement...</p>
          ) : selectedForm ? (
            <div className="space-y-4 text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-muted-foreground text-xs mb-1">
                    Nom complet
                  </p>
                  <p className="font-medium">{selectedForm.fullName}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Numéro</p>
                  <p className="font-medium">{selectedForm.phone}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">Email</p>
                  <p className="font-medium">{selectedForm.email}</p>
                </div>
                <div>
                  <p className="text-muted-foreground text-xs mb-1">
                    Date de soumission
                  </p>
                  <p className="font-medium">
                    {new Date(selectedForm.createdAt).toLocaleDateString(
                      "fr-FR",
                      {
                        day: "2-digit",
                        month: "long",
                        year: "numeric",
                      },
                    )}
                  </p>
                </div>
              </div>

              <div>
                <p className="text-muted-foreground text-xs mb-1">Message</p>
                <textarea
                  className="font-medium w-full whitespace-pre-wrap rounded-lg bg-muted p-3 resize-none outline-none"
                  readOnly
                  value={selectedForm.message}
                  rows={5}
                />
              </div>
            </div>
          ) : null}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FormsPage;
