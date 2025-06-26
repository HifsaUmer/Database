

// document.addEventListener('alpine:init', () => {
//   // Define the component data. The name 'academicBrowser' must match x-data in the HTML.
//   Alpine.data('academicBrowser', () => ({
//     view: 'years',
//     years: [],
//     classes:[],
//     semesters: [],
//     students: [],
//     selected: { year: null, semester: null,Class:null },
//     loading: false,
//     error: null,

//     // init() is called automatically by Alpine when the component loads
//     init() {
//       console.log('CSP-safe Alpine component initialized. Loading years...');
//       this.loadYears();
//     },

//     async loadYears() {
//       this.view = 'years';
//       this.loading = true;
//       this.error = null;
//       try {
//         const response = await fetch('/api/years');
//         if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
//         this.years = await response.json();
//       } catch (err) {
//         this.error = `Failed to load years. ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadSemesters(year) {
//       this.view = 'semesters';
//       this.loading = true;
//       this.error = null;
//       this.selected.year = year;
//       try {
//         const response = await fetch(`/api/${year}/semesters`);
//         if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
//         this.semesters = await response.json();
//       } catch (err) {
//         this.error = `Failed to load semesters. ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },
//       async loadClass(semester) {
//       this.view = 'classes';
//       this.loading = true;
//       this.error = null;
//       this.selected.semester = semester;
//       try {
//         const response = await fetch(`/api/${this.selected.year}/${this.selected.semester}/classes`);
//         if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
//         this.classes = await response.json();
//       } catch (err) {
//         this.error = `Failed to load class. ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadStudents(Class) {
//       this.view = 'students';
//       this.loading = true;
//       this.error = null;
//       this.selected.Class = Class;
//       try {
//         const response = await fetch(`/api/${this.selected.year}/${this.selected.semester}/${this.selected.Class} /students`);
//         if (!response.ok) throw new Error(`Server error: ${response.statusText}`);
//         this.students = await response.json();
//       } catch (err) {
//         this.error = `Failed to load students. ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     }
//   }));
// });


//  document.addEventListener('alpine:init', () => {
//   Alpine.data('academicBrowser', () => ({
//     view: 'years',
//     years: [],
//     classes: [],
//     semesters: [],
//     students: [],
//     selected: { year: null, semester: null, class: null },
//     loading: false,
//     error: null,

//     init() {
//       console.log('Initializing academic browser...');
//       this.loadYears();
//     },

//     async loadYears() {
//       this.view = 'years';
//       this.loading = true;
//       this.error = null;
//       try {
//         const response = await fetch('/api/years');
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.years = await response.json();
//         console.log('Loaded years:', this.years);
//       } catch (err) {
//         console.error('Error loading years:', err);
//         this.error = `Failed to load years: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadSemesters(year) {
//       this.view = 'semesters';
//       this.loading = true;
//       this.error = null;
//       this.selected.year = year;
//       try {
//         const response = await fetch(`/api/${year}/semesters`);
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.semesters = await response.json();
//         console.log('Loaded semesters:', this.semesters);
//       } catch (err) {
//         console.error('Error loading semesters:', err);
//         this.error = `Failed to load semesters: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadClass(semester) {
//       this.view = 'classes';
//       this.loading = true;
//       this.error = null;
//       this.selected.semester = semester;
//       try {
//         const response = await fetch(`/api/${this.selected.year}/${semester}/classes`);
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.classes = await response.json();
//         console.log('Loaded classes:', this.classes);
//       } catch (err) {
//         console.error('Error loading classes:', err);
//         this.error = `Failed to load classes: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

// async loadStudents(classItem) {
//   this.view = 'students';
//   this.loading = true;
//   this.error = null;
//   this.selected.class = classItem;
  
//   try {
//     // Encode the class parameter to handle special characters
//     const url = `/api/${this.selected.year}/${this.selected.semester}/${encodeURIComponent(classItem)}/students`;
    
//     const response = await fetch(url);
    
//     if (!response.ok) {
//       const error = await response.json();
//       throw new Error(error.message || `Server error: ${response.status}`);
//     }

//     this.students = await response.json();
    
//     if (!Array.isArray(this.students)) {
//       throw new Error("Invalid data format received from server");
//     }
    
//   } catch (err) {
//     console.error("Error loading students:", err);
//     this.error = `Failed to load students: ${err.message}`;
//     this.students = []; // Reset students array on error
//   } finally {
//     this.loading = false;
//   }
// }
//   }));
// });

// document.addEventListener('alpine:init', () => {
//   Alpine.data('academicBrowser', () => ({
//     // Existing properties
//     view: 'years',
//     years: [],
//     classes: [],
//     semesters: [],
//     students: [],
//     selected: { 
//       year: null, 
//       semester: null, 
//       class: null,
//       student: null
//     },
//     studentData: null,
//     loading: false,
//     error: null,

//     // Existing methods
//     init() {
//       this.loadYears();
//     },

//     async loadYears() {
//       this.view = 'years';
//       this.loading = true;
//       this.error = null;
//       try {
//         const response = await fetch('/api/years');
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.years = await response.json();
//       } catch (err) {
//         this.error = `Failed to load years: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadSemesters(year) {
//       this.view = 'semesters';
//       this.loading = true;
//       this.error = null;
//       this.selected.year = year;
//       try {
//         const response = await fetch(`/api/${year}/semesters`);
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.semesters = await response.json();
//       } catch (err) {
//         this.error = `Failed to load semesters: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadClass(semester) {
//       this.view = 'classes';
//       this.loading = true;
//       this.error = null;
//       this.selected.semester = semester;
//       try {
//         const response = await fetch(`/api/${this.selected.year}/${semester}/classes`);
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.classes = await response.json();
//       } catch (err) {
//         this.error = `Failed to load classes: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     async loadStudents(classItem) {
//       this.view = 'students';
//       this.loading = true;
//       this.error = null;
//       this.selected.class = classItem;
//       try {
//         const response = await fetch(
//           `/api/${this.selected.year}/${this.selected.semester}/${encodeURIComponent(classItem)}/students`
//         );
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.students = await response.json();
//       } catch (err) {
//         this.error = `Failed to load students: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     // New method for loading student datasheet
//     async loadStudentData(regno) {
//       this.view = 'studentData';
//       this.loading = true;
//       this.error = null;
//       this.selected.student = regno;
//       try {
//         const response = await fetch(`/api/student/${regno}/datasheet`);
//         if (!response.ok) throw new Error(`Server error: ${response.status}`);
//         this.studentData = await response.json();
//       } catch (err) {
//         this.error = `Failed to load student data: ${err.message}`;
//       } finally {
//         this.loading = false;
//       }
//     },

//     // Helper to group records by semester
//     getSemesterRecords(year, semester) {
//       return this.studentData?.records.filter(r => 
//         r.year === year && r.semester === semester
//       ) || [];
//     },

//     // Helper to get semester GPA
//     getSemesterGPA(year, semester) {
//       if (!this.studentData?.gpa) return 'N/A';
//       const found = this.studentData.gpa.find(g => 
//         g.year === year && g.semester === semester
//       );
//       return found ? found.gpa.toFixed(2) : 'N/A';
//     }
//   }));
// });
document.addEventListener('alpine:init', () => {
  Alpine.data('academicBrowser', () => ({
    // Navigation state
    view: 'years',
    loading: false,
    error: null,
    
    // Data collections
    years: [],
    semesters: [],
    classes: [],
    students: [],
    
    // Selected items
    selected: {
      year: null,
      semester: null,
      class: null,
      student: null
    },
    
    // Student datasheet data
    studentData: null,
    
    // Initialize with years
    init() {
      this.loadYears();
    },
      hasPerformanceData() {
      return this.studentData?.performance?.length > 0;
    },
    
    // Navigation methods
    async loadYears() {
      try {
        this.setView('years');
        this.years = await this.fetchData('/api/years');
      } catch (error) {
        this.handleError(error, 'years');
      }
    },
    
    async loadSemesters(year) {
      try {
        this.setView('semesters');
        this.selected.year = year;
        this.semesters = await this.fetchData(`/api/${year}/semesters`);
      } catch (error) {
        this.handleError(error, 'semesters');
      }
    },
    
    async loadClass(semester) {
      try {
        this.setView('classes');
        this.selected.semester = semester;
        this.classes = await this.fetchData(`/api/${this.selected.year}/${semester}/classes`);
      } catch (error) {
        this.handleError(error, 'classes');
      }
    },
    
    async loadStudents(classItem) {
      try {
        this.setView('students');
        this.selected.class = classItem;
        this.students = await this.fetchData(
          `/api/${this.selected.year}/${this.selected.semester}/${encodeURIComponent(classItem)}/students`
        );
      } catch (error) {
        this.handleError(error, 'students');
      }
    },
    
      // Load detailed student data
   async loadStudentData(regno) {
      try {
        this.setView('studentData');
        this.loading = true;
        this.error = null;
        this.selected.student = regno;
        
        const response = await fetch(`/api/student/${regno}/datasheet`);
        
        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.message || 'Failed to load student data');
        }
        
        const data = await response.json();
        
        // Ensure performance array exists
        if (!data.performance) {
          data.performance = [];
        }
        
        this.studentData = data;
      } catch (error) {
        console.error("Error loading student data:", error);
        this.error = `Failed to load student data: ${error.message}`;
        this.studentData = null;
      } finally {
        this.loading = false;
      }
    },
    
    // Helper methods
    async fetchData(url) {
      this.loading = true;
      this.error = null;
      
      const response = await fetch(url);
      if (!response.ok) {
        const error = await response.json().catch(() => null);
        throw new Error(error?.message || `Server returned ${response.status}`);
      }
      
      this.loading = false;
      return await response.json();
    },
    
    setView(view) {
      this.view = view;
      this.loading = true;
      this.error = null;
    },
    
    handleError(error, context) {
      console.error(`Error loading ${context}:`, error);
      this.error = `Failed to load ${context}: ${error.message}`;
      this.loading = false;
    },
    
    // Datasheet helpers
   getSemesterRecords(year, semester) {
  if (!this.studentData || !this.studentData.records) return [];
  return this.studentData.records.filter(r => 
    r.year === year && r.semester === semester
  );
},

getSemesterGPA(year, semester) {
  if (!this.studentData || !this.studentData.gpa) return null;
  const gpa = this.studentData.gpa.find(g => 
    g.year === year && g.semester === semester
  );
  return gpa ? gpa.gpa.toFixed(2) : null;
}
    
  }));
});

