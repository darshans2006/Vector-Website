const xlsx = require('xlsx');
const fs = require('fs');

const workbook = xlsx.readFile('../public/Registrations.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = xlsx.utils.sheet_to_json(sheet);

let excelNames = [];
excelData.forEach((row, idx) => {
    if (idx === 0) return;
    if (row['__EMPTY_1']) excelNames.push(String(row['__EMPTY_1']).trim());
    if (row['__EMPTY_7']) excelNames.push(String(row['__EMPTY_7']).trim());
    if (row['__EMPTY_15']) excelNames.push(String(row['__EMPTY_15']).trim());
    if (row['__EMPTY_22']) excelNames.push(String(row['__EMPTY_22']).trim());
});

const files = fs.readdirSync('../public/Vector_ID_Cards').filter(f => f.endsWith('.png'));
let imageNames = files.map(f => f.replace('.png', '').split('_').slice(2).join('_'));

const normalize = (n) => n.toLowerCase().replace(/^rtr\.?\s*/i, '').replace(/[^a-z0-9]/g, '');

const excelNorm = excelNames.map(normalize);
const imageNorm = imageNames.map(normalize);

let onlyInImages = imageNorm.filter(n => !excelNorm.includes(n));
let onlyInExcel = excelNorm.filter(n => !imageNorm.includes(n));

console.log('Names only in Images (Website):', onlyInImages);
console.log('Names only in Excel:', onlyInExcel);

const exCounts = {};
excelNorm.forEach(n => { exCounts[n] = (exCounts[n] || 0) + 1; });
const imgCounts = {};
imageNorm.forEach(n => { imgCounts[n] = (imgCounts[n] || 0) + 1; });

console.log('\nNames with different counts:');
let allNorm = [...new Set([...excelNorm, ...imageNorm])];
for (let n of allNorm) {
    let e = exCounts[n] || 0;
    let i = imgCounts[n] || 0;
    if (e !== i) {
        console.log('- ' + n + ': Excel=' + e + ', Images=' + i);
    }
}
