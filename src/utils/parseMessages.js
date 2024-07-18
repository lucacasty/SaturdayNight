export const parseErrorLoginMessage = async (message) => {
    switch(message) {
        case "auth/invalid-credential":
            return "Error: Invalid credentials";
        case "auth/too-many-requests": 
            return "Error: Access to this account has been temporarily disabled due to many failed login attempts";
        default: 
            return "";
    }
}