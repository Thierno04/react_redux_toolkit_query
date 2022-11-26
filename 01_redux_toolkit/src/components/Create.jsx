import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { useCreateBookMutation, useGetBooksQuery } from '../app/services/bookService';

const initialState = {
  name: '',
  author: '',
}

const Create = () => {
  const navigate = useNavigate();
  const [createBook, data] = useCreateBookMutation();
  const fetchBooks = useGetBooksQuery();

  const [state, setState] = useState(initialState);

  const handle = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  }

  const createNewBook = async (e) => { 
    e.preventDefault();
    await createBook(state);
    fetchBooks.refetch();
    navigate("/");
  };

  return (
    <div className='container'>
      <h3 style={{ marginBottom: '15px' }}>Create new book</h3>
      <form onSubmit={createNewBook}>
        <input type='text' name='name' placeholder='Book name' onChange={handle} value={state.name} required />
        <input type='text' name='author' onChange={handle} value={state.author} placeholder='Book author' required />
        <button type='submit'>create new book</button>
      </form>
    </div>
  )
}

export default Create
