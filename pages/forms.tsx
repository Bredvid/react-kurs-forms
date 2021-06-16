import { useState, useEffect } from "react"
import { isError } from "util"
import { FormList } from "../components/Forms/FormList"

const Forms = () => {
    const [forms, setForms]= useState(null)
    const [fetchStatus, setFetchStatus] = useState({isError: false, isFetching: false})

    const fetchForms = () => {

        setFetchStatus({isError: false, isFetching: true})

        fetch("api/form")
            .then(res => { 
                console.log("res",res)
                if (res.ok) {
                    return res.json()
                } else { 
                    setFetchStatus({isError: true, isFetching: false})
                }
            })
            .then(json =>  {
                console.log("json",json)
                setForms(json)
                setFetchStatus({isError: false, isFetching: false})
            })
            .catch(() => setFetchStatus({isError: true, isFetching: false}))
    }

    useEffect( ()=> {
        fetchForms()
    }, [])

    return forms !== null && <FormList forms={forms}/>
}
    //fetchStatus.isFetching ? <LoadingComponent/> 
    //: fetchStatus.isError ? <ErrorComponent/>
     

export default Forms;