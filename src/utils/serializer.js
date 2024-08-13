export function objectToFormData(name, obj, formData) {
    if (Object.keys(obj).length > 0) {
        for (let key in obj) {
            let field = `${name}[${key}]`;
            formData.append(field, obj[key]);
        }
    }
    return formData;
}