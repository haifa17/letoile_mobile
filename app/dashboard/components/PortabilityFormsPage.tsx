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

import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { FormSubmission } from "@prisma/client";
import { ChevronLeft, ChevronRight, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ROWS_PER_PAGE, STATUS_LABELS } from "../constants";
import { Input } from "@/components/ui/input";

const fetchForms = async () => {
  const res = await axios.get("/api/form");
  return res.data;
};

const updateStatus = async ({ id, status }: { id: string; status: string }) => {
  const res = await axios.patch(`/api/form/${id}`, { status });
  return res.data;
};
const FormsPage = () => {
  const queryClient = useQueryClient();

  const { data: forms = [], isLoading } = useQuery({
    queryKey: ["forms"],
    queryFn: fetchForms,
  });
  const { mutate: changeStatus, isPending: isUpdating } = useMutation({
    mutationFn: updateStatus,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["forms"] }),
  });
  const [currentPage, setCurrentPage] = useState(1);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const filtered = useMemo(() => {
    return forms.filter((form: FormSubmission) => {
      const fullName = `${form.firstName} ${form.lastName}`.toLowerCase();
      const matchesSearch =
        search === "" ||
        fullName.includes(search.toLowerCase()) ||
        form.currentNumber.includes(search);

      const matchesStatus =
        statusFilter === "all" || form.status === statusFilter;

      const createdAt = new Date(form.createdAt);
      const matchesFrom = dateFrom === "" || createdAt >= new Date(dateFrom);
      const matchesTo =
        dateTo === "" || createdAt <= new Date(dateTo + "T23:59:59");

      return matchesSearch && matchesStatus && matchesFrom && matchesTo;
    });
  }, [forms, search, statusFilter, dateFrom, dateTo]);
  const totalPages = Math.ceil(filtered.length / ROWS_PER_PAGE);
  const paginatedForms = filtered.slice(
    (currentPage - 1) * ROWS_PER_PAGE,
    currentPage * ROWS_PER_PAGE,
  );
  const resetFilters = () => {
    setSearch("");
    setStatusFilter("all");
    setDateFrom("");
    setDateTo("");
    setCurrentPage(1);
  };

  const hasActiveFilters =
    search !== "" || statusFilter !== "all" || dateFrom !== "" || dateTo !== "";
  if (isLoading) return <p className="p-6">Chargement...</p>;

  return (
    <div className="">
      <h1 className="text-2xl font-heading font-bold  mb-10">
        Formulaires de portablité soumis
      </h1>
      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-6">
        {/* Search */}
        <div className="relative flex-1 min-w-[220px]">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input
            placeholder="Rechercher par nom ou numéro..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
            className="pl-9"
          />
        </div>

        {/* Status filter */}
        <Select
          value={statusFilter}
          onValueChange={(v) => {
            setStatusFilter(v);
            setCurrentPage(1);
          }}
        >
          <SelectTrigger className="w-40 focus:ring-0 focus-visible:ring-0">
            <SelectValue placeholder="Statut" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Tous les statuts</SelectItem>
            <SelectItem value="pending">En attente</SelectItem>
            <SelectItem value="approved">Approuvé</SelectItem>
            <SelectItem value="rejected">Rejeté</SelectItem>
          </SelectContent>
        </Select>

        {/* Date from */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Du
          </span>
          <Input
            type="date"
            value={dateFrom}
            onChange={(e) => {
              setDateFrom(e.target.value);
              setCurrentPage(1);
            }}
            className="w-40"
          />
        </div>

        {/* Date to */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground whitespace-nowrap">
            Au
          </span>
          <Input
            type="date"
            value={dateTo}
            onChange={(e) => {
              setDateTo(e.target.value);
              setCurrentPage(1);
            }}
            className="w-40"
          />
        </div>

        {/* Reset */}
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="flex items-center gap-1.5 px-3 py-2 text-sm text-muted-foreground border rounded-md hover:bg-muted transition"
          >
            <X size={14} />
            Réinitialiser
          </button>
        )}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-3">
        {filtered.length} résultat{filtered.length !== 1 ? "s" : ""}
        {hasActiveFilters && " trouvé(s)"}
      </p>
      <div className="border rounded-xl overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-red-700/60 font-heading">
              <TableHead >Nom complet</TableHead>
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

                  {/* Status dropdown */}
                  <TableCell>
                    <Select
                      defaultValue={form.status}
                      disabled={isUpdating}
                      onValueChange={(value) =>
                        changeStatus({ id: form.id, status: value })
                      }
                    >
                      <SelectTrigger
                        className={`w-36 text-xs font-extrabold font-heading border-0 ${STATUS_LABELS[form.status]?.className ?? "bg-yellow-100 text-yellow-700 "}`}
                      >
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">
                          <span className="text-yellow-700">En attente</span>
                        </SelectItem>
                        <SelectItem value="approved">
                          <span className="text-green-700">Approuvé</span>
                        </SelectItem>
                        <SelectItem value="rejected">
                          <span className="text-red-700">Rejeté</span>
                        </SelectItem>
                      </SelectContent>
                    </Select>
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
      {filtered.length > ROWS_PER_PAGE && (
        <div className="flex items-center justify-between mt-4 text-sm text-gray-600">
          <p>
            Affichage{" "}
            <span className="font-medium">
              {(currentPage - 1) * ROWS_PER_PAGE + 1}
            </span>{" "}
            -{" "}
            <span className="font-medium">
              {Math.min(currentPage * ROWS_PER_PAGE, filtered.length)}
            </span>{" "}
            sur <span className="font-medium">{filtered.length}</span> résultats
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
