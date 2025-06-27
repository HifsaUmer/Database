




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

// import express from 'express';
// import db from '../db.js';

// const router = express.Router();

// // Get all distinct years
// router.get('/years', async (req, res) => {
//   try {
//     const result = await db.query(`
//       SELECT DISTINCT year FROM recap ORDER BY year DESC
//     `);
//     res.json(result.rows.map(row => row.year));
//   } catch (err) {
//     console.error("Database error on /api/years:", err);
//     res.status(500).json({ error: "Failed to load years" });
//   }
// });

// // Get semesters for a specific year
// router.get('/:year/semesters', async (req, res) => {
//   const { year } = req.params;
//   try {
//     const result = await db.query(`
//       SELECT DISTINCT semester FROM recap 
//       WHERE year = $1 
//       ORDER BY semester
//     `, [year]);
//     res.json(result.rows.map(row => row.semester));
//   } catch (err) {
//     console.error(`Database error on /api/${year}/semesters:`, err);
//     res.status(500).json({ error: "Failed to load semesters" });
//   }
// });

// // Get classes for a specific year and semester
// router.get('/:year/:semester/classes', async (req, res) => {
//   const { year, semester } = req.params;
//   try {
//     const result = await db.query(`
//       SELECT DISTINCT class FROM recap 
//       WHERE year = $1 AND semester = $2
//       ORDER BY class
//     `, [year, semester]);
//     res.json(result.rows.map(row => row.class));
//   } catch (err) {
//     console.error(`Database error on /api/${year}/${semester}/classes:`, err);
//     res.status(500).json({ error: "Failed to load classes" });
//   }
// });

// Get students for a specific year, semester, and class
// router.get('/:year/:semester/:class/students', async (req, res) => {
//   const { year, semester, class: classItem } = req.params;
//   try {
//     const result = await db.query(`
//       // SELECT s.regno, s.name 
//       // FROM cmarks cm
//       // JOIN student s ON cm.regno = s.regno
//       // JOIN recap r ON cm.rid = r.rid
//       // WHERE r.year = $1 AND r.semester = $2 AND r.class = $3
//       // ORDER BY s.name
//       SELECT s.regno, s.name,r.class
//        FROM recap r 
//       JOIN marks m ON r.rid=m.rid 
//       JOIN student s ON s.regno=m.regno
//       WHERE r.year =$1 AND r.semester = $2 AND r.class =$3
//        ORDER BY r.class asc ;
//     `, [year, semester, classItem]);
//     res.json(result.rows);
//   } catch (err) {
//     console.error(`Database error on /api/${year}/${semester}/${classItem}/students:`, err);
//     res.status(500).json({ error: "Failed to load students" });
//   }
// });
// router.get('/:year/:semester/:class/students', async (req, res) => {
//   const { year, semester, class: className } = req.params;

//   try {
//     // 1. Get the recap ID first
//     const recapQuery = await db.query(
//       `SELECT rid FROM recap 
//        WHERE year = $1 AND semester = $2 AND class = $3`,
//       [year, semester, className]
//     );

//     if (recapQuery.rows.length === 0) {
//       return res.status(404).json({ error: 'Class record not found' });
//     }

//     const rid = recapQuery.rows[0].rid;

//     // 2. Get students through cmarks
//     const studentsQuery = await db.query(
//       `SELECT s.regno, s.name 
//        FROM cmarks cm
//        JOIN student s ON cm.regno = s.regno
//        WHERE cm.rid = $1
//        group by s.regno,s.name
//        ORDER BY s.regno`,
//       [rid]
//     );

//     res.json(studentsQuery.rows);

//   } catch (err) {
//     console.error('Database error:', err);
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// export default router;


// import express from 'express';
// import db from '../db.js';

// const router = express.Router();

// // Existing routes
// router.get('/years', async (req, res) => {
//   try {
//     const result = await db.query(`SELECT DISTINCT year FROM recap ORDER BY year DESC`);
//     res.json(result.rows.map(row => row.year));
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to load years" });
//   }
// });

// router.get('/:year/semesters', async (req, res) => {
//   const { year } = req.params;
//   try {
//     const result = await db.query(
//       `SELECT DISTINCT semester FROM recap WHERE year = $1 ORDER BY semester`,
//       [year]
//     );
//     res.json(result.rows.map(row => row.semester));
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to load semesters" });
//   }
// });

// router.get('/:year/:semester/classes', async (req, res) => {
//   const { year, semester } = req.params;
//   try {
//     const result = await db.query(
//       `SELECT DISTINCT class FROM recap WHERE year = $1 AND semester = $2 ORDER BY class`,
//       [year, semester]
//     );
//     res.json(result.rows.map(row => row.class));
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to load classes" });
//   }
// });

// router.get('/:year/:semester/:class/students', async (req, res) => {
//   const { year, semester, class: className } = req.params;
//   try {
//     const result = await db.query(
//       `SELECT s.regno, s.name 
//        FROM cmarks cm
//        JOIN student s ON cm.regno = s.regno
//        JOIN recap r ON cm.rid = r.rid
//        WHERE r.year = $1 AND r.semester = $2 AND r.class = $3
//        GROUP BY s.regno, s.name
//        ORDER BY s.name`,
//       [year, semester, className]
//     );
//     res.json(result.rows);
//   } catch (err) {
//     console.error("Database error:", err);
//     res.status(500).json({ error: "Failed to load students" });
//   }
// });

// // New routes for student datasheet
// router.get('/student/:regno/datasheet', async (req, res) => {
//   const { regno } = req.params;
//   try {
//     // Student info
//     const student = await db.query(
//       `SELECT * FROM student WHERE regno = $1`, 
//       [regno]
//     );
    
//     // Academic records grouped by semester
//     const records = await db.query(`
//       SELECT 
//         r.year, r.semester, r.class,
//         c.course_id, c.title, c.credits,
//         cm.marks, g.grade, g.points
//       FROM cmarks cm
//       JOIN recap r ON cm.rid = r.rid
//       JOIN course c ON cm.course_id = c.course_id
//       JOIN grade g ON ROUND(cm.marks) BETWEEN g.start AND g.end
//       WHERE cm.regno = $1
//       ORDER BY r.year DESC, r.semester DESC
//     `, [regno]);

//     // GPA per semester
//     const gpa = await db.query(`
//       SELECT 
//         r.year, r.semester,
//         SUM(c.credits * g.points) / NULLIF(SUM(c.credits), 0) AS gpa
//       FROM cmarks cm
//       JOIN recap r ON cm.rid = r.rid
//       JOIN course c ON cm.course_id = c.course_id
//       JOIN grade g ON ROUND(cm.marks) BETWEEN g.start AND g.end
//       WHERE cm.regno = $1
//       GROUP BY r.year, r.semester
//       ORDER BY r.year, r.semester
//     `, [regno]);

//     // Overall CGPA
//     const cgpa = await db.query(`
//       SELECT 
//         SUM(c.credits * g.points) / NULLIF(SUM(c.credits), 0) AS cgpa
//       FROM cmarks cm
//       JOIN course c ON cm.course_id = c.course_id
//       JOIN grade g ON ROUND(cm.marks) BETWEEN g.start AND g.end
//       WHERE cm.regno = $1
//     `, [regno]);

//     res.json({
//       student: student.rows[0],
//       records: records.rows,
//       gpa: gpa.rows,
//       cgpa: cgpa.rows[0]?.cgpa || 0
//     });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Server error' });
//   }
// });

// export default router;

import express from 'express';
import db from '../db.js';

const router = express.Router();

// Existing academic browser routes
router.get('/years', async (req, res) => {
  try {
    const result = await db.query('SELECT DISTINCT year FROM recap ORDER BY year DESC');
    res.json(result.rows.map(row => row.year));
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to load years" });
  }
});

router.get('/:year/semesters', async (req, res) => {
  const { year } = req.params;
  try {
    const result = await db.query(
      'SELECT DISTINCT semester FROM recap WHERE year = $1 ORDER BY semester',
      [year]
    );
    res.json(result.rows.map(row => row.semester));
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to load semesters" });
  }
});

router.get('/:year/:semester/classes', async (req, res) => {
  const { year, semester } = req.params;
  try {
    const result = await db.query(
      'SELECT DISTINCT class FROM recap WHERE year = $1 AND semester = $2 ORDER BY class',
      [year, semester]
    );
    res.json(result.rows.map(row => row.class));
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to load classes" });
  }
});

router.get('/:year/:semester/:class/students', async (req, res) => {
  const { year, semester, class: className } = req.params;
  try {
    const result = await db.query(
      `SELECT s.regno, s.name 
       FROM cmarks cm
       JOIN student s ON cm.regno = s.regno
       JOIN recap r ON cm.rid = r.rid
       WHERE r.year = $1 AND r.semester = $2 AND r.class = $3
       GROUP BY s.regno, s.name
       ORDER BY s.name`,
      [year, semester, className]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Database error:", err);
    res.status(500).json({ error: "Failed to load students" });
  }
});

// Enhanced student datasheet route
// router.get('/student/:regno/datasheet', async (req, res) => {
//   const { regno } = req.params;
  
//   try {
//     // 1. Get student basic info
//     const studentQuery = await db.query(
//       `SELECT s.*, d.name AS degree_name 
//        FROM student s
//        LEFT JOIN degree d ON s.did = d.did
//        WHERE s.regno = $1`,
//       [regno]
//     );

//     if (studentQuery.rows.length === 0) {
//       return res.status(404).json({ error: 'Student not found' });
//     }

//     // 2. Get academic performance
//     const performanceQuery = await db.query(`
//       SELECT 
//         r.year,
//         r.semester,
//         r.class,
//         c.cid AS course_id,
//         c.title,
//         c.credits,
//         cm.marks,
//         g.grade,
//         g.points,
//         f.name AS faculty_name,
//         cd.name AS distribution_name
//       FROM cmarks cm
//       JOIN recap r ON cm.rid = r.rid
//       JOIN course c ON cm.cid = c.cid
//       JOIN faculty f ON cm.fid = f.fid
//       JOIN cdist cd ON cm.cdid = cd.cdid
//       JOIN grade g ON cm.marks BETWEEN g.start AND g.end
//       WHERE cm.regno = $1
//       ORDER BY r.year DESC, r.semester DESC
//     `, [regno]);

//     // 3. Calculate GPA per semester
//     const gpaQuery = await db.query(`
//       SELECT 
//         r.year,
//         r.semester,
//         COALESCE(SUM(c.credits * g.points) / NULLIF(SUM(c.credits), 0), 0) AS gpa,
//         SUM(c.credits) AS credits_earned
//       FROM cmarks cm
//       JOIN recap r ON cm.rid = r.rid
//       JOIN course c ON cm.cid = c.cid
//       JOIN grade g ON cm.marks BETWEEN g.start AND g.end
//       WHERE cm.regno = $1
//       GROUP BY r.year, r.semester
//       ORDER BY r.year, r.semester
//     `, [regno]);

//     // 4. Calculate CGPA
//     const cgpaQuery = await db.query(`
//       SELECT 
//         COALESCE(SUM(c.credits * g.points) / NULLIF(SUM(c.credits), 0), 0) AS cgpa,
//         SUM(c.credits) AS total_credits
//       FROM cmarks cm
//       JOIN course c ON cm.cid = c.cid
//       JOIN grade g ON cm.marks BETWEEN g.start AND g.end
//       WHERE cm.regno = $1
//     `, [regno]);

//     // 5. Get attendance summary
//     const attendanceQuery = await db.query(`
//       SELECT 
//         r.year,
//         r.semester,
//         COUNT(*) AS total_classes,
//         SUM(CASE WHEN a.status THEN 1 ELSE 0 END) AS attended,
//         ROUND(SUM(CASE WHEN a.status THEN 1 ELSE 0 END) * 100.0 / NULLIF(COUNT(*), 0), 2) AS percentage
//       FROM attendance a
//       JOIN cdist cd ON a.cdid = cd.cdid
//       JOIN recap r ON cd.rid = r.rid
//       WHERE a.regno = $1
//       GROUP BY r.year, r.semester
//       ORDER BY r.year, r.semester
//     `, [regno]);

//     res.json({
//       student: studentQuery.rows[0],
//       performance: performanceQuery.rows,
//       gpa: gpaQuery.rows,
//       cgpa: cgpaQuery.rows[0]?.cgpa || 0,
//       total_credits: cgpaQuery.rows[0]?.total_credits || 0,
//       attendance: attendanceQuery.rows
//     });

//   } catch (err) {
//     console.error('DATASHEET ERROR:', err);
//     res.status(500).json({ 
//       error: 'Internal server error',
//       details: process.env.NODE_ENV === 'development' ? {
//         message: err.message,
//         query: err.query,
//         parameters: err.parameters
//       } : null
//     });
//   }
// });
router.get('/student/:regno/datasheet', async (req, res) => {
  const { regno } = req.params;
  const { year, semester } = req.query;
  try {
    // 1. Get student basic info first
    const studentQuery = await db.query(
      `SELECT * FROM student WHERE regno = $1`,
      [regno]
    );

    if (studentQuery.rows.length === 0) {
      return res.status(404).json({ error: 'Student not found' });
    }

    // 2. Get academic records
    const recordsQuery = await db.query(`
        select code, title, theorycredits, labcredits, totalcredits, marks, grade, gpa from exam_marks
        where regno = $1 and year = $2 and semester = $3`, [regno, year, semester]);


    /*
    const recordsQuery = await db.query(`
      SELECT 
        c.cid,
        c.title,
        c.theory,
        c.lab,
        (SELECT SUM(m.marks) 
        FROM cmarks m 
        WHERE m.regno = $1 
        AND m.rid IN (SELECT r.rid FROM recap r WHERE r.cid = c.cid)
        ) AS total_marks,
        (
          SELECT g.grade
          FROM grade g
          WHERE ROUND(
            (SELECT SUM(m.marks)
            FROM cmarks m 
            WHERE m.regno = $1 
            AND m.rid IN (SELECT r.rid FROM recap r WHERE r.cid = c.cid)
          )) BETWEEN g.start AND g.end
          LIMIT 1
        ) AS final_grade
      FROM course c
      WHERE EXISTS (
        SELECT 1 
        FROM cmarks cm
        JOIN recap r ON cm.rid = r.rid
        WHERE cm.regno = $1 AND r.cid = c        .cid
      )
      ORDER BY c.cid;
    `, [regno]);
    */
    // 3. Calculate GPA per semester
    
    const gpaQuery = await db.query(`
      select regno, semester, year, class, round((aa.tm/aa.tt),2) gpa from (
        select regno, semester, year, class, sum(totalcredits) tt, sum(gpa*totalcredits) tm from exam_marks
        group by regno, semester, year, class
      ) aa
      where regno = $1 and year = $2 and semester = $3 
      order by regno, class, semester, year, class`, [regno, year, semester]);
  
    // 4. Calculate CGPA

      const cgpaQuery = await db.query(`
        SELECT 
            regn AS regnumber,  -- Use the alias from bb subquery
            SUM(tt) AS total_credits,
            ROUND(SUM(tm) / SUM(tt), 2) AS cgpa  -- Calculate CGPA correctly
        FROM (
            SELECT 
                regnumber AS regn, 
                semester, 
                year, 
                class, 
                tt, 
                tm  -- Keep tm for CGPA calculation
            FROM (
                SELECT 
                    regno AS regnumber, 
                    semester, 
                    year, 
                    class, 
                    SUM(totalcredits) AS tt, 
                    SUM(gpa * totalcredits) AS tm 
                FROM exam_marks
                WHERE regno = $1
                GROUP BY regno, semester, year, class
            ) aa
        ) bb
        GROUP BY regn;`, [regno]);
    
    res.json({
      student: studentQuery.rows[0],
      records: recordsQuery.rows,
      gpa: gpaQuery.rows,
      cgpa: cgpaQuery.rows[0]?.cgpa || 0,
      totalcredits: cgpaQuery.rows[0]?.total_credits || 0
    });

    console.log(` Response : ${cgpaQuery.rows[0]?.total_credits || 0} credits and CGPA: ${cgpaQuery.rows[0]?.cgpa || 0}`);

  } catch (err) {
    console.error('DATASHEET ERROR:', err);
    res.status(500).json({ 
      error: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? err.message : undefined
    });
  }
});

export default router;
