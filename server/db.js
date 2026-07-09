/* global process */
import Database from "better-sqlite3";
import fs from "node:fs";
import path from "node:path";

const configuredDbPath = process.env.DB_PATH?.trim();
const dbPath = configuredDbPath
  ? path.resolve(configuredDbPath)
  : path.resolve("server", "data", "hostelhub.db");
const dataDir = path.dirname(dbPath);

fs.mkdirSync(dataDir, { recursive: true });

const db = new Database(dbPath);
db.pragma("journal_mode = WAL");

db.exec(`
  CREATE TABLE IF NOT EXISTS students (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT NOT NULL,
    block TEXT NOT NULL,
    room_number TEXT NOT NULL,
    course TEXT NOT NULL,
    year_level TEXT NOT NULL,
    guardian_name TEXT NOT NULL,
    guardian_phone TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS complaints (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    category TEXT NOT NULL,
    priority TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Open',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS leave_applications (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER NOT NULL,
    reason TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Pending',
    approver_note TEXT DEFAULT '',
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS notices (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    content TEXT NOT NULL,
    category TEXT NOT NULL,
    is_important INTEGER NOT NULL DEFAULT 0,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS mess_menu (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    day_of_week TEXT NOT NULL,
    meal_type TEXT NOT NULL,
    menu_items TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS lost_found (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    student_id INTEGER,
    item_name TEXT NOT NULL,
    description TEXT NOT NULL,
    location TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'Lost',
    contact_info TEXT NOT NULL,
    created_at TEXT DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (student_id) REFERENCES students (id) ON DELETE SET NULL
  );
`);

const studentCount = db.prepare("SELECT COUNT(*) AS count FROM students").get().count;

if (studentCount === 0) {
  const insertStudent = db.prepare(`
    INSERT INTO students (
      full_name, email, phone, block, room_number, course, year_level, guardian_name, guardian_phone
    ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `);

  const students = [
    ["Satyam Mall", "satyam@hostelhub.com", "9876543210", "Block B", "529", "B.Tech CSE", "3rd Year", "Rakesh Mall", "9876501234"],
    ["Aarav Singh", "aarav@hostelhub.com", "9876500001", "Block A", "214", "BBA", "2nd Year", "Meena Singh", "9876502222"],
  ];

  const inserted = students.map((student) => insertStudent.run(...student).lastInsertRowid);

  const insertComplaint = db.prepare(`
    INSERT INTO complaints (student_id, title, description, category, priority, status)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertComplaint.run(inserted[0], "Water leakage in bathroom", "Continuous seepage near the shower area.", "Maintenance", "High", "In Progress");
  insertComplaint.run(inserted[0], "Wi-Fi disconnecting often", "Internet drops every evening in the room.", "Technical", "Medium", "Open");
  insertComplaint.run(inserted[1], "Broken study lamp", "Hostel study lamp is not working.", "Electrical", "Low", "Resolved");

  const insertLeave = db.prepare(`
    INSERT INTO leave_applications (student_id, reason, start_date, end_date, status, approver_note)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertLeave.run(inserted[0], "Family function", "2026-07-14", "2026-07-17", "Pending", "");
  insertLeave.run(inserted[0], "Medical consultation", "2026-06-28", "2026-06-29", "Approved", "Approved by warden.");
  insertLeave.run(inserted[1], "Home visit", "2026-07-20", "2026-07-22", "Rejected", "Exam schedule clashes with leave dates.");

  const insertNotice = db.prepare(`
    INSERT INTO notices (title, content, category, is_important)
    VALUES (?, ?, ?, ?)
  `);

  insertNotice.run("Semester entry timings updated", "Entry gate closes at 9:30 PM on weekdays and 10:30 PM on weekends.", "Rules", 1);
  insertNotice.run("Water tank cleaning", "Water supply will be paused from 11 AM to 2 PM on Saturday for maintenance.", "Maintenance", 0);
  insertNotice.run("Hostel cultural night", "Registrations are open for music, dance, and stand-up performances.", "Events", 0);

  const insertMenu = db.prepare(`
    INSERT INTO mess_menu (day_of_week, meal_type, menu_items)
    VALUES (?, ?, ?)
  `);

  [
    ["Monday", "Breakfast", "Poha, banana, tea"],
    ["Monday", "Lunch", "Rice, dal tadka, paneer masala, salad"],
    ["Tuesday", "Dinner", "Chapati, rajma, jeera rice, gulab jamun"],
    ["Wednesday", "Breakfast", "Idli, sambar, coconut chutney"],
  ].forEach((entry) => insertMenu.run(...entry));

  const insertLostFound = db.prepare(`
    INSERT INTO lost_found (student_id, item_name, description, location, status, contact_info)
    VALUES (?, ?, ?, ?, ?, ?)
  `);

  insertLostFound.run(inserted[0], "Calculator", "Black scientific calculator with initials S.M.", "Reading room", "Lost", "9876543210");
  insertLostFound.run(inserted[1], "Water bottle", "Blue steel bottle found near hostel gate.", "Main gate", "Found", "aarav@hostelhub.com");
}

export default db;
