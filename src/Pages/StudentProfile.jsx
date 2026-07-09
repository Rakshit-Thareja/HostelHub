import { useState } from "react";
import { useHostelHub } from "../context/HostelHubContext";
import { Field, Input, PageHeader, Panel, PrimaryButton, SecondaryButton } from "../Components/ui";

const initialForm = {
  fullName: "",
  email: "",
  phone: "",
  block: "",
  roomNumber: "",
  course: "",
  yearLevel: "",
  guardianName: "",
  guardianPhone: "",
};

function StudentForm({ selectedStudent }) {
  const { createStudent, updateStudent, deleteStudent, setSelectedStudentId } = useHostelHub();
  const [form, setForm] = useState(
    selectedStudent
      ? {
          fullName: selectedStudent.full_name,
          email: selectedStudent.email,
          phone: selectedStudent.phone,
          block: selectedStudent.block,
          roomNumber: selectedStudent.room_number,
          course: selectedStudent.course,
          yearLevel: selectedStudent.year_level,
          guardianName: selectedStudent.guardian_name,
          guardianPhone: selectedStudent.guardian_phone,
        }
      : initialForm
  );

  const isEditing = Boolean(selectedStudent);

  async function handleSubmit(event) {
    event.preventDefault();

    if (isEditing && selectedStudent) {
      await updateStudent(selectedStudent.id, form);
      return;
    }

    await createStudent(form);
    setForm(initialForm);
    setSelectedStudentId(null);
  }

  return (
    <Panel>
      <h2 className="text-xl font-semibold text-white">{isEditing ? "Edit student" : "Create student"}</h2>
      <form className="mt-5 grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
        <Field label="Full name">
          <Input value={form.fullName} onChange={(event) => setForm({ ...form, fullName: event.target.value })} required />
        </Field>
        <Field label="Email">
          <Input type="email" value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} required />
        </Field>
        <Field label="Phone">
          <Input value={form.phone} onChange={(event) => setForm({ ...form, phone: event.target.value })} required />
        </Field>
        <Field label="Block">
          <Input value={form.block} onChange={(event) => setForm({ ...form, block: event.target.value })} required />
        </Field>
        <Field label="Room number">
          <Input value={form.roomNumber} onChange={(event) => setForm({ ...form, roomNumber: event.target.value })} required />
        </Field>
        <Field label="Course">
          <Input value={form.course} onChange={(event) => setForm({ ...form, course: event.target.value })} required />
        </Field>
        <Field label="Year">
          <Input value={form.yearLevel} onChange={(event) => setForm({ ...form, yearLevel: event.target.value })} required />
        </Field>
        <Field label="Guardian name">
          <Input value={form.guardianName} onChange={(event) => setForm({ ...form, guardianName: event.target.value })} required />
        </Field>
        <Field label="Guardian phone">
          <Input value={form.guardianPhone} onChange={(event) => setForm({ ...form, guardianPhone: event.target.value })} required />
        </Field>

        <div className="md:col-span-2 flex flex-wrap gap-3 pt-2">
          <PrimaryButton type="submit">{isEditing ? "Update student" : "Create student"}</PrimaryButton>
          {isEditing && selectedStudent ? (
            <SecondaryButton type="button" onClick={() => deleteStudent(selectedStudent.id)}>
              Delete student
            </SecondaryButton>
          ) : null}
        </div>
      </form>
    </Panel>
  );
}

export default function StudentProfile() {
  const { students, selectedStudent, setSelectedStudentId } = useHostelHub();

  return (
    <div>
      <PageHeader
        eyebrow="Students"
        title="Student records"
        description="Create, edit, and remove student profiles stored in the SQLite database."
        children={
          <SecondaryButton
            type="button"
            onClick={() => {
              setSelectedStudentId(null);
            }}
          >
            Add new student
          </SecondaryButton>
        }
      />

      <div className="grid gap-6 xl:grid-cols-[330px_1fr]">
        <Panel>
          <h2 className="text-xl font-semibold text-white">All students</h2>
          <div className="mt-5 space-y-3">
            {students.map((student) => (
              <button
                key={student.id}
                type="button"
                onClick={() => setSelectedStudentId(student.id)}
                className={`w-full rounded-3xl border p-4 text-left transition ${
                  selectedStudent?.id === student.id ? "border-[#f4d35e] bg-[#f4d35e]/10" : "border-white/10 bg-[#131316]"
                }`}
              >
                <p className="font-medium text-white">{student.full_name}</p>
                <p className="mt-1 text-sm text-white/55">
                  {student.block} | Room {student.room_number}
                </p>
                <p className="mt-1 text-sm text-white/45">{student.course}</p>
              </button>
            ))}
          </div>
        </Panel>

        <StudentForm key={selectedStudent?.id ?? "new"} selectedStudent={selectedStudent} />
      </div>
    </div>
  );
}
