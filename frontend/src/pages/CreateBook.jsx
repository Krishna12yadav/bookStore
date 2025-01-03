
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import BackButton from '../components/BackButton'


function CreateBook (){
  const[title,setTitle]=useState('');
  const[author,setAuthor]=useState('');
  const[publishYear,setPublishYear]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();

  const handleSaveBook=()=>{
    const data={title,author,publishYear};
    setLoading(true)
    axios.post('https://bookstore-4-6m74.onrender.com/books', data, {headers: {'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setLoading(false);
        navigate('/')
      })
      .catch(error => {console.error('Error:', error);
      });
    
  }


  const renderCreateBook=()=>{
    return<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto">
      <div className="my-4">
        <label className="text-xl mr-4 text-grey-400">
         Title
        </label>
        <input type="text" value={title} onChange={(e)=>setTitle(e.target.value)} 
        className="border-2 border-grey-500 px-4 py-2 w-full"/>
        

      </div>

      <div className="my-4">
        <label className="text-xl mr-4 text-grey-400 w-full">
         Author
        </label>
        <input type="text" value={author} onChange={(e)=>setAuthor(e.target.value)}
        className="border-2 border-grey-500 px-4 py-2 w-full"/>
       

      </div>

      <div className="my-4">
        <label className="text-xl mr-4 text-grey-400 w-full">
       PublishYear
        </label>
        <input type="text" value={publishYear} onChange={(e)=>setPublishYear((e.target.value))}
        className="border-2 border-grey-500 px-4 py-2 w-full"/>
    

      </div>
      <button className="p-2 bg-sky-200 m-8" onClick={handleSaveBook}>Add Book</button>
    </div>
  }



  return (
    <div className="p-4">
      <BackButton className="text-3xl"/>
      <h1 className="text-3xl my-4">CreateBook</h1>
      {loading? (<Spinner/>):renderCreateBook()}
    </div>
  )
}
export default CreateBook
