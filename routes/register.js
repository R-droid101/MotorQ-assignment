const router = require('express').Router();

// Input from user will be in the following format:
// {
//    name: ...,
//    event: ...,
//    priority: ...
// }

router.post("/", (req, res) => {
    const person = req.body;
    const event = events.find((p) => person.event == p.name);
    const personExist = participants.find((p) => p.name === person.name);
    
    // checking for timing clashes in event
    if(personExist) {
        for(let i = 0; i < personExist.events.length; i++) {
            let eve = events.find((p) => personExist.events[i] === p.name);
            if(eve.start === event.start)
            res.status(400).send({ error: "Clash in timing" }).end() ;
        }
    }

    // checking for event availability if there is no timing clashes
    if(event.avail > 0) {
        var i;
        if(personExist) {
            i = personExist.id;
            personExist.events.push(event);
        }
        else {
            i = persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
            let newParticipant = {
                id: i,
                name: person.name,
                priority: person.priority,
                events: event
            };
            participants = participants.concat(newParticipant);
        }
        event.avail = event.avail - 1;
    }

    // adding to the waitlist if no availability
    else {
        var i;
        if(personExist)
        i = personExist.id;
        else
        i = persons.length > 0 ? Math.max(...persons.map((person) => person.id)) : 0;
        let wait = {
            pid: i + 1,
            event: person.event,
            priority: person.priority
        };
        waitList = waitList.concat(wait)
    }
});

module.exports = router;