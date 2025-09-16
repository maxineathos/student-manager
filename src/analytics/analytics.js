// analytics.js - Analysis and Reports

import { students } from '../models/student.js';

// Average General Class Calculates

function calculateClassAverage() {

    let classAverage =
        students.reduce((accumulator, student) => { // the reduce method
            return accumulator + student.average
        }, 0) / students.length;

    console.log('📈 Class average');
    console.log('');

    console.log(`   Students: ${students.length} | Average: ${classAverage.toFixed(1)} | ${classAverage > 6.9 ? '✅ Good performance' : '⚠️ Bad performance'}`);
    console.log('');
    
    return classAverage.toFixed(1);
}

// Finds the best student in the class by overall individual average

function findBestStudent() {
    let currentChampion = students[0];
    let bestAverageUntilNow = students[0].average;

    for (let i = 1; i < students.length; i++) {

        if (students[i].average > bestAverageUntilNow) {
            currentChampion = students[i];
            bestAverageUntilNow = students[i].average;
        }
    }

    console.log('🏅 Best Student');
    console.log('')

    console.log(`   🎉 ${currentChampion.id} | ${currentChampion.name} leads with ${currentChampion.average.toFixed(1)}!`);
    console.log('')

    return currentChampion.name;
}

//Approved Students List (average> = 7.0)

function listApprovedStudents() {

    let someoneWasApproved = false;

    console.log('🟢 Approved students list');
    console.log('');


    for (let i = 0; i < students.length; i++) {
        if (students[i].average >= 7.0) {
            console.log(`   ${students[i].id} | ${students[i].name} | ${students[i].birthDate} | ${students[i].age} | [${students[i].grades.join(', ')}] => ${students[i].average.toFixed(1)}`);
            someoneWasApproved = true;
        }
    }

    if (!someoneWasApproved) {
        console.log(`   ⚠️ No one passed. Time to review and see how we can improve as a school.`);
    }

    console.log('');
}

// List students in recovery (average between 5 and 6.9)

function listStudentsInRecovery() {
    let someoneInRecovery = false;

    console.log('🟡 Students in recovery list');
    console.log('');

    for (let i = 0; i < students.length; i++) {
        if (students[i].average >= 5.0 && students[i].average <= 6.9) {
            console.log(`   ${students[i].id} | ${students[i].name} | ${students[i].birthDate} | ${students[i].age} | [${students[i].grades.join(', ')}] => ${students[i].average.toFixed(1)}`);
            someoneInRecovery = true;
        }
    }

    if (!someoneInRecovery) {
        console.log(`   📝 No students are in recovery — everyone is either approved or failed.`);
    }

    console.log('');
}

//List failed students (average between 0 and 4.9)

function listFailedStudents() {
    let someoneFailed = false;

    console.log('🔴 Failed students list');
    console.log('');

    for (let i = 0; i < students.length; i++) {
        if (students[i].average < 5.0) {
            console.log(`   ${students[i].id} | ${students[i].name} | ${students[i].birthDate} | ${students[i].age} | [${students[i].grades.join(', ')}] => ${students[i].average.toFixed(1)}`);
            someoneFailed = true;
        }
    }

    if (!someoneFailed) {
        console.log(`   🎉 Hooray! No one failed this time. Keep up the great work! 🚀`);
    }

    console.log('');
}

export {
    calculateClassAverage,
    findBestStudent,
    listApprovedStudents,
    listStudentsInRecovery,
    listFailedStudents
};
