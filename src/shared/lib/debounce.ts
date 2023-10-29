/**
 * Функция принимает функция обратного вызова
 * и вызывает её с задержкой через ms (по умолчанию 0)
 */
export const debounce = (f: () => void, ms = 0) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(f())
        }, ms)
    })
}
