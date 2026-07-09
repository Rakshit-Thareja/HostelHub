import cors from "cors";
import express from "express";
import db from "./db.js";

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

const listQueries = {
  students: "SELECT * FROM students ORDER BY created_at DESC",
  complaints: `
    SELECT complaints.*, students.full_name
    FROM complaints
    JOIN students ON students.id = complaints.student_id
    ORDER BY complaints.created_at DESC
  `,
  leaveApplications: `
    SELECT leave_applications.*, students.full_name
    FROM leave_applications
    JOIN students ON students.id = leave_applications.student_id
    ORDER BY leave_applications.created_at DESC
  `,
  notices: "SELECT * FROM notices ORDER BY created_at DESC",
  messMenu: "SELECT * FROM mess_menu ORDER BY day_of_week, meal_type",
  lostFound: `
    SELECT lost_found.*, students.full_name
    FROM lost_found
    LEFT JOIN students ON students.id = lost_found.student_id
    ORDER BY lost_found.created_at DESC
  `,
};

const serializeDashboard = () => ({
  students: db.prepare("SELECT COUNT(*) AS total FROM students").get().total,
  openComplaints: db.prepare("SELECT COUNT(*) AS total FROM complaints WHERE status != 'Resolved'").get().total,
  pendingLeaves: db.prepare("SELECT COUNT(*) AS total FROM leave_applications WHERE status = 'Pending'").get().total,
  notices: db.prepare("SELECT COUNT(*) AS total FROM notices").get().total,
});

app.get("/api/health", (_req, res) => {
  res.json({ ok: true });
});

app.get("/api/bootstrap", (_req, res) => {
  res.json({
    stats: serializeDashboard(),
    students: db.prepare(listQueries.students).all(),
    complaints: db.prepare(listQueries.complaints).all(),
    leaveApplications: db.prepare(listQueries.leaveApplications).all(),
    notices: db.prepare(listQueries.notices).all(),
    messMenu: db.prepare(listQueries.messMenu).all(),
    lostFound: db.prepare(listQueries.lostFound).all(),
  });
});

app.post("/api/students", (req, res) => {
  const {
    fullName,
    email,
    phone,
    block,
    roomNumber,
    course,
    yearLevel,
    guardianName,
    guardianPhone,
  } = req.body;

  const result = db.prepare(`
    INSERT INTO students (
      full_name, email, phone, block, room_number, course, year_level, guardian_name, guardian_phone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `).run(fullName, email, phone, block, roomNumber, course, yearLevel, guardianName, guardianPhone);

  res.status(201).json(db.prepare("SELECT * FROM students WHERE id = ?").get(result.lastInsertRowid));
});

app.put("/api/students/:id", (req, res) => {
  const {
    fullName,
    email,
    phone,
    block,
    roomNumber,
    course,
    yearLevel,
    guardianName,
    guardianPhone,
  } = req.body;

  db.prepare(`
    UPDATE students
    SET full_name = ?, email = ?, phone = ?, block = ?, room_number = ?, course = ?, year_level = ?, guardian_name = ?, guardian_phone = ?
    WHERE id = ?
  `).run(fullName, email, phone, block, roomNumber, course, yearLevel, guardianName, guardianPhone, req.params.id);

  res.json(db.prepare("SELECT * FROM students WHERE id = ?").get(req.params.id));
});

app.delete("/api/students/:id", (req, res) => {
  db.prepare("DELETE FROM students WHERE id = ?").run(req.params.id);
  res.status(204).end();
});

app.post("/api/complaints", (req, res) => {
  const { studentId, title, description, category, priority } = req.body;
  const result = db.prepare(`
    INSERT INTO complaints (student_id, title, description, category, priority)
    VALUES (?, ?, ?, ?, ?)
  `).run(studentId, title, description, category, priority);

  res.status(201).json(
    db.prepare(`
      SELECT complaints.*, students.full_name
      FROM complaints
      JOIN students ON students.id = complaints.student_id
      WHERE complaints.id = ?
    `).get(result.lastInsertRowid)
  );
});

app.patch("/api/complaints/:id", (req, res) => {
  db.prepare("UPDATE complaints SET status = ? WHERE id = ?").run(req.body.status, req.params.id);
  res.json(db.prepare("SELECT * FROM complaints WHERE id = ?").get(req.params.id));
});

app.post("/api/leave-applications", (req, res) => {
  const { studentId, reason, startDate, endDate } = req.body;
  const result = db.prepare(`
    INSERT INTO leave_applications (student_id, reason, start_date, end_date)
    VALUES (?, ?, ?, ?)
  `).run(studentId, reason, startDate, endDate);

  res.status(201).json(
    db.prepare(`
      SELECT leave_applications.*, students.full_name
      FROM leave_applications
      JOIN students ON students.id = leave_applications.student_id
      WHERE leave_applications.id = ?
    `).get(result.lastInsertRowid)
  );
});

app.patch("/api/leave-applications/:id", (req, res) => {
  db.prepare("UPDATE leave_applications SET status = ?, approver_note = ? WHERE id = ?")
    .run(req.body.status, req.body.approverNote ?? "", req.params.id);
  res.json(db.prepare("SELECT * FROM leave_applications WHERE id = ?").get(req.params.id));
});

app.post("/api/notices", (req, res) => {
  const { title, content, category, isImportant } = req.body;
  const result = db.prepare(`
    INSERT INTO notices (title, content, category, is_important)
    VALUES (?, ?, ?, ?)
  `).run(title, content, category, isImportant ? 1 : 0);

  res.status(201).json(db.prepare("SELECT * FROM notices WHERE id = ?").get(result.lastInsertRowid));
});

app.post("/api/mess-menu", (req, res) => {
  const { dayOfWeek, mealType, menuItems } = req.body;
  const result = db.prepare(`
    INSERT INTO mess_menu (day_of_week, meal_type, menu_items)
    VALUES (?, ?, ?)
  `).run(dayOfWeek, mealType, menuItems);

  res.status(201).json(db.prepare("SELECT * FROM mess_menu WHERE id = ?").get(result.lastInsertRowid));
});

app.post("/api/lost-found", (req, res) => {
  const { studentId, itemName, description, location, status, contactInfo } = req.body;
  const result = db.prepare(`
    INSERT INTO lost_found (student_id, item_name, description, location, status, contact_info)
    VALUES (?, ?, ?, ?, ?, ?)
  `).run(studentId || null, itemName, description, location, status, contactInfo);

  res.status(201).json(
    db.prepare(`
      SELECT lost_found.*, students.full_name
      FROM lost_found
      LEFT JOIN students ON students.id = lost_found.student_id
      WHERE lost_found.id = ?
    `).get(result.lastInsertRowid)
  );
});

app.patch("/api/lost-found/:id", (req, res) => {
  db.prepare("UPDATE lost_found SET status = ? WHERE id = ?").run(req.body.status, req.params.id);
  res.json(db.prepare("SELECT * FROM lost_found WHERE id = ?").get(req.params.id));
});

app.use((error, _req, res, next) => {
  void next;
  console.error(error);
  res.status(500).json({ message: error.message || "Something went wrong." });
});

app.listen(PORT, () => {
  console.log(`HostelHub API running on http://localhost:${PORT}`);
});
