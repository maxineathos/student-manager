// utils.js - Utilities

import { students } from '../models/student.js';

// Prints Student List
function generateListOfStudents() {
    console.log(`📋 Student list`);
    console.log('');

    students.forEach(({ id, name, birthDate, age, grades, average }) => { //Deconstruction

        console.log(`- ${id} | ${name} | ${birthDate} | ${age} | ${grades.length !== 0 ? `[${grades.join(', ')}]` : 'No grades added yet'} => ${!isNaN(average) ? average.toFixed(1) : 'No average available'}`);
    });

    console.log('');

}

export { generateListOfStudents };