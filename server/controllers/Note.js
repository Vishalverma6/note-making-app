const Note = require("../models/Note");
const { uploadImageToCloudinary } = require("../utils/imageUploader");
require("dotenv").config();


// create note 
exports.createNote = async (req, res) => {
    try {
      // fetch the userID from req.user
      const userId = req.user.id;
    //   console.log("userId", userId);
  
      if (!userId) {
        return res.status(401).json({
          success: false,
          message: "UserId is required",
        });
      }
  
      // fetch the data from req body
      const { title, content, audioTranscription } = req.body;
  
      // validation
      if (!(content || audioTranscription)) {
        return res.status(401).json({
          success: false,
          message: "Either content or audio is required",
        });
      }
    //   console.log("content", content);
  
      // fetch image from req.files (if provided)
      const image = req.files?.image;
    //   console.log("image", image);
  
      // upload image to cloudinary if provided
      let imageUrl = null;
      if (image) {
        const uploadDetails = await uploadImageToCloudinary(image, process.env.FOLDER_NAME);
        console.log("uploadDetails", uploadDetails);
        imageUrl = uploadDetails?.secure_url;
      }
  
      // create entry into database
      const noteDetails = await Note.create({
        user: userId,
        title: title || "Untitled",
        content: content || "",
        audioTranscription: audioTranscription || "",
        imageUrl: imageUrl, // Image URL will be null if no image is provided
      });
  
      // return response 
      return res.status(200).json({
        success: true,
        message: "Note Created Successfully",
        data: noteDetails,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({
        success: false,
        message: "Note Creation failed, Please try again",
        error: error.message,
      });
    }
  };
  

// update existing Note 
exports.updateNote = async(req, res) => {
    try{
        // fetch the data from req body
        const { noteId, title } = req.body;
        console.log("note Id ", noteId);
        console.log("note Id ", title);


        if(!noteId || !title ){
            return res.status(401).json({
                success:false,
                message:"All data are  required",
            });
        }

         // fetch the user Id from req user
         const userId = req.user.id;
         console.log("userId",userId)
         if(!userId){
             return res.status(401).json({
                 success:false,
                 message:"UserId not found ",
             })
         }
        // Check if the note exists and belongs to the user
        const note = await Note.findOne({_id:noteId, user:userId});
        if(!note){
            return res.status(404).json({
                success:false,
                message:"Note details not found with given note Id"
            })
        }

        let updateData = {
            title: title || note.title,
            // content: content || note.content,
            // audioTranscription: audioTranscription || note.audioTranscription,
        };

        // Handle image update (if a new image is provided)
        if (req.files && req.files.image) {
            const uploadDetails = await uploadImageToCloudinary(req.files.image, process.env.FOLDER_NAME);
            updateData.imageUrl = uploadDetails?.secure_url;
        }
       
        // update the data in database
        const updatedNote = await Note.findByIdAndUpdate(
            noteId,
            {$set:updateData},
            {new:true},
        )

        // return response
        return res.status(200).json({
            success: true,
            message: "Note updated successfully",
            note: updatedNote,
        });

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Note updation failed, Please try again",
            error:error.message,
        })
    }
}


// get All the exixting Note 
exports.getAllNote = async(req, res) => {
    try{
        // fetch the userId from req user
        const userId = req.user.id;

        // validation
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User ID not Found",
            });
        }

        const allNote = await Note.find({user:userId});
        // console.log("All Note ", allNote);

        // return response 
        return res.status(200).json({
            success:true,
            message:"All Notes fetched Successfully",
            data:allNote,
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Failed fetch all the Note",
            error:error.message,
        })
    }
}

// Delete the Note 
exports.deleteNote = async(req, res) => {
    try{
        // fetched the Note Id from req body
        const {noteId} = req.body;
        console.log("note Id", noteId);

        // validation 
        if(!noteId){
            return res.status(404).json({
                success:false,
                message:"NoteId not found ",
            })
        }

        // fetch the user ID 
        const userId = req.user.id;
        // console.log("useId",userId)
        if(!userId){
            return res.status(404).json({
                success:false,
                message:"User Id not found ",
            })
        }

        // delete the note from database 
        const deletedNote = await Note.findOneAndDelete({_id:noteId, user:userId});
        if(!deletedNote){
            return res.status(404).json({
                success:false,
                message:"Note not Found",
            });
        }

        // return response
        return res.status(200).json({
            success:true,
            message:"Note Deleted Successfully",
        });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:"Note deletion failed, Please try again",
            error:error.message,
        })
    }
}


// Search Notes (From Oldest to Newest)
exports.searchNotes = async (req, res) => {
    try {
        // fetched  userId from the req user
        const userId = req.user.id;

        // Extract search query from request
        const { query } = req.query;
        console.log("query",query);

        // Validation
        if (!userId) {
            return res.status(401).json({
                success: false,
                message: "User not found",
            });
        }

        // Create a search filter for title, content, and audioTranscription
        let searchFilter = { user: userId };
        if (query) {
            searchFilter.$or = [
                { title: { $regex: query, $options: "i" } }, 
                { content: { $regex: query, $options: "i" } },
                { audioTranscription: { $regex: query, $options: "i" } }
            ];
        }

        // Fetch notes in ascending order (Oldest to Newest)
        const notes = await Note.find(searchFilter).sort({ createdAt: 1 });

        // return Response
        return res.status(200).json({
            success: true,
            message:"Related result found successfully",
            data:notes,
        });

    } catch (error) {
        console.error("Error while searching notes:", error);
        return res.status(500).json({
            success: false,
            message: "Error while searching notes, please try again",
            error: error.message,
        });
    }
};
