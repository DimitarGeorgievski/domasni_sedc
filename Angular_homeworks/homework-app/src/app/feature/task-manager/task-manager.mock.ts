import { TaskStatus } from "./models/task.enum";
import { Task } from "./models/task.model";

export const mockTasks: Task[] = [
  {
    id: 1,
    title: "Finish React project",
    details: "Complete the student grade management system and push to GitHub.",
    status: TaskStatus.PENDING,
  },
  {
    id: 2,
    title: "Write seminar paper",
    details: "Prepare 13-page paper on polymorphism in C#.",
    status: TaskStatus.PENDING,
  },
  {
    id: 3,
    title: "Go to the gym",
    details: "Chest day workout with bench press, dips and push-ups.",
    status: TaskStatus.COMPLETED,
  },
  {
    id: 4,
    title: "Study Angular",
    details: "Learn about modules, components and services.",
    status: TaskStatus.PENDING,
  },
  {
    id: 5,
    title: "Clean the apartment",
    details: "Vacuum, wash dishes and organize workspace.",
    status: TaskStatus.COMPLETED,
  },
  {
    id: 6,
    title: "Prepare CV",
    details: "Update CV with latest projects and education for internship.",
    status: TaskStatus.PENDING,
  },
  {
    id: 7,
    title: "Call family",
    details: "Check in with parents and update them on university progress.",
    status: TaskStatus.COMPLETED,
  },
  {
    id: 8,
    title: "Learn Node.js",
    details: "Practice Express.js routing and middleware.",
    status: TaskStatus.PENDING,
  },
  {
    id: 9,
    title: "Learn React",
    details: "Practice React routing.",
    status: TaskStatus.COMPLETED,
  },
];
