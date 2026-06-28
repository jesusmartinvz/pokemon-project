import './App.css'
import { Route, Routes } from 'react-router-dom'
import { DefaultLayout } from './components/layout/DefaultLayout'

import HomePage from './pages/HomePage/HomePage'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { PokemonDetailPage } from './pages/PokemonDetailPage/PokemonDetailPage'

function App() {
  return (
    <Routes>
      <Route element={<DefaultLayout />}>
        <Route index element={<HomePage />} />
        <Route path='pokemon/:name' element={<PokemonDetailPage />} />
        <Route path="favoritos" element={<FavoritesPage />} />
        
      </Route>
    </Routes>
  )
}

export default App
