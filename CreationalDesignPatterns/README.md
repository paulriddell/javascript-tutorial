# javascript-tutorial

##**Creational Design Patterns**##

*Used to Construct New Objects, Adapting Creation to the Situation*

###Constructor Pattern###

*Used to create new objects with their own object scope*

Putting 'new' infront of a function
 - Creates a brand new object
 - Links to an object prototype
 - Binds 'this' to the new object
 - Implicitly return this

###Module Pattern###

*Simple way to encapsulate methods, creates a 'Toolbox' of functions to use*

Object Literal:
```javascript
var Module = {
    method: function(){...},
    nextMethod: function(){...}
}
```
Wrap it in a function:
```javascript
var Module = function(){
    var privateVar = 'I am private...';
    return {
        method: function(){...},
        nextMethod: function(){...}
    }
}
```

###Factory Pattern###

*A pattern used to simply object creation*
 - Simplifies object creation
 - Creating different objects based on need
 - Repository Creation

###Singleton Pattern###

*Used to restrict an object to one instance of that object across the application*
  - Remembers the last time you used it
  - Hands the same instance back
  - Node.js uses CommonJS
