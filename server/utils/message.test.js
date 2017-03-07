    const expect = require('expect');

    let {generateMessage, generateLocationMessage} = require('./message');

    describe('generateMessage', () => {
        it('should generate correct message object', () => {
           let from = 'Anton';
           let text = 'I love you';
           let message = generateMessage(from, text);

           expect(message.createdAt).toBeA('number');
           expect(message).toInclude({from, text});
        });
    });

    describe('generateLocationMessage', () => {
        it('should generate correct location object', () => {
            let from = 'Luba';
            let latitude = 1;
            let longitude = 1;
            let url = 'https://www.google.com/maps?q=1, 1';
            let locationMessage = generateLocationMessage(from, latitude, longitude);

            expect(locationMessage.createdAt).toBeA('number');
            expect(locationMessage).toInclude({from, url});
        });
    });