const xlsx = require('xlsx');

const workbook = xlsx.readFile('../public/Registrations.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = xlsx.utils.sheet_to_json(sheet);

excelData.forEach((row, idx) => {
    for (let key in row) {
        if (String(row[key]).toLowerCase().includes('rithika')) {
            console.log('Row', idx, row);
        }
    }
});
