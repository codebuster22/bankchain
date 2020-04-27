import React from "react";
import NavigationBar from "./NavigationBar";

const SearchField = ({handleChange}) => (
    <div className={"pb3"}>
        <NavigationBar className={''}/>
        <input className={"search br-pill shadow-5"} type={"search"} name={'searchField'} placeholder={"Search NPA"} onChange={handleChange}/>
    </div>
);

export default SearchField;