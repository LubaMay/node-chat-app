    let _ = require('lodash');

    // [{
    //     id: '192874iruierb',
    //     name: 'Lubov',
    //     room: 'Patriot fans'
    // }]

    class Users {
        constructor () {
          this.users = [];
        }
        addUser (id, name, room) {
            let user = {id, name, room};
            this.users.push(user);
            return user;
        }
        removeUser (id) {
            // return user that was removed
            let user = this.getUser(id);
            if (user) {
               this.users = this.users.filter((user) => {
                  return user.id !== id;
               });
            }

            return user;
        }

        getUser (id) {
            return this.users.filter((user) => user.id === id)[0];
        }

        getUserList (room) {
            let users = this.users.filter((user) => {
                return user.room === room;
            });
            return users.map((user) => user.name);
        }
    }

    module.exports = {Users};

    // class Person {
    //     constructor (name, age) {
    //         this.name = name;
    //         this.age = age;
    //     }
    //     getUserDescription () {
    //         return `${this.name} is ${this.age} year(s) old`;
    //     }
    // }
    //
    // let me = new Person('Lubov', 31);
    // let description = me.getUserDescription();
    // console.log(description);


