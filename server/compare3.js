const xlsx = require('xlsx');

const workbook = xlsx.readFile('../public/Registrations.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = xlsx.utils.sheet_to_json(sheet);

let marciaFound = false;
excelData.forEach((row, idx) => {
    for (let key in row) {
        if (String(row[key]).toLowerCase().includes('marcia') || String(row[key]).toLowerCase().includes('macia')) {
            console.log('Found in row', idx, key, row[key]);
            marciaFound = true;
        }
    }
});
if (!marciaFound) console.log('Marcia not found');
