import React from 'react';
import { render } from 'react-dom';
import HomepageApp from './Homepage/HomepageApp';


render(
    <HomepageApp 
        {...window.HOMEPAGE_APP_PROPS}
    />,
     document.getElementById('react-homepage')
    
);