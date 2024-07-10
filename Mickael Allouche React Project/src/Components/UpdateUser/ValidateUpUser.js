export const validateUpUser = (formData, setErrors) => {
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
    
    const UrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/;
    if (!UrlRegex.test(formData.image.url)) {
        isValid = false;
        errors.image = 'Image must be a valid URL.';
    }

    setErrors(errors);
    return isValid;
};
