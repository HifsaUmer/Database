

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
