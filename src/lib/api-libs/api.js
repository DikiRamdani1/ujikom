const getData = async (resource, query) => {
    const response = await fetch(`${process.env.NEXTAUTH_URL}/api${resource}${query}`, {
        method: 'GET',
        cache: 'no-store'
    })
    const data = await response.json()
    return data
}

export default getData