import React from 'react';
import { render } from 'react-dom';
import Chatbox from './Components/Chatbox';


render(
    <Chatbox />,
    document.getElementById('react-chatbox')
);

$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});