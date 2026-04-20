"use client";

import { useEffect, useState } from "react";
import {
  FormData as FormState,
  Step1,
  Step2,
  Step3,
  Step4,
  Step5,
  STEPS,
} from "./components/steps";
import axios from "axios";
import Link from "next/link";
import { Undo2 } from "lucide-react";
import { formSchema } from "@/lib/dtos/form-dto";

// ── Types ──────────────────────────────────────────────────────────────────

const INITIAL: FormState = {
  currentNumber: "",
  previousOperator: "",
  customerType: "",
  firstName: "",
  lastName: "",
  email: "",
  birthDate: "",
  idType: "",
  idNumber: "",
  idFile: null,
  rioCode: "",
  portabilityDate: "",
};

// ── Helpers ────────────────────────────────────────────────────────────────
function Success() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 py-10 text-center">
      <div className="w-20 h-20 rounded-full bg-red-500 text-white flex items-center justify-center text-4xl animate-bounce">
        ✓
      </div>
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Demande envoyée !
        </h2>
        <p className="text-gray-500 text-sm max-w-sm">
          Votre demande de portabilité a bien été reçue. Vous recevrez une
          confirmation par e-mail sous 24h.
        </p>
      </div>
      <p className="text-xs text-gray-400">
        Transfert effectif sous 6 jours ouvrables.
      </p>
      <Link
        href="/"
        className="text-red-500 hover:text-red-700 font-medium flex items-center gap-1"
      >
        Retour à l'accueil <Undo2 size={20} />
      </Link>
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function FormPage() {
  const [step, setStep] = useState(0); // 0-indexed
  const [data, setData] = useState<FormState>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const update = (partial: Partial<FormState>) =>
    setData((d) => ({ ...d, ...partial }));

  const canNext = () => {
    if (step === 0)
      return data.currentNumber && data.previousOperator && data.customerType;
    if (step === 1)
      return data.firstName && data.lastName && data.email && data.birthDate;
    if (step === 2)
      return (
        data.idType && data.idNumber && data.idFile && data.idFile.length > 0
      );
    if (step === 3) return data.rioCode && data.portabilityDate;
    return true;
  };
  const validateForm = () => {
    const result = formSchema.safeParse(data);

    if (!result.success) {
      console.log(result.error.format());
      return result.error.format();
    }

    return null;
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors) {
      alert("Veuillez corriger les erreurs du formulaire");
      return;
    }
    if (isSubmitting) return; // ← prevent double submit
    setIsSubmitting(true);

    try {
      const formData = new FormData();
      console.log("Submitting form with data:", data);
      Object.entries(data).forEach(([key, value]) => {
        if (key === "idFile" && Array.isArray(value)) {
          value.forEach((file) => formData.append("idFile", file)); // ← append each file
        } else if (value instanceof File) {
          formData.append(key, value);
        } else {
          formData.append(key, value as string);
        }
      });

      await axios.post("/api/form", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setSubmitted(true);
      setIsSubmitting(false);
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitting(false);
    }
  };

  const progress = ((step + 1) / STEPS.length) * 100;

  if (submitted) {
    return (
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
        <div className="w-full max-w-xl bg-white rounded-3xl shadow-sm border border-gray-100 p-8">
          <Success />
        </div>
      </main>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
        <div className="w-full max-w-2xl">
          <div
            className={`space-y-4 mb-10 text-center ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
          >
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground  text-balance">
              Formulaire de portabilité
            </h2>
            <p className="text-base text-primary max-w-3xl leading-relaxed">
              Gardez votre numéro et rejoignez Letoile Mobile
            </p>
          </div>
          {/* Card */}
          <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
            {/* Progress bar */}
            <div className="h-1 bg-gray-100">
              <div
                className="h-full bg-red-500 transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>

            {/* Steps indicator */}
            <div className="px-8 pt-8 pb-6">
              <div className="flex flex-wrap items-start justify-between relative">
                {/* connector line */}
                <div className="absolute top-4 left-0 right-0 h-px bg-gray-200 -z-0" />
                {STEPS.map((label, i) => {
                  const done = i < step;
                  const active = i === step;
                  return (
                    <div
                      key={label}
                      className="flex flex-col items-center gap-2 z-10"
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 transition-all duration-300
                      ${
                        done
                          ? "bg-red-500 border-red-500 text-white"
                          : active
                            ? "bg-red-500 border-red-500 text-white scale-110"
                            : "bg-white border-gray-300 text-gray-400"
                      }`}
                      >
                        {done ? "✓" : i + 1}
                      </div>
                      <span
                        className={`text-xs text-center max-w-[72px] leading-tight transition-colors
                      ${active ? "text-black font-semibold" : done ? "text-gray-500" : "text-gray-300"}`}
                      >
                        {label}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Form content */}
            <div className="px-8 pb-8">
              <h2 className="text-xl font-bold text-gray-900 mb-6">
                {STEPS[step]}
              </h2>

              {step === 0 && <Step1 data={data} update={update} />}
              {step === 1 && <Step2 data={data} update={update} />}
              {step === 2 && <Step3 data={data} update={update} />}
              {step === 3 && <Step4 data={data} update={update} />}
              {step === 4 && <Step5 data={data} />}

              {/* Navigation */}
              <div className="flex items-center justify-between mt-8">
                <button
                  type="button"
                  onClick={() => setStep((s) => s - 1)}
                  disabled={step === 0}
                  className="flex items-center gap-1.5 text-gray-500 hover:text-gray-900 disabled:opacity-0 transition-colors text-sm font-medium"
                >
                  ‹ Précédent
                </button>

                {step < STEPS.length - 1 ? (
                  <button
                    type="button"
                    onClick={() => setStep((s) => s + 1)}
                    disabled={!canNext()}
                    className="px-8 py-3.5 bg-red-500 text-white rounded-2xl font-semibold text-sm
                    hover:bg-red-800 cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                  >
                    Suivant
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="px-8 py-3.5 cursor-pointer bg-red-500 text-white rounded-2xl font-semibold text-sm hover:bg-red-800 transition-all"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Soumettre"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Note */}
          <p className="text-center text-xs text-gray-400 mt-4">
            Tous les champs marqués d'un{" "}
            <span className="text-black font-bold">*</span> sont obligatoires.
            Merci de préparer votre CIN (recto/verso) et le code RIO.
          </p>
        </div>
      </main>
    </form>
  );
}
