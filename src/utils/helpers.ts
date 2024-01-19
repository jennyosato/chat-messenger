export const convertPusherKey = (string:string) => {
    return string.replace(/:/g, "__")
}