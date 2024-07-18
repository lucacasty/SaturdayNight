export const parseErrorLoginMessage = async (message) => {
    switch(message) {
        case "auth/invalid-credential":
            return "Error: Invalid credentials";
        case "auth/too-many-requests": 
            return "Error: Access to this account has been temporarily disabled due to many failed login attempts";
        case "auth/email-already-in-use":
            return "Error: Email already in use";
        case "auth/invalid-email":
            return "Error: Invalid email";
        case "auth/missing-email":
            return "Error: Missing email";
        default: 
            return "Login error";
    }
}