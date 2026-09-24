const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

const workbook = xlsx.readFile('../public/Registrations.xlsx');
const sheet = workbook.Sheets[workbook.SheetNames[0]];
const excelData = xlsx.utils.sheet_to_json(sheet);

const groups = {
    'Group 1': [],
    'Group 2': [],
    'Group 3': [],
    'Group 4': []
};

excelData.forEach((row, idx) => {
    if (idx === 0) return; // skip header row

    if (row['__EMPTY_1']) groups['Group 1'].push(String(row['__EMPTY_1']).trim());
    if (row['__EMPTY_7']) groups['Group 2'].push(String(row['__EMPTY_7']).trim());
    if (row['__EMPTY_15']) groups['Group 3'].push(String(row['__EMPTY_15']).trim());
    if (row['__EMPTY_22']) groups['Group 4'].push(String(row['__EMPTY_22']).trim());
});

let mdContent = '# Participants by Group\n\n';

for (let i = 1; i <= 4; i++) {
    const groupName = 'Group ' + i;
    const names = groups[groupName];
    names.sort((a, b) => a.localeCompare(b, undefined, { sensitivity: 'base' }));
    
    mdContent += '## ' + groupName + ' (' + names.length + ' participants)\n\n';
    names.forEach(n => {
        mdContent += '- ' + n + '\n';
    });
    mdContent += '\n';
}

fs.writeFileSync('C:/Users/sanda/.gemini/antigravity/brain/9f058303-b75c-4265-8b0b-262fc5b37890/participants_by_group.md', mdContent);
console.log('Artifact created successfully.');
