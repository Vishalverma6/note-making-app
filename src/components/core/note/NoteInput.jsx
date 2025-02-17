import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaMicrophone, FaStop, FaImage } from "react-icons/fa";
import { createNote, getAllNote } from "../../../services/operations/NoteAPI";
import { useSelector } from "react-redux";
import NoteCards from "./NoteCards";
import SearchBar from "./SearchBar";

const NoteInput = () => {
  const { register, handleSubmit, setValue, watch, reset } = useForm();
  const [isRecording, setIsRecording] = useState(false);
  const [image, setImage] = useState(null); // State to store the image
  const [noteData, setNoteData] = useState([]); // State to store the note Data
  const recognitionRef = useRef(null);
  const fileInputRef = useRef(null); // Ref to trigger the file input

  const { token } = useSelector((state) => state.auth);

  // Watch the content field for changes
  const content = watch("content");

  // Handle image change
  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImage(URL.createObjectURL(file)); // Store the image preview URL
    }
  };

  // Start recording and transcribe voice to text
  const startRecording = () => {
    if (!("webkitSpeechRecognition" in window)) {
      alert("Speech Recognition not supported in this browser.");
      return;
    }

    setIsRecording(true);
    const recognition = new window.webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-US";

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setValue("content", transcript); // Auto-fill the content field
    };

    recognition.onend = () => {
      setIsRecording(false);
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      setIsRecording(false);
    }
  };

  // Submit the transcribed text and image to the backend
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("content", data.content);

    if (fileInputRef.current?.files[0]) {
      formData.append("image", fileInputRef.current.files[0]); // Use the file input to get the image file
    }

    try {
      const response = await createNote(formData, token);
      fetchNoteData();
      reset(); // Clear the form after submission
      setImage(null); // Clear the image state
    } catch (error) {
      console.error("Error saving note:", error);
    }
  };

  const fetchNoteData = async()=> {
    const result = await getAllNote(token);
    console.log("Note Data", result);
    setNoteData(result);
  }


  useEffect(() => {
    fetchNoteData();
  },[])

  return (
    <div className="flex flex-col gap-y-20">

        {/* search Bar */}
        <div>
          <SearchBar/>
        </div>

        {/* cards */}
        <div>
            <NoteCards noteData={noteData}
               fetchNoteData={fetchNoteData}
            />
        </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-4 bg-white shadow-md rounded-md max-w-xl mx-auto">
      <h2 className="text-lg font-bold mb-3">Create a Note</h2>

      {/* Input Field, Image Upload Icon, and Recording Button */}
      <div className="flex items-center gap-3 border border-gray-300 rounded-md p-2 shadow-sm">
        {/* Text Input */}
        <input
          {...register("content")}
          type="text"
          className="flex-1 px-3 py-2 focus:outline-none"
          placeholder="Type or use voice input..."
        />

        {/* Image Upload Icon or Preview */}
        <div className="relative">
          <input
            {...register("image")}
            type="file"
            onChange={handleImageChange}
            ref={fileInputRef}
            className="hidden"
          />
          {/* If an image is selected, show the preview */}
          {image ? (
            <img
              src={image}
              alt="Selected"
              className="w-6 h-6 rounded-full object-cover cursor-pointer"
              onClick={() => fileInputRef.current.click()} // Trigger file input click when image is clicked
            />
          ) : (
            <button
              type="button"
              onClick={() => fileInputRef.current.click()} // Trigger file input click
              className="text-gray-500 hover:text-gray-700"
            >
              <FaImage size={24} />
            </button>
          )}
        </div>

        {/* Voice Recording Button (Always Red) */}
        <button
          type="button"
          onClick={isRecording ? stopRecording : startRecording}
          className=" flex gap-1 items-center bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-700 transition"
        >
          {isRecording ? <FaStop /> : <FaMicrophone />}
          {isRecording ? "Stop Recording" : "Start Recording"}
        </button>
      </div>

       {/* Submit Button */}
       <button type="submit" className="cursor-pointer mt-4 w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-700 transition">
        Save Note
       </button>
      </form>
    </div>
  );
};

export default NoteInput;
