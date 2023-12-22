/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ApplicationStatusCreateFormInputValues = {
    userId?: string;
    appliedCourses?: string;
    hoursAssigned?: string;
    status?: string;
    hoursRequested?: string;
};
export declare type ApplicationStatusCreateFormValidationValues = {
    userId?: ValidationFunction<string>;
    appliedCourses?: ValidationFunction<string>;
    hoursAssigned?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    hoursRequested?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationStatusCreateFormOverridesProps = {
    ApplicationStatusCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    appliedCourses?: PrimitiveOverrideProps<TextFieldProps>;
    hoursAssigned?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    hoursRequested?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ApplicationStatusCreateFormProps = React.PropsWithChildren<{
    overrides?: ApplicationStatusCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: ApplicationStatusCreateFormInputValues) => ApplicationStatusCreateFormInputValues;
    onSuccess?: (fields: ApplicationStatusCreateFormInputValues) => void;
    onError?: (fields: ApplicationStatusCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicationStatusCreateFormInputValues) => ApplicationStatusCreateFormInputValues;
    onValidate?: ApplicationStatusCreateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicationStatusCreateForm(props: ApplicationStatusCreateFormProps): React.ReactElement;
