import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import { IconButton, ListItemIcon, Toolbar, Typography, useMediaQuery } from '@mui/material';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import { Link } from "react-router-dom"

export default function Sidebar({ drawerWidth, open, setOpen, darkMode }) {
    const matches = useMediaQuery('(max-width:900px)');
    return(
        <Drawer
         sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
          variant={matches ? 'temporary' : 'permanent'}
          anchor="left"
          open={open}
      >
        <Toolbar >
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Ingredients</Typography>
          {matches &&
          <IconButton
            size="large"
            edge="end"
            color="inherit"
            onClick={() => setOpen(false)}
          >
            <ChevronLeftIcon />
          </IconButton>
          
          }
        </Toolbar>
        <Divider />
        <List>
        {
          ingredients.map(({name, icon}) => 
            <Link  to={'/?search='+ name} key={name}>
              <ListItem key={name} disablePadding sx={{borderBottom: '1px solid #eee', color: darkMode ? ' #eee' : '#444'}}>
                  <ListItemButton>
                    <ListItemIcon sx={{minWidth: '40px'}}>
                      {icon}
                    </ListItemIcon>
                    <ListItemText
                      color='inherit'
                      primary={name}
                    />
                  </ListItemButton>
              </ListItem>
            </Link>       
            )
        }
        </List>
      </Drawer>
    )
}

import ChocolateIcon from '@mui/icons-material/Bento';
import LeafIcon from '@mui/icons-material/Spa';
import RiceBowlIcon from '@mui/icons-material/RiceBowl';
import BakeryDiningIcon from '@mui/icons-material/BakeryDining';
import KitchenIcon from '@mui/icons-material/Kitchen';
import EggIcon from '@mui/icons-material/Egg';
import CupIcon from '@mui/icons-material/EmojiFoodBeverage';
import CoffeeIcon from '@mui/icons-material/LocalCafe';
import PieIcon from '@mui/icons-material/BrunchDining';
import IcecreamIcon from '@mui/icons-material/Icecream';
import CakeIcon from '@mui/icons-material/Cake';
import MeatIcon from '@mui/icons-material/EggAlt';
import LiquorIcon from '@mui/icons-material/Liquor';
import SetMealIcon from '@mui/icons-material/SetMeal';
import KebabDining from '@mui/icons-material/KebabDining';
import MicrowaveIcon from '@mui/icons-material/Microwave';
import BlenderIcon from '@mui/icons-material/Blender';
import CookieIcon from '@mui/icons-material/Cookie';
const ingredients = [
    {
        name: 'Oven',
        icon: <MicrowaveIcon  />
    },
    {
        name: 'Flour',
        icon: <LeafIcon  />
    },
    {
        name: 'Pasta',
        icon: <RiceBowlIcon  />
    },
    {
        name:  'Bread',
        icon: <BakeryDiningIcon  />
    },
    {
        name:  'Cookie',
        icon: <CookieIcon  />
    },
    {
        name: 'Frozen',
        icon: <KitchenIcon  />
    },
    {
        name: 'Pie',
        icon: <PieIcon  />
    },
    {
      name: 'Juice',
      icon: <BlenderIcon  />
    },
    {
        name: 'Eggs',
        icon: <EggIcon  />
    },
    {
        name:  'Tea',
        icon: <CupIcon  />
    },
    {
      name:  'Coffee',
      icon: <CoffeeIcon  />
    },
    {
      name: 'Rice',
      icon: <RiceBowlIcon  />
    },
    {
        name: 'Icecream',
        icon: <IcecreamIcon  />
    },
    {
        name: 'Meat',
        icon: <MeatIcon  />
    },
    {
        name: 'Alcohol',
        icon: <LiquorIcon  />
    },
    {
        name: 'Fish',
        icon: <SetMealIcon  />
    },
    {
        name: 'Chicken',
        icon: <KebabDining  />
    },
    {
        name: 'Cake',
        icon: <CakeIcon  />
    },
    {
        name: 'Chocolate',
        icon: <ChocolateIcon  />
    },
];