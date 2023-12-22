/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { Course } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type CourseUpdateFormInputValues = {
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
export declare type CourseUpdateFormValidationValues = {
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
export declare type CourseUpdateFormOverridesProps = {
    CourseUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
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
export declare type CourseUpdateFormProps = React.PropsWithChildren<{
    overrides?: CourseUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    course?: Course;
    onSubmit?: (fields: CourseUpdateFormInputValues) => CourseUpdateFormInputValues;
    onSuccess?: (fields: CourseUpdateFormInputValues) => void;
    onError?: (fields: CourseUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: CourseUpdateFormInputValues) => CourseUpdateFormInputValues;
    onValidate?: CourseUpdateFormValidationValues;
} & React.CSSProperties>;
export default function CourseUpdateForm(props: CourseUpdateFormProps): React.ReactElement;
