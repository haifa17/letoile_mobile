"use client";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

export default function Contact() {
  const [openDialog, setOpenDialog] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const formData = new FormData(e.currentTarget);
      console.log("Submitting form with data:", Object.fromEntries(formData));
      setIsSubmitting(true);

      await axios.post("/api/contact", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      toast.success("Message envoyé !");
      setIsSubmitting(false);
      setOpenDialog(false);
    } catch (error) {
      console.error("Submit error:", error);
      toast.error("Erreur lors de l'envoi du message. Veuillez réessayer.");
      setIsSubmitting(false);
    }
  };
  return (
    <section
      id="contact"
      className="py-14 sm:py-32 bg-gradient-to-b from-secondary to-background relative overflow-hidden"
    >
      {/* Contact CTA */}
      <div
        className={`text-center space-y-6  ${isMounted ? "animate-fade-in-up" : "opacity-0"}`}
        style={{ animationDelay: isMounted ? "0.3s" : "0s" }}
      >
        <div className="space-y-2">
          <h3 className="text-2xl sm:text-3xl font-bold text-foreground">
            Besoin d&apos;aide supplémentaire ?
          </h3>
          <p className="text-foreground/70">
            Notre équipe est prête à vous aider 24 heures sur 24, 7 jours sur 7.
          </p>
        </div>
        <div className="flex flex-col px-4 md:px-0 sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => setOpenDialog(true)}
            className="group cursor-pointer relative w-full sm:w-auto bg-gradient-to-r from-red-500 to-red-500/80 text-white px-8 py-4 rounded-lg font-bold text-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-red-500/50 transform hover:scale-105"
          >
            <span className="relative z-10">Contacter le support</span>
            <div className="absolute inset-0 bg-red-500/50 -z-0 group-hover:scale-110 transition-transform duration-300"></div>
          </button>
          <p className="text-sm text-foreground/60">
            💬 Chat disponible 24h
          </p>
        </div>
        {openDialog && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[9999]">
            <div className="bg-white rounded-lg p-6 w-full max-w-xl">
              <h4 className="text-xl font-bold mb-4">Contactez-nous</h4>
              <form
                onSubmit={handleSubmit}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                  }
                }}
              >
                <div className="mb-4 ">
                  <label className=" text-sm capitalize font-medium text-gray-700 mb-1 flex justify-start">
                    Nom & Prénom
                  </label>
                  <input
                    name="fullName"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Jean Dupont"
                  />
                </div>
                <div className="mb-4 ">
                  <label className=" text-sm capitalize font-medium text-gray-700 mb-1 flex justify-start">
                    email
                  </label>
                  <input
                    name="email"
                    type="email"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="user@email.com"
                  />
                </div>
                <div className="mb-4 ">
                  <label className=" text-sm capitalize font-medium text-gray-700 mb-1 flex justify-start">
                    Téléphone
                  </label>
                  <input
                    name="phone"
                    type="text"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div className="mb-4">
                  <label className="flex justify-start text-sm font-medium text-gray-700 mb-1">
                    Votre message
                  </label>
                  <textarea
                    name="message"
                    className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Décrivez votre problème..."
                    rows={4}
                  />
                </div>
                <div className="flex justify-end">
                  <button
                    type="button"
                    onClick={() => setOpenDialog(false)}
                    className="mr-3 cursor-pointer border border-gray-300 px-4 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-100 transition-colors duration-300"
                  >
                    Fermer
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-primary cursor-pointer text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors duration-300"
                  >
                    {isSubmitting ? "Envoi en cours..." : "Envoyer"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
