import Spinner from "../components/Spinner"
import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from 'react-router-dom'
import { MdOutlineAddBox } from "react-icons/md";
import { BsInfoCircle } from "react-icons/bs";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineDelete } from "react-icons/md";



function Home() {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
   

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:5000/books')
            .then((res) => {
                setBooks(res.data.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false)
            })
    }, []);





    const renderTable = () => {
        return <table className="w-full border-separate border-spacing-2">

            <thead >
                <tr>
                    <th className="border border-slate-600 rounded-md">No</th>
                    <th className="border border-slate-600 rounded-md">Title</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">Author</th>
                    <th className="border border-slate-600 rounded-md max-md:hidden">PublishYear</th>
                    <th className="border border-slate-600 rounded-md">Operations</th>
                </tr>

            </thead>
            <tbody>
                {books.map((book, index) =>{
            

return(
    <tr key={book._id} className="h-8">

        <td className="border border-slate-700 rounded-md text-center">
            {index + 1}
        </td>

        <td className="border border-slate-700 rounded-md text-center">
            {book.title}
        </td>

        <td className="border border-slate-700 rounded-md text-center max-mid:hidden">
            {book.author}
        </td>

        <td className="border border-slate-700 rounded-md text-center max-mid:hidden">
            {book.publishYear}
        </td>

        <td className="border border-slate-700 rounded-md text-center">
            <div className="flex justify-center gap-x-4">
                <Link to={`/books/details/${book._id}`}>
                    <BsInfoCircle />
                </Link>
                <Link to={`/books/edit/${book._id}`}>
                    <AiOutlineEdit />
                </Link>
                <Link to={`/books/delete/${book._id}`}>
                    <MdOutlineDelete />
                </Link>

            </div>
        </td>

    </tr>
)
                })}

            </tbody>
        </table>
    }


    return (
        <div className="p-4">
            <div className="flex justify-between items-center ">
                <h1 className="text-3xl my-8">Books List</h1>
                <Link to="/books/create">  <MdOutlineAddBox /></Link>
           

            </div>
            <div className="flex justify-center items-center">{loading ? (<Spinner />) : renderTable()}</div>

        </div>
    )
}
export default Home
