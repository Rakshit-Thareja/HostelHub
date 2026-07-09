import { Route, Routes } from "react-router";
import AppShell from "./Components/AppShell";
import { useHostelHub } from "./context/HostelHubContext";
import StudentComplaints from "./Pages/StudentComplaints";
import StudentDashboard from "./Pages/StudentDashboard";
import StudentLeaveApplication from "./Pages/StudentLeaveApplication";
import StudentLostFound from "./Pages/StudentLostFound";
import StudentMessMenu from "./Pages/StudentMessMenu";
import StudentNotices from "./Pages/StudentNotices";
import StudentProfile from "./Pages/StudentProfile";

function LoadingState({ message }) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-[#09090b] px-6 text-center text-white/80">
      <div className="rounded-[32px] border border-white/10 bg-white/5 px-8 py-10">
        <p className="text-lg font-medium">{message}</p>
      </div>
    </div>
  );
}

const App = () => {
  const { loading, error } = useHostelHub();

  if (loading) {
    return <LoadingState message="Loading HostelHub data..." />;
  }

  if (error) {
    return <LoadingState message={`Could not connect to the backend: ${error}`} />;
  }

  return (
    <AppShell>
      <Routes>
        <Route path="/" element={<StudentDashboard />} />
        <Route path="/Complaints" element={<StudentComplaints />} />
        <Route path="/Notices" element={<StudentNotices />} />
        <Route path="/LeaveApplication" element={<StudentLeaveApplication />} />
        <Route path="/MessMenu" element={<StudentMessMenu />} />
        <Route path="/LostFound" element={<StudentLostFound />} />
        <Route path="/Profile" element={<StudentProfile />} />
      </Routes>
    </AppShell>
  );
};

export default App;
