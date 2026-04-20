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

const fetchForms = async () => {
  const res = await axios.get("/api/contact");
  return res.data;
};

const FormsPage = () => {
  const { data: forms = [], isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: fetchForms,
  });

  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Formulaires de contact soumis
      </h1>

      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom complet</TableHead>
              <TableHead>Numéro</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Message</TableHead>
              <TableHead>Date création</TableHead>
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
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default FormsPage;
