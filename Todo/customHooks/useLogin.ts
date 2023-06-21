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
                          if (response.data.status == "success") {
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
    const Forgotpage = async () => {
      router.push('/Forgotpassword')
  }


    return  {
        signpage,
        onSubmitHandler,
        setemail,
        setpassword,
        email,
        password,
        error, 
        loginError,
        Forgotpage
    }              
                                       
}

export default useLogin