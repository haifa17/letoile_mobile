export const ROWS_PER_PAGE = 10;
export const STATUS_LABELS: Record<
  string,
  { label: string; className: string }
> = {
  pending: {
    label: "En attente",
    className: "bg-yellow-100 text-yellow-700",
  },
  approved: {
    label: "Approuvé",
    className: "bg-green-100 text-green-700",
  },
  rejected: {
    label: "Rejeté",
    className: "bg-red-100 text-red-700",
  },
};
