const studentId = Symbol("id")
const libraryId = Symbol("id")

let student = {
    name: "Abhi",
    id: 101
}

student[studentId] = "STU123"
student[libraryId] = "LIB456"

console.log("Normal id:", student.id)
console.log("Student Unique ID:", student[studentId])
console.log("Library Unique ID:", student[libraryId])

console.log(studentId === libraryId)