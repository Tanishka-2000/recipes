import { useState } from 'react'
import { TextField, Stack, Snackbar, Alert, Typography, Checkbox, FormControlLabel, Button  } from '@mui/material'

import { doc, updateDoc, arrayUnion, getDoc, setDoc  } from "firebase/firestore"; 
import { useQueryClient } from '@tanstack/react-query';
import { auth, db,  } from '../config/firebase'
import { useNavigate } from 'react-router-dom';


function CreateNew() {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [readyInMinutes, setReadyInMinutes] = useState("")
  const [summary, setSummary] = useState("")
  const [ingredients, setIngredients] = useState([])
  const [recipe, setRecipe] = useState([])
  const [vegetarian, setIsVegetatian] = useState(false)
  const [vegan, setIsVegan] = useState(false)
  const [healthy, setIsHealthy] = useState(false)
  const [error, setError] = useState(false)
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const removeIngredient = (id) => setIngredients(p => p.filter(item => item.id !== id))
  const removeStep = (id) => setRecipe(p => p.filter(item => item.id !== id))

  const handleErrorClose = () => setError(false);

  const saveRecipe = async  () => {
    // if any of value missing then return
    if(!(title && image && summary && readyInMinutes && ingredients && recipe)){
      setError(true);
      return;
    }
    let data = { title, image, readyInMinutes, summary, vegetarian, vegan, healthy, ingredients, recipe };

    // see if documnet exist
    await getDoc(doc(db, 'users', auth.currentUser.uid))
    .then(docSnap => {
      if( docSnap.exists()){
        updateDoc(doc(db, 'users', auth.currentUser.uid),{
          recipes: arrayUnion({
            id: Date.now(),
            ...data
          })
        })
      }else { // if doc don't exist then create one
        setDoc(doc(db, 'users', auth.currentUser.uid), {
          recipes: arrayUnion({
            id: Date.now(),
            ...data
          })
        })
      }
    })
    queryClient.invalidateQueries({ queryKey: ['myRecipes'] })
    navigate('/my-recipes')
  }
  
  return (
    <Stack gap={2} m={4} >
        <Typography variant='h6' sx={{ textAlign: 'center', textTransform: 'uppercase'}}>Create Your recipe</Typography>
        <TextField
         label='Name of Recipe'
         value={title}
         onChange={e => setTitle(e.target.value)}
        />
        <TextField
         label='Image URL of Recipe'
         value={image}
         onChange={e => setImage(e.target.value)}
        />

        <Stack direction='row' gap={2}>
          <TextField
          label='Ready in Minutes'
          type='number'
          value={readyInMinutes}
          onChange={e => setReadyInMinutes(e.target.value)}
          />
          <FormControlLabel
           control={<Checkbox checked={vegetarian} onChange={e => setIsVegetatian(e.target.checked)} />}
           label="Vegetarian"
          />
          <FormControlLabel
           control={<Checkbox checked={vegan} onChange={e => setIsVegan(e.target.checked)} />}
           label="Vegan"
          />
          <FormControlLabel
           control={<Checkbox checked={healthy} onChange={e => setIsHealthy(e.target.checked)} />}
           label="Healthy"
          />
        </Stack>

        <TextField
         label='About the Recipe'
         multiline
         rows={3}
         value={summary}
         onChange={e => setSummary(e.target.value)}
        />

        <ListInput setItems={setIngredients} label="Ingredients used"/>
        {
          ingredients.length > 0 && <ListItems items={ingredients} removeItem={removeIngredient}/>}

        <ListInput setItems={setRecipe} label="Steps in Recipe"/>
        { recipe.length > 0 && <ListItems items={recipe} removeItem={removeStep} />}
        
        <Button variant='contained' onClick={saveRecipe}>Save Recipe</Button>

        <Snackbar open={error} autoHideDuration={6000} onClose={handleErrorClose}>
          <Alert onClose={handleErrorClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            Please fill in all the fields
          </Alert>
        </Snackbar>
    </Stack>
  )
}

export default CreateNew

function ListInput({ setItems, label }){
  const [text, setText] = useState("")

  const addItem = (e) => {
    e.preventDefault()
    if(!text.trim()) return;
    setItems(p => [...p, { id: Date.now(), original: text}]) //used "original" name to be consistent with the API
    setText("")
  }

  return(
    <form onSubmit={addItem}>
      <Stack direction='row' gap={2} mb={2}>
        <TextField
        label={label}
        value={text}
        onChange={e => setText(e.target.value)}
        sx={{flex: 1}}
        />
        <Button variant='outlined' type='submit'>Add</Button>

      </Stack>
    </form>
  )
}

function ListItems({ items, removeItem }){
  return(
    <Stack gap={1}>
      { items.map( (item, i) => 
        <Stack key={item.id} direction='row'>
          <Typography sx={{ flex: 1}}>{i+1}. {item.original}</Typography>
          <Button variant='contained' onClick={() => removeItem(item.id)}>Remove</Button>
        </Stack>
      )}
    </Stack>
  )
}