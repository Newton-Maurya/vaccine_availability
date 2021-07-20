import React from 'react';
import Container from './container'
import Navbar from './navbar'
import Footer from './footer'
import { Route } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';

const Main = () => {
    return (
        <><Router>
                <Navbar />
                <Route exact path='/' component={Container} />
                {/* <Route exact path='/about'  /> */}
                <Footer />
            </Router>
        </>
    )
}
export default Main