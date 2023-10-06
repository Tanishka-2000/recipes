import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress';
import RecipieCard from './Card';

function List({ data, removeCard }) {
  return (
    <Grid container spacing={2}>
    {
        data
        ? data.map(recipie => 
            <Grid key={recipie.id} item xs={12} sm={6} lg={4} xl={3} container justifyContent='center'>
                <RecipieCard recipie={recipie} removeCard={removeCard}/>
            </Grid>
            )
        : <Grid item xs={12} container justifyContent='center'>
            <CircularProgress />
          </Grid>
    }
    </Grid>
  )
}

export default List