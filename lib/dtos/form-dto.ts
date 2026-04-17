import { z } from "zod";

export const formSchema = z.object({
  currentNumber: z.string().min(8, "Numéro invalide"),
  previousOperator: z.string().min(1, "Opérateur requis"),
  customerType: z.string().min(1, "Type client requis"),

  firstName: z.string().min(2, "Prénom requis"),
  lastName: z.string().min(2, "Nom requis"),

  email: z.string().email("Email invalide"),

  birthDate: z.string().refine((val) => {
    const date = new Date(val);
    const age = new Date().getFullYear() - date.getFullYear();
    return age >= 18;
  }, "Vous devez avoir 18 ans"),

  idType: z.string().min(1),
  idNumber: z.string().regex(/^\d{8,}$/, "Minimum 8 chiffres"),

  idFile: z.array(z.any()).min(1, "Fichier requis"),

  rioCode: z.string().min(1, "Code RIO requis"),

  portabilityDate: z.string(),
});