// import express from "express";
// const router = express.Router();
// import db from "../db.js";  // Default import (no braces)


// router.get('/course', async (req, res) => {
//     console.log("🟡 GET /course route was hit"); // Add this
//     try {
//         const course = `SELECT * FROM course`;
//         const { rows } = await db.query(course);
//         res.status(200).json(rows);
//     } catch (err) {
//         console.error("❌ Error querying DB:", err);
//         res.status(500).send(err.message);
//     }
// });
// router.get('/recap', async (req, res) => {
  
//     try {
//         const year = `SELECT year FROM recap `;
//         const { rows } = await db.query(year);
//         res.status(200).json(rows);
//     } catch (err) {
//         console.error("❌ Error querying DB:", err);
//         res.status(500).send(err.message);
//     }
// });


// router.get('/student/:name', async (req, res) => {
//     try {
//         const { name } = req.params;
//         const query = `SELECT * FROM student WHERE name = $1`;
//         const { rows } = await db.query(query, [name]);
//         res.status(200).json(rows);
//     } catch (err) {
//         res.status(500).send(err.message);
//     }
// });

// router.get('/student/:regno', async (req, res) => {
//     try {
//         const { regno } = req.params;
//         const student = await db.query(`SELECT * FROM student WHERE regno = $1;`, [regno]);
//         // const depts = await db.query(`SELECT * FROM department;`);
//         res.status(200).json({ student: student.rows });
//     } catch (err) { res.status(500).send(err.message); }
// });

// // router.post('/courses/save', async (req, res) => {
// //     console.log(req.body)
// //     try {
// //         const { course_id, title, dept_name, credits } = req.body
// //         const query = `UPDATE course SET title = $1, dept_name = $2, credits  = $3 WHERE course_id = $4 RETURNING *;`
// //         const result = await db.query(query, [title, dept_name, credits, course_id]);
// //         const { rows } = await db.query(`SELECT * FROM course ORDER BY course_id`);
// //         res.status(200).json(rows);
// //     } catch (err) { res.status(500).send(err.message); }
// // });

// //==================================================================================================================

// // SELECT *,  ROUND((CAST(total AS FLOAT) * 100 / CAST(x AS FLOAT))::NUMERIC , 2) Per
// /*
// SELECT *,  ROUND((CAST(total AS FLOAT) * 100 / CAST(x AS FLOAT))::NUMERIC , 2) Per
// FROM (
//     SELECT * , (
//         SELECT SUM(total)
//         FROM (
//             SELECT g.grade, COUNT(g.grade) total 
//             FROM cmarks m, grade g
//             WHERE rid = A.rid
//             AND hid = 246
//             AND ROUND(marks) BETWEEN g.start AND g.end
//             GROUP BY g.grade
//         ) B
//     ) x
//     FROM (
//     SELECT rid, g.grade, COUNT(g.grade) total 
//     FROM cmarks m, grade g
//     WHERE m.rid = 2000
//     AND hid = 246
//     AND ROUND(marks) BETWEEN g.start AND g.end
//     GROUP BY m.rid, g.grade
//     ) A
// ) C
// */



// export default router;
// import express from 'express';
// import db from '../db.js';

// const router = express.Router();

// router.get('/api/year', async (req, res) => {
//   try {
//     const result = await db.query(`
//       SELECT DISTINCT year FROM recap 
//       ORDER BY year DESC
//     `);
//     res.json(result.rows.map(row => row.year));
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to load years" });
//   }
// });

// router.get('/:year/semester', async (req, res) => {
//   try {
//     const result = await db.query(`
//       SELECT DISTINCT semester FROM recap 
//       WHERE year = $1 
//       ORDER BY semester
//     `, [req.params.year]);
//     res.json(result.rows.map(row => row.semester));
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to load semesters" });
//   }
// });

// router.get('/:year/:semester/students', async (req, res) => {
//   try {
//     const result = await db.query(`
//       SELECT s.regno, s.name 
//       FROM cmarks cm
//       JOIN student s ON cm.regno = s.regno
//       JOIN recap r ON cm.rid = r.rid
//       WHERE r.year = $1 AND r.semester = $2
//       ORDER BY s.name
//     `, [req.params.year, req.params.semester]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Database error:", err); 
//     res.status(500).json({ error: "Failed to load students" });
//   }
// });

// export default router;
// File: routes/api.js

// File: routes/api.js

// File: routes/api.js

import express from 'express';
import db from '../db.js'; // Make sure the path to your db.js file is correct

const router = express.Router();

// Handles GET /api/years
router.get('/years', async (req, res) => {
  try {
    const result = await db.query(`
      SELECT DISTINCT year FROM recap ORDER BY year DESC
    `);
    res.json(result.rows.map(row => row.year));
  } catch (err) {
    console.error("❌ Database error on /api/years:", err);
    res.status(500).json({ error: "Failed to load years" });
  }
});

// Handles GET /api/:year/semesters
router.get('/:year/semesters', async (req, res) => {
  const { year } = req.params;
  try {
    const result = await db.query(`
      SELECT DISTINCT semester FROM recap WHERE year = $1 ORDER BY semester
    `, [year]);
    res.json(result.rows.map(row => row.semester));
  } catch (err) {
    console.error(`❌ Database error on /api/${year}/semesters:`, err);
    res.status(500).json({ error: "Failed to load semesters" });
  }
});

// Handles GET /api/:year/:semester/students
router.get('/:year/:semester/students', async (req, res) => {
  const { year, semester } = req.params;
  try {
    const result = await db.query(`
      SELECT s.regno, s.name 
      FROM cmarks cm
      JOIN student s ON cm.regno = s.regno
      JOIN recap r ON cm.rid = r.rid
      WHERE r.year = $1 AND r.semester = $2
      ORDER BY s.name
    `, [year, semester]);
    res.json(result.rows);
  } catch (err) {
    console.error(`❌ Database error on /api/${year}/${semester}/students:`, err);
    res.status(500).json({ error: "Failed to load students" });
  }
});

export default router;