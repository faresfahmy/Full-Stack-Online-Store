
export const delay = (time: number): Promise<void> => {
    return new Promise((reslove) => {
        setTimeout(() => {
            reslove()
        }, time)
    })
}