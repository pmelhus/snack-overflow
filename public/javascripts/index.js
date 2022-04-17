window.addEventListener("DOMContentLoaded", (event)=>{
    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener('keyup', (e) => {
            const queryParams = new URLSearchParams({q: ''})
            queryParams.q += e.target.onkeyup
            const queryToURI = queryParams.toString()
            const routeURI = `/search?${queryToURI}`
            return routeURI
        })
    })
