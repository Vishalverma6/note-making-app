import toast from "react-hot-toast";
import { noteEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { data } from "react-router-dom";


const {
    CREATE_NOTE_API,
    UPDATE_NOTE_API,
    GET_ALL_NOTE_API,
    DELETE_NOTE_API,
    SEARCH_NOTE_API,
} = noteEndpoints;


// create note 
export const createNote = async(data, token) => {
    console.log("data", data);
    let result =null;
    const toastId = toast.loading("Loading");
    try{
        const response = await apiConnector("POST",CREATE_NOTE_API,data,{
            Authorization: `Bearer ${token}`,
        })
        console.log("CREATE_NOTE_API API RESPONSE....",response)
        if(!response?.data?.success){
            throw new Error("Could not Add the Note")
        }
        toast.success(response?.data?.message || "Note added Succesfully")
        result=response?.data?.data;
    }catch(error){
        console.log("CREATE_NOTE_API API ERROR...",error);
        toast.error(error?.response?.data?.message)
    }
    toast.dismiss(toastId);
    return result
}

// update the note 
export  const updateNote =async(data, token)=> {
    console.log("token2",data)
    let result= null
    const toastId= toast.loading("Loading....");
    try{
        const response = await apiConnector("PUT",UPDATE_NOTE_API,data,{
            Authorization:`Bearer ${token}`
        })

        console.log("UPDATE_NOTE_API API RESPONSE....",response);
        if(!response?.data?.success){
            throw new Error("Could not Update Note")
        }

        toast.success("Note Details Updated Successfully")
        result = response?.data?.data
    }catch(error){
        console.log("UPDATE_NOTE_API Api ERROR ....",error);
        toast.error(error.message)
    }
    toast.dismiss(toastId);
    return result 
}

// get All Note of A user
export const getAllNote = async(token)=> {
    const toastId = toast.loading("Loading...")
    let result = []
    try{
        const response = await apiConnector("GET",GET_ALL_NOTE_API,null, {
            Authorization:`Bearer ${token}`
        })
        if(!response.data.success){
            throw new Error (response?.data?.message || "Could not fetch all Note")
        }
        result = response?.data?.data
        toast.success(response?.data?.message || "Successfully fetched the notes")
    }catch(error){
        console.log("GET_ALL_NOTE_API API ERROR .....",error);
        toast.error(error.message);
    }
    toast.dismiss(toastId)
    return result
};

// delete the Note 
export const deleteNote = async(noteId,token)=> {
    const toastId = toast.loading("Loading...");
    console.log("ID",data)
    console.log("token,", token)
    let result= null;
    try{
        const response = await apiConnector("DELETE",DELETE_NOTE_API, {noteId}, {
            Authorization:`Bearer ${token}`,
        })
        console.log("DELETE_NOTE_API RESPONSE .....",response);
        if(!response?.data?.success){
            throw new Error("Could not Delete Note")
        }
        toast.success(response?.data?.message || "Note deleted Successfully");
    }catch(error){
        console.log("DELETE_NOTE_API ERROR....",error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
}

// search the Note by title or content words
export const searchNote = async(data, token)=> {
    const toastId = toast.loading("Loading...");
    console.log("data",data)
    console.log("data",token)
    let result= [];
    try{
        const response = await apiConnector("Get",SEARCH_NOTE_API,{data}, {
            Authorization:`Bearer ${token}`
        });
        console.log("SEARCH_NOTE_API RESPONSE .....",response);
        if(!response?.data?.success){
            throw new Error("Failed to Search the Note")
        }
        toast.success(response?.data?.message || "Note fetched Successfully");
        result= response?.data?.data || [];
    }catch(error){
        console.log("SEARCH_NOTE_API ERROR....",error);
        toast.error(error?.response?.data?.message || error?.message);
    }
    toast.dismiss(toastId);
    return result;
};