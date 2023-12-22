/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourseCreateFormInputValues = {
    coordinatorName?: string;
    coordinatorEmail?: string;
    courseCode?: string;
    yearSemester?: string;
    faculty?: string;
    preassignMarkers?: boolean;
    requireMarkers?: boolean;
    estimatedStudents?: string;
    enrolledStudents?: string;
    summary?: string;
    minGrade?: string;
    totalHours?: string;
    appOpen?: boolean;
    description?: string;
    directorName?: string;
    directorEmail?: string;
    name?: string;
    thumbnailId?: string;
    markersNeeded?: number;
    markersAssigned?: number;
};
export declare type CourseCreateFormValidationValues = {
    coordinatorName?: ValidationFunction<string>;
    coordinatorEmail?: ValidationFunction<string>;
    courseCode?: ValidationFunction<string>;
    yearSemester?: ValidationFunction<string>;
    faculty?: ValidationFunction<string>;
    preassignMarkers?: ValidationFunction<boolean>;
    requireMarkers?: ValidationFunction<boolean>;
    estimatedStudents?: ValidationFunction<string>;
    enrolledStudents?: ValidationFunction<string>;
    summary?: ValidationFunction<string>;
    minGrade?: ValidationFunction<string>;
    totalHours?: ValidationFunction<string>;
    appOpen?: ValidationFunction<boolean>;
    description?: ValidationFunction<string>;
    directorName?: ValidationFunction<string>;
    directorEmail?: ValidationFunction<string>;
    name?: ValidationFunction<string>;
    thumbnailId?: ValidationFunction<string>;
    markersNeeded?: ValidationFunction<number>;
    markersAssigned?: ValidationFunction<number>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type CourseCreateFormOverridesProps = {
    CourseCreateFormGrid?: PrimitiveOverrideProps<GridProps>;
    coordinatorName?: PrimitiveOverrideProps<TextFieldProps>;
    coordinatorEmail?: PrimitiveOverrideProps<TextFieldProps>;
    courseCode?: PrimitiveOverrideProps<TextFieldProps>;
    yearSemester?: PrimitiveOverrideProps<TextFieldProps>;
    faculty?: PrimitiveOverrideProps<TextFieldProps>;
    preassignMarkers?: PrimitiveOverrideProps<SwitchFieldProps>;
    requireMarkers?: PrimitiveOverrideProps<SwitchFieldProps>;
    estimatedStudents?: PrimitiveOverrideProps<TextFieldProps>;
    enrolledStudents?: PrimitiveOverrideProps<TextFieldProps>;
    summary?: PrimitiveOverrideProps<TextFieldProps>;
    minGrade?: PrimitiveOverrideProps<TextFieldProps>;
    totalHours?: PrimitiveOverrideProps<TextFieldProps>;
    appOpen?: PrimitiveOverrideProps<SwitchFieldProps>;
    description?: PrimitiveOverrideProps<TextFieldProps>;
    directorName?: PrimitiveOverrideProps<TextFieldProps>;
    directorEmail?: PrimitiveOverrideProps<TextFieldProps>;
    name?: PrimitiveOverrideProps<TextFieldProps>;
    thumbnailId?: PrimitiveOverrideProps<TextFieldProps>;
    markersNeeded?: PrimitiveOverrideProps<TextFieldProps>;
    markersAssigned?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type CourseCreateFormProps = React.PropsWithChildren<{
    overrides?: CourseCreateFormOverridesProps | undefined | null;
} & {
    clearOnSuccess?: boolean;
    onSubmit?: (fields: CourseCreateFormInputValues) => CourseCreateFormInputValues;
    onSuccess?: (fields: CourseCreateFormInputValues) => void;
    onError?: (fields: CourseCreateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseCreateFormInputValues) => CourseCreateFormInputValues;
    onValidate?: CourseCreateFormValidationValues;
} & React.CSSProperties>;
export default function CourseCreateForm(props: CourseCreateFormProps): React.ReactElement;
