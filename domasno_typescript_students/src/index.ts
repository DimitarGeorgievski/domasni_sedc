interface Student {
  id: number;
  name: string;
  age: number;
  grades: number[];
}
interface Course {
  id: number;
  name: string;
  students: Student[];
  instructor: string;
  maxStudents: number;
}
enum GradeLevel {
  FRESHMAN,
  SOPHOMORE,
  JUNIOR,
  SENIOR,
}

class CourseManager {
  private courses: Course[] = [];

  getAllCourses(): Course[] {
    return this.courses;
  }
  getCourseById(id: number): Course | null {
    const foundCourse = this.courses.find((course) => course.id === id);
    if (!foundCourse) {
      return null;
    }
    return foundCourse;
  }
  AddNewCourse(Course: Course): void {
    this.courses.push(Course);
  }
  RemoveCourse(id: Number): Course[] | null {
    const foundCourse = this.courses.findIndex((course) => course.id === id);
    if (foundCourse === -1) {
      return null;
    }
    this.courses.splice(foundCourse, 1);
    return this.getAllCourses();
  }
}

const calculateAverageGrade = (students: Student[]) => {
  let totalsum: number = 0;
  let totalgrades: number = 0;
  students.forEach((student) => {
    student.grades.forEach((grade) => {
      totalsum += grade;
      totalgrades++;
    });
  });
  return totalsum / totalgrades;
};

const getGradeLevel = (studentsAge: number): GradeLevel => {
  if (studentsAge <= 18) {
    return GradeLevel.FRESHMAN;
  } else if (studentsAge === 19) {
    return 1 as GradeLevel;
  } else if (studentsAge === 20) {
    return 2 as GradeLevel;
  } else {
    return 3 as GradeLevel;
  }
};
const getTopStudents = (CourseId: number, filterStudents: number): Student[] | null => {
  const courses = manager.getAllCourses();
  const course = courses.find(course => course.id === CourseId);
  if(!course){
    return null;
  }
  const studentsGrades = course.students.map(student => {
    const sumGrades: number = student.grades.reduce((totalSum,grades) => totalSum + grades,0);
    const averageGrades:number = sumGrades / student.grades.length;
    return {student, averageGrades};
  })
  .sort((a, b) => b.averageGrades - a.averageGrades).slice(0, filterStudents).map(studentInfo => studentInfo.student);
  return studentsGrades
};

// Testing Functions
const students: Student[] = [
  { id: 1, name: "Marko", age: 18, grades: [3, 3, 3] },
  { id: 2, name: "Ana", age: 19, grades: [5, 4, 2] },
  { id: 3, name: "Ivan", age: 20, grades: [3, 2, 3] },
  { id: 4, name: "Tom", age: 17,  grades: [5, 6, 7]},
  { id: 5, name: "Emily", age: 16, grades: [8, 8, 9]},
];

const WebCourse: Course = {
  id: 1,
  name: "Web Development Course",
  students: students,
  instructor: "John Doe",
  maxStudents: 5,
};
const DesignCourse: Course = {
  id: 2,
  name: "Design Course",
  students: students,
  instructor: "Bob Bobsky",
  maxStudents: 4,
};

const manager = new CourseManager();
manager.AddNewCourse(WebCourse);
manager.AddNewCourse(DesignCourse);
manager.RemoveCourse(2);
console.log(manager.getAllCourses());
console.log(manager.getCourseById(1));

const average = calculateAverageGrade(students);
console.log(average);

console.log(getGradeLevel(20));

console.log(getTopStudents(1,3))