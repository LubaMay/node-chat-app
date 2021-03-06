    let socket = io();

    function scrollToBottom () {
        // Selectors
        let messages = jQuery('#messages');
        let newMessage = messages.children('li:last-child');
        // Heights
        let clientHeight =messages.prop('clientHeight');
        let scrollTop = messages.prop('scrollTop');
        let scrollHeight = messages.prop('scrollHeight');
        let newMessageHeight = newMessage.innerHeight();
        let lastMessageHeight = newMessage.prev().innerHeight();

        if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
            messages.scrollTop(scrollHeight);
        }
    }


    // Listen Events
    socket.on('connect', function () {
        let params = jQuery.deparam(window.location.search);

        socket.emit('join', params, function (error) {
            if (error) {
                alert(error);
                window.location.href = '/';
            } else {
                console.log('No error');
            }
        });
    });


    socket.on('disconnect', function () {
        console.log('Disconnected from server');
    });

    socket.on('updateUserList', function (users) {
        let ol = jQuery('<ol></ol>');

        users.forEach(function (user) {
            ol.append(jQuery('<li></li>').text(user));
        });

        jQuery('#users').html(ol);
    });

    socket.on('newMessage', function (message) {
       let formattedTime = moment(message.createdAt).format('h:mm a');
       let template = jQuery('#message-template').html();
       let html = Mustache.render(template, {
           text: message.text,
           from: message.from,
           createdAt: formattedTime
       });

       jQuery('#messages').append(html);
       scrollToBottom();
    });

    socket.on('newLocationMessage', function (message) {
        let formattedTime = moment(message.createdAt).format('h:mm a');
        let template = jQuery('#location-message-template').html();
        let html = Mustache.render(template, {
           from: message.from,
           createdAt: formattedTime,
           url: message.url
        });

        jQuery('#messages').append(html);
        scrollToBottom();
    });

    //-----------------------------------------------------
    // jQuery

    jQuery('#message-form').on('submit', function (event) {
        event.preventDefault();

        let messageTextbox = jQuery('[name=message]');

        socket.emit('createMessage', {
            text: messageTextbox.val()
        }, function () {
            messageTextbox.val('')
        });
    });

    let locationButton = jQuery('#send-location');
    locationButton.on('click', function () {
        if (!navigator.geolocation) {
            return alert('Geolocation not supported by your browser.');
        }

        locationButton.attr('disabled', 'disabled').text('Sending location...');

        navigator.geolocation.getCurrentPosition(function (position) {
            locationButton.removeAttr('disabled').text('Send location');
            socket.emit('createLocationMessage', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            });
        }, function () {
            locationButton.removeAttr('disabled').text('Send location');
            alert('Unable to fetch location.');
        });
    });
