import { Suspense, lazy, useEffect } from "react"
import useFetch from "../../Hooks/useFetch"
import Head from "../Helper/Head"
import Loading from "../Helper/Loading/Loading"
import Error from "../Helper/Error"
import { STATS_GET } from "../../api"

const UserGraphsStats = lazy(()=> import("./UserGraphsStats") )
const UserStats = () => {
    const { data, loading, error, request } = useFetch()
    


    useEffect(() => {
        const getData = async () => {
            const { url, options } = STATS_GET()
            await request(url,options)
        }
        getData()
    }, [request])

    if (loading) return <Loading />
    if (error) return <Error error={error} />
    if (data)
    return (

        <Suspense fallback={<div></div>}>
            <Head title='Estatísticas' />
            <UserGraphsStats data={data} />

        </Suspense>
    )
}

export default UserStats