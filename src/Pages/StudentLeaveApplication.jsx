import { useState } from "react";
import { useHostelHub } from "../context/HostelHubContext";
import { Field, Input, PageHeader, Panel, PrimaryButton, Select, StatusPill, Textarea } from "../Components/ui";

const initialForm = {
  reason: "",
  startDate: "",
  endDate: "",
};

export default function StudentLeaveApplication() {
  const { selectedStudent, selectedStudentLeaves, createLeaveApplication, updateLeaveStatus } = useHostelHub();
  const [form, setForm] = useState(initialForm);
  const [notes, setNotes] = useState({});

  async function handleSubmit(event) {
    event.preventDefault();
    if (!selectedStudent) return;

    await createLeaveApplication({
      studentId: selectedStudent.id,
      ...form,
    });

    setForm(initialForm);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Leave"
        title="Leave applications"
        description="Submit leave requests and update approval status with notes for the selected student."
      />

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Panel>
          <h2 className="text-xl font-semibold text-white">New leave request</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Field label="Reason">
              <Textarea value={form.reason} onChange={(event) => setForm({ ...form, reason: event.target.value })} required />
            </Field>
            <Field label="Start date">
              <Input type="date" value={form.startDate} onChange={(event) => setForm({ ...form, startDate: event.target.value })} required />
            </Field>
            <Field label="End date">
              <Input type="date" value={form.endDate} onChange={(event) => setForm({ ...form, endDate: event.target.value })} required />
            </Field>
            <PrimaryButton type="submit" className="w-full" disabled={!selectedStudent}>
              Apply for leave
            </PrimaryButton>
          </form>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold text-white">Application records</h2>
          <div className="mt-5 space-y-4">
            {selectedStudentLeaves.map((leave) => (
              <div key={leave.id} className="rounded-3xl border border-white/10 bg-[#131316] p-5">
                <div className="flex flex-wrap items-start justify-between gap-4">
                  <div className="max-w-xl">
                    <h3 className="text-lg font-semibold text-white">{leave.reason}</h3>
                    <p className="mt-2 text-sm text-white/60">
                      {leave.start_date} to {leave.end_date}
                    </p>
                    <p className="mt-2 text-sm text-white/50">{leave.approver_note || "No approval note added yet."}</p>
                  </div>
                  <StatusPill value={leave.status} />
                </div>

                <div className="mt-4 grid gap-4 md:grid-cols-[180px_1fr_180px]">
                  <Select defaultValue={leave.status} onChange={(event) => updateLeaveStatus(leave.id, event.target.value, notes[leave.id] ?? leave.approver_note)}>
                    <option>Pending</option>
                    <option>Approved</option>
                    <option>Rejected</option>
                  </Select>
                  <Input
                    placeholder="Approver note"
                    value={notes[leave.id] ?? leave.approver_note ?? ""}
                    onChange={(event) => setNotes({ ...notes, [leave.id]: event.target.value })}
                  />
                  <PrimaryButton type="button" onClick={() => updateLeaveStatus(leave.id, leave.status, notes[leave.id] ?? leave.approver_note)}>
                    Save note
                  </PrimaryButton>
                </div>
              </div>
            ))}
            {selectedStudentLeaves.length === 0 && <p className="text-sm text-white/55">No leave applications yet.</p>}
          </div>
        </Panel>
      </div>
    </div>
  );
}
