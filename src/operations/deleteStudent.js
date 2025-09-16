// operations.js - Student Operations


import rl from "readline-sync";
import { students, saveStudents } from '../models/student.js';

//delete student by index

function deleteStudent() {
    
    // Check if there are students before trying to delete
    if (students.length === 0) {
        console.log('No students found in the system.');
        return;
    }

    let option = rl.question('Enter the ID of the student you want to delete => ');

    let id = parseInt(option);

    if (!isNaN(id) && option !== "") {
        let studentToBeRemoved = students.findIndex((student) => parseInt(student.id) === id); // looking for the Student Index to be removed


        if (studentToBeRemoved === -1) {
            console.log(`It was not possible to find a student for this ID (${id}).`);

            let option = rl.question('Do you want to try again? (y/n) => ');
            console.log('');

            switch (option.toLowerCase()) {
                case 'y':
                case 'yes':
                    deleteStudent();
                    break;

                case 'n':
                case 'no':
                    break;

                default:
                    console.log('Invalid option. Try again!');
                    deleteStudent();
                    break;
            }
        } else {
            
            // Show student data before deleting
            let studentData = students[studentToBeRemoved];
            console.log(`Student found: ${studentData.name} (ID: ${studentData.id})`);

            let option = rl.question('⚠️  Are you sure you want to DELETE this student? This action cannot be undone. (y/n) => ');
            console.log('');

            switch (option.toLowerCase()) {
                case 'y':
                case 'yes':
                    console.log(`✅ Student "${studentData.name}" (ID: ${studentData.id}) has been successfully deleted.`);
                    students.splice(studentToBeRemoved, 1);
                    saveStudents();
                    break;

                case 'n':
                case 'no':
                    console.log('🚫 Deletion cancelled. Student data preserved.');
                    break;

                default:
                    console.log('Invalid option. Try again!');
                    deleteStudent();
                    break;
            }
        }
    } else {
        // When the id is invalid (not number or empty)

        console.log('Invalid input. Please enter a valid numeric ID.');

        let option = rl.question('Do you want to try again? (y/n) => ');
        console.log('');

        switch (option.toLowerCase()) {
            case 'y':
            case 'yes':
                deleteStudent(); // Call the function again to try another id

                break;

            case 'n':
            case 'no':
                console.log('Operation cancelled.');
                break;

            default:
                console.log('Invalid option. Try again!');
                deleteStudent();
                break;
        }
    }
}

export { deleteStudent };