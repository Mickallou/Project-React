export const validateForm = (formData, setErrors) => {
    let isValid = true;
    let errors = {};

    if (formData.name.first.length < 2) {
        isValid = false;
        errors.firstName = 'First name must be at least 2 characters long.';
    }
    if (formData.name.last.length < 2) {
        isValid = false;
        errors.lastName = 'Last name must be at least 2 characters long.';
    }

    const phoneRegex = /^[0]\d{9}$/;
    if (!phoneRegex.test(formData.phone)) {
        isValid = false;
        errors.phone = 'Phone number must start with 0 and contain exactly 10 digits.';
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
        isValid = false;
        errors.email = 'Email must be a valid email address.';
    }

    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@&$!%#])[A-Za-z\d@&$!%#]{9,}$/
    ;
    if (!passwordRegex.test(formData.password)) {
        isValid = false;
        errors.password = 'Password must be at least 10 characters long, contain at least one number, and one of these symbols (@&$!%#).';
    }
    
    const UrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
    ;
    if (!UrlRegex.test(formData.image.url)) {
        isValid = false;
        errors.image = 'Image must be a valid URL.';
    }

    setErrors(errors);
    return isValid;
};
