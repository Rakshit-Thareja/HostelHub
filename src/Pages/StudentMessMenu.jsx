import { useMemo, useState } from "react";
import { useHostelHub } from "../context/HostelHubContext";
import { Field, Input, PageHeader, Panel, PrimaryButton, Select } from "../Components/ui";

const initialForm = {
  dayOfWeek: "Monday",
  mealType: "Breakfast",
  menuItems: "",
};

export default function StudentMessMenu() {
  const { messMenu, createMenuItem } = useHostelHub();
  const [form, setForm] = useState(initialForm);

  const groupedMenu = useMemo(() => {
    return messMenu.reduce((accumulator, entry) => {
      accumulator[entry.day_of_week] = [...(accumulator[entry.day_of_week] ?? []), entry];
      return accumulator;
    }, {});
  }, [messMenu]);

  async function handleSubmit(event) {
    event.preventDefault();
    await createMenuItem(form);
    setForm(initialForm);
  }

  return (
    <div>
      <PageHeader
        eyebrow="Mess Menu"
        title="Dining schedule"
        description="Maintain the weekly mess menu so students always know what is being served."
      />

      <div className="grid gap-6 xl:grid-cols-[420px_1fr]">
        <Panel>
          <h2 className="text-xl font-semibold text-white">Add meal entry</h2>
          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <Field label="Day">
              <Select value={form.dayOfWeek} onChange={(event) => setForm({ ...form, dayOfWeek: event.target.value })}>
                <option>Monday</option>
                <option>Tuesday</option>
                <option>Wednesday</option>
                <option>Thursday</option>
                <option>Friday</option>
                <option>Saturday</option>
                <option>Sunday</option>
              </Select>
            </Field>
            <Field label="Meal type">
              <Select value={form.mealType} onChange={(event) => setForm({ ...form, mealType: event.target.value })}>
                <option>Breakfast</option>
                <option>Lunch</option>
                <option>Dinner</option>
              </Select>
            </Field>
            <Field label="Menu items">
              <Input value={form.menuItems} onChange={(event) => setForm({ ...form, menuItems: event.target.value })} placeholder="Rice, dal, salad" required />
            </Field>
            <PrimaryButton type="submit" className="w-full">
              Save menu
            </PrimaryButton>
          </form>
        </Panel>

        <div className="space-y-4">
          {Object.entries(groupedMenu).map(([day, entries]) => (
            <Panel key={day}>
              <h2 className="text-xl font-semibold text-white">{day}</h2>
              <div className="mt-4 grid gap-4 md:grid-cols-2">
                {entries.map((entry) => (
                  <div key={entry.id} className="rounded-3xl border border-white/10 bg-[#131316] p-4">
                    <p className="text-sm text-[#f4d35e]">{entry.meal_type}</p>
                    <p className="mt-2 text-sm text-white/70">{entry.menu_items}</p>
                  </div>
                ))}
              </div>
            </Panel>
          ))}
        </div>
      </div>
    </div>
  );
}
