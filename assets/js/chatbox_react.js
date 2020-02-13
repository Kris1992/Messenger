import React from 'react';
import { render } from 'react-dom';
import ChatboxApp from './Components/ChatboxApp';


render(
    <ChatboxApp />,
    document.getElementById('react-chatbox')
);

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});