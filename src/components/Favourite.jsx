import { useState, useEffect } from 'react'

import { getDoc, arrayRemove, doc, updateDoc  } from "firebase/firestore";  
import { onAuthStateChanged } from "firebase/auth";
import { auth, db,  } from '../config/firebase'
import { useQuery } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import List from './List';


function Favourite() {
  const [user, setUser] = useState(null);
  const [favourites, setFavourites] = useState(null)

  const { data, loading} = useQuery({
    queryKey: ['favourites', favourites ],
    queryFn: () => getRecipiesByIds(favourites),
    enabled: !!favourites
  })

  const removeFromFavourite = (id) => {
    updateDoc(doc(db, "users", auth.currentUser.uid), {
      favourites: arrayRemove(id)
    });
    setFavourites(prev => prev.filter(currId => currId !== id))
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      else setUser(null)
    });
  }, [])

  useEffect(() => {
    if(!user) return;
    getDoc(doc(db, "users", user.uid))
    .then(docSnap => docSnap.data())
    .then(data => setFavourites(data.favourites));
  },[user])
    
  return (
    <Box sx={{ width: '100%', p:3}}>
      <Typography variant='h5' sx={{ my: 2, textAlign: 'center'}}>Your Favourites</Typography>
      {
        data
        ? <List data={data} removeCard={removeFromFavourite}/>
        : <p>Loading...</p>
      }
    </Box>
  )
}

export default Favourite

async function getRecipiesByIds(ids) {
  return fetch('https://api.spoonacular.com/recipes/informationBulk?apiKey=cfa4a00c6313431a8edd403d95233fe8&ids=' + ids.join(','))
  .then(response => response.json())
}