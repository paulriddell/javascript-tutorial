//Facade Pattern
//Used to provide a simplified inheritance to a complicated system
//Not adding any functionality.
//Maintaining existing functionality in a clean way

var Task = function (data) {
    this.name = data.name;
    this.priority = data.priority;
    this.project = data.project;
    this.user = data.user;
    this.completed = data.completed;
}

//This service sucks and facade will help with it.
//Like real life.
//Its not using the revealing module pattern
var TaskService = function () {
    return {
        complete: function (task) {
            task.completed = true;
            console.log('completing task: ' + task.name);
        },
        setCompleteDate: function (task) {
            task.completedDate = new Date();
            console.log(task.name + ' completed on ' + task.completedDate);
        },
        notifyCompletion: function (task, user) {
            console.log('Notifying ' + user + ' of the completion of ' + task.name);
        },
        save: function (task) {
            console.log('saving Task: ' + task.name);
        }
    }
}();

// Facade or wrapper module - 
// A module is a function that returns an object
// Not adding functionality, better interface for same 
// functionality
var TaskServiceWrapper = function () {

    var completeAndNotify = function (task) {
        TaskService.complete(myTask);
        if (myTask.completed == true) {
            TaskService.setCompleteDate(myTask);
            TaskService.notifyCompletion(myTask, myTask.user);
            TaskService.save(myTask);
        }
    }
    return {
        completeAndNotify: completeAndNotify
    }
}(); 
//executes with () so TaskServiceWrapper is the return statment
//normally we would have this in different file and do
//module.exports and return the executed function.

var myTask = new Task({
    name: 'MyTask',
    priority: 1,
    project: 'Courses',
    user: 'Jon',
    completed: false
});
//console.log(myTask);
TaskServiceWrapper.completeAndNotify(myTask);

console.log(myTask);
//