const Task = require('../Models/Task');
const TaskRepo = require('../Data/TaskRepo');
const _taskRepo = new TaskRepo();
const UserRepo       = require('../Data/UserRepo');
const _userRepo      = new UserRepo();


exports.CreateNewTask = async function (req, res) {
    let tempTaskObj = new Task({
        'name': req.body.name,
        'deadline': req.body.deadline,
        'description': req.body.description,
        'complete': false,
        'color': null,
        'user': req.body.username
    })
    let responseObj = await _taskRepo.create(tempTaskObj);    

    if (responseObj.errorMessage == '') {
        res.json({
            errorMessage: ''
        });
    }
    else {
        res.json({
            errorMessage: responseObj.errorMessage
        });
    }
}

exports.Delete = async function (req, res) {
    let taskID =  req.body.task._id;
    let username = req.body.username;
    let deleteTask = await _taskRepo.delete(taskID);

    res.json({ message:"task deleted" })

}

exports.Complete = async function (req, res) {
    let taskID =  req.body.task._id;
    let updating = {complete: true};
    let completeTask = await _taskRepo.update(taskID, updating);
    res.json({ message:"task completed" })

}

exports.Highlight = async function (req, res) {
    let taskID =  req.body.task._id;
    let updating = {color: "red"};
    let highlightTask = await _taskRepo.update(taskID, updating);
    res.json({ message:"task marked" })

}


// exports.Attendees = async function(req, res) {
//     let eventName = req.body.eventName;
//     let event = await _eventRepo.getEventByName(eventName);
//     let attendeesList = event.attendees;
//     res.json({ attendees: attendeesList })

// }

// exports.AttendEvent = async function(req, res) {
//     let eventName = req.body.eventName;
//     let event = await _eventRepo.getEventByName(eventName);
//     let username = req.body.username;
//     let attendeesList = event.attendees;
//     if(attendeesList.includes(username)) {
//         res.json({ message: "Each person can only register once for each event." })
//     }
//     else{
//         attendeesList.push(username);
//         let newEvent = await _eventRepo.update(eventName, attendeesList)
//         res.json({ message: "You have successfully signed up for " + eventName + "."})
//     }
// }



// exports.MyEvents = async function(req,res) {
//     let allEvents = await _eventRepo.allEvents();
//     let username = req.body.username;
//     let myEvents = [];
//     for(let i=0; i < allEvents.length; i++){
//         let attendees = allEvents[i].attendees;
//         if(attendees.includes(username)){
//             myEvents.push(allEvents[i])
//         }
//     }
//     res.json({ myEvents: myEvents})
// }

// exports.CancelAttendance = async function(req, res) {

//         let event = req.body.event;
//         let eventName = event.name;
//         let username = req.body.username;
//         let attendees = event.attendees;

//         if (attendees.includes(username)) {
//             for (i = 0; i < attendees.length; i++) {
//                 if (event.attendees[i] == username) {
//                     attendees.splice(i, 1);
//                     break
//                 }
//             }
//             let newData = await _eventRepo.update(eventName, attendees);

//             res.json({ errorMessage: "" })
//         }
//         else {
//             res.json({
//                 errorMessage: 'You have not participated in ' + eventName + '.'
//             })
//         }

//     }



