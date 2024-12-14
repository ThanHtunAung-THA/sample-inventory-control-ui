/**
 * Future impovements
 * 
 * TODO: need to add more custom validation for other forms here.
 * 
 * 
 * 
 * 
 */

/**
 * validation for profile edit form 
 * @param {*} userName 
 * @param {*} userEmail 
 * @param {*} password 
 * @param {*} userDOB 
 * @returns 
 */
export const validateProfile = (userName, userEmail, password, userDOB) => {
    const errors = [];
    if (!userName) errors.push("Please fill name");
    if (!userEmail) errors.push("Please fill email");
    if (!password) errors.push("Please fill password");
    // Add more validation as needed
    return errors;
  };
