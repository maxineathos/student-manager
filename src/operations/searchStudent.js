// operations.js - Student Operations

import rl from "readline-sync";
import { students } from '../models/student.js';

function searchStudent(searchInput) {
    // If no parameter was provided, ask the user (this parameter was used to test the console.log)

    if (!searchInput) {
        searchInput = rl.question('Type Student ID or name => ');
    }

    let id = Number(parseInt(searchInput)); //transforms id (string) input into Integer number type

    console.log('')

    // If the field is filled and is a number, you will look for ID

    if (!isNaN(id) && searchInput !== "") {
        let studentById = students.find(student => Number(parseInt(student.id)) === id);
        if (studentById) {
            console.log(`📍 Student found by ID number: ${studentById.id}`);
            console.log('')
            console.log(`   ${studentById.name} | ${studentById.birthDate} | ${studentById.age} | [${studentById.grades.join(', ')}] => ${studentById.average.toFixed(1)}`);
            console.log('')
            return studentById;
        } else {
            console.log(`   ❌ No student found with this ID number (${id})`);
            console.log('')
            return;
        }

    }

    // will filter [insensitive case] all students who have a prefix in the completed field
    // For example, I put 'Bre' in Input //Exit: [Students found: Brena, Breno]

    let studentsFound = students.filter(student => student.name.toLowerCase().includes(searchInput.toLowerCase()));

    if (studentsFound.length > 0) {
        console.log(`📍 ${studentsFound.length} ${studentsFound.length > 1 ? 'students found' : 'student found'}`); // If only one student is found, he will print Student, singular. 
        // If more students are found, you will print STUDENTS in the plural.

        console.log('')

        studentsFound.forEach(student => { // Print each student found
            console.log(`   ${student.id} | ${student.name} | ${student.birthDate} | ${student.age} | ${student.grades.length !== 0 ? `[${student.grades.join(', ')}]` : 'No grades added yet'} => ${!isNaN(student.average) ? student.average.toFixed(1) : 'No average available'}`);
        });
    
    } else {
        console.log(`   ❌ No student found with name "${searchInput}"`);
    }

    console.log('')
}

export { searchStudent };