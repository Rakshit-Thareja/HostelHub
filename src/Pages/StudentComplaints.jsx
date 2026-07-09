import { useState } from "react";
import { useHostelHub } from "../context/HostelHubContext";
import { Field, Input, PageHeader, Panel, PrimaryButton, Select, StatusPill, Textarea } from "../Components/ui";

const initialForm = {
  title: "",
  description: "",
  category: "Maintenance",
  priority: "Medium",
};

export default function StudentComplaints() {
  const { selectedStudent, selectedStudentComplaints, createComplaint, updateComplaintStatus } = useHostelHub();
  const [form, setForm] = useState(initialForm);

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedStudent) return;

    await createComplaint({
      studentId: selectedStudent.id,
      ...form,
    });

    setForm(initialForm);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Complaints"
        title="Complaint management"
        description="Create and track maintenance, discipline, technical, and other hostel complaints for the selected student."
      />

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Panel>
          <h2 className="text-xl font-semibold text-white">File a complaint</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Field label="Issue title">
              <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
            </Field>
            <Field label="Description">
              <Textarea value={form.description} onChange={(event) => setForm({ ...form, description: event.target.value })} required />
            </Field>
            <div className="grid gap-4 md:grid-cols-2">
              <Field label="Category">
                <Select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                  <option>Maintenance</option>
                  <option>Technical</option>
                  <option>Electrical</option>
                  <option>Discipline</option>
                  <option>Housekeeping</option>
                </Select>
              </Field>
              <Field label="Priority">
                <Select value={form.priority} onChange={(event) => setForm({ ...form, priority: event.target.value })}>
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </Select>
              </Field>
            </div>
            <PrimaryButton type="submit" className="w-full" disabled={!selectedStudent}>
              Submit complaint
            </PrimaryButton>
          </form>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold text-white">Complaint history</h2>
          <div className="mt-5 space-y-4">
            {selectedStudentComplaints.map((complaint) => (
              <div key={complaint.id} className="rounded-3xl border border-white/10 bg-[#131316] p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{complaint.title}</h3>
                    <p className="mt-2 text-sm text-white/60">{complaint.description}</p>
                    <div className="mt-3 flex flex-wrap gap-3 text-sm text-white/50">
                      <span>{complaint.category}</span>
                      <span>{complaint.priority} priority</span>
                      <span>{complaint.created_at?.slice(0, 10)}</span>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <StatusPill value={complaint.status} />
                    <Select value={complaint.status} onChange={(event) => updateComplaintStatus(complaint.id, event.target.value)}>
                      <option>Open</option>
                      <option>In Progress</option>
                      <option>Resolved</option>
                    </Select>
                  </div>
                </div>
              </div>
            ))}
            {selectedStudentComplaints.length === 0 && <p className="text-sm text-white/55">No complaints submitted yet.</p>}
          </div>
        </Panel>
      </div>
    </div>
  );
}
