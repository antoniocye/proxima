// validate email and password
export function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}
export function isStanfordEmail(email) {
    const domain = 'stanford.edu';
    const regex = new RegExp(`@${domain}$`, 'i'); // Case insensitive match for domain
    return regex.test(email);
}
export function notEmpty(email, password) {
    // Check if both email and password are not null and not empty strings
    // Also, check if password length is greater than 5
    return email && password && email.trim() !== "" && password.trim() !== "" && password.length > 5;
}
  