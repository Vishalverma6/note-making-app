import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { MdDriveFileRenameOutline } from 'react-icons/md';
import { RiFileCopy2Line } from 'react-icons/ri';
import { FaEllipsisV } from 'react-icons/fa';
import { deleteNote, updateNote } from '../../../services/operations/NoteAPI';
import { useSelector } from 'react-redux';

const NoteCards = ({ noteData, fetchNoteData, onRenameNote }) => {

    const {token} = useSelector((state)=> state.auth);
  const [editingTitle, setEditingTitle] = useState(null);
  const [newTitle, setNewTitle] = useState('');
  const [showDeleteOptions, setShowDeleteOptions] = useState(null); // Track delete button visibility

  const handleCopyToClipboard = (content) => {
    navigator.clipboard.writeText(content)
      .then(() => {
        toast.success("Note content copied to clipboard!");
      })
      .catch((err) => {
        console.error('Error copying text: ', err);
      });
  };

  const handleRenameClick = (note) => {
    setEditingTitle(note._id);
    setNewTitle(note.title);
  };

  const handleSaveRename = async (note) => {
    const data = { 
      noteId: note._id, 
      title: newTitle 
    };
    await updateNote(data, token);
    fetchNoteData();
    setEditingTitle(null);
  };
  

  const handleDeleteClick = async(noteId) => {
    await deleteNote(noteId, token);
    fetchNoteData();

    setShowDeleteOptions(null); // Close delete options after deleting
  };

  const handleToggleDeleteOptions = (noteId) => {
    setShowDeleteOptions(showDeleteOptions === noteId ? null : noteId);
  };

  // Sort notes by createdAt in descending order (oldest on top)
  const sortedNotes = noteData.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {sortedNotes.map((note) => (
        <div key={note._id} className="bg-white p-4 w-[260px] rounded-lg flex flex-col gap-y-2">
          
          {/* Created Date */}
          <p className="mt-2 text-sm text-gray-400">Created At: {new Date(note.createdAt).toLocaleString()}</p>

          {/* Rename Section */}
          {editingTitle === note._id ? (
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md"
              />
              <button
                onClick={() => handleSaveRename(note)}
                className="bg-blue-500 text-white px-4 py-2 rounded-md"
              >
                Save
              </button>
            </div>
          ) : (
            <h3 className="text-xl font-semibold text-gray-800">
              {note.title || 'Untitled'}
              <button
                onClick={() => handleRenameClick(note)}
                className="ml-2 text-blue-500 hover:text-blue-700"
              >
                <MdDriveFileRenameOutline />
              </button>
            </h3>
          )}

          {/* Content */}
          <p className="mt-2 text-gray-600">{note.content}</p>

          {/* Audio Transcription (if available) */}
          {note.audioTranscription && (
            <p className="mt-2 text-gray-500 italic">Transcription: {note.audioTranscription}</p>
          )}

          {/* Image */}
          {note.imageUrl && (
            <img
              src={note.imageUrl}
              alt="Note Image"
              className="mt-4 rounded-lg object-cover w-full h-40"
            />
          )}

          {/* Buttons for Copy and Delete */}
          <div className="mt-3 flex ml-auto gap-2">
            {/* Copy Button */}
            <button
              onClick={() => handleCopyToClipboard(note.content)}
              className="py-1 px-4 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
            >
              <RiFileCopy2Line />
            </button>

            {/* Vertical Dots Button */}
            <button
              onClick={() => handleToggleDeleteOptions(note._id)}
              className="py-1 px-4 bg-gray-300 rounded-md text-gray-700 hover:bg-gray-400"
            >
              <FaEllipsisV />
            </button>

            {/* Delete Button (Visible when the vertical dots button is clicked) */}
            {showDeleteOptions === note._id && (
              <button
                onClick={() => handleDeleteClick(note._id)}
                className="py-1 px-4 bg-red-500 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            )}
          </div>

        </div>
      ))}
    </div>
  );
};

export default NoteCards;
