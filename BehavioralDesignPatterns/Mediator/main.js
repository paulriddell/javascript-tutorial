var Task = require('./task');

//Services - call service , db, api in real life
var notificationService = function () {
    var message = 'Notifying ';
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
};

//Manage everything
//Revealing module pattern, wraps in an iffy to immediately execute
var mediator = (function(){
    //notify to specific channel
    var channels = {};
    
    // subscribing to a channel, 
    // func is like a callback, that we will execute
    var subscribe = function(channel, context, func){
        //add the channel or subscribe
        if (!mediator.channels[channel]) {
            mediator.channels[channel] = []
        }
        //channel is an object here, this is bracket notation
        mediator.channels[channel].push({
            context: context,
            func: func
        });
    };
    
    var publish = function(channel){
        //make sure channel exists
        if (!this.channels[channel]) {
            return false
        }
        
        //all args, hack of 'channel' from args.
        var args = Array.prototype.slice.call(arguments, 1);
        
        for(var i = 0; i < mediator.channels[channel].length; i++)
        {
            //for every subscription, execute that method
            var sub = mediator.channels[channel][i];
            //apply 
            sub.func.apply(sub.context, args)
        }
    }
    return{
        channels: {},
        subscribe:subscribe,
        publish:publish
    };
}());

var task1 = new Task({
    name: 'create a demo for mediators',
    user: 'Jon'
});

var not = new notificationService();
var ls = new loggingService();
var audit = new auditingService();

//subscribe to a complete, mediator channels.
mediator.subscribe('complete', not, not.update);
mediator.subscribe('complete', ls, ls.update);
mediator.subscribe('complete', audit, audit.update);

//Decorate task1 to call this channel whe complete is
//called. overwrite the function
task1.complete = function(){
    //passing in task ('this' context) as an argument
    mediator.publish('complete', this);
    Task.prototype.complete.call(this);
}
task1.complete();
