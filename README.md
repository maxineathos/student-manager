# 🎓 Student Manager — CLI

A simple and organized Node.js CLI application to register, search, edit, and analyze student records. Built in **English** to make the code and interface accessible for a global audience.

## ✨ Features Implemented
- 📋 **List Students**: Shows ID, name, birth date, age, grades, and average.  
- ➕ **Add Student**: Validates name (letters only), birth date (`YYYY/MM/DD`, within a realistic range), and grades (0–10). Supports creating students with or without initial grades.  
- 🔍 **Search Student**: Search by exact ID or partial, case-insensitive name.  
- ✏️ **Edit Student**: Change name, birth date, or grades with the same validations as creation.  
- 🗑️ **Delete Student**: Confirm deletion, handle invalid IDs, and retry options.  
- 📊 **Analytics**:  
  - Calculate class average  
  - Find the best-performing student  
  - List approved (≥7.0), recovery (5.0–6.9), and failed (<5.0) students  
- 💾 **Data Persistence**: Saves all changes to `data/students.json`, ensuring IDs remain consistent between sessions.  
- 🧑‍🎓 **User Experience**: Friendly messages with emojis and clear instructions.  

## 🛠 Requirements
- Node.js 18+  
- npm 9+  

## 🚀 Quick Start
```bash
# Clone the repository and navigate to the folder
cd student-manager

# Install dependencies
npm install

# Run the program
npm start
# or
node main.js
```

## 📂 Project Structure
```
student-manager/
├── README.md
├── docs/
│   └── TECHNICAL.md       # Detailed technical documentation
├── data/students.json     # Persistent data file (auto-created)
├── main.js                # CLI menu & dispatcher
└── src/
    ├── models/student.js   # Data model and persistence
    ├── operations/         # add, edit, delete, search
    ├── analytics/          # class analytics and reports
    └── utils/utils.js      # list formatting and helpers
```

## 🧠 Highlights
- Uses **arrays of objects** and **functional array methods** (`map`, `filter`, `find`, `reduce`) for clear and expressive code.  
- Handles **edge cases**:  
  - Empty dataset messages  
  - Invalid or not-found IDs  
  - Corrupted `students.json` starts fresh gracefully  
  - Validates input before accepting changes  
- Keeps a **simple, single-process JSON persistence** suitable for a CLI.  
- Organized code with **clear separation of responsibilities** and **descriptive comments**.  

## 📖 Documentation
For detailed file responsibilities, design choices, and edge cases, see [docs/TECHNICAL.md](docs/TECHNICAL.md).

## 📜 License
MIT (or your preferred license)