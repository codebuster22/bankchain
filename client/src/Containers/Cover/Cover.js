import React from "react";
import SearchField from "./Components/SearchField";
import Header from "./Components/Header";

const Cover = ({handleChange}) =>{

    return (
        <div>
            <Header/>
            <SearchField  handleChange={handleChange}/>
        </div>
    )
}

export default Cover;