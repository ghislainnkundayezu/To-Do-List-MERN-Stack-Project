import { FC } from "react";

export const SearchBar: FC = () => {
    return(
        <input 
            className="search-bar"
            type="search"
            placeholder="Search for tasks..." 
            name="" 
            id="" 
            onChange={() => {}}/>
    );
}