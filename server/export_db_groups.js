const mongoose = require('mongoose');
const fs = require('fs');
const Participant = require('./models/Participant.js');

mongoose.connect('mongodb://127.0.0.1:27017/vector_event')
.then(async () => {
    const participants = await Participant.find();
    
    const groups = {
        'Group 1': [],
        'Group 2': [],
        'Group 3': [],
        'Group 4': []
    };
    
    participants.forEach(p => {
        if (p.group && groups[p.group]) {
            groups[p.group].push(p.name);
        }
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
    console.log('Artifact created successfully with ' + participants.length + ' participants.');
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
