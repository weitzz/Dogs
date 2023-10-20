import { useCallback, useState } from "react"



const useFetch = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [data, setData] = useState<any>(null)
    const [error, setError] = useState<string | null>(null)
    const [loading, setLoading] = useState(false)


    // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
    const request = useCallback(async (url: string, options: {}) => {
        let response
        let json
        try {
            setError(null)
            setLoading(true)
            response = await fetch(url, options)
            json = await response.json()
            if (response.ok === false) throw new Error(json.message)
        } catch (error) {
            json = null
            if (error instanceof Error) setError(error.message);
        } finally {
            setData(json)
            setLoading(false)
            // eslint-disable-next-line no-unsafe-finally
            return { response, json }
        }
    }, [])

    return { data, error, loading, request }
}

export default useFetch