import { useRouter } from "next/router";
import { useState } from "react"
import axios from "axios";


const useForgot = () => {

    const [email, setemail] = useState("")
    const [error, seterror] = useState("")
    const router = useRouter();
    const [loginError, setLoginError] = useState('')
  


    const onSubmitHandler = async () => {
        if (!email) {
          seterror('Please fill the field properly')
        } else {
          try {
            await axios.post("http://localhost:8000/auth/resetlink", {email}).then((response) => {
                          if (response.data.status == "success") {
                            alert("Success Check your email")
                            router.push('/user')
                          } else if(response.data.status == "Failed") {
                            setLoginError(response.data.message)
                          }else{
                            setLoginError("someting went wrong at server please try again")
                          }
                          });    
                          setemail("")    
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
        email,       
        error, 
        loginError,
        Forgotpage
    }              
                                       
}

export default useForgot