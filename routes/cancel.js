const router = require('express').Router();

// data asked for person cancelling is in the following format:
// {
//      name: .....,
//      event: .....
// }

function sortByProperty(property){  
    return function(a,b){  
       if(a[property] > b[property])  
          return 1;  
       else if(a[property] < b[property])  
          return -1;  
   
       return 0;  
    }  
}

router.post("/", (req, res) => {
    waitList.sort(sortByProperty("priority")); // sorting the array based on priority
    let pcancel = req.body;
    let event = events.find((p) => pcancel.event === p.name)
    let person = participants.find((p) => p.name === pcancel.name);
    
    // if participant has registered for more than one event
    if(person.events.length > 1) 
        participants[person.events] = participants[person.events].filter((p) => p !== pcancel.event);

    // if participant had only one event
    else 
    participants = participants.filter((p) => p.name !== person.name)
    
    // finding participant in waitlist and allow him to register for the event
    for(let i = 0; i < waitList.length; i++) {

        // checking for the cancelled event
        if(waitList[i].event === pcancel.event) {

            if(personExist) {
                for(let i = 0; i < personExist.events.length; i++) {
                    let eve = events.find((p) => personExist.events[i] === p.name);
                    if(eve.start === event.start)
                    continue;
                }
            }
            // if person is attending other events, just push this event to his existing set
            const personExist = participants.find((p) => p.name === waitList[i].name);
            if(personExist) {
                i = personExist.id;
                personExist.events.push(event);
            }

            // else create a new participant and push him to the database
            else {
                i = waitList[i].length > 0 ? Math.max(...waitList[i].map((person) => person.id)) : 0;
                let newParticipant = {
                    id: i + 1,
                    name: waitList[i].name,
                    priority: waitList[i].priority,
                    events: event
                };
                participants = participants.concat(newParticipant);
            }

            // removing him from the waitlist in a FIFO manner
            waitList = waitList.filter((p) => {
                return (p.name !== waitList[i].name && p.event !== pcancel.event)
            });
            res.send("Successfully Registered").end();
        }
    }
});

module.exports = router;