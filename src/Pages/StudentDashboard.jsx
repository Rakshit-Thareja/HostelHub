import { Link } from "react-router";
import { useHostelHub } from "../context/HostelHubContext";
import { PageHeader, Panel, StatCard, StatusPill } from "../Components/ui";

export default function StudentDashboard() {
  const { appMode, selectedStudent, selectedStudentComplaints, selectedStudentLeaves, notices, stats } = useHostelHub();

  return (
    <div>
      <PageHeader
        eyebrow="Overview"
        title={selectedStudent ? `${selectedStudent.full_name}'s dashboard` : "HostelHub dashboard"}
        description={`Track student records, pending hostel actions, and the latest notices from one place.${appMode === "demo" ? " This GitHub Pages build stores changes in your browser only." : ""}`}
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Students" value={stats?.students ?? 0} hint="Profiles in the database" />
        <StatCard label="Open Complaints" value={stats?.openComplaints ?? 0} hint="Across the entire hostel" />
        <StatCard label="Pending Leaves" value={stats?.pendingLeaves ?? 0} hint="Awaiting approval" />
        <StatCard label="Notices" value={stats?.notices ?? 0} hint="Recent hostel updates" />
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-[1.4fr_1fr]">
        <Panel>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-white">Recent Complaints</h2>
              <p className="mt-1 text-sm text-white/60">Latest issues filed by the selected student.</p>
            </div>
            <Link to="/Complaints" className="text-sm text-[#f4d35e]">
              Manage
            </Link>
          </div>

          <div className="mt-5 space-y-4">
            {selectedStudentComplaints.slice(0, 3).map((complaint) => (
              <div key={complaint.id} className="rounded-3xl border border-white/10 bg-[#131316] p-4">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <h3 className="font-medium text-white">{complaint.title}</h3>
                    <p className="mt-1 text-sm text-white/60">{complaint.category}</p>
                  </div>
                  <StatusPill value={complaint.status} />
                </div>
                <p className="mt-3 text-sm text-white/65">{complaint.description}</p>
              </div>
            ))}
            {selectedStudentComplaints.length === 0 && (
              <p className="text-sm text-white/55">No complaints yet for the selected student.</p>
            )}
          </div>
        </Panel>

        <div className="space-y-6">
          <Panel>
            <h2 className="text-xl font-semibold text-white">Leave Snapshot</h2>
            <div className="mt-5 space-y-3">
              {selectedStudentLeaves.slice(0, 3).map((leave) => (
                <div key={leave.id} className="rounded-3xl border border-white/10 bg-[#131316] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{leave.reason}</p>
                    <StatusPill value={leave.status} />
                  </div>
                  <p className="mt-2 text-sm text-white/60">
                    {leave.start_date} to {leave.end_date}
                  </p>
                </div>
              ))}
              {selectedStudentLeaves.length === 0 && (
                <p className="text-sm text-white/55">No leave applications on record.</p>
              )}
            </div>
          </Panel>

          <Panel>
            <h2 className="text-xl font-semibold text-white">Latest Notices</h2>
            <div className="mt-5 space-y-3">
              {notices.slice(0, 3).map((notice) => (
                <div key={notice.id} className="rounded-3xl border border-white/10 bg-[#131316] p-4">
                  <div className="flex items-center justify-between gap-3">
                    <p className="font-medium text-white">{notice.title}</p>
                    {notice.is_important ? <span className="text-xs text-[#f4d35e]">Important</span> : null}
                  </div>
                  <p className="mt-2 text-sm text-white/60">{notice.content}</p>
                </div>
              ))}
            </div>
          </Panel>
        </div>
      </div>
    </div>
  );
}
