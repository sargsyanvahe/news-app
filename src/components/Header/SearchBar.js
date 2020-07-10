import React from "react";

export default function SearchBar({ handleSubmit, handleChange, value }) {

    return (
        <form onSubmit={handleSubmit} className="search-bar">
            <input onChange={handleChange} value={value} placeholder='Search...' className='js-search' type="text"/>
            <i onClick={handleSubmit} className="fa fa-search"/>
        </form>
    )
}