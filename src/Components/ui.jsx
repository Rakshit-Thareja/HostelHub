export function PageHeader({ eyebrow, title, description, children }) {
  return (
    <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.25em] text-[#f4d35e]">{eyebrow}</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{title}</h1>
        <p className="mt-2 max-w-2xl text-sm text-white/65">{description}</p>
      </div>
      {children}
    </div>
  );
}

export function Panel({ className = "", children }) {
  return <section className={`rounded-[28px] border border-white/10 bg-white/5 p-5 ${className}`}>{children}</section>;
}

export function StatCard({ label, value, hint }) {
  return (
    <Panel>
      <p className="text-sm text-white/55">{label}</p>
      <p className="mt-4 text-3xl font-semibold text-white">{value}</p>
      <p className="mt-2 text-sm text-white/45">{hint}</p>
    </Panel>
  );
}

export function Field({ label, children }) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm text-white/70">{label}</span>
      {children}
    </label>
  );
}

export function Input(props) {
  return <input {...props} className={`w-full rounded-2xl border border-white/10 bg-[#131316] px-4 py-3 text-sm text-white outline-none ${props.className ?? ""}`} />;
}

export function Select(props) {
  return <select {...props} className={`w-full rounded-2xl border border-white/10 bg-[#131316] px-4 py-3 text-sm text-white outline-none ${props.className ?? ""}`} />;
}

export function Textarea(props) {
  return <textarea {...props} className={`min-h-28 w-full rounded-2xl border border-white/10 bg-[#131316] px-4 py-3 text-sm text-white outline-none ${props.className ?? ""}`} />;
}

export function PrimaryButton({ className = "", ...props }) {
  return <button {...props} className={`rounded-2xl bg-[#f4d35e] px-4 py-3 text-sm font-semibold text-[#111114] transition hover:brightness-105 ${className}`} />;
}

export function SecondaryButton({ className = "", ...props }) {
  return <button {...props} className={`rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-white transition hover:bg-white/10 ${className}`} />;
}

export function StatusPill({ value }) {
  const styles = {
    Open: "bg-sky-500/15 text-sky-200",
    "In Progress": "bg-amber-500/15 text-amber-200",
    Resolved: "bg-emerald-500/15 text-emerald-200",
    Pending: "bg-amber-500/15 text-amber-200",
    Approved: "bg-emerald-500/15 text-emerald-200",
    Rejected: "bg-rose-500/15 text-rose-200",
    Lost: "bg-orange-500/15 text-orange-200",
    Found: "bg-cyan-500/15 text-cyan-200",
    Claimed: "bg-emerald-500/15 text-emerald-200",
  };

  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[value] ?? "bg-white/10 text-white/70"}`}>{value}</span>;
}
