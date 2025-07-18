import { useEffect, useState } from "react"

const App = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [userDetails, setUserDetails] = useState({})
    const [errorStatus, setErrorStatus] = useState("")

    const retryAgain = (fn, delay = 1000, retry = 3) => {
        return new Promise((resolve, reject) => {
            function attempt(count) {
                fn().then(res => {
                    return resolve(res)
                }).catch((err) => {
                    if (count === 0) return reject(err)
                    setTimeout(function () {
                        attempt(count - 1)
                    }, delay)
                })
            }
            attempt(retry)
        })
    }
    const getUserDetails = (userId = null) => {

        return new Promise((resolve, reject) => {
            if (!userId) reject("UserId is missing in the props")
            setTimeout(function () {
                const user = {
                    name: "Venkatesh",
                    mail: "v@gmail.com",
                    age: 28,
                    gender: "male"
                }
                resolve(user)
            }, 2000)

        })
    }


    useEffect(() => {
        setIsLoading(true)
        retryAgain(getUserDetails(12)).then(res => {
            setUserDetails(res)
        }).catch(err => {
            setErrorStatus(err)
        }).finally(() => {
            setIsLoading(false)
        })
    }, [])
    if (isLoading) return <><p>Loading ...</p></>

    if (errorStatus !== "") return <><p>{errorStatus}</p></>

    return (<>
        <p>user:{userDetails.name}</p>
    </>)
}
export default App