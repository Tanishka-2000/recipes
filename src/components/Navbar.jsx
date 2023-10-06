import { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import useMediaQuery from '@mui/material/useMediaQuery';
import Sidebar from './Sidebar';
import { Link, useNavigate } from "react-router-dom";
const drawerWidth = '240px';

// firebase
import { auth, googleProvider } from '../config/firebase';
import { signInWithPopup, signOut, onAuthStateChanged  } from "firebase/auth";

export default function Navbar({ darkMode, setDarkMode}) {
  const [open, setOpen] = useState(true);
  const [user, setUser] = useState(null);
  const matches = useMediaQuery('(max-width:900px)');
  const navigate = useNavigate();

  const login = () => {
    signInWithPopup(auth, googleProvider)
    .then( result => setUser(result.user))
    .catch(err => console.log(err))
  }

  const logout = () => {
    signOut(auth).then(() => {
      setUser(null);
      navigate('/')
    }).catch((error) => console.log(error));
  }

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) setUser(user)
      else setUser(null)
    });
  },[])

  return (
    <Box sx={{  }}>
      <AppBar position="fixed">
        <Toolbar sx={{marginLeft: !matches ? drawerWidth: '0'}}>
          {
            matches && <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2 }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          }
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            <Link to='/' style={{ color: 'white'}}>
                Spoonacular Recipes
            </Link>
          </Typography>
          <IconButton size="large" color='inherit' onClick={() => setDarkMode(prev => !prev)}>
            { darkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          
            { user
            ? <ProfileIcon logout={logout} image={user.photoURL}/>
            :<Button color="inherit" onClick={login}>Login with Google</Button>
            }
          
        </Toolbar>
      </AppBar>
      <Sidebar drawerWidth={drawerWidth} open={open} setOpen={setOpen} darkMode={darkMode}/>
    </Box>
  );
}

function ProfileIcon({ logout, image}) {

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return(
    <div>
    <Button
      aria-controls={open ? 'basic-menu' : undefined}
      aria-haspopup="true"
      aria-expanded={open ? 'true' : undefined}
      onClick={handleClick}
    >
      <img src={image} style={{width: '40px', height: '40px', borderRadius: '50%'}} />
    </Button>
    <Menu
      anchorEl={anchorEl}
      open={open}
      onClose={handleClose}
      MenuListProps={{
        'aria-labelledby': 'basic-button',
      }}
    >
      <MenuItem onClick={handleClose}><Link to='/favourite'>Favourites</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to='/create'>Create Recipes</Link></MenuItem>
      <MenuItem onClick={handleClose}><Link to='/my-recipes'>My Recipes</Link></MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  </div>
  )
}