import { useState } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Box from '@mui/material/Box'
import { Main, Navbar, CreateNew, Favourite, Details, MyRecipes } from "./components"
import { Routes, Route, ScrollRestoration } from 'react-router-dom';

function App() {
  const [darkMode, setDarkMode] = useState(false);
 
  return (
    <ThemeProvider theme={ darkMode ? createTheme({ palette: {mode: 'dark' }}) : createTheme({ palette: {mode: 'light' }})}>
      <CssBaseline />
      <Box sx={{ display: 'flex'}}>
        <Navbar darkMode={darkMode} setDarkMode={setDarkMode}/>
        <Box sx={{ flexGrow: 1, marginTop: '70px'}}>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/favourite" element={<Favourite />} />
            <Route path="/details/*" element={<Details />} />
            <Route path="/create" element={<CreateNew />} />
            <Route path="/my-recipes" element={<MyRecipes />} />
          </Routes>
        </Box>
      </Box>
      <ScrollRestoration />
    </ThemeProvider>
  )
}

export default App
