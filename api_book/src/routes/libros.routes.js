import {Router} from 'express'
import { getRecentBooks, getBooksSearch, getBookById, createBook, deleteBook, getBooksByGenre, getBooksBySerie, getAuthors, getSeries, getGenres, updateBook, getBook } from '../controllers/book.controller.js'

const router = Router()

router.get('/recent-books', getRecentBooks)
router.get('/genre/:genero', getBooksByGenre)
router.get('/serie/:idSerie', getBooksBySerie)
router.get('/books/', getBooksSearch)

router.get('/autores', getAuthors)
router.get('/series', getSeries)
router.get('/generos', getGenres)

router.get('/book/:id', getBookById)
router.get('/general-book/:id', getBook)
router.post('/book/create', createBook)
router.delete('/book/:id', deleteBook)
router.put('/book/:id', updateBook)


export default router