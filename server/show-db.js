import Database from "better-sqlite3";

const db = new Database("server/data/hostelhub.db");

const students = db
  .prepare(
    `
      SELECT id, full_name, email, block, room_number, course, year_level
      FROM students
      ORDER BY id
    `
  )
  .all();

console.log("\nStudents in HostelHub database:\n");
console.table(students);
