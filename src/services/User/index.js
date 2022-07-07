export const getUser = (email) => {
    try {
        return email.split("@")[0]
    } catch (error) {
        console.log(error);
    }
};