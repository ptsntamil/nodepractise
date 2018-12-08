import Constants from './../Constants';
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
    },
    setLoginForm : function(login) {
        return {
            type: "LOGIN_FORM",
            login: login
        }
    },
    setAuth: function(auth) {
        return {
            type: Constants.SET_AUTH,
            isAuthenticated: auth.isAuthenticated,
            login: auth.login
        }
    }
}