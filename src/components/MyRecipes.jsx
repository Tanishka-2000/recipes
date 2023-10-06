import { getDoc, doc, updateDoc  } from "firebase/firestore"; 
import { auth, db,  } from '../config/firebase'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Box, Typography } from '@mui/material';
import List from './List';


function MyRecipes() {
  const { data, loading } = useQuery({
    queryKey: ['myRecipes'],
    queryFn: () => getMyRecipes()
  })

  const queryClient = useQueryClient();

  async function deleteRecipe(id) {
    
    let newRecipes = data.filter( res => res.id !== id)
    await updateDoc(doc(db, 'users', auth.currentUser.uid), {
      recipes: newRecipes
    })
    queryClient.invalidateQueries({ queryKey: ['myRecipes'] })
  }
    
  return (
    <Box sx={{ width: '100%', p:3}}>
      <Typography variant='h5' sx={{ my: 2, textAlign: 'center'}}>Your Recipes</Typography>
      {
        !loading
        ? <List data={data} removeCard={deleteRecipe} />
        : <p>Loading...</p>
      }
    </Box>
  )
}

export default MyRecipes

function getMyRecipes() {
  return getDoc(doc(db, 'users', auth.currentUser.uid))
  .then(docSnap => docSnap.data().recipes)
}