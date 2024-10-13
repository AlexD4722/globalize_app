"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
exports.__esModule = true;
var logo_1 = require("@/components/general/logo");
var classic_button_1 = require("@/components/button/classic-button");
var input_field_1 = require("@/components/form/input-field");
var auth_form_wrapper_1 = require("@/components/layout/authentication/auth-form-wrapper");
var router_1 = require("next/router");
var react_hook_form_1 = require("react-hook-form");
var react_1 = require("react");
var react_query_1 = require("@tanstack/react-query");
var OwnerRegister = function () {
    var methodLogin = react_hook_form_1.useForm();
    var router = router_1.useRouter();
    var loginMutation = react_query_1.useMutation({
        mutationKey: ['login']
    });
    var onSubmitLogin = function (data) {
        var loginInfo = {
            username: data.username,
            password: data.password,
            type: { actor: 'owner' }
        };
        loginMutation.mutate(loginInfo);
    };
    var onClickRegister = function () {
        router.push('/owner/register');
    };
    react_1.useEffect(function () {
        if (loginMutation.isSuccess) {
            router.push('/owner/app');
        }
    }, [loginMutation.isSuccess]);
    return (React.createElement("div", null,
        React.createElement("div", { className: "relative min-h-screen flex items-center justify-center z-11" },
            React.createElement("div", { className: "w-full max-w-[35rem]" },
                React.createElement("div", { className: "w-full flex flex-col items-center justify-center mb-10" },
                    React.createElement(logo_1["default"], { height: "3rem" }),
                    React.createElement("p", { className: "text-textUnfocus text-sm opacity-75 underline" }, "Owner only 2.")),
                React.createElement(react_hook_form_1.FormProvider, __assign({}, methodLogin),
                    React.createElement("form", { onSubmit: methodLogin.handleSubmit(onSubmitLogin) },
                        React.createElement(auth_form_wrapper_1["default"], null,
                            React.createElement(input_field_1.RHFInputField, { inputName: "username", label: "Username", registerOptions: {
                                    required: {
                                        value: true,
                                        message: 'This field is required!'
                                    }
                                } }),
                            React.createElement(input_field_1.RHFInputField, { inputName: "password", label: "Password", type: "password", registerOptions: {
                                    required: {
                                        value: true,
                                        message: 'This field is required!'
                                    }
                                } }),
                            React.createElement(classic_button_1["default"], { rounded: 'regular', className: "py-4", type: "submit" }, "Sign In")))),
                React.createElement("div", { className: "lg:mt-10 xs:mt-5" },
                    React.createElement("p", { className: "text-center text-lg text-gray-500 flex flex-col cursor-pointer" },
                        React.createElement("span", null, "Don't have an account yet? "),
                        React.createElement("span", { className: "text-theme hover:cursor-pointer" },
                            "Register",
                            ' ',
                            React.createElement("span", { className: "underline", onClick: function () { return onClickRegister(); } }, "here"),
                            ".")))))));
};
exports["default"] = OwnerRegister;
