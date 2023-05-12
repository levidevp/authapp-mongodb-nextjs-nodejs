import { useRouter } from "next/router";
import { useState } from "react"
import axios from "axios";


const useLogin = () => {

    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")   
    const [error, seterror] = useState("")
    const router = useRouter();
    const [loginError, setLoginError] = useState('')
  


    const onSubmitHandler = async () => {
        if (!email || !password) {
          seterror('Please fill the field properly')
        } else {
          try {
            await axios.post("http://localhost:8000/auth/login", {email,password }).then((response) => {
                          console.log("status",response.data.status);
                          if (response.data.status == "success") {
                            console.log("token",response.data.token);
                            localStorage.setItem("token",response.data.token)
                            router.push('/user')
                          } else if(response.data.status == "Failed") {
                            setLoginError(response.data.message)
                          }else{
                            setLoginError("someting went wrong at server please try again")
                          }
                          });        
            } catch (e) {
                console.log("------------------------------------");
                console.log(e);
                console.log("------------------------------------");
            }
        } 
        }
      
    const signpage = async () => {
        router.push('/Signup')
    }


    return  {
        signpage,
        onSubmitHandler,
        setemail,
        setpassword,
        email,
        password,
        error, 
        loginError
    }              
                                       
}

export default useLogin