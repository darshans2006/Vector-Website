const xlsx = require('xlsx');

const workbook = xlsx.readFile('../public/Registrations.xlsx');
const sheetName = workbook.SheetNames[0];
const sheet = workbook.Sheets[sheetName];
const excelData = xlsx.utils.sheet_to_json(sheet);

let excelNames = [];

excelData.forEach((row, idx) => {
    if (idx === 0) return; // skip header row
    if (row['__EMPTY_1']) excelNames.push(String(row['__EMPTY_1']).trim());
    if (row['__EMPTY_7']) excelNames.push(String(row['__EMPTY_7']).trim());
    if (row['__EMPTY_15']) excelNames.push(String(row['__EMPTY_15']).trim());
    if (row['__EMPTY_22']) excelNames.push(String(row['__EMPTY_22']).trim());
});

console.log('Total valid names in Excel:', excelNames.length);

const normalize = (n) => n.toLowerCase().replace(/^rtr\.?\s*/i, '').replace(/[^a-z0-9]/g, '');

const excelNorm = excelNames.map(normalize);

const fs = require('fs');
const files = fs.readdirSync('../public/Vector_ID_Cards').filter(f => f.endsWith('.png'));
console.log('Total images in folder:', files.length);

let imageNames = files.map(f => {
    let parts = f.replace('.png', '').split('_');
    return parts.slice(2).join('_');
});

const imageNorm = imageNames.map(normalize);

// Find duplicates in imageNorm
const imgCounts = {};
imageNorm.forEach(n => { imgCounts[n] = (imgCounts[n] || 0) + 1; });

// Find duplicates in excelNorm
const exCounts = {};
excelNorm.forEach(n => { exCounts[n] = (exCounts[n] || 0) + 1; });

console.log('\nDuplicates in Excel:');
for (let n in exCounts) {
    if (exCounts[n] > 1) {
        console.log('- ' + n + ' (count: ' + exCounts[n] + ')');
        console.log('  Original Excel names: ' + excelNames.filter(name => normalize(name) === n).join(' AND '));
    }
}

console.log('\nDuplicates in Images (Website):');
for (let n in imgCounts) {
    if (imgCounts[n] > 1) {
        console.log('- ' + n + ' (count: ' + imgCounts[n] + ')');
        console.log('  Original Image names: ' + imageNames.filter(name => normalize(name) === n).join(' AND '));
    }
}
