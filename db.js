// import pg from "pg";
// const { Pool } = pg;
// import 'dotenv/config';
// export const db = new Pool({
//     user: "postgres",
//     host: "localhost",
//     database: "postgres",
//     password: "demo",
//     port: 5433,
//     //options: "-c search_path=exams",
// });
 
// db.js
import pg from "pg";
const { Pool } = pg;
import 'dotenv/config';

const db = new Pool({
    user: "postgres",
    host: "localhost",
    database: "exams",
    password: "demo",
    port: 5432
});


export default {
  query: (text, params) => db.query(text, params),
}; // Default export