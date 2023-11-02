export const filterPhoneNumber = (input: string) => {
    return [...input]
        .filter((el) => {
            return !['(', ')', '-', '_', ' '].includes(el)
        })
        .join('')
}
