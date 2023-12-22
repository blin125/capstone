/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { ApplicationStatus } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type ApplicationStatusUpdateFormInputValues = {
    userId?: string;
    appliedCourses?: string;
    hoursAssigned?: string;
    status?: string;
    hoursRequested?: string;
};
export declare type ApplicationStatusUpdateFormValidationValues = {
    userId?: ValidationFunction<string>;
    appliedCourses?: ValidationFunction<string>;
    hoursAssigned?: ValidationFunction<string>;
    status?: ValidationFunction<string>;
    hoursRequested?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type ApplicationStatusUpdateFormOverridesProps = {
    ApplicationStatusUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    appliedCourses?: PrimitiveOverrideProps<TextFieldProps>;
    hoursAssigned?: PrimitiveOverrideProps<TextFieldProps>;
    status?: PrimitiveOverrideProps<TextFieldProps>;
    hoursRequested?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type ApplicationStatusUpdateFormProps = React.PropsWithChildren<{
    overrides?: ApplicationStatusUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    applicationStatus?: ApplicationStatus;
    onSubmit?: (fields: ApplicationStatusUpdateFormInputValues) => ApplicationStatusUpdateFormInputValues;
    onSuccess?: (fields: ApplicationStatusUpdateFormInputValues) => void;
    onError?: (fields: ApplicationStatusUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: ApplicationStatusUpdateFormInputValues) => ApplicationStatusUpdateFormInputValues;
    onValidate?: ApplicationStatusUpdateFormValidationValues;
} & React.CSSProperties>;
export default function ApplicationStatusUpdateForm(props: ApplicationStatusUpdateFormProps): React.ReactElement;
