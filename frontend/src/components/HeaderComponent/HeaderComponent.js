import React from 'react';
import { withRouter } from "react-router-dom";

function Header(props) {
    const capitalize = (s) => {
        if (typeof s !== 'string') return ''
        return s.charAt(0).toUpperCase() + s.slice(1)
    }
    const title = capitalize(props.location.pathname.substring(1,props.location.pathname.length))
    return(
        <nav className="navbar navbar-dark bg-primary">
            <div className="row col-12 d-flex justify-content-center text-white">
                <h2 style={{color:'black'}}>{props.title || title}</h2>
            </div>
        </nav>
    )
}
export default withRouter(Header);