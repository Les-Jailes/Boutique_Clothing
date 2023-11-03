function createPagination(arrayProducts) {
    const maximumProductsPerPage = 12
    const paginationArray = []

    for (let i = 0; i < arrayProducts.length; i += maximumProductsPerPage) {
        const page = arrayProducts.slice(i, i + maximumProductsPerPage)
        paginationArray.push(page)
    }

    return paginationArray
}

export default createPagination