import BackButton from "../components/BackButton";
import { useState,useEffect } from "react";
import axios from "axios";
import { useNavigate,useParams } from "react-router-dom";
import Spinner from "../components/Spinner";


function EditBook (){
  const[title,setTitle]=useState('');
  const[author,setAuthor]=useState('');
  const[publishYear,setPublishYear]=useState('');
  const [loading,setLoading]=useState(false);
  const navigate=useNavigate();
  const bookId=useParams();


  useEffect(() => {
    setLoading(true);
    axios.get(`http://localhost:5000/books/${bookId.id}`)
    .then((res)=>{
      setTitle(res.data.data.title);
      setAuthor(res.data.data.author);
      setPublishYear(res.data.data.publishYear)
      setLoading(false)
    }).catch((err)=>{
      console.log(err)
    })
  }, []);

  const handleSaveBook=()=>{
    let data={};
    if(title!=''){
      data={...data,title}
    }
    if(author!=''){
      data={...data,author}
    }
    if(publishYear!=''){
      data={...data,publishYear}
    }
    setLoading(true)
    axios.put(`http://localhost:5000/books/${bookId.id}`, data, {headers: {'Content-Type': 'application/json',
      },
    })
      .then(() => {
        setLoading(false);
        navigate('/')
      })
      .catch(error => {console.error('Error:', error);
      });
    
  }

  const renderEditBook=()=>{
    return<div className="flex flex-col border-2 border-sky-400 rounded-xl w-[600px] p-4 mx-auto  ">
      <div className="my-4 ">
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
      <BackButton/>
      <h1 className="text-3xl my-4">EditBook</h1>
      {loading? (<Spinner/>):renderEditBook()}
    </div>
  )
}
export default EditBook