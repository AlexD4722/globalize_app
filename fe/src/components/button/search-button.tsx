import { Search } from "../svg";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {};


const SearchButton = ({className, ...props} : ButtonProps) => {
    return (
        <>
        <button className={`flex items-center leading-[1.5] ${className}`} {...props}>
            <span className="mr-2"><Search/></span>
            {true && <span>Search</span>}
        </button>
        </>
    )
}

export default SearchButton;