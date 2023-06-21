import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import axios from "axios";

const useVerify = () => {

  
    const [input, setinput] = useState<string>("")
    const [backerror,setbackerror] = useState("")
    const router = useRouter();


    const onSubmitHandler = async () => {
        try {
          const HashDigits = await localStorage.getItem("HashDigits");
          const tokenid = await localStorage.getItem("token")
          const headers = {
            Authorization: `Bearer ${tokenid}`, 
          };
      
          await axios
            .post("http://localhost:8000/auth/Verify", { input,HashDigits}, { headers })
            .then((response) => {
              if (response.data.status === "success") {
                console.log(response.data.status);
                router.push('/Login')
              } else {
                setbackerror(response.data.message);
              }
            });
        } catch (e) {
          console.log("------------------------------------");
          console.log(e);
          console.log("------------------------------------");
        }
      };
      
    



    return {
        onSubmitHandler, 
        input,
        setinput, 
        backerror, 
    }
                      
}

export default useVerify