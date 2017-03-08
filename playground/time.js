    const moment = require('moment');

    // let date = new Date();
    // console.log(date.getMonth());

    new Date().getTime();
    let someTimestamp = moment().valueOf();
    console.log(someTimestamp);

    let createdAt = 1234;
    let date = moment(createdAt);
    console.log(date.format('MMM Do YYYY, h:mm a'));

