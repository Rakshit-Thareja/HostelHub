import { useState } from "react";
import { useHostelHub } from "../context/HostelHubContext";
import { Field, Input, PageHeader, Panel, PrimaryButton, Select, StatusPill, Textarea } from "../Components/ui";

const initialForm = {
  itemName: "",
  description: "",
  location: "",
  status: "Lost",
  contactInfo: "",
};

export default function StudentLostFound() {
  const { selectedStudent, selectedStudentLostFound, createLostFoundItem, updateLostFoundStatus } = useHostelHub();
  const [form, setForm] = useState(initialForm);

  async function handleSubmit(event) {
    event.preventDefault();
    await createLostFoundItem({
      studentId: selectedStudent?.id ?? null,
      ...form,
    });
    setForm(initialForm);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Lost & Found"
        title="Item tracking"
        description="Log lost and found hostel items with contact information so students can recover belongings faster."
      />

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Panel>
          <h2 className="text-xl font-semibold text-white">Create item report</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Field label="Item name">
              <Input value={form.itemName} onChange={(event) => setForm({ ...form, itemName: event.target.value })} required />
            </Field>
            <Field label="Status">
              <Select value={form.status} onChange={(event) => setForm({ ...form, status: event.target.value })}>
                <option>Lost</option>
                <option>Found</option>
                <option>Claimed</option>
              </Select>
            </Field>
            <Field label="Location">
              <Input value={form.location} onChange={(event) => setForm({ ...form, location: event.target.value })} required />
            </Field>
            <Field label="Description">
              <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
            </Field>
            <Field label="Contact info">
              <Input value={form.contactInfo} onChange={(event) => setForm({ ...form, contactInfo: event.target.value })} required />
            </Field>
            <PrimaryButton type="submit" className="w-full">
              Save report
            </PrimaryButton>
          </form>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold text-white">Open reports</h2>
          <div className="mt-5 space-y-4">
            {selectedStudentLostFound.map((item) => (
              <div key={item.id} className="rounded-3xl border border-white/10 bg-[#131316] p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{item.item_name}</h3>
                    <p className="mt-1 text-sm text-white/50">
                      {item.location} | {item.contact_info}
                    </p>
                    <p className="mt-3 text-sm text-white/65">{item.description}</p>
                    {item.full_name ? <p className="mt-3 text-xs text-white/45">Reported for {item.full_name}</p> : null}
                  </div>
                  <div className="space-y-3">
                    <StatusPill value={item.status} />
                    <Select value={item.status} onChange={(event) => updateLostFoundStatus(item.id, event.target.value)}>
                      <option>Lost</option>
                      <option>Found</option>
                      <option>Claimed</option>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            {selectedStudentLostFound.length === 0 && <p className="text-sm text-white/55">No lost and found entries yet.</p>}
          </div>
        </Panel>
      </div>
    </div>
  );
}
