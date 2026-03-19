import Note from "../models/note.model.js";

const createNote = async (req,res)=>{
    try {
        const {title , content} =req.body;

        if(!title || !content){
            return res.status(400).json({message:"Allfield are required"})
        }
        const note = await Note.create({
            title,
            content,
            user:req.user

        })
        return res.status(201).json({
            message:"Note created Sucessfully",
            note
        })
        
    } catch (error) {
        return res.status(500).json({message :"Server Error"})
        
    }
}

const getNotes = async (req,res)=>{
    try {
        const notes = await Note.find({user:req.user});
        return res.status(200).json({notes})
        
    } catch (error) {
        return res.status(500).json({mesaage:"Internal server error"})
        
    }
}

const deleteNote = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        // check if note exists
        if (!note) {
            return res.status(404).json({ message: "Note not found" });
        }

        // check ownership
        if (note.user.toString() !== req.user) {
            return res.status(403).json({ message: "Unauthorized" });
        }

        // delete note
        await note.deleteOne();

        return res.status(200).json({
            message: "Note deleted successfully"
        });

    } catch (error) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
export { createNote, getNotes, deleteNote };