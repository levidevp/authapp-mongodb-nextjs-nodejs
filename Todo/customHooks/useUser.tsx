import { useEffect, useState } from "react"
import axios from "axios";

const useUser = () => {

  
    const [firstname, setfirstname] = useState<string>("")
    const [lastname, setlastname] = useState<string>("")
    const [email, setemail] = useState("")
    const [backerror,setbackerror] = useState("")

    useEffect(() => { 
     onSubmitHandler()
    },);

    const onSubmitHandler = async () => {
        try {
          const tokenid = await localStorage.getItem("token");
          const headers = {
            Authorization: `Bearer ${tokenid}`,
          };
      
          await axios
            .post("http://localhost:8000/auth/User", {}, { headers })
            .then((response) => {
              if (response.data.status === "success") {
                setemail(response.data.user.email);
                setfirstname(response.data.user.firstname);
                setlastname(response.data.user.lastname);
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
      ;
    



    return {
        onSubmitHandler,      
        setemail,    
        setfirstname,
        setlastname,
        lastname,
        email,
        firstname,
        backerror,
    }
                      
}

export default useUser