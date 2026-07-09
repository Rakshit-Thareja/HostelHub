/* eslint-disable react-refresh/only-export-components */
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { apiRequest } from "../lib/api";

const HostelHubContext = createContext(null);

export function HostelHubProvider({ children }) {
  const [data, setData] = useState({
    stats: null,
    students: [],
    complaints: [],
    leaveApplications: [],
    notices: [],
    messMenu: [],
    lostFound: [],
  });
  const [selectedStudentId, setSelectedStudentId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  async function refreshData() {
    setLoading(true);
    setError("");

    try {
      const payload = await apiRequest("/api/bootstrap");
      setData(payload);
      setSelectedStudentId((current) => current ?? payload.students[0]?.id ?? null);
    } catch (fetchError) {
      setError(fetchError.message);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    Promise.resolve().then(() => {
      void refreshData();
    });
  }, []);

  const selectedStudent = useMemo(
    () => data.students.find((student) => student.id === selectedStudentId) ?? null,
    [data.students, selectedStudentId]
  );

  const selectedStudentComplaints = useMemo(
    () => data.complaints.filter((complaint) => complaint.student_id === selectedStudentId),
    [data.complaints, selectedStudentId]
  );

  const selectedStudentLeaves = useMemo(
    () => data.leaveApplications.filter((leave) => leave.student_id === selectedStudentId),
    [data.leaveApplications, selectedStudentId]
  );

  const selectedStudentLostFound = useMemo(
    () => data.lostFound.filter((item) => item.student_id === selectedStudentId || item.student_id === null),
    [data.lostFound, selectedStudentId]
  );

  async function createStudent(payload) {
    await apiRequest("/api/students", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await refreshData();
  }

  async function updateStudent(id, payload) {
    await apiRequest(`/api/students/${id}`, {
      method: "PUT",
      body: JSON.stringify(payload),
    });
    await refreshData();
  }

  async function deleteStudent(id) {
    await apiRequest(`/api/students/${id}`, {
      method: "DELETE",
    });
    setSelectedStudentId((current) => (current === id ? null : current));
    await refreshData();
  }

  async function createComplaint(payload) {
    await apiRequest("/api/complaints", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await refreshData();
  }

  async function updateComplaintStatus(id, status) {
    await apiRequest(`/api/complaints/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await refreshData();
  }

  async function createLeaveApplication(payload) {
    await apiRequest("/api/leave-applications", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await refreshData();
  }

  async function updateLeaveStatus(id, status, approverNote) {
    await apiRequest(`/api/leave-applications/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status, approverNote }),
    });
    await refreshData();
  }

  async function createNotice(payload) {
    await apiRequest("/api/notices", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await refreshData();
  }

  async function createMenuItem(payload) {
    await apiRequest("/api/mess-menu", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await refreshData();
  }

  async function createLostFoundItem(payload) {
    await apiRequest("/api/lost-found", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    await refreshData();
  }

  async function updateLostFoundStatus(id, status) {
    await apiRequest(`/api/lost-found/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    await refreshData();
  }

  return (
    <HostelHubContext.Provider
      value={{
        ...data,
        loading,
        error,
        refreshData,
        selectedStudent,
        selectedStudentId,
        setSelectedStudentId,
        selectedStudentComplaints,
        selectedStudentLeaves,
        selectedStudentLostFound,
        createStudent,
        updateStudent,
        deleteStudent,
        createComplaint,
        updateComplaintStatus,
        createLeaveApplication,
        updateLeaveStatus,
        createNotice,
        createMenuItem,
        createLostFoundItem,
        updateLostFoundStatus,
      }}
    >
      {children}
    </HostelHubContext.Provider>
  );
}

export function useHostelHub() {
  const context = useContext(HostelHubContext);

  if (!context) {
    throw new Error("useHostelHub must be used within HostelHubProvider");
  }

  return context;
}
