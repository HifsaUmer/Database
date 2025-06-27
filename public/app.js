

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
    
    // Load semesters for a selected year
    async loadSemesters(year) {
      try {
        this.setView('semesters');
        this.selected.year = year;
        this.semesters = await this.fetchData(`/api/${year}/semesters`);
      } catch (error) {
        this.handleError(error, 'semesters');
      }
    },
    
    // Load classes for a selected semester
    async loadClass(semester) {
      try {
        this.setView('classes');
        this.selected.semester = semester;
        this.classes = await this.fetchData(`/api/${this.selected.year}/${semester}/classes`);
      } catch (error) {
        this.handleError(error, 'classes');
      }
    },
    
    // Load students for a selected class
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

        const response = await fetch(`/api/student/${regno}/datasheet?year=${this.selected.year}&semester=${this.selected.semester}`);

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

    console.log("Fetching semester records for:", { year, semester });
    console.log("Student data:", this.studentData.records);
  if (!this.studentData || !this.studentData.records) return [];
  return this.studentData.records;
},

getSemesterGPA(regno, year, semester) {

  // Validate parameters
  console.log(regno);
  console.log(year);
  console.log(semester);
  console.log("Searching for GPA with:", {
    regno: regno,
    year: String(year),
    semester: semester.toLowerCase()
  });
  if (!this.studentData || !this.studentData.gpa) {
    console.log("No student data or GPA data available");
    return null;
  }

  // Add detailed debugging logs
  console.log("Searching for GPA with:", {
    regno,
    year: String(year),
    semester: semester.toLowerCase()
  });
  
  console.log("Available GPA records:", this.studentData.gpa);
  
  const normSemester = (semester || '').trim().toLowerCase();
  const normYear = String(year);
  
  const gpa = this.studentData.gpa.find(g => {
    const match = 
      g.regno === regno && 
      String(g.year) === normYear && 
      (g.semester || '').toLowerCase() === normSemester;

    console.log(`Checking record:`, g, `Match: ${match}`);
    return match;
  });
  
  if (gpa) {
    console.log("Found matching GPA record:", gpa);
    return parseFloat(gpa.gpa).toFixed(2);
  }

  console.log("No matching GPA record found");
  return null;
}
    
  }));
});
