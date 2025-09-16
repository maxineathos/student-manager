// student.js - Student Model

import fs from 'fs';
import path from 'path';

/*
  I keep the data here in memory and the minimum persistence functions.
  -Objective: Load STUDENTS on startup, generate IDS and save after mutations.
*/

// configuração do arquivo de dados
const dataDir = path.resolve(process.cwd(), 'data');
const dataFile = path.join(dataDir, 'students.json');

function ensureDataDir() {
    if (!fs.existsSync(dataDir)) fs.mkdirSync(dataDir, { recursive: true });
}

// data in memory

let students = [];
try {
    ensureDataDir();
    if (fs.existsSync(dataFile)) {
        const raw = fs.readFileSync(dataFile, 'utf8');
        students = JSON.parse(raw);
    } else {
        // first use: starts empty
        students = [];
    }
} catch (err) {
    // if the json is corrupted or there is an error, start with empty array
    console.error('Could not load students.json, starting with in-memory data:', err.message);
    students = [];
}

// generating id
// local sequence that ensures continuity when rebooting the application
let sequence = 1;

(function initSequenceFromExisting() {
    const currentYear = String(new Date().getFullYear());
    let maxNum = 0;

    for (const s of students) {
        if (typeof s.id === 'string' && s.id.startsWith(currentYear)) {
            const tail = s.id.slice(currentYear.length);
            const n = parseInt(tail, 10);
            if (!isNaN(n) && n > maxNum) maxNum = n;
        }
    }

    sequence = maxNum + 1;
})();

function generateStudentId() {
    const year = new Date().getFullYear();
    const number = String(sequence).padStart(4, '0'); // 0001, 0002...
    sequence++;
    return `${year}${number}`;
}

// save after changes
function saveStudents() {
    try {
        ensureDataDir();
        // grava de forma simples; suficiente para CLI de processo único
        fs.writeFileSync(dataFile, JSON.stringify(students, null, 2), 'utf8');
    } catch (err) {
        console.error('Failed to save students.json:', err.message);
    }
}

export {
    students,
    generateStudentId,
    saveStudents
};