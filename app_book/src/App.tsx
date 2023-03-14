import './App.css'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Footer from './components/layout/Footer'
import Navbar from './components/layout/Navbar'
import Home from './pages/Home'
import SingleBook from './pages/SingleBook'
import AddBook from './pages/AddBook'
import SearchBooks from './pages/SearchBooks'
import UpdateBook from './pages/UpdateBook'


function App() {

  return (
    <div className="App">
      <BrowserRouter>
      <Navbar />
        <Routes>
          <Route path='/' element={<Navigate to="/home"/>} />
          <Route path='/home' element={<Home />} />
          <Route path='/book/:id' element={<SingleBook />} />
          <Route path='/book/create' element={<AddBook />} />
          <Route path='/book/update/:id' element={<UpdateBook />} />
          <Route path='/book/search' element={<SearchBooks />} />
        </Routes>
        <Footer />
      </BrowserRouter>      
    </div>
  )
}

export default App
