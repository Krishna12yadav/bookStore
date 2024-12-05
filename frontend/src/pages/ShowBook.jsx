import { useState,useEffect } from "react"
import { useParams } from "react-router-dom"
import axios from "axios"
import BackButton from "../components/backButton"
import Spinner from "../components/Spinner"

function ShowBook() {
  const [book,setBook]=useState({})
  const [loading,setLoading]=useState(false)
  const bookId=useParams();

  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/books/${bookId.id}`)
    .then((res)=>{
     setBook(res.data.data)
      setLoading(false);

    }).catch((error)=>{
      console.log(error);
      setLoading(false)
    })

  }, []);


 const renderBookDetails=()=>{
  return<div className="flex flex-col border-2 border-sky-400  rounded-xl w-fit p-4 w-[600px]">
    <div className="my-4">
      <span className="text-xl mr-4  text-grey-500">id:</span>
      <span>{book._id}</span>
    </div>

    <div className="my-4">
      <span className="text-xl mr-4  text-grey-500">Title:</span>
      <span>{book.title}</span>
    </div>

    <div className="my-4">
      <span className="text-xl mr-4  text-grey-500">Author:</span>
      <span>{book.author}</span>
    </div>

    <div className="my-4">
      <span className="text-xl mr-4  text-grey-500">publishYear:</span>
      <span>{book.publishYear}</span>
    </div>

    <div className="my-4">
      <span className="text-xl mr-4  text-grey-500">Create Time:</span>
      <span>{new Date(book.createdAt).toString()}</span>
    </div>

    <div className="my-4">
      <span className="text-xl mr-4  text-grey-500">Update Time:</span>
      <span>{new Date(book.updatedAt).toString()}</span>
    </div>

   
  </div>
 }

  return (
    <div className="p-4">
      <BackButton/>
      <h1 className="text-3xl my-4">Show Book</h1>
      <div className="flex justify-center items-center">      {loading? (<Spinner/>):renderBookDetails()}</div>

    </div>
  )
}
export default ShowBook
