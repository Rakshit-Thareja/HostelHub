import { Bell, CalendarCheck2, LayoutDashboard, Search, ShieldAlert, Soup, UserRound } from "lucide-react";
import { NavLink } from "react-router";
import { useHostelHub } from "../context/HostelHubContext";

const navItems = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/Complaints", label: "Complaints", icon: ShieldAlert },
  { to: "/Notices", label: "Notices", icon: Bell },
  { to: "/LeaveApplication", label: "Leave", icon: CalendarCheck2 },
  { to: "/MessMenu", label: "Mess Menu", icon: Soup },
  { to: "/LostFound", label: "Lost & Found", icon: Search },
  { to: "/Profile", label: "Students", icon: UserRound },
];

export default function AppShell({ children }) {
  const { appMode, students, selectedStudent, selectedStudentId, setSelectedStudentId } = useHostelHub();

  return (
    <div className="min-h-screen bg-[#09090b] text-white lg:flex">
      <aside className="border-b border-white/10 bg-[#111114] lg:min-h-screen lg:w-80 lg:border-b-0 lg:border-r">
        <div className="border-b border-white/10 p-6">
          <div className="flex items-center gap-3">
            <div className="rounded-2xl bg-[#f4d35e] px-3 py-2 text-sm font-black text-[#111114]">HH</div>
            <div>
              <h1 className="text-xl font-semibold">HostelHub</h1>
              <p className="text-sm text-white/60">Student operations dashboard</p>
            </div>
          </div>
        </div>

        <div className="space-y-5 p-6">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-4">
            <div className="mb-3 flex items-center justify-between gap-3">
              <p className="text-xs uppercase tracking-[0.25em] text-white/50">Active Student</p>
              <span className={`rounded-full px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] ${appMode === "demo" ? "bg-sky-500/15 text-sky-200" : "bg-emerald-500/15 text-emerald-200"}`}>
                {appMode === "demo" ? "Demo Mode" : "Live DB"}
              </span>
            </div>
            <select
              className="mt-3 w-full rounded-2xl border border-white/10 bg-[#18181c] px-4 py-3 text-sm outline-none"
              value={selectedStudentId ?? ""}
              onChange={(event) => setSelectedStudentId(Number(event.target.value))}
            >
              {students.map((student) => (
                <option key={student.id} value={student.id}>
                  {student.full_name}
                </option>
              ))}
            </select>

            {selectedStudent ? (
              <div className="mt-4 space-y-1 text-sm text-white/70">
                <p>{selectedStudent.course}</p>
                <p>
                  {selectedStudent.block} | Room {selectedStudent.room_number}
                </p>
                <p>{selectedStudent.email}</p>
              </div>
            ) : (
              <p className="mt-4 text-sm text-white/60">Create a student profile to get started.</p>
            )}
          </div>

          <nav className="space-y-2">
            {navItems.map(({ to, label, icon: Icon }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${
                    isActive ? "bg-[#f4d35e] text-[#111114]" : "bg-white/5 text-white/75 hover:bg-white/10"
                  }`
                }
              >
                <Icon size={18} />
                <span>{label}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>

      <main className="flex-1 p-4 md:p-8">{children}</main>
    </div>
  );
}
