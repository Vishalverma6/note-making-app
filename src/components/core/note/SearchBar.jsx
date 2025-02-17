import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa'; // Importing the search icon
import { useSelector } from 'react-redux';
import { searchNote } from '../../../services/operations/NoteAPI';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const { token } = useSelector((state) => state.auth);
  const [searchData, setSearchData]= useState([]);

  const handleInputChange = (e) => {
    setQuery(e.target.value); // Update query state
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault(); // Prevent form submission from refreshing the page
    const result = await searchNote(query, token); // Call the search function with the query
    console.log("result", result);
    setSearchData(result)
  };

  return (
    <form
      onSubmit={handleSearchSubmit}
      className="flex items-center border w-[600px] border-gray-300 rounded-full p-2 transition-shadow hover:shadow-lg focus-within:shadow-lg"
    >
      {/* Search Icon */}
      <FaSearch className="text-gray-500 mr-3 transition-transform hover:scale-110" />

      {/* Input Field */}
      <input
        type="text"
        value={query}
        onChange={handleInputChange}
        placeholder="Search..."
        className="outline-none w-full text-gray-700 px-3 py-2 rounded-full bg-gray-100 placeholder-gray-400 focus:bg-white focus:border-blue-400 transition-all"
      />

      {/* Search Button */}
      <button
        type="submit"
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
