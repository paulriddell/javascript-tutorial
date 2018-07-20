//Decorator Pattern
//Used to add new functionality to an existing object
//Without being obtrusive
//>Wraps an object
//>Protects existing objects
//>Allows extended functionality

//This example is more convoluted that means you have to do lots of code
//Subobjecting is better.

//Task constructor
var Task = function (name) {
    this.name = name;
    this.completed = false;
}
//Method complete
Task.prototype.complete = function () {
    console.log('completing task: ' + this.name);
    this.completed = true;
};

//Method save
Task.prototype.save = function () {
    console.log('saving Task: ' + this.name);
};

//Orignal Task Object
var myTask = new Task('Legacy Task');
myTask.complete();
myTask.save();

//Extended Task Object
var urgentTask = new Task('Urgent Task');
urgentTask.priority = 2;
urgentTask.notify = function(){
    console.log('notifying important people');
};

urgentTask.complete();

//Decorated urgent task with a new save and
//using the original save
//Notify is new functionality
urgentTask.save = function(){
    this.notify();
    //Execute the save from the parent class
    Task.prototype.save.call(this)
};

urgentTask.save();
