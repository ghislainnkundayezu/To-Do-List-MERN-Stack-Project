import { FC, useRef } from "react";

interface SearchBarProps {
    searchQuery: string;
    updateSearchQuery: (searchQuery: string | undefined) => void;
}

export const SearchBar: FC<SearchBarProps> = ({updateSearchQuery, searchQuery}) => {
    const searchBarRef = useRef<HTMLInputElement>(null);
    
    return(
        <input 
            ref={searchBarRef}
            className="search-bar"
            value={searchQuery}
            type="search"
            placeholder="Search for tasks..." 
            name="" 
            id="" 
            onChange={() => updateSearchQuery(searchBarRef.current?.value)}/>
    );
}