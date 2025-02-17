import toast from "react-hot-toast";
import { authEndpoints } from "../apis";
import { apiConnector } from "../apiConnector";
import { setLoading, setToken } from "../../slices/authSlice";

const {
    SIGNUP_API,
    LOGIN_API,
} = authEndpoints;


// Signup Api to fetch data from backend 
export function signUp(
    fullName,
    email,
    password,
    confirmPassword,
    navigate,
)  {
    return async(dispatch) => {
        const toastId= toast.loading("Loading..")
        dispatch(setLoading(true))
        try{
            const response = await apiConnector("POST",SIGNUP_API, {
                fullName,
                email,
                password,
                confirmPassword
            })
            console.log("SIGNUP API RESPONSE ....",response)

            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success(response?.data?.message ||"Signup Successful, Please Login")
            navigate("/login")
        }
        catch(error){
            console.log("SIGNUP API ERROR....",error)
            toast.error(error?.response?.data?.message ||"Signup Failed")
            navigate("/signup")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
};

// login API
export function login(email, password, navigate){
    return async(dispatch) => {
        const toastId= toast.loading("Loading...")
        dispatch(setLoading(true))
        // console.log("Vishal Verma")
        try{
            // console.log("Vishal Verma1")
            const response =  await apiConnector("POST",LOGIN_API,{
                email, password
            })
            console.log("Vishal Verma2")

            console.log("LOGIN API RESPONSE....",response)
            if(!response.data.success){
                throw new Error(response.data.message)
            }
            toast.success("Login Successful")
            dispatch(setToken(response.data.token));

            // dispatch(setUser(response?.data?.user));
            localStorage.setItem("token",JSON.stringify(response?.data?.token));
            // localStorage.setItem("user",JSON.stringify(response?.data?.user));
            navigate("/dashboard/home");
        }
        catch(error){
            console.log("LOGIN API ERROR ......",error)
            toast.error(error?.response?.data?.message || "Login Failed")
        }
        dispatch(setLoading(false))
        toast.dismiss(toastId)
    }
}


// logout 
export function logout(navigate){
    return (dispatch) => {
        dispatch(setToken(null));
        // dispatch(setUser(null));
        localStorage.removeItem("token");
        // localStorage.removeItem("user");
        toast.success("Logged out Successfully")
        navigate("/")
    }
}