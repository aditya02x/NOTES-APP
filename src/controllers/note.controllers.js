import Note from "../models/Content.model.js";

const createNote = async (req,res)=>{
    try {
        const {title , content} =req.body;
        const note = await Note.create({
            title,
            content,
            user:req.user.id

        })
        return resizeBy.status(201).json({
            message:"Note created Sucessfully",
            note
        })
        
    } catch (error) {
        return resizeBy.status(500).json({message :"Server Error"})
        
    }
}

const GetNotes = async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user.is});
        return res.status(200).json({notes})
        
    } catch (error) {
        return res.status(500).json({mesaage:"Internal server error"})
        
    }
}

const deleteNote = async (req, res)=>{
    try {
        const note = await Note.findById(req.params.id);

        if(!note){
            return res.status(404).json({message:"Note not found"})
        }
        if(note.user.toString() !== req.user.id){
            return res.status(403).json({mesaage:"Unauthorised"})
        }
        await note.deleteOne();

        return res.status(200).json({
            message:"Note Deleted Sucessfully"
        });
        
    } catch (error) 
    {
        return res.status(500).json({message:"Internal Server error"});
        
    }
}

export default {createNote,GetNotes}