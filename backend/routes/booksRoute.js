import express from 'express';
import { Book } from '../models/bookModel.js';
import mongoose from 'mongoose';

const router=express.Router();


//Route to get all books 
router.get('/',async(req,res)=>{
    try {
    const books=await Book.find({})
    res.status(200).json({success:true,data:books})
        
    } catch (error) {
        console.error(error.message)
        res.status(400).json({success:flase,message:"Error in fetching all products"})
        
    }
})

//Route to add new book
router.post('/',async(req,res)=>{
    const book=req.body;
    
    if(!book.title || !book.author || !book.publishYear){
        return res.status(400).json({success:false,message:'Provide all fields'})
    }
    const newBook= await new Book(book)
    try {
        await newBook.save()
        res.status(201).json({success:true,data:newBook})
        
    } catch (error) {
        console.error('Error in create product:',error.message)
        res.status(500).json({success:false,message:"server error"})
        
    }
})


//Route for get one book

router.get('/:id',async(req,res)=>{
    const {id}=req.params;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid id"})
}
    try {
      
        const book=await Book.findById(id);
        res.status(200).json({success:true,data:book})
    } catch (error) {
        console.error(error.message);
        res.status(500).send({message:error.message})
        
    }

});


//Route for updating a book

router.put('/:id',async(req,res)=>{
    const {id}=req.params
    const book=req.body

    if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({success:false,message:"invalid id"})
    }

    try {
        const updatedBook= await Book.findByIdAndUpdate(id,book,{new:true})
        res.status(200).json({success:true,data:updatedBook})
    } catch (error) {
        console.error(error.message)
        res.status(500).json({success:false,message:"server error"})
        
    }
})

//Route for deleting a book

router.delete('/:id',async(req,res)=>{
    const {id}=req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({success:false,message:"invalid id"})
    }
    try {
        await Book.findByIdAndDelete(id);
        res.status(200).json({message:'book deleted successfully',success:true})
    } catch (error) {
       
        res.status(500).send({message:error.message})
        
    }

});

export default router;