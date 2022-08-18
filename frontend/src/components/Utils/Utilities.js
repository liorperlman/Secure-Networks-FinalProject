import passConfig from "../Utils/passConfig.json"

export const isPasswordValid = (password) => {
    if (passConfig.dicionaries.includes(password)){ return false }
    if (passConfig.containsUpperCase && password.toLowerCase() === password){ return false }
    else if (passConfig.containsLowerCase && password.toUpperCase() === password){ return false }
    else if (passConfig.length > password.length){ return false }
    else if (passConfig.containsNumbers && passConfig.containsNumbers !== hasNumber(password)){ return false }
    else if (passConfig.containsSpecialChars && passConfig.containsSpecialChars !== hasSpecialCharacters(password)){ return false }
    else { return true }
    
}

const hasNumber = (password) => {
    return /\d/.test(password);
}
const hasSpecialCharacters = (password) => {
    var format = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    return format.test(password);
}