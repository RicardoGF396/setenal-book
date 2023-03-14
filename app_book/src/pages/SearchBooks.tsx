import axios from "axios";
import React, { useState } from "react";
import BookSearchItem from "../components/BookSearchItem";
import clienteAxios from "../config/config";
import { BookSearch } from "../interfaces/BookSearch";

function SearchBooks() {
  const [searchName, setSearchName] = useState("");
  const [searchYear, setSearchYear] = useState("");
  const [searchAuthor, setSearchAuthor] = useState("");
  const [books, setBooks] = useState([]);

  const userData = async (value: string, type: string) => {
    const res = await clienteAxios.get(`/books`);
    const { data } = res;
    switch (type) {
      case "nombre":
        setSearchAuthor("");
        setSearchYear("");
        const nameResults = data.filter((book: BookSearch) => {
          return (
            book.nombre.toLowerCase().includes(value) || book.nombre.includes(value)
          );
        });
        setBooks(nameResults);
        break;
      case "anio":
        setSearchAuthor("");
        setSearchName("");
        const anioResults = data.filter((book: BookSearch) => {
          return book && book.anio && book.anio.toLowerCase().includes(value);
        });
        setBooks(anioResults);
        break;
      case "autor":
        setSearchName("");
        setSearchYear("");
        const authorResults = data.filter((book: BookSearch) => {
          return (
            book.autor_nombre.toLowerCase().includes(value) || book.autor_nombre.includes(value)
          );
        });
        setBooks(authorResults);      
        break;
    }
  };

  const handleNameChange = (value: string, type: string) => {
    switch (type) {
      case "nombre":
        setSearchName(value);
        userData(value, type);
        break;
      case "anio":
        setSearchYear(value);
        userData(value, type);
        break;
      case "autor":
        setSearchAuthor(value);
        userData(value, type);
        break;
    }
    
  };

  return (
    <div className="px-4">
      <h1 className="font-lora text-4xl my-4">Buscar libro</h1>

      <div className="flex flex-col gap-y-2 mb-12 lg:flex-row lg:gap-x-6">
        <label>
          {" "}
          Libro
          <input
            onChange={(e) => handleNameChange(e.target.value, "nombre")}
            value={searchName}
            className="border pl-4 w-full bg-transparent border-[#191C24] h-[40px] rounded-full"
            placeholder="Ingresa el nombre del libro"
          />
        </label>

        <label>
          {" "}
          Autor
          <input
            onChange={(e) => handleNameChange(e.target.value, "autor")}
            value={searchAuthor}
            className="border pl-4 w-full bg-transparent border-[#191C24] h-[40px] rounded-full"
            placeholder="Ingresa el nombre del autor"
          />
        </label>

        <label>
          {" "}
          Año
          <input
            onChange={(e) => handleNameChange(e.target.value, "anio")}
            value={searchYear}
            className="border pl-4 w-full bg-transparent border-[#191C24] h-[40px] rounded-full"
            placeholder="Ingresa el año de publicación"
          />
        </label>
      </div>

      {books.map((book:BookSearch) => (
        <BookSearchItem key={book.id} book={book} />
      ))}

    </div>
  );
}

export default SearchBooks;
