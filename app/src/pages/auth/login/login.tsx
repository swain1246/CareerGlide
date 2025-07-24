"use client";
import { FormBuilder, FormField } from "@src/components/Auth/InputForm";
import React from "react";
import * as yup from "yup";

type LoginFormValues = {
    email: string;
    password: string;
};

const fields: FormField[] = [
    {
        name: "email",
        label: "Email",
        type: "email",
        placeholder: "Enter your email",
        required: true,
    },
    {
        name: "password",
        label: "Password",
        type: "password",
        placeholder: "Enter your password",
        required: true,
    },
];

const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email format").required("Email is required"),
    password: yup.string().min(6, "Minimum 6 characters").required("Password is required"),
});

export default function LoginForm() {
    const handleSubmit = (data: LoginFormValues) => {
        console.log("Submitted data:", data);
    };

    return (
        <FormBuilder<LoginFormValues>
            fields={fields}
            defaultValues={{ email: "", password: "" }}
            validationSchema={validationSchema}
            onSubmit={handleSubmit}
            submitBtnText="Login"
        />
    );
}
