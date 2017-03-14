    const expect = require('expect');
    const {Users} = require('./users');

    describe('Users', () => {
        let users;

        beforeEach(() => {
            users = new Users();
            users.users = [{
                id: '1',
                name: 'Luba',
                room: 'Node Course'
            }, {
                id: '2',
                name: 'Anton',
                room: 'React Course'
            }, {
                id: '3',
                name: 'Pupse',
                room: 'Node Course'
            }];
        });

        it('should add new user', () => {
          let users = new Users();
          let user = {
              id: '123',
              name: 'Lubov',
              room: 'Patriot fans'
          };

          let resUser = users.addUser(user.id, user.name, user.room);

          expect(users.users).toEqual([user]);
       });

        it('should remove a user', () => {
            let userId = '3';
            let user = users.removeUser(userId);

            expect(user.id).toBe(userId);
            expect(users.users.length).toBe(2);
        });

        it('should not remove user', () => {
            let userId = '44';
            let user = users.removeUser(userId);

            expect(user).toNotExist();
            expect(users.users.length).toBe(3);
        });

        it('should find user', () => {
            let userId = '2';
            let user = users.getUser(userId);

            expect(user.id).toBe(userId);
        });

        it('should not find user', () => {
            let userId = '44';
            let user = users.getUser(userId);

            expect(user).toNotExist();
        });

        it('should return name for node course', () => {
            let userList = users.getUserList('Node Course');
            expect(userList).toEqual(['Luba', 'Pupse']);
        });

        it('should return name for react course', () => {
            let userList = users.getUserList('React Course');
            expect(userList).toEqual(['Anton']);
        });
    });
