const url = "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/students_v2.json";
let students = [];
let outputData = document.getElementById("text")
fetch(url)
.then(data => data.json())
.then(data => {
students = data;
})
document.getElementById("btnOne").addEventListener("click", () =>{
    let studentsWithAverageGradeThree = students.filter(x => x.averageGrade > 3)
    outputData.innerText = studentsWithAverageGradeThree
        .map(student => `${student.firstName} ${student.lastName} Grade: ${student.averageGrade} \n`)
})
document.getElementById("btnTwo").addEventListener("click", () =>{
    let femaleStudentsWithAverageGradeFive = students.filter(x => x.gender === "Female" && x.averageGrade === 5)
    outputData.innerText = femaleStudentsWithAverageGradeFive
        .map(student => `${student.firstName} \n`)
})
document.getElementById("btnThree").addEventListener("click", () => {
    let maleStudentLiveSkopjeAndOverEighteen = students.filter(x => x.city === "Skopje" && x.age > 18)
    outputData.innerText = maleStudentLiveSkopjeAndOverEighteen
        .map(student => `${student.firstName} ${student.lastName} \n`)
})
document.getElementById("btnFour").addEventListener("click", () => {
    let femaleStudentsOver24AverageGrades = students.filter(x => x.age > 24)
    let totalGrades = femaleStudentsOver24AverageGrades.reduce((sum, student) => sum += student.averageGrade, 0);
    let averageGrade = totalGrades / femaleStudentsOver24AverageGrades.length;
        outputData.innerText = `Average grade of female students over 24 years old is: ${averageGrade}`
})
document.getElementById("btnFive").addEventListener("click", () => {
    let maleStudentStartingBAndAverageGrade2 = students.filter(x => x.gender === "Male" && x.averageGrade > 2 && x.firstName.startsWith("B"))
        .map(student => `${student.firstName} ${student.lastName} \n`)
        outputData.innerText = maleStudentStartingBAndAverageGrade2
})