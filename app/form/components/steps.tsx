// ── Steps ──────────────────────────────────────────────────────────────────
export interface FormData {
  // Step 1 – Informations de base
  currentNumber: string;
  previousOperator: string;
  customerType: string;
  // Step 2 – Informations personnelles
  firstName: string;
  lastName: string;
  email: string;
  birthDate: string;
  // Step 3 – Pièce d'identité
  idType: string;
  idNumber: string;
  idFile: File[] | null;
  // Step 4 – Portabilité
  rioCode: string;
  portabilityDate: string;
}

export const STEPS = [
  "Informations de base",
  "Informations personnelles",
  "Pièce d'identité",
  "Portabilité",
  "Confirmation",
];

function RadioCard({
  label,
  value,
  selected,
  onChange,
}: {
  label: string;
  value: string;
  selected: string;
  onChange: (v: string) => void;
}) {
  const active = selected === value;
  return (
    <button
      type="button"
      onClick={() => onChange(value)}
      className={`flex items-center gap-3 w-full px-5 py-4 rounded-2xl border-2 transition-all duration-200 text-left
        ${
          active
            ? "border-red-400 bg-red-400 text-white"
            : "border-gray-200 bg-white text-gray-800 hover:border-gray-400"
        }`}
    >
      <span
        className={`w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0
        ${active ? "border-white" : "border-gray-400"}`}
      >
        {active && <span className="w-2.5 h-2.5 rounded-full bg-white" />}
      </span>
      <span className="font-medium text-base">{label}</span>
    </button>
  );
}

function Input({
  label,
  required,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-sm font-semibold text-gray-700">
        {label} {required && <span className="text-red-500">*</span>}
      </label>
      <input
        {...props}
        className="w-full px-4 py-3.5 rounded-2xl border-2 border-gray-200 bg-white text-gray-900
          placeholder:text-gray-400 focus:outline-none focus:border-black transition-colors text-base"
      />
    </div>
  );
}

export function Step1({
  data,
  update,
}: {
  data: FormData;
  update: (d: Partial<FormData>) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <Input
        label="Votre numéro actuel"
        required
        type="tel"
        placeholder="Entrez le numéro que vous souhaitez garder"
        value={data.currentNumber}
        onChange={(e) => update({ currentNumber: e.target.value })}
      />
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Opérateur précédent <span className="text-black">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Orange", "Ooredoo", "Tunisie Telecom", "MVNO"].map((op) => (
            <RadioCard
              key={op}
              label={op}
              value={op}
              selected={data.previousOperator}
              onChange={(v) => update({ previousOperator: v })}
            />
          ))}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Vous êtes <span className="text-black">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Particulier", "Entreprise"].map((type) => (
            <RadioCard
              key={type}
              label={type}
              value={type}
              selected={data.customerType}
              onChange={(v) => update({ customerType: v })}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export function Step2({
  data,
  update,
}: {
  data: FormData;
  update: (d: Partial<FormData>) => void;
}) {
  const today = new Date();
  const minAgeDate = new Date(
    today.getFullYear() - 18,
    today.getMonth(),
    today.getDate(),
  )
    .toISOString()
    .split("T")[0];
  return (
    <div className="flex flex-col gap-5">
      <div className="grid grid-cols-2 gap-4">
        <Input
          label="Prénom"
          required
          placeholder="Votre prénom"
          value={data.firstName}
          onChange={(e) => update({ firstName: e.target.value })}
        />
        <Input
          label="Nom"
          required
          placeholder="Votre nom"
          value={data.lastName}
          onChange={(e) => update({ lastName: e.target.value })}
        />
      </div>
      <Input
        label="Adresse e-mail"
        required
        type="email"
        placeholder="votre@email.com"
        value={data.email}
        onChange={(e) => update({ email: e.target.value })}
      />
      <Input
        label="Date de naissance(doit avoir au moins 18 ans)"
        required
        type="date"
        max={minAgeDate}
        value={data.birthDate}
        onChange={(e) => update({ birthDate: e.target.value })}
      />
    </div>
  );
}

export function Step3({
  data,
  update,
}: {
  data: FormData;
  update: (d: Partial<FormData>) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2">
        <label className="text-sm font-semibold text-gray-700">
          Type de pièce d'identité <span className="text-black">*</span>
        </label>
        <div className="grid grid-cols-2 gap-3">
          {["Carte d'identité", "Passeport"].map((t) => (
            <RadioCard
              key={t}
              label={t}
              value={t}
              selected={data.idType}
              onChange={(v) => update({ idType: v })}
            />
          ))}
        </div>
      </div>
      <Input
        label="Numéro de la pièce"
        required
        placeholder="Ex: 12345678"
        pattern="\d{8,}"
        minLength={8}
        value={data.idNumber}
        onChange={(e) => update({ idNumber: e.target.value })}
      />
      <div className="flex flex-col gap-1.5">
        <label className="text-sm font-semibold text-gray-700">
          Document (recto/verso) <span className="text-black">*</span>
        </label>
        <label className="flex flex-col items-center justify-center gap-2 w-full h-36 border-2 border-dashed border-gray-300 rounded-2xl cursor-pointer hover:border-black transition-colors bg-gray-50">
          <span className="text-3xl">📎</span>
          <span className="text-sm text-gray-500 text-center px-4">
            {data.idFile && data.idFile.length > 0
              ? `${data.idFile.length} fichier(s) sélectionné(s): ${data.idFile.map((f) => f.name).join(", ")}`
              : "Cliquez pour téléverser recto et verso (2 fichiers max)"}
          </span>
          <input
            type="file"
            className="hidden"
            accept="image/*,.pdf"
            multiple // ← allow multiple files
            onChange={(e) => {
              const files = Array.from(e.target.files ?? []);
              if (files.length > 2) {
                alert("Vous pouvez téléverser au maximum 2 fichiers.");
                return;
              }
              update({ idFile: files });
            }}
          />
        </label>
        {/* Preview selected files */}
        {data.idFile && data.idFile.length > 0 && (
          <div className="flex flex-col gap-2 mt-2">
            {data.idFile.map((file, i) => (
              <div
                key={i}
                className="flex items-center justify-between px-4 py-2 bg-gray-50 border border-gray-200 rounded-xl text-sm"
              >
                <span className="text-gray-700 truncate max-w-[80%]">
                  📄 {file.name}
                </span>
                <button
                  type="button"
                  onClick={() =>
                    update({
                      idFile: data.idFile!.filter((_, j) => j !== i),
                    })
                  }
                  className="text-red-400 hover:text-red-600 font-bold ml-2"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export function Step4({
  data,
  update,
}: {
  data: FormData;
  update: (d: Partial<FormData>) => void;
}) {
  return (
    <div className="flex flex-col gap-6">
      <div className="bg-gray-50 border border-gray-200 rounded-2xl p-5">
        <p className="text-sm text-gray-600">
          Pour obtenir votre code RIO, composez{" "}
          <span className="font-bold text-black">*172#</span> depuis votre ligne
          actuelle. Vous recevrez un SMS avec votre code.
        </p>
      </div>
      <Input
        label="Code RIO"
        required
        placeholder="Ex: AB123456789"
        value={data.rioCode}
        onChange={(e) => update({ rioCode: e.target.value })}
      />
      <Input
        label="Date de portabilité souhaitée"
        required
        type="date"
        min={new Date().toISOString().split("T")[0]}
        value={data.portabilityDate}
        onChange={(e) => update({ portabilityDate: e.target.value })}
      />
    </div>
  );
}

export function Step5({ data }: { data: FormData }) {
  const rows = [
    ["Numéro", data.currentNumber],
    ["Opérateur", data.previousOperator],
    ["Type client", data.customerType],
    ["Nom complet", `${data.firstName} ${data.lastName}`],
    ["Email", data.email],
    ["Date de naissance", data.birthDate],
    ["Pièce d'identité", `${data.idType} – ${data.idNumber}`],
    ["Code RIO", data.rioCode],
    ["Date portabilité", data.portabilityDate],
  ];
  return (
    <div className="flex flex-col gap-4">
      <p className="text-gray-600 text-sm">
        Veuillez vérifier vos informations avant de soumettre.
      </p>
      <div className="rounded-2xl border border-gray-200 overflow-hidden">
        {rows.map(([label, value], i) => (
          <div
            key={label}
            className={`flex justify-between px-5 py-3.5 text-sm ${i % 2 === 0 ? "bg-gray-50" : "bg-white"}`}
          >
            <span className="text-gray-500 font-medium">{label}</span>
            <span className="text-gray-900 font-semibold text-right max-w-[55%] truncate">
              {value || "—"}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
