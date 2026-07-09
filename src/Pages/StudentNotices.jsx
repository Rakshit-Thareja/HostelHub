import { useState } from "react";
import { useHostelHub } from "../context/HostelHubContext";
import { Field, Input, PageHeader, Panel, PrimaryButton, Select, Textarea } from "../Components/ui";

const initialForm = {
  title: "",
  content: "",
  category: "General",
  isImportant: false,
};

export default function StudentNotices() {
  const { notices, createNotice } = useHostelHub();
  const [form, setForm] = useState(initialForm);

  async function handleSubmit(event) {
    event.preventDefault();
    await createNotice(form);
    setForm(initialForm);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Notices"
        title="Hostel announcements"
        description="Publish and browse rules, events, and operations updates that students should see."
      />

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Panel>
          <h2 className="text-xl font-semibold text-white">Post a notice</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Field label="Title">
              <Input value={form.title} onChange={(event) => setForm({ ...form, title: event.target.value })} required />
            </Field>
            <Field label="Category">
              <Select value={form.category} onChange={(event) => setForm({ ...form, category: event.target.value })}>
                <option>General</option>
                <option>Rules</option>
                <option>Events</option>
                <option>Maintenance</option>
              </Select>
            </Field>
            <Field label="Notice content">
              <Textarea value={form.content} onChange={(event) => setForm({ ...form, content: event.target.value })} required />
            </Field>
            <label className="flex items-center gap-3 text-sm text-white/70">
              <input
                type="checkbox"
                checked={form.isImportant}
                onChange={(event) => setForm({ ...form, isImportant: event.target.checked })}
              />
              Mark as important
            </label>
            <PrimaryButton type="submit" className="w-full">
              Publish notice
            </PrimaryButton>
          </form>
        </Panel>

        <Panel>
          <h2 className="text-xl font-semibold text-white">Recent notices</h2>
          <div className="mt-5 space-y-4">
            {notices.map((notice) => (
              <div key={notice.id} className="rounded-3xl border border-white/10 bg-[#131316] p-5">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <h3 className="text-lg font-semibold text-white">{notice.title}</h3>
                    <p className="mt-1 text-sm text-white/50">
                      {notice.category} | {notice.created_at?.slice(0, 10)}
                    </p>
                  </div>
                  {notice.is_important ? <span className="rounded-full bg-[#f4d35e]/15 px-3 py-1 text-xs font-semibold text-[#f4d35e]">Important</span> : null}
                </div>
                <p className="mt-3 text-sm text-white/65">{notice.content}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
