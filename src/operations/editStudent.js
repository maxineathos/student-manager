// operations.js - Student Operations

import rl from "readline-sync";
import { saveStudents, students } from '../models/student.js';
import { parse, isValid } from 'date-fns';

function editStudent() {
    console.log('✏️ Edit student')
    console.log('')

    let option = rl.question('Enter the ID of the student you want to edit => ')

    let id = parseInt(option)

    if (!isNaN(id) && option !== "") {
        let studentToBeEdited = students.find((student) => parseInt(student.id) === id) // searches student by id

        if (!studentToBeEdited) {
            console.log('');
            console.log('   ❌ Student not found with the provided ID.'); // returns this error if any id was found
            console.log('');
            return;
        }

        // edit name - each editable data will be changed only if the user wants to
        while (true) {
            console.log('');
            let option = rl.question('Do you want to change the student name? (y/n) => ').toLowerCase()

            switch (option.toLowerCase()) {
                case 'y':
                case 'yes':
                    while (true) {
                        console.log('');
                        let name = rl.question('   Type the student\'s new name => ')

                        if (name.length !== 0 && /^[A-Za-z\s]+$/.test(name)) { // makes sure that there's no number in the name field
                            studentToBeEdited.name = name                               //  and also that the field is not empty
                            saveStudents();
                            console.log('');
                            console.log('   ✅ Name updated successfully!');
                            break;
                        } else {
                            console.log('');
                            console.log('   ❌ Invalid name. It\'s not allowed to use numbers in this field or let it empty.');
                        }
                    }
                    break;

                case 'n': // in case the user says no, it will skip the action
                case 'no':
                    break;

                default:
                    console.log('');
                    console.log('   ❌ Invalid option. Please enter y or n.');
                    continue;
            }
            break;
        }

        // edit birth date
        while (true) {
            console.log('');
            let option = rl.question('Do you want to change student\'s birth date? (y/n) => ').toLowerCase()

            switch (option.toLowerCase()) {
                case 'y':
                case 'yes':
                    while (true) {
                        console.log('');
                        let birthDate = rl.question('   What is the student birth date? (YYYY/MM/DD) => ')

                        const parsedDate = parse(birthDate, 'yyyy/MM/dd', new Date()); // validanting date format
                        const birthYear = parsedDate.getFullYear();


                        // defining limits (between 1920 and 2010)

                        if (isValid(parsedDate)) {
                            if (birthYear < 1920) { // from 1920
                                console.log('');
                                console.log('   ❌ Birth year must be after 1920');
                            } else if (birthYear > 2010) { // to 2010
                                console.log('');
                                console.log('   ❌ Birth year must be before 2010 (minimum age: 15)');
                            } else if (parsedDate > new Date()) { //  we can't be born in the future unless we have some time machine
                                console.log('');
                                console.log('   ❌ Birth date cannot be in the future');
                            } else {
                                studentToBeEdited.birthDate = birthDate; // if it's all good, then the birth date is changed!
                                saveStudents();
                                console.log('');
                                console.log('   ✅ Birth date updated successfully!');
                                break;
                            }
                        } else {
                            console.log('');
                            console.log('   ❌ Invalid date. Please use the format YYYY/MM/DD and try again');
                        }
                    }
                    break;

                case 'n':
                case 'no':
                    break;

                default:
                    console.log('');
                    console.log('   ❌ Invalid option. Please enter y or n.');
                    continue;
            }
            break;
        }

        // edit grades
        while (true) {
            console.log('');
            let yOrN = rl.question('Do you want to change the student grades? (y/n) => ').toLowerCase();

            if (yOrN === 'y' || yOrN === 'yes') {
                while (true) {
                    console.log('');
                    let gradesInput = rl.question('   What are the student grades? (comma separated, 0-10) => ').trim();

                    if (gradesInput === '') {
                        console.log('');
                        console.log('   ❌ You must enter at least one grade.');
                        continue;
                    }

                    // separates grades per comma and turns them into an array
                    let gradesArray = gradesInput.split(',').map(g => g.trim());
                    // validanting conditions (like if there's any letter or special character - only can be number)
                    const allValid = gradesArray.every(g => /^[0-9]+(\.[0-9]+)?$/.test(g) && parseFloat(g) >= 0 && parseFloat(g) <= 10);

                    if (allValid) { // if it's all good, then the new grades are added to the student
                        studentToBeEdited.grades = gradesArray.map(Number);
                        saveStudents();
                        console.log('');
                        console.log('   ✅ Grades updated successfully!');
                        break;
                    } else {
                        console.log('');
                        console.log('   ❌ Invalid input. Please enter numbers between 0 and 10, separated by commas.');
                    }
                }
                break;

            } else if (yOrN === 'n' || yOrN === 'no') { // ends the questionary
                break;

            } else {
                console.log('');
                console.log('   ❌ Please answer with "y" or "n".');
            }
        }

        console.log('');
        console.log(`   📋 Information successfully updated for ${studentToBeEdited.name}.`); // this print means succesful operation!
        console.log('');


    } else {
        console.log('');
        console.log('   ❌ Invalid ID. Please enter a valid number.');
        console.log('');
    }
}

export { editStudent };