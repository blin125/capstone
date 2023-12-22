/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

import * as React from "react";
import { GridProps, SwitchFieldProps, TextFieldProps } from "@aws-amplify/ui-react";
import { EscapeHatchProps } from "@aws-amplify/ui-react/internal";
import { MarkerApplication } from "../models";
export declare type ValidationResponse = {
    hasError: boolean;
    errorMessage?: string;
};
export declare type ValidationFunction<T> = (value: T, validationResponse: ValidationResponse) => ValidationResponse | Promise<ValidationResponse>;
export declare type MarkerApplicationUpdateFormInputValues = {
    givenName?: string;
    familyName?: string;
    upi?: string;
    auid?: string;
    preferredEmail?: string;
    validNzWorkPermit?: boolean;
    degree?: string;
    yearsOfStudy?: string;
    underPostGrad?: string;
    currentTutor?: boolean;
    maxHours?: number;
    transcriptId?: string;
    cvId?: string;
    userId?: string;
    overseas?: boolean;
    courseSpecifics?: string;
    preferredMarker?: boolean;
    bucketVal?: string;
};
export declare type MarkerApplicationUpdateFormValidationValues = {
    givenName?: ValidationFunction<string>;
    familyName?: ValidationFunction<string>;
    upi?: ValidationFunction<string>;
    auid?: ValidationFunction<string>;
    preferredEmail?: ValidationFunction<string>;
    validNzWorkPermit?: ValidationFunction<boolean>;
    degree?: ValidationFunction<string>;
    yearsOfStudy?: ValidationFunction<string>;
    underPostGrad?: ValidationFunction<string>;
    currentTutor?: ValidationFunction<boolean>;
    maxHours?: ValidationFunction<number>;
    transcriptId?: ValidationFunction<string>;
    cvId?: ValidationFunction<string>;
    userId?: ValidationFunction<string>;
    overseas?: ValidationFunction<boolean>;
    courseSpecifics?: ValidationFunction<string>;
    preferredMarker?: ValidationFunction<boolean>;
    bucketVal?: ValidationFunction<string>;
};
export declare type PrimitiveOverrideProps<T> = Partial<T> & React.DOMAttributes<HTMLDivElement>;
export declare type MarkerApplicationUpdateFormOverridesProps = {
    MarkerApplicationUpdateFormGrid?: PrimitiveOverrideProps<GridProps>;
    givenName?: PrimitiveOverrideProps<TextFieldProps>;
    familyName?: PrimitiveOverrideProps<TextFieldProps>;
    upi?: PrimitiveOverrideProps<TextFieldProps>;
    auid?: PrimitiveOverrideProps<TextFieldProps>;
    preferredEmail?: PrimitiveOverrideProps<TextFieldProps>;
    validNzWorkPermit?: PrimitiveOverrideProps<SwitchFieldProps>;
    degree?: PrimitiveOverrideProps<TextFieldProps>;
    yearsOfStudy?: PrimitiveOverrideProps<TextFieldProps>;
    underPostGrad?: PrimitiveOverrideProps<TextFieldProps>;
    currentTutor?: PrimitiveOverrideProps<SwitchFieldProps>;
    maxHours?: PrimitiveOverrideProps<TextFieldProps>;
    transcriptId?: PrimitiveOverrideProps<TextFieldProps>;
    cvId?: PrimitiveOverrideProps<TextFieldProps>;
    userId?: PrimitiveOverrideProps<TextFieldProps>;
    overseas?: PrimitiveOverrideProps<SwitchFieldProps>;
    courseSpecifics?: PrimitiveOverrideProps<TextFieldProps>;
    preferredMarker?: PrimitiveOverrideProps<SwitchFieldProps>;
    bucketVal?: PrimitiveOverrideProps<TextFieldProps>;
} & EscapeHatchProps;
export declare type MarkerApplicationUpdateFormProps = React.PropsWithChildren<{
    overrides?: MarkerApplicationUpdateFormOverridesProps | undefined | null;
} & {
    id?: string;
    markerApplication?: MarkerApplication;
    onSubmit?: (fields: MarkerApplicationUpdateFormInputValues) => MarkerApplicationUpdateFormInputValues;
    onSuccess?: (fields: MarkerApplicationUpdateFormInputValues) => void;
    onError?: (fields: MarkerApplicationUpdateFormInputValues, errorMessage: string) => void;
    onChange?: (fields: MarkerApplicationUpdateFormInputValues) => MarkerApplicationUpdateFormInputValues;
    onValidate?: MarkerApplicationUpdateFormValidationValues;
} & React.CSSProperties>;
export default function MarkerApplicationUpdateForm(props: MarkerApplicationUpdateFormProps): React.ReactElement;
