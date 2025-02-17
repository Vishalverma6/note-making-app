import React, { useState } from 'react';
import { FaRegHeart, FaHeart, FaTimes } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { updateNote } from '../../../services/operations/NoteAPI';
import { useSelector } from 'react-redux';

const NoteModal = ({ note, onClose, fetchNoteData }) => {
  const { token } = useSelector((state) => state.auth);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isFavorite, setIsFavorite] = useState(note.isFavorite || false);
  const [updatedContent, setUpdatedContent] = useState(note.content);
  const [newImage, setNewImage] = useState(null);

  const handleFullscreenToggle = () => {
    setIsFullscreen((prev) => !prev);
  };

  const handleFavoriteToggle = async () => {
    const updatedNote = { ...note, isFavorite: !isFavorite };
    await updateNote({ noteId: note._id, ...updatedNote }, token);
    setIsFavorite(!isFavorite);
    toast.success('Note favorited!');
  };

  const handleContentChange = (e) => {
    setUpdatedContent(e.target.value);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      // Use your image upload logic here and update the note
      // For example: cloudinaryUpload(formData);
      toast.success('Image uploaded!');
    }
  };

  const handleSaveNote = async () => {
    const updatedNote = { ...note, content: updatedContent };
    await updateNote({ noteId: note._id, ...updatedNote }, token);
    fetchNoteData();
    toast.success('Note updated successfully!');
  };

  return (
    <div
      className={`fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center z-50 ${
        isFullscreen ? 'fullscreen' : ''
      }`}
    >
      <div className="bg-white p-6 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{note.title || 'Untitled'}</h2>
          <button onClick={onClose} className="text-xl">
            <FaTimes />
          </button>
        </div>

        <textarea
          value={updatedContent}
          onChange={handleContentChange}
          className="mt-4 w-full p-2 border border-gray-300 rounded-md"
        />

        {note.audioTranscription && (
          <p className="mt-2 text-gray-500 italic">Transcription: {note.audioTranscription}</p>
        )}

        {note.imageUrl && (
          <img
            src={note.imageUrl}
            alt="Note Image"
            className="mt-4 rounded-lg object-cover w-full h-40"
          />
        )}

        {/* Image Upload */}
        <div className="mt-4">
          <input
            type="file"
            onChange={handleImageUpload}
            className="border border-gray-300 p-2 rounded-md"
          />
        </div>

        <div className="mt-4 flex items-center gap-4">
          {/* Fullscreen Toggle */}
          <button
            onClick={handleFullscreenToggle}
            className="py-2 px-4 bg-blue-500 text-white rounded-md"
          >
            {isFullscreen ? 'Exit Fullscreen' : 'Go Fullscreen'}
          </button>

          {/* Favorite Toggle */}
          <button
            onClick={handleFavoriteToggle}
            className="text-red-500"
          >
            {isFavorite ? <FaHeart /> : <FaRegHeart />}
          </button>

          {/* Save Button */}
          <button
            onClick={handleSaveNote}
            className="py-2 px-4 bg-green-500 text-white rounded-md"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteModal;
