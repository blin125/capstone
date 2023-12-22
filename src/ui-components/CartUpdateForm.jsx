/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import { Button, Flex, Grid, TextField } from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { Cart } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CartUpdateForm(props) {
  const {
    id: idProp,
    cart: cartModelProp,
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
    selectedCourses: "",
  };
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [selectedCourses, setSelectedCourses] = React.useState(
    initialValues.selectedCourses
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = cartRecord
      ? { ...initialValues, ...cartRecord }
      : initialValues;
    setUserId(cleanValues.userId);
    setSelectedCourses(cleanValues.selectedCourses);
    setErrors({});
  };
  const [cartRecord, setCartRecord] = React.useState(cartModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Cart, idProp)
        : cartModelProp;
      setCartRecord(record);
    };
    queryData();
  }, [idProp, cartModelProp]);
  React.useEffect(resetStateValues, [cartRecord]);
  const validations = {
    userId: [],
    selectedCourses: [],
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
          selectedCourses,
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
          await DataStore.save(
            Cart.copyOf(cartRecord, (updated) => {
              Object.assign(updated, modelFields);
            })
          );
          if (onSuccess) {
            onSuccess(modelFields);
          }
        } catch (err) {
          if (onError) {
            onError(modelFields, err.message);
          }
        }
      }}
      {...getOverrideProps(overrides, "CartUpdateForm")}
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
              selectedCourses,
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
        label="Selected courses"
        isRequired={false}
        isReadOnly={false}
        value={selectedCourses}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              userId,
              selectedCourses: value,
            };
            const result = onChange(modelFields);
            value = result?.selectedCourses ?? value;
          }
          if (errors.selectedCourses?.hasError) {
            runValidationTasks("selectedCourses", value);
          }
          setSelectedCourses(value);
        }}
        onBlur={() => runValidationTasks("selectedCourses", selectedCourses)}
        errorMessage={errors.selectedCourses?.errorMessage}
        hasError={errors.selectedCourses?.hasError}
        {...getOverrideProps(overrides, "selectedCourses")}
      ></TextField>
      <Flex
        justifyContent="space-between"
        {...getOverrideProps(overrides, "CTAFlex")}
      >
        <Button
          children="Reset"
          type="reset"
          onClick={(event) => {
            event.preventDefault();
            resetStateValues();
          }}
          isDisabled={!(idProp || cartModelProp)}
          {...getOverrideProps(overrides, "ResetButton")}
        ></Button>
        <Flex
          gap="15px"
          {...getOverrideProps(overrides, "RightAlignCTASubFlex")}
        >
          <Button
            children="Submit"
            type="submit"
            variation="primary"
            isDisabled={
              !(idProp || cartModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
