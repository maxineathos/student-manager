// main.js - main file

import rl from "readline-sync";
import clear from 'console-clear';

// Import all necessary functions

import { addStudent } from './src/operations/addStudent.js';
import { searchStudent } from './src/operations/searchStudent.js';
import { editStudent } from './src/operations/editStudent.js';
import { deleteStudent } from './src/operations/deleteStudent.js';
import {
    calculateClassAverage,
    findBestStudent,
    listApprovedStudents,
    listStudentsInRecovery,
    listFailedStudents
} from './src/analytics/analytics.js';
import { generateListOfStudents } from './src/utils/utils.js';

// Initial configuration

process.stdout.setEncoding('utf8'); // allowing emojis display at the terminal (does not works in git bash)

// ===========================================
// Program execution
// ===========================================


// system main menu
function mainMenu() {

    console.log('');
    console.log('=============================');
    console.log('🎓 STUDENT MANAGEMENT SYSTEM');
    console.log('=============================');
    console.log();
    console.log('Choose an option:');
    console.log();
    console.log('1. 📋 Show all students');
    console.log('2. ➕ Add new student');
    console.log('3. 🔍 Search student');
    console.log('4. ✏️  Edit student');
    console.log('5. 🗑️  Delete student');
    console.log('6. 📊 Calculate class average');
    console.log('7. 🏆 Find best student');
    console.log('8. ✅ List approved students');
    console.log('9. 🔄 List students in recovery');
    console.log('10. ❌ List failed students');
    console.log('0. 🚪 Exit');
    console.log();
    console.log('=============================');

    console.log('');

    let option = rl.question('Enter your choice => ');
    console.log('');

    console.log('=============================');
    console.log('');

    switch (option) {
        case '1': generateListOfStudents(); goBackMainMenu(); break;
        case '2': addStudent(); goBackMainMenu(); break;
        case '3': searchStudent(); goBackMainMenu(); break;
        case '4': editStudent(); goBackMainMenu(); break;
        case '5': deleteStudent(); goBackMainMenu(); break;
        case '6': calculateClassAverage(); goBackMainMenu(); break;
        case '7': findBestStudent(); goBackMainMenu(); break;
        case '8': listApprovedStudents(); goBackMainMenu(); break;
        case '9': listStudentsInRecovery(); goBackMainMenu(); break;
        case '10': listFailedStudents(); goBackMainMenu(); break;
        case '0':
            console.log('');
            console.log("Leaving application...");
            process.exit();
        default:
            console.log('');
            console.log('Invalid option. Try again!');
            console.log('');
            goBackMainMenu();
            break;

    }

}

// asks if user wants to return to main menu after end operations 

function goBackMainMenu() {
    let entry = rl.question('-----> Would you like to go back to main menu? (y/n) => ');

    switch (entry.toLowerCase()) {
        case 'y':
        case 'yes': clear(); mainMenu(); break;

        case 'n':
        case 'no': console.log(''); console.log('See you next time!'); console.log(''); process.exit();

        default:
            console.log('❌ Invalid option. Please enter y or n.'); goBackMainMenu(); break;
    }
}

mainMenu();