import { useParams } from "react-router-dom"
import { useState } from "react";
import axios  from "axios"
import Spinner from "../components/Spinner";
import BackButton from "../components/BackButton";
import { useNavigate } from "react-router-dom";

function DeleteBook() {
  const[loading,setLoading]=useState(false);

  const navigate=useNavigate();
  const bookId=useParams();

  const handleDeleteBook=()=>{
    setLoading(true);
    axios.delete(`https://bookstore-4-6m74.onrender.com/books/${bookId.id}`)
    .then(()=>{
      setLoading(false)
      navigate('/')
    }).catch((err)=>{
      console.log(err)
    })
  }

  const renderDeleteBook=()=>{
    return<div className="flex flex-col items-center border-2 border-sky-200 rounded-xl w-[600px] p-8">
      <h3 className="text-3xl">Are you sure want to delete this book?</h3>
      <button className="p-4 text-white bg-red-600 m-8 w-full" onClick={handleDeleteBook}>Delete book</button>
    </div>
  }

  return (
    <div className='p-4'>
      <BackButton/>
      <h1 className="text-3xl my-4">Delete Book</h1>
      <div className="flex justify-center items-center"> 
      {loading? (<Spinner/>):renderDeleteBook()}</div>
    </div>
  )
}
export default DeleteBook
