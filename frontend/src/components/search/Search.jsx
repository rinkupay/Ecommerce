import React, { useState ,Fragment} from 'react'
import "./Search.css"
import { useNavigate } from 'react-router-dom'
import { AiOutlineSearch } from "react-icons/ai";
// import SearchIcon from '@material-ui/icons/Search';

const Search = () => {
    
    
    const navigate = useNavigate();
    const [keyword , setKeyword] = useState("");

    const searchSubmitHandler = (e)=> {
        e.preventDefault();
        

        if(keyword.trim()){
            navigate(`/products/${keyword}`)
        }
        else{
            navigate("/products")
        }
    }
  return (
    <Fragment>
        <form className='searchBox' onSubmit={searchSubmitHandler}>
        <input className='search-input' type='text' placeholder='Search...' onChange={(e)=>setKeyword(e.target.value)}/>
        {/* <input className='search-submit' type='submit' value='Search' /> */}
        <AiOutlineSearch size={'1.6rem'} className='search-submit' onClick={searchSubmitHandler}/>
        
        
    </form>
    </Fragment>
  )
}

export default Search
