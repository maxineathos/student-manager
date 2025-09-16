// operations.js -Student Operations

import rl from "readline-sync";
import { students, generateStudentId, saveStudents } from '../models/student.js';
import { parse, isValid } from 'date-fns';

// add students function

function addStudent() {

    console.log('➕ Add student');
    console.log('');

    let name;
    let birthDate;
    let grades;

    // QUESTION LOOPS 


    while (true) {
        name = rl.question(`What is the student full name? => `);

        if (name.length !== 0 && /^[A-Za-z\s]+$/.test(name)) { // check if it's string or number (we can't name people with numbers haha) and if it's filled with something
            break
        } else {
            console.log(`   ❌ Invalid name. It's not allowed to use numbers in this field.`);
            console.log('');
        }
    }

    while (true) {
        birthDate = rl.question(`What is the student birth date? (YYYY/MM/DD) => `);

        const parsedDate = parse(birthDate, 'yyyy/MM/dd', new Date()); // through the Date-FNS library will check that the string inserted
        
        // that corresponds to the configured format
        const birthYear = parsedDate.getFullYear();

        // If the format is correct, it will validate the following limits        
        if (isValid(parsedDate)) {
            
            // Limits: Born between 1920 and 2010
            if (birthYear < 1920) {
                console.log('');
                console.log('  ❌ Birth year must be after 1920');
            } else if (birthYear > 2010) {
                console.log('  ❌ Birth year must be before 2010 (minimum age: 15)');
            } else if (parsedDate > new Date()) {
                console.log('');
                console.log('  ❌ Birth date cannot be in the future');
            } else {
                break;
            };
        } else {
            console.log('');
            console.log((`  ❌ Invalid date. Please use the format YYYY/MM/DD and try again`));
        }
    }

    while (true) {
        let yOrN = rl.question('Do you want to add some grades right now? (y/n) => ').toLowerCase();

        if (yOrN === 'y' || yOrN === 'yes') {
            console.log('');
            let gradesInput = rl.question(`  What are the student grades? (comma separated, 0-10) => `).trim();

            if (gradesInput === '') { // The field cannot be empty
                console.log('');
                console.log(`  ❌ You must enter at least one grade.`);
                continue; // back to ask again
            }

            let gradesArray = gradesInput.split(',').map(g => g.trim()); // will create an array of the filled notes and separate them by comma

            const allValid = gradesArray.every(g => /^[0-9]+(\.[0-9]+)?$/.test(g) && parseFloat(g) >= 0 && parseFloat(g) <= 10); // Valiate each note: only numbers between 0 and 10


            if (allValid) {
                grades = gradesArray.map(Number);
                break; // valid notes, leaves the loop

            } else {
                console.log('');
                console.log(`  ❌ Invalid input. Please enter numbers between 0 and 10, separated by commas.`);
                console.log('');
            }

        } else if (yOrN === 'n' || yOrN === 'no') {
            grades = []; // Don't want to add notes now

            break; // leaves the loop

        } else {
            console.log('');
            console.log(`  ❌ Please answer with "y" or "n".`);
            console.log('');
        }
    };

    let newStudent = {
        id: generateStudentId(),
        name: name.trim(),
        birthDate: birthDate,
        get age() { // calculates student age automatically 
            const birthYear = parseInt(this.birthDate.slice(0, 4));
            const currentYear = new Date().getFullYear();
            return currentYear - birthYear;
        },
        grades: grades,
        get average() { // calculates student average automatically 
            return this.grades.reduce((accumulator, currentValue) => accumulator + currentValue, 0) / this.grades.length;
        }
    };

    students.push(newStudent); // add student to students list
    saveStudents();

    console.log(`   ✅ ${name.trim()} has been added successfully!`);
    console.log('');

}

export { addStudent };