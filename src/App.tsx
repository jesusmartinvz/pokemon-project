import './App.css'
import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './components/layout/DefaultLayout'

import HomePage from './pages/HomePage/HomePage'
import PokemonDetPage from './pages/PokemonDetPage/PokemonDetPage'
import PokemonFavPage from './pages/PokemonFavPage/PokemonFavPage'

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path='pokemon/:name' element={<PokemonDetPage />} />
        <Route path="favoritos" element={<PokemonFavPage />} />
        
      </Route>
    </Routes>
  )
}

export default App
