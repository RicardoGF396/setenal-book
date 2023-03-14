import React from 'react'
import { Link } from 'react-router-dom'
import Book from '../assets/book.png'
import { BookSearch } from '../interfaces/BookSearch'

function BookSearchItem({book}:{book: BookSearch}) {

    const {id, nombre, anio, imagen, autor_nombre, genero} = book

  return (
    <>
        <Link to={`/book/${id}`}>
        <div className='flex gap-x-6 pb-6 pt-4 border-b-[1px] border-[#959691] items-center'>
        <div className='rounded-lg bg-white p-3 flex justify-center items-center'>
        <img className='h-[75px] w-[75px] object-contain' src={imagen} alt=''/>
        </div>
        <div>
            <p className='font-lora text-lg'> {nombre} </p>
            <p className='text-sm font-medium'> {anio} </p>
            <p className='text-base'> {autor_nombre} </p>
            <p className='text-sm font-medium'> {genero} </p>
        </div>
    </div>
        </Link>
    </>
  )
}

export default BookSearchItem