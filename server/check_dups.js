const mongoose = require('mongoose');
const Participant = require('./models/Participant.js');

mongoose.connect('mongodb://localhost:27017/vector_event')
.then(async () => {
    const participants = await Participant.find();
    console.log('Total participants in DB:', participants.length);
    
    const nameCounts = {};
    for (let p of participants) {
        let name = (p.name || '').toLowerCase().replace(/^rtr\.?\s*/i, '').trim();
        nameCounts[name] = nameCounts[name] || [];
        nameCounts[name].push(p);
    }
    
    for (let name in nameCounts) {
        if (nameCounts[name].length > 1) {
            console.log('\nPotential Duplicate Found:');
            nameCounts[name].forEach(p => {
                console.log('- PID: ' + p.participantId + ' | Name: ' + p.name + ' | Club: ' + p.clubName);
            });
        }
    }
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
