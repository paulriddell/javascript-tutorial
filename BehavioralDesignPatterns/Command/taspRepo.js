//Command Pattern on a repo

var repo = {
    tasks:{}, //equals empty object
    commands:[], //array of commands executed on this repo.
    select: function (id) {
        console.log('Getting task ' + id);
        return {
            name: 'new task from db'
        }
    },
    save: function (task) {
        repo.tasks[task.id] = task;
        console.log('Saving ' + task.name + ' to the db');
    }

}

//Execute method, takes name of method we want
//to execute on that repo.
repo.execute = function(name){
    console.log('Arguments: ')
    console.log(arguments)

    //Strip first argument - which is the method name e.g save, get etc
    var args = Array.prototype.slice.call(arguments, 1);
    console.log(name);
    console.log(repo[name]);

    //adding any commands sent for execution on the repo 
    repo.commands.push({
        name:name,
        obj: args[0]
    });

    if(repo[name]){
        //use 'apply' not 'call'
        //apply allows passing in array of arguments,
        //whereas call you have to specify everything
       
        console.log(name + ' command');
        return repo[name].apply(repo, args)
    }
    if(name==='get'){
        console.log('get command');
        return repo['select'].apply(repo, args)
    }
    return false;
};

var task = repo.execute('get', 1);
console.log(task)

task = repo.execute('get', 2);
console.log(task)

repo.execute('save', {
   id:1,
   name: 'task 1',
   completed: true 
});
repo.execute('save', {
    id:2,
    name: 'task 2',
    completed: false 
 });
 repo.execute('save', {
    id:3,
    name: 'task 3',
    completed: false
 });
 repo.execute('save', {
    id:4,
    name: 'task 4',
    completed: false 
 });
console.log(repo.tasks)
console.log(repo.commands)