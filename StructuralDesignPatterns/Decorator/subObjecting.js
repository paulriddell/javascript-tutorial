//Sub Object (Class) that wraps task.
//More complete inheritance
//Can create multiple version of it.

//Original class
var Task = function (name) {
    this.name = name;
    this.completed = false;
}

Task.prototype.complete = function () {
    console.log('completing task: ' + this.name);
    this.completed = true;
};

Task.prototype.save = function () {
    console.log('saving Task: ' + this.name);
};

var myTask = new Task('Legacy Task');
myTask.complete();
myTask.save();

//Sub object of Task
var UrgentTask = function (name, priority) {
    //Call ctor of Task and set name
    Task.call(this, name);
    this.priority = priority;
};

//Make new object for sub object for prototype out of Task prototype
//Makes it true inheritance
UrgentTask.prototype = Object.create(Task.prototype);

//This notify will be for UrgentTask only.
UrgentTask.prototype.notify = function () {
    console.log('notifying important people');
};

//This save will be for UrgentTask only.
//But calls Task's save method.
UrgentTask.prototype.save = function () {
    this.notify();
    console.log('do special stuff before saving');
    //Call parent Task save method
    Task.prototype.save.call(this)
};
var ut = new UrgentTask('This is urgent', 1);

ut.complete();
ut.save();
console.log(ut);