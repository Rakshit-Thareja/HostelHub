import { seedData } from "./seedData";

const storageKey = "hostelhub-demo-data";
const clone = (value) => JSON.parse(JSON.stringify(value));

function getNextId(items) {
  return items.reduce((maxId, item) => Math.max(maxId, item.id), 0) + 1;
}

function getTimestamp() {
  return new Date().toISOString().slice(0, 19).replace("T", " ");
}

function computeStats(data) {
  return {
    students: data.students.length,
    openComplaints: data.complaints.filter((item) => item.status !== "Resolved").length,
    pendingLeaves: data.leaveApplications.filter((item) => item.status === "Pending").length,
    notices: data.notices.length,
  };
}

function normalizeData(data) {
  return {
    ...data,
    stats: computeStats(data),
  };
}

function readLocalData() {
  const raw = window.localStorage.getItem(storageKey);
  if (!raw) {
    const initial = normalizeData(clone(seedData));
    window.localStorage.setItem(storageKey, JSON.stringify(initial));
    return initial;
  }

  return normalizeData(JSON.parse(raw));
}

function writeLocalData(data) {
  const normalized = normalizeData(data);
  window.localStorage.setItem(storageKey, JSON.stringify(normalized));
  return normalized;
}

function createLocalDataSource() {
  return {
    async bootstrap() {
      return readLocalData();
    },
    async createStudent(payload) {
      const data = readLocalData();
      data.students.unshift({
        id: getNextId(data.students),
        full_name: payload.fullName,
        email: payload.email,
        phone: payload.phone,
        block: payload.block,
        room_number: payload.roomNumber,
        course: payload.course,
        year_level: payload.yearLevel,
        guardian_name: payload.guardianName,
        guardian_phone: payload.guardianPhone,
        created_at: getTimestamp(),
      });
      writeLocalData(data);
    },
    async updateStudent(id, payload) {
      const data = readLocalData();
      data.students = data.students.map((student) =>
        student.id === id
          ? {
              ...student,
              full_name: payload.fullName,
              email: payload.email,
              phone: payload.phone,
              block: payload.block,
              room_number: payload.roomNumber,
              course: payload.course,
              year_level: payload.yearLevel,
              guardian_name: payload.guardianName,
              guardian_phone: payload.guardianPhone,
            }
          : student
      );
      writeLocalData(data);
    },
    async deleteStudent(id) {
      const data = readLocalData();
      data.students = data.students.filter((student) => student.id !== id);
      data.complaints = data.complaints.filter((item) => item.student_id !== id);
      data.leaveApplications = data.leaveApplications.filter((item) => item.student_id !== id);
      data.lostFound = data.lostFound.filter((item) => item.student_id !== id);
      writeLocalData(data);
    },
    async createComplaint(payload) {
      const data = readLocalData();
      const student = data.students.find((item) => item.id === payload.studentId);
      data.complaints.unshift({
        id: getNextId(data.complaints),
        student_id: payload.studentId,
        title: payload.title,
        description: payload.description,
        category: payload.category,
        priority: payload.priority,
        status: "Open",
        created_at: getTimestamp(),
        full_name: student?.full_name ?? "",
      });
      writeLocalData(data);
    },
    async updateComplaintStatus(id, status) {
      const data = readLocalData();
      data.complaints = data.complaints.map((item) => (item.id === id ? { ...item, status } : item));
      writeLocalData(data);
    },
    async createLeaveApplication(payload) {
      const data = readLocalData();
      const student = data.students.find((item) => item.id === payload.studentId);
      data.leaveApplications.unshift({
        id: getNextId(data.leaveApplications),
        student_id: payload.studentId,
        reason: payload.reason,
        start_date: payload.startDate,
        end_date: payload.endDate,
        status: "Pending",
        approver_note: "",
        created_at: getTimestamp(),
        full_name: student?.full_name ?? "",
      });
      writeLocalData(data);
    },
    async updateLeaveStatus(id, status, approverNote) {
      const data = readLocalData();
      data.leaveApplications = data.leaveApplications.map((item) =>
        item.id === id ? { ...item, status, approver_note: approverNote } : item
      );
      writeLocalData(data);
    },
    async createNotice(payload) {
      const data = readLocalData();
      data.notices.unshift({
        id: getNextId(data.notices),
        title: payload.title,
        content: payload.content,
        category: payload.category,
        is_important: payload.isImportant ? 1 : 0,
        created_at: getTimestamp(),
      });
      writeLocalData(data);
    },
    async createMenuItem(payload) {
      const data = readLocalData();
      data.messMenu.push({
        id: getNextId(data.messMenu),
        day_of_week: payload.dayOfWeek,
        meal_type: payload.mealType,
        menu_items: payload.menuItems,
        created_at: getTimestamp(),
      });
      writeLocalData(data);
    },
    async createLostFoundItem(payload) {
      const data = readLocalData();
      const student = data.students.find((item) => item.id === payload.studentId);
      data.lostFound.unshift({
        id: getNextId(data.lostFound),
        student_id: payload.studentId,
        item_name: payload.itemName,
        description: payload.description,
        location: payload.location,
        status: payload.status,
        contact_info: payload.contactInfo,
        created_at: getTimestamp(),
        full_name: student?.full_name ?? "",
      });
      writeLocalData(data);
    },
    async updateLostFoundStatus(id, status) {
      const data = readLocalData();
      data.lostFound = data.lostFound.map((item) => (item.id === id ? { ...item, status } : item));
      writeLocalData(data);
    },
  };
}

function createApiDataSource() {
  return {
    async bootstrap() {
      const { apiRequest } = await import("./api");
      return apiRequest("/api/bootstrap");
    },
    async createStudent(payload) {
      const { apiRequest } = await import("./api");
      return apiRequest("/api/students", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    async updateStudent(id, payload) {
      const { apiRequest } = await import("./api");
      return apiRequest(`/api/students/${id}`, {
        method: "PUT",
        body: JSON.stringify(payload),
      });
    },
    async deleteStudent(id) {
      const { apiRequest } = await import("./api");
      return apiRequest(`/api/students/${id}`, { method: "DELETE" });
    },
    async createComplaint(payload) {
      const { apiRequest } = await import("./api");
      return apiRequest("/api/complaints", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    async updateComplaintStatus(id, status) {
      const { apiRequest } = await import("./api");
      return apiRequest(`/api/complaints/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
    async createLeaveApplication(payload) {
      const { apiRequest } = await import("./api");
      return apiRequest("/api/leave-applications", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    async updateLeaveStatus(id, status, approverNote) {
      const { apiRequest } = await import("./api");
      return apiRequest(`/api/leave-applications/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status, approverNote }),
      });
    },
    async createNotice(payload) {
      const { apiRequest } = await import("./api");
      return apiRequest("/api/notices", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    async createMenuItem(payload) {
      const { apiRequest } = await import("./api");
      return apiRequest("/api/mess-menu", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    async createLostFoundItem(payload) {
      const { apiRequest } = await import("./api");
      return apiRequest("/api/lost-found", {
        method: "POST",
        body: JSON.stringify(payload),
      });
    },
    async updateLostFoundStatus(id, status) {
      const { apiRequest } = await import("./api");
      return apiRequest(`/api/lost-found/${id}`, {
        method: "PATCH",
        body: JSON.stringify({ status }),
      });
    },
  };
}

export const appMode = import.meta.env.VITE_DATA_MODE === "local" ? "demo" : "full";
export const dataSource = appMode === "demo" ? createLocalDataSource() : createApiDataSource();
