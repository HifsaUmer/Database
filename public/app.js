// function App() {
//     return {
//         page: 1,
//         courses: [],  // List of courses
//         years: {},    // Single department
//         year: {},   // Single course (if needed)
//         students: [],    // List of departments
//         // async getCourse() { 
//         //     try {
//         //         const response = await fetch('/api/course');
//         //         if (!response.ok) throw new Error('Failed to fetch courses');
//         //         this.courses = await response.json();  // Assign to courses (plural)
//         //         console.log(this.courses);
//         //     } catch (error) {
//         //         console.error('Error fetching courses:', error);
//         //     }
//         // },
//          async getYears() { 
//             try {
//                 const response = await fetch('/api/recap');
//                 if (!response.ok) throw new Error('Failed to fetch courses');
//                 this.years = await response.json();  // Assign to courses (plural)
//                 console.log(this.years);
//             } catch (error) {
//                 console.error('Error fetching student:', error);
//             }
//         },
//     };
// }
// public/app.js



// function App() {
//   return {
//     view: 'year',
//     years: [],
//     semesters: [],
//     students: [],
//     selected: { year: null, semester: null },
//     loading: false,
//     error: null,

//     async init() {
//       await this.loadYears();
//     },

//     async loadYears() {
//       this.view = 'year';
//       this.loading = true;
//       this.error = null;
//       try {
//         const response = await fetch('/api/year');
//         if (!response.ok) throw new Error('Failed to load years');
//         this.years = await response.json();
//       } catch (err) {
//         this.error = err.message;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadSemesters(year) {
//       this.view = 'semester';
//       this.loading = true;
//       this.error = null;
//       this.selected.year = year;
//       try {
//         const response = await fetch(`/api/${year}/semester`);
//         if (!response.ok) throw new Error('Failed to load semesters');
//         this.semesters = await response.json();
//       } catch (err) {
//         this.error = err.message;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadStudents(semester) {
//       this.view = 'student';
//       this.loading = true;
//       this.error = null;
//       this.selected.semester = semester;
//       try {
//         const response = await fetch(`/api/${this.selected.year}/${semester}/student`);
//         if (!response.ok) throw new Error('Failed to load students');
//         this.students = await response.json();
//       } catch (err) {
//         this.error = err.message;
//       } finally {
//         this.loading = false;
//       }
//     }
//   };
// }
// File: public/app.js

// The function name "App" (capital A) must match what's in x-data in the HTML
// File: public/app.js

// File: public/app.js

document.addEventListener('alpine:init', () => {
  // Define the component data. The name 'academicBrowser' must match x-data in the HTML.
  Alpine.data('academicBrowser', () => ({
    view: 'years',
    years: [],
    semesters: [],
    students: [],
    selected: { year: null, semester: null },
    loading: false,
    error: null,

    // init() is called automatically by Alpine when the component loads
    init() {
      console.log('CSP-safe Alpine component initialized. Loading years...');
      this.loadYears();
    },

    async loadYears() {
      this.view = 'years';
      this.loading = true;
      this.error = null;
      try {
        const response = await fetch('/api/years');
        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        this.years = await response.json();
      } catch (err) {
        this.error = `Failed to load years. ${err.message}`;
      } finally {
        this.loading = false;
      }
    },

    async loadSemesters(year) {
      this.view = 'semesters';
      this.loading = true;
      this.error = null;
      this.selected.year = year;
      try {
        const response = await fetch(`/api/${year}/semesters`);
        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        this.semesters = await response.json();
      } catch (err) {
        this.error = `Failed to load semesters. ${err.message}`;
      } finally {
        this.loading = false;
      }
    },

    async loadStudents(semester) {
      this.view = 'students';
      this.loading = true;
      this.error = null;
      this.selected.semester = semester;
      try {
        const response = await fetch(`/api/${this.selected.year}/${semester}/students`);
        if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
        this.students = await response.json();
      } catch (err) {
        this.error = `Failed to load students. ${err.message}`;
      } finally {
        this.loading = false;
      }
    }
  }));
});