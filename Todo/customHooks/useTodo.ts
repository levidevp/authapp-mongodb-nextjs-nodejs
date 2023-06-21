import { useEffect, useState } from "react"
import axios from "axios";



//   ------------------------------------------------------------------------------------------




//   ------------------------------------------------------------------------------------------


const useTodo = () => {
  //   ------------------------------------------------------------------------------------------

  const [input, setinput] = useState<string>('')
  const [re, setre] = useState<any>({})
  const [data, setdata] = useState<any>([])
  const [toggle, settoggle] = useState(true)


  //   ------------------------------------------------------------------------------------------

  useEffect(() => {
    getTodosHandler();
  }, [data])

  //   ------------------------------------------------------------------------------------------

  // ADD the todo from mongodb
  const save = async () => {
    if (!input) {
      alert("fill the task")
    } else {
      try {
        await axios.post('http://localhost:8000/todo/ADDtodo', { input }).then((response) => {
          setdata([...data, response.data]);
          setinput('');
        })
      } catch (e) {
        console.error(e);
      }
    }
    setinput("")
  }


  // GET the todo from mongodb
  const getTodosHandler = async () => {
    try {
      const response = await axios.get('http://localhost:8000/todo/GETtodo');
      setdata(response.data);
    } catch (error) {
      console.log('Error fetching todos: ', error);
    }
  }
  //   ------------------------------------------------------------------------------------------


  // to delete the todo from mongodb
  const cancel = async (item: any) => {
    try {
      await axios.delete(`http://localhost:8000/todo/DELETEtodo?_id=${item._id}`)
      setdata(data.filter((post: any) => post._id !== item._id))
    } catch (error) {
      console.log('================catch====================');
      console.log("cancel", error);
      console.log('====================================');
    }
  };


  //   ------------------------------------------------------------------------------------------
  const update = (item: any) => {
    settoggle(false)
    setinput(item.input)
    setre(item)
  }

  //   -------------------------------------------------------------------------------------------------------
  // Update the todo in mongodb
  const onEditHandler = async () => {
    try {
      settoggle(true);
      await axios.put(`http://localhost:8000/todo/UPDATEtodo?_id=${re._id}`, { input });
      setinput('');
    } catch (error) {
      console.log('================catch====================');
      console.log(error);
      console.log('====================================');
    }
  };


  //   -------------------------------------------return started----------------------------------------------

  return {
    input,
    data,
    re,
    toggle,
    setinput,
    setdata,
    setre,
    settoggle,
    cancel,
    save,
    getTodosHandler,
    update,
    onEditHandler,
  }

}
export default useTodo