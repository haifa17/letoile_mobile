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
import { FormSubmission } from "@prisma/client";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const fetchForms = async () => {
  const res = await axios.get("/api/form");
  return res.data;
};
const ROWS_PER_PAGE = 10;

const FormsPage = () => {
  const { data: forms = [], isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: fetchForms,
  });
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(forms.length / ROWS_PER_PAGE);
  const paginatedForms = forms.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );
  if (isLoading) {
    return <p className="p-6">Loading...</p>;
  }

  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">
        Formulaires de portablité soumis
      </h1>

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
            {paginatedForms.length === 0 ? (
              <TableRow>
                <TableCell colSpan={13} className="text-center text-gray-500">
                  No submissions yet
                </TableCell>
              </TableRow>
            ) : (
              paginatedForms.map((form: FormSubmission) => (
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
      {/* Pagination — only shown when rows exceed 10 */}
      {forms.length > ROWS_PER_PAGE && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <p>
            Affichage{" "}
            <span className="font-medium">
              {(currentPage - 1) * ROWS_PER_PAGE + 1}
            </span>{" "}
            -{" "}
            <span className="font-medium">
              {Math.min(currentPage * ROWS_PER_PAGE, forms.length)}
            </span>{" "}
            sur <span className="font-medium">{forms.length}</span> résultats
          </p>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
              disabled={currentPage === 1}
              className="p-1.5 rounded border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`w-8 h-8 rounded border text-sm font-medium transition ${
                  currentPage === page
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-gray-100"
                }`}
              >
                {page}
              </button>
            ))}

            <button
              onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
              disabled={currentPage === totalPages}
              className="p-1.5 rounded border hover:bg-gray-100 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FormsPage;
