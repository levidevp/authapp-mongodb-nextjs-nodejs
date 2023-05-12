import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import axios from "axios";

const useSignup = () => {

  
    const [firstname, setfirstname] = useState<string>("")
    const [lastname, setlastname] = useState<string>("")
    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const router = useRouter();
    const [error, seterror] = useState("")
    const [backerror,setbackerror] = useState("")

    useEffect(() => {   
         
    },);

    const onSubmitHandler = async () => {
        if (!firstname || !email || !password ) {
            seterror("please fill the field properly")
        } else {
            try {
            await axios.post("http://localhost:8000/auth/Signup", { firstname,lastname,email,password }).then((response) => {
                          console.log("hello",response.data.status);
                          if (response.data.status == "success") {
                            localStorage.setItem("token",response.data.token)
                            router.push('/user')

                          } else {
                            setbackerror(response.data.message)
                          }
                          });        
            } catch (e) {
                console.log("------------------------------------");
                console.log(e);
                console.log("------------------------------------");
            }
        }
    }
 

    const loginpage = () => {
        router.push('/Login')
    }
    const homepage =()=>{
        router.push('/')
    }


    return {
        onSubmitHandler,
        loginpage,
        setemail,
        setpassword,
        setfirstname,
        setlastname,
        lastname,
        email,
        password,
        firstname,
        error,
        backerror,
    }
                      
}

export default useSignup