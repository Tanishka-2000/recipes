import {useEffect, useState } from 'react';
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import { useSearchParams } from "react-router-dom";
import { useQuery } from '@tanstack/react-query';
import List from './List.jsx';

export default function Main(){

    let [searchParams, setSearchParams] = useSearchParams();
    const query = searchParams.get('search') || "";

    const { data} = useQuery({
        queryKey: ['recipies', query],
        queryFn: () => getRecipies(query)
    });

    const submitQuery = (search) => setSearchParams({ search })

     return(
        <Box p={3} >
            <SearchBar submit={submitQuery} />
            <List data={data} />
        </Box>
    )
}

function SearchBar({ submit }){
  const [text, setText] = useState("");

  const handleClick = () => {
    submit(text);
    setText("")
  }
  return(
    <Toolbar disableGutters sx={{marginBottom: '20px', gap: '20px'}}>
        <TextField 
            id="search"
            label="Search Your Recipie"
            variant="outlined"
            sx={{ flex: 1}}
            value={text}
            onChange={(event) => {
                setText(event.target.value);
            }}
        />
        <Button variant='contained' size='large' onClick={handleClick}>Search</Button>
    </Toolbar>
)}

function getRecipies(query){
    let url = query 
    ? 'https://api.spoonacular.com/recipes/complexSearch?apiKey=cfa4a00c6313431a8edd403d95233fe8&query='+ query +'&addRecipeInformation=true&fillIngredients=true&number=12'
    : 'https://api.spoonacular.com/recipes/random?apiKey=cfa4a00c6313431a8edd403d95233fe8&number=12';

   return fetch(url)
    .then( response => response.json())
    .then( result => {
        if(!query) return result.recipes
        return result.results;
    });
}