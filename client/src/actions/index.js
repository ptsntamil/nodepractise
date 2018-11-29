export const actions = {
    addUser : function(list) {
        return {
            type: "ADD_USER",
            list
        };
    },
    userForm : function(form) {
        return {
            type: "USER_FORM",
            user: form.user,
            formValid: form.formValid,
            error: form.error
        };
    } 
}