export const validateNewCard = (formData, setErrors) => {
    let isValid = true;
    let errors = {};

    if (formData.title.length < 2) {
        isValid = false;
        errors.title = 'Title must be at least 2 characters long.';
    }
    if (formData.subtitle.length < 2) {
        isValid = false;
        errors.subtitle = 'Subtitle must be at least 2 characters long.';
    }
    if (formData.description.length < 2) {
        isValid = false;
        errors.description = 'Description must be at least 2 characters long.';
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
    
    const websiteRegex = /^https?:\/\/(?:www\.)?[a-zA-Z0-9-]+\.[a-zA-Z]{2,}(?:\/\S*)?$/
    ;
    if (!websiteRegex.test(formData.web)) {
        isValid = false;
        errors.website = 'Website must be a valid URL.';
    }

    if (formData.image.url) {
        const UrlRegex = /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|gif|png)/
        ;
        if (!UrlRegex.test(formData.image.url)) {
            isValid = false;
            errors.image = 'Image must be a valid URL.';
        }
    }

    setErrors(errors);
    return isValid;
};
