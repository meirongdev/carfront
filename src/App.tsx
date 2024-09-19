import './App.css'
import {
  AppBar,
  CssBaseline,
  Container,
  Toolbar,
  Typography,
} from '@mui/material'

function App() {
  return (
    <>
      <Container maxWidth='xl'>
        <CssBaseline />
        <AppBar position='static'>
          <Toolbar>
            <Typography variant='h6'>Car Shop</Typography>
          </Toolbar>
        </AppBar>
      </Container>
    </>
  )
}

export default App
