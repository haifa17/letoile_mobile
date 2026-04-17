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
import Link from "next/link";
type FormSubmission = {
  id: string;

  currentNumber: string;
  previousOperator: string;
  customerType: string;

  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;

  idType: string;
  idNumber: string;
  idFileUrl: string[];

  rioCode: string;
  portabilityDate: string;

  status: string;
  createdAt: string;
  updatedAt: string;
};
const fetchForms = async () => {
  const res = await axios.get("/api/form");
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
      <h1 className="text-xl font-semibold mb-4">Formulaires de portablité soumis</h1>

      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom complet</TableHead>
              <TableHead>Numéro</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Date de naissance</TableHead>

              <TableHead>Type pièce</TableHead>
              <TableHead>Numéro pièce</TableHead>
              <TableHead>Documents</TableHead>

              <TableHead>Opérateur</TableHead>
              <TableHead>Type client</TableHead>

              <TableHead>Code RIO</TableHead>
              <TableHead>Date portabilité</TableHead>

              <TableHead>Statut</TableHead>
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
              forms.map((form: FormSubmission) => (
                <TableRow key={form.id}>
                  <TableCell>
                    {form.firstName} {form.lastName}
                  </TableCell>

                  <TableCell>{form.currentNumber}</TableCell>

                  <TableCell>{form.email}</TableCell>

                  <TableCell>
                    {new Date(form.birthDate).toLocaleDateString("fr-FR")}
                  </TableCell>

                  <TableCell>{form.idType}</TableCell>

                  <TableCell>{form.idNumber}</TableCell>

                  <TableCell>
                    <div className="flex gap-2">
                      {form.idFileUrl?.map((url, i) => (
                        <Link key={i} href={url} target="_blank">
                          <img
                            src={url}
                            alt="document"
                            className="w-10 h-10 object-cover rounded border"
                          />
                        </Link>
                      ))}
                    </div>
                  </TableCell>

                  <TableCell>{form.previousOperator}</TableCell>

                  <TableCell>{form.customerType}</TableCell>

                  <TableCell>{form.rioCode}</TableCell>

                  <TableCell>
                    {new Date(form.portabilityDate).toLocaleDateString("fr-FR")}
                  </TableCell>

                  <TableCell>
                    <span className="px-2 py-1 text-xs rounded bg-yellow-100 text-yellow-700">
                      {form.status === "pending" ? "En attente" : "Validé"}
                    </span>
                  </TableCell>

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
