const mongoose = require('mongoose');
const Participant = require('./models/Participant.js');

mongoose.connect('mongodb://127.0.0.1:27017/vector_event')
.then(async () => {
    const p1 = await Participant.findOne({ participantId: 'V26G1052' });
    const p2 = await Participant.findOne({ participantId: 'V26G1082' });
    console.log('V26G1052:', p1 ? p1.name : 'Not found');
    console.log('V26G1082:', p2 ? p2.name : 'Not found');
    process.exit(0);
})
.catch(err => {
    console.error(err);
    process.exit(1);
});
