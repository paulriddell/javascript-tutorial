var Task = require('./task');

//3 Observers - they observe task and watch for changes

var notificationService = function () {
    var message = 'Notifying ';

    //Method is called when tasked changed
    this.update = function (task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
};

var loggingService = function () {
    var message = 'Logging '
    this.update = function (task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
}
var auditingService = function () {
    var message = 'Auditing '
    this.update = function (task) {
        console.log(message + task.user + ' for task ' + task.name);
    }
}

//Create our observer list - list of observers task will notify when done
//Object - constructor pattern (an array)
function ObserverList() {
    this.observerList = [];
};
//add observer to list
ObserverList.prototype.add = function (obj) {
    return this.observerList.push(obj);
};
//get observer from array
ObserverList.prototype.get = function (index) {
    if (index > -1 && index < this.observerList.length) {
        return this.observerList[index];
    }
};

//add count helper methods to protect the array
ObserverList.prototype.count = function () {
    return this.observerList.length;
};

ObserverList.prototype.removeAt = function (index) {
    this.observerList.splice(index, 1);
};

ObserverList.prototype.indexOf = function (obj, startIndex) {
    var i = startIndex;

    while (i < this.observerList.length) {
        if (this.observerList[i] === obj) {
            return i;
        }
        i++;
    }

    return -1;
}

//Turn "Task" into a 'subject'
//Decorator function
var ObservableTask = function (data) {
    //'call' allows us to pass 'this'
    Task.call(this, data); 
    //add observers list to object, empty array
    this.observers = new ObserverList();
};

//add addObserver function to its prototype
//this gets executed when we do notify
ObservableTask.prototype.addObserver = function (observer) {
    this.observers.add(observer);
};

ObservableTask.prototype.removeObserver = function (observer) {
    this.observers.removeAt( this.observers.indexOf( observer, 0 ) );
};

//Task itself is our context, 
ObservableTask.prototype.notify = function (context) {
    var observerCount = this.observers.count();
    //loop over array of observers and execute
    //get what they passed in and execute
    for (var i = 0; i < observerCount; i++) {
        this.observers.get(i)(context);
    }
}

//Overwritten method.
ObservableTask.prototype.save = function () {
    this.notify(this);
    Task.prototype.save.call(this);
};

var task1 = new ObservableTask({
    name: 'create a demo for constructors',
    user: 'Jon'
});

var not = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

//Register our services - pass in the function itself
//we want executed
task1.addObserver(not.update);
task1.addObserver(ls.update);
task1.addObserver(audit.update);

task1.save();

//Ability to remove observers
//So observer can opt out of receiving notifications
task1.removeObserver(audit);
task1.save();