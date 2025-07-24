import React from "react";
import {
    useForm,
    Controller,
    SubmitHandler,
    FieldValues,
    Path,
    UseFormSetValue,
    DefaultValues,
} from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

export type FormField = {
    name: string;
    label: string;
    type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "textarea"
    | "select"
    | "checkbox"
    | "date";
    placeholder?: string;
    options?: { label: string; value: string }[];
    required?: boolean;
};

interface FormBuilderProps<T extends FieldValues> {
    fields: FormField[];
    defaultValues: DefaultValues<T>;
    onSubmit: SubmitHandler<T>;
    validationSchema: yup.ObjectSchema<any>;
    submitBtnText: string;
}

export function FormBuilder<T extends FieldValues>({
    fields,
    defaultValues,
    onSubmit,
    validationSchema,
    submitBtnText,
}: FormBuilderProps<T>) {
    const {
        control,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<T>({
        resolver: yupResolver(validationSchema),
        defaultValues,
        mode: "all",
    });

    const renderField = (field: FormField) => (
        <Controller
            key={field.name}
            name={field.name as Path<T>}
            control={control}
            render={({ field: controllerField }) => {
                const commonProps = {
                    ...controllerField,
                    id: field.name,
                    placeholder: field.placeholder,
                    className: `w-full p-2 border rounded focus:outline-none focus:ring-2 text-black ${errors[field.name]
                        ? "border-red-500 focus:ring-red-400"
                        : "border-gray-300 focus:ring-blue-400"
                        }`,
                };

                switch (field.type) {
                    case "textarea":
                        return <textarea {...commonProps} />;
                    case "select":
                        return (
                            <select {...commonProps}>
                                <option value="">Select...</option>
                                {field.options?.map((opt) => (
                                    <option key={opt.value} value={opt.value}>
                                        {opt.label}
                                    </option>
                                ))}
                            </select>
                        );
                    case "checkbox":
                        return (
                            <div className="flex items-center space-x-2">
                                <input
                                    type="checkbox"
                                    checked={!!controllerField.value}
                                    onChange={(e) => controllerField.onChange(e.target.checked)}
                                    id={field.name}
                                />
                                <label htmlFor={field.name}>{field.label}</label>
                            </div>
                        );
                    default:
                        return <input type={field.type} {...commonProps} />;
                }
            }}
        />
    );

    return (
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 max-w-md mx-auto"
        >
            {fields.map((field) => (
                <div key={field.name} className="flex flex-col">
                    {field.type !== "checkbox" && (
                        <label
                            htmlFor={field.name}
                            className="mb-1 font-medium text-gray-700"
                        >
                            {field.label}
                        </label>
                    )}
                    {renderField(field)}
                    {errors[field.name] && (
                        <p className="mt-1 text-red-600 text-sm italic">
                            {errors[field.name]?.message?.toString()}
                        </p>
                    )}
                </div>
            ))}
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded cursor-pointer"
            >
                {isSubmitting ? `${submitBtnText}ing...` : submitBtnText}
            </button>
        </form>
    );
}