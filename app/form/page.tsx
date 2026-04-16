"use client";

import { useEffect, useState } from "react";
import { FormData, Step1, Step2, Step3, Step4, Step5, STEPS } from "./components/steps";

// ── Types ──────────────────────────────────────────────────────────────────

const INITIAL: FormData = {
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
    </div>
  );
}

// ── Main Page ──────────────────────────────────────────────────────────────
export default function FormPage() {
  const [step, setStep] = useState(0); // 0-indexed
  const [data, setData] = useState<FormData>(INITIAL);
  const [submitted, setSubmitted] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const update = (partial: Partial<FormData>) =>
    setData((d) => ({ ...d, ...partial }));

  const canNext = () => {
    if (step === 0)
      return data.currentNumber && data.previousOperator && data.customerType;
    if (step === 1)
      return data.firstName && data.lastName && data.email && data.birthDate;
    if (step === 2) return data.idType && data.idNumber;
    if (step === 3) return data.rioCode && data.portabilityDate;
    return true;
  };

  const handleSubmit = () => setSubmitted(true);

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
            <div className="flex items-start justify-between relative">
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
                    hover:bg-red-800 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
                >
                  Suivant
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="px-8 py-3.5 bg-red-500 text-white rounded-2xl font-semibold text-sm hover:bg-red-800 transition-all"
                >
                  Soumettre
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
  );
}
