//Command Pattern on a repo

var repo = {
    tasks:[],
    commands:[],
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
    var args = Array.prototype.slice.call(arguments, 1);
    
    if(repo[name]){
        // use 'apply' not 'call'
        //apply allows passing in array of arguments,
        //whereas call you have to specify everything
        return repo[name].apply(repo, args)
    }
    if(name==='get'){
        return repo['select'].apply(repo, args)
    }
    return false;
};

repo.execute('save', )
var task = repo.execute('get', 1);
console.log(task);