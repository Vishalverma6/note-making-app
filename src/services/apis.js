const BASE_URL = import.meta.env.VITE_BASE_URL

// Auth Endpoints 
export const authEndpoints ={
    SIGNUP_API :BASE_URL + "/auth/signup",
    LOGIN_API :BASE_URL + "/auth/login",
}

export const noteEndpoints = {
    CREATE_NOTE_API :BASE_URL + "/note/createNote",
    UPDATE_NOTE_API: BASE_URL + "/note/updateNote",
    GET_ALL_NOTE_API:BASE_URL + "/note/getAllNote",
    DELETE_NOTE_API:BASE_URL + "/note/deleteNote",
    SEARCH_NOTE_API: BASE_URL + "/note/searchNote",
}