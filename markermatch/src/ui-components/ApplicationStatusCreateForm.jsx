/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { ApplicationStatus } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function ApplicationStatusCreateForm(props) {
  const {
    clearOnSuccess = true,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    userId: "",
    appliedCourses: "",
    hoursAssigned: "",
    status: "",
    hoursRequested: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [appliedCourses, setAppliedCourses] = React.useState(
    initialValues.appliedCourses
  );
  const [hoursAssigned, setHoursAssigned] = React.useState(
    initialValues.hoursAssigned
  );
  const [status, setStatus] = React.useState(initialValues.status);
  const [hoursRequested, setHoursRequested] = React.useState(
    initialValues.hoursRequested
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    setUserId(initialValues.userId);
    setAppliedCourses(initialValues.appliedCourses);
    setHoursAssigned(initialValues.hoursAssigned);
    setStatus(initialValues.status);
    setHoursRequested(initialValues.hoursRequested);
    setErrors({});
  };
  const validations = {
    userId: [],
    appliedCourses: [],
    hoursAssigned: [],
    status: [],
    hoursRequested: [],
  };
  const runValidationTasks = async (
    fieldName,
    currentValue,
    getDisplayValue
  ) => {
    const value =
      currentValue && getDisplayValue
        ? getDisplayValue(currentValue)
        : currentValue;
    let validationResponse = validateField(value, validations[fieldName]);
    const customValidator = fetchByPath(onValidate, fieldName);
    if (customValidator) {
      validationResponse = await customValidator(value, validationResponse);
    }
    setErrors((errors) => ({ ...errors, [fieldName]: validationResponse }));
    return validationResponse;
  };
  return (
    <Grid
      as="form"
      rowGap="15px"
      columnGap="15px"
      padding="20px"
      onSubmit={async (event) => {
        event.preventDefault();
        let modelFields = {
          userId,
          appliedCourses,
          hoursAssigned,
          status,
          hoursRequested,
        };
        const validationResponses = await Promise.all(
          Object.keys(validations).reduce((promises, fieldName) => {
            if (Array.isArray(modelFields[fieldName])) {
              promises.push(
                ...modelFields[fieldName].map((item) =>
                  runValidationTasks(fieldName, item)
                )
              );
              return promises;
            }
            promises.push(
              runValidationTasks(fieldName, modelFields[fieldName])
            );
            return promises;
          }, [])
        );
        if (validationResponses.some((r) => r.hasError)) {
          return;
        }
        if (onSubmit) {
          modelFields = onSubmit(modelFields);
        }
        try {
          Object.entries(modelFields).forEach(([key, value]) => {
            if (typeof value === "string" && value === "") {
              modelFields[key] = null;
            }
          });
          await DataStore.save(new ApplicationStatus(modelFields));
          if (onSuccess) {
            onSuccess(modelFields);
          }
          if (clearOnSuccess) {
            resetStateValues();
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "ApplicationStatusCreateForm")}
      {...rest}
    >
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId: value,
              appliedCourses,
              hoursAssigned,
              status,
              hoursRequested,
            };
            const result = onChange(modelFields);
            value = result?.userId ?? value;
          }
          if (errors.userId?.hasError) {
            runValidationTasks("userId", value);
          }
          setUserId(value);
        }}
        onBlur={() => runValidationTasks("userId", userId)}
        errorMessage={errors.userId?.errorMessage}
        hasError={errors.userId?.hasError}
        {...getOverrideProps(overrides, "userId")}
      ></TextField>
      <TextField
        label="Applied courses"
        isRequired={false}
        isReadOnly={false}
        value={appliedCourses}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              appliedCourses: value,
              hoursAssigned,
              status,
              hoursRequested,
            };
            const result = onChange(modelFields);
            value = result?.appliedCourses ?? value;
          }
          if (errors.appliedCourses?.hasError) {
            runValidationTasks("appliedCourses", value);
          }
          setAppliedCourses(value);
        }}
        onBlur={() => runValidationTasks("appliedCourses", appliedCourses)}
        errorMessage={errors.appliedCourses?.errorMessage}
        hasError={errors.appliedCourses?.hasError}
        {...getOverrideProps(overrides, "appliedCourses")}
      ></TextField>
      <TextField
        label="Hours assigned"
        isRequired={false}
        isReadOnly={false}
        value={hoursAssigned}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              appliedCourses,
              hoursAssigned: value,
              status,
              hoursRequested,
            };
            const result = onChange(modelFields);
            value = result?.hoursAssigned ?? value;
          }
          if (errors.hoursAssigned?.hasError) {
            runValidationTasks("hoursAssigned", value);
          }
          setHoursAssigned(value);
        }}
        onBlur={() => runValidationTasks("hoursAssigned", hoursAssigned)}
        errorMessage={errors.hoursAssigned?.errorMessage}
        hasError={errors.hoursAssigned?.hasError}
        {...getOverrideProps(overrides, "hoursAssigned")}
      ></TextField>
      <TextField
        label="Status"
        isRequired={false}
        isReadOnly={false}
        value={status}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              appliedCourses,
              hoursAssigned,
              status: value,
              hoursRequested,
            };
            const result = onChange(modelFields);
            value = result?.status ?? value;
          }
          if (errors.status?.hasError) {
            runValidationTasks("status", value);
          }
          setStatus(value);
        }}
        onBlur={() => runValidationTasks("status", status)}
        errorMessage={errors.status?.errorMessage}
        hasError={errors.status?.hasError}
        {...getOverrideProps(overrides, "status")}
      ></TextField>
      <TextField
        label="Hours requested"
        isRequired={false}
        isReadOnly={false}
        value={hoursRequested}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              appliedCourses,
              hoursAssigned,
              status,
              hoursRequested: value,
            };
            const result = onChange(modelFields);
            value = result?.hoursRequested ?? value;
          }
          if (errors.hoursRequested?.hasError) {
            runValidationTasks("hoursRequested", value);
          }
          setHoursRequested(value);
        }}
        onBlur={() => runValidationTasks("hoursRequested", hoursRequested)}
        errorMessage={errors.hoursRequested?.errorMessage}
        hasError={errors.hoursRequested?.hasError}
        {...getOverrideProps(overrides, "hoursRequested")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Clear"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          {...getOverrideProps(overrides, "ClearButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={Object.values(errors).some((e) => e?.hasError)}
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
