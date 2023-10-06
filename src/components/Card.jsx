import { Card, CardContent, CardActions, CardMedia, Button, Typography, Stack } from '@mui/material'
import AccessAlarmIcon from '@mui/icons-material/AccessAlarm';
import SpaIcon from '@mui/icons-material/Spa';
import { Link } from 'react-router-dom';

export default function RecipieCard({ recipie, removeCard }) {
  const { id, title, image, readyInMinutes, vegetarian, summary} = recipie;

  const handleDelete = (e) => {
    e.preventDefault()
    removeCard(id)
  }

  return (
    <Link to='/details/124' state={{recipie}} style={{ width: '100%'}}>
      <Card sx={{ maxWidth: 400}}>
        <CardMedia
          sx={{ height: 200 }}
          image={image || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQpOxQ3-wmRvQtjg0pTJX9oj9GKscBaADMZJg&usqp=CAU'}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="h6" sx={{fontSize: '18px' }}>
            {title}
          </Typography>

          <Stack direction='row' alignItems='center' color='text.secondary' my={1}>
            <AccessAlarmIcon />
            <Typography variant="subtitle2" ml={1}>{readyInMinutes} minutes</Typography>
            <SpaIcon sx={{marginLeft: 'auto'}}/>
            <Typography variant="subtitle2" ml={1}>{vegetarian ? 'Vegetarian' : 'Non-vegetarian' }</Typography>
          </Stack>

          <Typography variant="body2" color="text.secondary" component='div'>
            <div dangerouslySetInnerHTML={{__html: summary.slice(0,140) + '...'}}/>
          </Typography>

        </CardContent>
        {
          removeCard &&
          <CardActions sx={{ display: 'grid'}}>
            <Button onClick={handleDelete}>Remove</Button>
          </CardActions>
        }
      </Card>
    </Link>
  );
}

