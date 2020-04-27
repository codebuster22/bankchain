import React from 'react';

const NavigationBar = () => (
    <nav className="pa3 pa4-ns">
        <div className="tc bg-white shadow-5 br-pill">
            <a className={"link dim gray f6 f5-ns dib mr3 no-underline"} href={"#"} title={"Home"}>Home</a>
            <a className={"link dim gray f6 f5-ns dib mr3 no-underline"} href={"#"} title={"About"}>About</a>
            <a className={"link dim gray f6 f5-ns dib mr3 no-underline"} href={"#"} title={"Store"}>Store</a>
            <a className={"link dim gray f6 f5-ns dib no-underline"} href={"#"} title={"Contact"}>Contact</a>
        </div>
    </nav>
);

export default NavigationBar