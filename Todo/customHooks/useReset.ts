import { useRouter } from "next/router";
import { useState } from "react"
import axios from "axios";


const useReset = () => {

    const [passworda, setpassworda] = useState("")
    const [password_confirmation, setpassword_confirmation] = useState("")
    const [error, seterror] = useState("")
    const router = useRouter();
    const [loginError, setLoginError] = useState('')
    const { token} = router.query;


    const onSubmitHandler = async () => {
        if (!passworda||!password_confirmation) {
            seterror('Please fill the field properly')
        } else {
            try {
                console.log("token",token);        
                await axios
                .post(`http://localhost:8000/auth/changepassword/?token=${token}`, { password_confirmation, passworda })
                .then((response) => {
                    console.log("status", response.data.status);
                    if (response.data.status == "success") {
                        alert("Success password has been updated")
                    } else if (response.data.status == "Failed") {
                        setLoginError(response.data.message)
                    } else {
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



    return {
        error,
        loginError,
        passworda,
        password_confirmation,
        onSubmitHandler,
        setpassworda,
        setpassword_confirmation,
    }

}

export default useReset