import { useEffect, useState } from 'react'
import { Box, Typography, Button, Stack, List, ListItem, ListItemText, ListItemIcon, Chip, Snackbar, Alert} from '@mui/material'
import ClockIcon from '@mui/icons-material/AccessTimeFilled';
import LocalDiningIcon from '@mui/icons-material/LocalDining';
import SoupKitchenIcon from '@mui/icons-material/SoupKitchen';
import VegetarianIcon from '@mui/icons-material/Spa';
import HealthIcon from '@mui/icons-material/MonitorHeart';
import VeganIcon from '@mui/icons-material/Yard';
import { useLocation } from 'react-router-dom';

import { doc, updateDoc, arrayUnion, getDoc, setDoc } from "firebase/firestore"; 
import { auth, db,  } from '../config/firebase'

export default function Details() {
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false)
  const location = useLocation();
  const dish = location.state?.recipie;

  const addToFavorite = async () => {
    if(!auth.currentUser){
      setError(true)
      return;
    }

    await getDoc(doc(db, 'users', auth.currentUser.uid))
    .then(docSnap => {
      if( docSnap.exists()){
        updateDoc(doc(db, "users", auth.currentUser.uid), {
          favourites: arrayUnion(dish.id)
        })
      }else { // if doc don't exist then create one
        setDoc(doc(db, 'users', auth.currentUser.uid), {
          favourites: arrayUnion(dish.id)
        })
      }
    })
    setSuccess(true);
  }

  const handleErrorClose = () => setError(false);
  const handleSuccessClose = () => setSuccess(false);

  // title, image, readyInMinutes, summary, isVegetarian, isVegan, isHealthy, ingredients, recipie
  //  title, readyInMinutes, summary, vegetarian, vegan, healthy, filtered, analysesInstructions, diets, cuisines, dishTypes
  let filtered, imageSrc;
  if(dish.extendedIngredients){
    const ids = dish.extendedIngredients.map(({ id }) => id);
    filtered = dish.extendedIngredients.filter(({ id }, index) => !ids.includes(id, index + 1));
  }else filtered = dish.ingredients

  if(dish.image) imageSrc = dish.image
  else imageSrc = "https://spoonacular.com/recipeImages/" + dish.id + "-636x393.jpg"

  let diets = dish.diets || [];
  let cuisines = dish.cuisines || [];
  let dishTypes = dish.dishTypes || [];
  
  return (
    <Stack spacing={2} m={5}>

      <Snackbar open={error} autoHideDuration={6000} onClose={handleErrorClose}>
          <Alert onClose={handleErrorClose} variant="filled" severity="error" sx={{ width: '100%' }}>
            Please Login to add recipies to favourites
          </Alert>
      </Snackbar>

      <Snackbar open={success} autoHideDuration={6000} onClose={handleSuccessClose}>
          <Alert onClose={handleSuccessClose} variant="filled" severity="success" sx={{ width: '100%' }}>
            Recipie added to favourites successfully
          </Alert>
      </Snackbar>

      <Typography variant='h4' m>{dish.title}</Typography>

      <Stack direction='row' gap={2}>
        <Box sx={{ maxWidth: '600px', position: 'relative'}}>
          <img src={imageSrc} style={{width: '100%'}} />
        </Box>
        
        <Stack gap={2} sx={{ maxWidth: '50%'}}>
          <Stack direction="row" >
            <ClockIcon />
            <Typography variant="subtitle2" ml={1}>Ready in {dish.readyInMinutes} minutes</Typography>
          </Stack >

          <Stack direction="row" >
            <VegetarianIcon/>
            <Typography variant="subtitle2" ml={1}>{dish.vegetarian ? 'Vegetarian' : 'Non-vegetarian' }</Typography>
          </Stack >

          <Stack direction="row" >
            <VeganIcon />
            <Typography variant="subtitle2" ml={1}>{dish.vegan ? 'Vegean' : 'Not Vegan' }</Typography>
          </Stack >

          <Stack direction="row" >
            <HealthIcon />
            <Typography variant="subtitle2" ml={1}>{dish.healthy ? 'Healthy ' : 'Not very Healthy' }</Typography>
          </Stack >

          <Stack direction="row" alignItems='center' flexWrap='wrap' gap={1}>
            <Typography variant="subtitle2" mr={1}>Diets :</Typography>
            { diets.length > 0
              ? diets.map(item => <Chip key={item} label={item} variant="outlined"/>)
              : 'No diets Specified'
            }
          </Stack>

          <Stack direction="row" alignItems='center' flexWrap='wrap' gap={1}>
            <Typography variant="subtitle2" mr={1}>Cuisines :</Typography>
            { cuisines.length > 0
              ? cuisines.map(item => <Chip key={item} label={item} variant="outlined"/>)
              : 'No cuisine Specified'
            }
          </Stack>

          <Stack direction="row" alignItems='center' flexWrap='wrap' gap={1}>
            <Typography variant="subtitle2" mr={1}>Dish Type :</Typography>
            { dishTypes.length > 0
              ? dishTypes.map(item => <Chip key={item} label={item} variant="outlined"/>)
              : 'No dish type Specified'
            }
          </Stack>

          { dish.analyzedInstructions && <Button variant='contained' onClick={addToFavorite}>Add to Favourite</Button>}
        </Stack>
      </Stack>

      <Typography variant='h6'>About</Typography>
      <Typography variant="body1" color="text.secondary" component='div'>
          <p dangerouslySetInnerHTML={{__html: dish.summary}}/>
      </Typography>

      <Typography variant="h6">Ingredients</Typography>
      <List>

        {filtered.map(item => 
          <ListItem disablePadding key={item.id}>
            <ListItemIcon sx={{minWidth: '40px'}}>
              <LocalDiningIcon />
            </ListItemIcon>
            <ListItemText primary={item.original}/>
          </ListItem>)} 
      </List>
  
      <Typography variant="h5">Recipie</Typography>
      { dish.analyzedInstructions
        ? dish.analyzedInstructions.map((food, i) => {
        return(
          <Box key={'food'+i} sx={{marginLeft: '20px'}}>
            <Typography variant='h6'>{food.name}</Typography>
            <List>
            {
              food.steps.map((item, i) => 
                <ListItem disablePadding key={item.number}>
                  <ListItemIcon sx={{minWidth: '40px'}}>
                    <SoupKitchenIcon />
                  </ListItemIcon>
                  <ListItemText primary={item.step}/>
                </ListItem>
            )}
            </List>
          </Box>
        )})
        : dish.recipe.map(step => 
            <ListItem disablePadding key={step.id}>
              <ListItemIcon sx={{minWidth: '40px'}}>
                <SoupKitchenIcon />
              </ListItemIcon>
              <ListItemText primary={step.original}/>
            </ListItem>
          )
      }
    </Stack>
  )
}