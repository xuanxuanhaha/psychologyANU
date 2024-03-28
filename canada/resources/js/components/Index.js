import React, {Component} from 'react';
import ReactDOM from "react-dom";
import Header from "./Header";
import Footer from "./Footer";

class Index extends Component {
    render() {
        return (
            <div className="container">
                <Header/>
                <Footer/>
            </div>
        );
    }
}

export default Index;

if (document.getElementById('example')) {
    ReactDOM.render(<Index/>, document.getElementById('example'));
}
