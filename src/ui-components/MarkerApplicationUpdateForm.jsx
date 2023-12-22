/***************************************************************************
 * The contents of this file were generated with Amplify Studio.           *
 * Please refrain from making any modifications to this file.              *
 * Any changes to this file will be overwritten when running amplify pull. *
 **************************************************************************/

/* eslint-disable */
import * as React from "react";
import {
  Button,
  Flex,
  Grid,
  SwitchField,
  TextField,
} from "@aws-amplify/ui-react";
import { getOverrideProps } from "@aws-amplify/ui-react/internal";
import { MarkerApplication } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function MarkerApplicationUpdateForm(props) {
  const {
    id: idProp,
    markerApplication: markerApplicationModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    givenName: "",
    familyName: "",
    upi: "",
    auid: "",
    preferredEmail: "",
    validNzWorkPermit: false,
    degree: "",
    yearsOfStudy: "",
    underPostGrad: "",
    currentTutor: false,
    maxHours: "",
    transcriptId: "",
    cvId: "",
    userId: "",
    overseas: false,
    courseSpecifics: "",
    preferredMarker: false,
    bucketVal: "",
  };
  const [givenName, setGivenName] = React.useState(initialValues.givenName);
  const [familyName, setFamilyName] = React.useState(initialValues.familyName);
  const [upi, setUpi] = React.useState(initialValues.upi);
  const [auid, setAuid] = React.useState(initialValues.auid);
  const [preferredEmail, setPreferredEmail] = React.useState(
    initialValues.preferredEmail
  );
  const [validNzWorkPermit, setValidNzWorkPermit] = React.useState(
    initialValues.validNzWorkPermit
  );
  const [degree, setDegree] = React.useState(initialValues.degree);
  const [yearsOfStudy, setYearsOfStudy] = React.useState(
    initialValues.yearsOfStudy
  );
  const [underPostGrad, setUnderPostGrad] = React.useState(
    initialValues.underPostGrad
  );
  const [currentTutor, setCurrentTutor] = React.useState(
    initialValues.currentTutor
  );
  const [maxHours, setMaxHours] = React.useState(initialValues.maxHours);
  const [transcriptId, setTranscriptId] = React.useState(
    initialValues.transcriptId
  );
  const [cvId, setCvId] = React.useState(initialValues.cvId);
  const [userId, setUserId] = React.useState(initialValues.userId);
  const [overseas, setOverseas] = React.useState(initialValues.overseas);
  const [courseSpecifics, setCourseSpecifics] = React.useState(
    initialValues.courseSpecifics
  );
  const [preferredMarker, setPreferredMarker] = React.useState(
    initialValues.preferredMarker
  );
  const [bucketVal, setBucketVal] = React.useState(initialValues.bucketVal);
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = markerApplicationRecord
      ? { ...initialValues, ...markerApplicationRecord }
      : initialValues;
    setGivenName(cleanValues.givenName);
    setFamilyName(cleanValues.familyName);
    setUpi(cleanValues.upi);
    setAuid(cleanValues.auid);
    setPreferredEmail(cleanValues.preferredEmail);
    setValidNzWorkPermit(cleanValues.validNzWorkPermit);
    setDegree(cleanValues.degree);
    setYearsOfStudy(cleanValues.yearsOfStudy);
    setUnderPostGrad(cleanValues.underPostGrad);
    setCurrentTutor(cleanValues.currentTutor);
    setMaxHours(cleanValues.maxHours);
    setTranscriptId(cleanValues.transcriptId);
    setCvId(cleanValues.cvId);
    setUserId(cleanValues.userId);
    setOverseas(cleanValues.overseas);
    setCourseSpecifics(cleanValues.courseSpecifics);
    setPreferredMarker(cleanValues.preferredMarker);
    setBucketVal(cleanValues.bucketVal);
    setErrors({});
  };
  const [markerApplicationRecord, setMarkerApplicationRecord] = React.useState(
    markerApplicationModelProp
  );
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(MarkerApplication, idProp)
        : markerApplicationModelProp;
      setMarkerApplicationRecord(record);
    };
    queryData();
  }, [idProp, markerApplicationModelProp]);
  React.useEffect(resetStateValues, [markerApplicationRecord]);
  const validations = {
    givenName: [],
    familyName: [],
    upi: [],
    auid: [],
    preferredEmail: [],
    validNzWorkPermit: [],
    degree: [],
    yearsOfStudy: [],
    underPostGrad: [],
    currentTutor: [],
    maxHours: [],
    transcriptId: [],
    cvId: [],
    userId: [],
    overseas: [],
    courseSpecifics: [],
    preferredMarker: [],
    bucketVal: [],
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
          givenName,
          familyName,
          upi,
          auid,
          preferredEmail,
          validNzWorkPermit,
          degree,
          yearsOfStudy,
          underPostGrad,
          currentTutor,
          maxHours,
          transcriptId,
          cvId,
          userId,
          overseas,
          courseSpecifics,
          preferredMarker,
          bucketVal,
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
            MarkerApplication.copyOf(markerApplicationRecord, (updated) => {
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
      {...getOverrideProps(overrides, "MarkerApplicationUpdateForm")}
      {...rest}
    >
      <TextField
        label="Given name"
        isRequired={false}
        isReadOnly={false}
        value={givenName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName: value,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.givenName ?? value;
          }
          if (errors.givenName?.hasError) {
            runValidationTasks("givenName", value);
          }
          setGivenName(value);
        }}
        onBlur={() => runValidationTasks("givenName", givenName)}
        errorMessage={errors.givenName?.errorMessage}
        hasError={errors.givenName?.hasError}
        {...getOverrideProps(overrides, "givenName")}
      ></TextField>
      <TextField
        label="Family name"
        isRequired={false}
        isReadOnly={false}
        value={familyName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName: value,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.familyName ?? value;
          }
          if (errors.familyName?.hasError) {
            runValidationTasks("familyName", value);
          }
          setFamilyName(value);
        }}
        onBlur={() => runValidationTasks("familyName", familyName)}
        errorMessage={errors.familyName?.errorMessage}
        hasError={errors.familyName?.hasError}
        {...getOverrideProps(overrides, "familyName")}
      ></TextField>
      <TextField
        label="Upi"
        isRequired={false}
        isReadOnly={false}
        value={upi}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi: value,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.upi ?? value;
          }
          if (errors.upi?.hasError) {
            runValidationTasks("upi", value);
          }
          setUpi(value);
        }}
        onBlur={() => runValidationTasks("upi", upi)}
        errorMessage={errors.upi?.errorMessage}
        hasError={errors.upi?.hasError}
        {...getOverrideProps(overrides, "upi")}
      ></TextField>
      <TextField
        label="Auid"
        isRequired={false}
        isReadOnly={false}
        value={auid}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid: value,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.auid ?? value;
          }
          if (errors.auid?.hasError) {
            runValidationTasks("auid", value);
          }
          setAuid(value);
        }}
        onBlur={() => runValidationTasks("auid", auid)}
        errorMessage={errors.auid?.errorMessage}
        hasError={errors.auid?.hasError}
        {...getOverrideProps(overrides, "auid")}
      ></TextField>
      <TextField
        label="Preferred email"
        isRequired={false}
        isReadOnly={false}
        value={preferredEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail: value,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.preferredEmail ?? value;
          }
          if (errors.preferredEmail?.hasError) {
            runValidationTasks("preferredEmail", value);
          }
          setPreferredEmail(value);
        }}
        onBlur={() => runValidationTasks("preferredEmail", preferredEmail)}
        errorMessage={errors.preferredEmail?.errorMessage}
        hasError={errors.preferredEmail?.hasError}
        {...getOverrideProps(overrides, "preferredEmail")}
      ></TextField>
      <SwitchField
        label="Valid nz work permit"
        defaultChecked={false}
        isDisabled={false}
        isChecked={validNzWorkPermit}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit: value,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.validNzWorkPermit ?? value;
          }
          if (errors.validNzWorkPermit?.hasError) {
            runValidationTasks("validNzWorkPermit", value);
          }
          setValidNzWorkPermit(value);
        }}
        onBlur={() =>
          runValidationTasks("validNzWorkPermit", validNzWorkPermit)
        }
        errorMessage={errors.validNzWorkPermit?.errorMessage}
        hasError={errors.validNzWorkPermit?.hasError}
        {...getOverrideProps(overrides, "validNzWorkPermit")}
      ></SwitchField>
      <TextField
        label="Degree"
        isRequired={false}
        isReadOnly={false}
        value={degree}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree: value,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.degree ?? value;
          }
          if (errors.degree?.hasError) {
            runValidationTasks("degree", value);
          }
          setDegree(value);
        }}
        onBlur={() => runValidationTasks("degree", degree)}
        errorMessage={errors.degree?.errorMessage}
        hasError={errors.degree?.hasError}
        {...getOverrideProps(overrides, "degree")}
      ></TextField>
      <TextField
        label="Years of study"
        isRequired={false}
        isReadOnly={false}
        value={yearsOfStudy}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy: value,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.yearsOfStudy ?? value;
          }
          if (errors.yearsOfStudy?.hasError) {
            runValidationTasks("yearsOfStudy", value);
          }
          setYearsOfStudy(value);
        }}
        onBlur={() => runValidationTasks("yearsOfStudy", yearsOfStudy)}
        errorMessage={errors.yearsOfStudy?.errorMessage}
        hasError={errors.yearsOfStudy?.hasError}
        {...getOverrideProps(overrides, "yearsOfStudy")}
      ></TextField>
      <TextField
        label="Under post grad"
        isRequired={false}
        isReadOnly={false}
        value={underPostGrad}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad: value,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.underPostGrad ?? value;
          }
          if (errors.underPostGrad?.hasError) {
            runValidationTasks("underPostGrad", value);
          }
          setUnderPostGrad(value);
        }}
        onBlur={() => runValidationTasks("underPostGrad", underPostGrad)}
        errorMessage={errors.underPostGrad?.errorMessage}
        hasError={errors.underPostGrad?.hasError}
        {...getOverrideProps(overrides, "underPostGrad")}
      ></TextField>
      <SwitchField
        label="Current tutor"
        defaultChecked={false}
        isDisabled={false}
        isChecked={currentTutor}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor: value,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.currentTutor ?? value;
          }
          if (errors.currentTutor?.hasError) {
            runValidationTasks("currentTutor", value);
          }
          setCurrentTutor(value);
        }}
        onBlur={() => runValidationTasks("currentTutor", currentTutor)}
        errorMessage={errors.currentTutor?.errorMessage}
        hasError={errors.currentTutor?.hasError}
        {...getOverrideProps(overrides, "currentTutor")}
      ></SwitchField>
      <TextField
        label="Max hours"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={maxHours}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours: value,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.maxHours ?? value;
          }
          if (errors.maxHours?.hasError) {
            runValidationTasks("maxHours", value);
          }
          setMaxHours(value);
        }}
        onBlur={() => runValidationTasks("maxHours", maxHours)}
        errorMessage={errors.maxHours?.errorMessage}
        hasError={errors.maxHours?.hasError}
        {...getOverrideProps(overrides, "maxHours")}
      ></TextField>
      <TextField
        label="Transcript id"
        isRequired={false}
        isReadOnly={false}
        value={transcriptId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId: value,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.transcriptId ?? value;
          }
          if (errors.transcriptId?.hasError) {
            runValidationTasks("transcriptId", value);
          }
          setTranscriptId(value);
        }}
        onBlur={() => runValidationTasks("transcriptId", transcriptId)}
        errorMessage={errors.transcriptId?.errorMessage}
        hasError={errors.transcriptId?.hasError}
        {...getOverrideProps(overrides, "transcriptId")}
      ></TextField>
      <TextField
        label="Cv id"
        isRequired={false}
        isReadOnly={false}
        value={cvId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId: value,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.cvId ?? value;
          }
          if (errors.cvId?.hasError) {
            runValidationTasks("cvId", value);
          }
          setCvId(value);
        }}
        onBlur={() => runValidationTasks("cvId", cvId)}
        errorMessage={errors.cvId?.errorMessage}
        hasError={errors.cvId?.hasError}
        {...getOverrideProps(overrides, "cvId")}
      ></TextField>
      <TextField
        label="User id"
        isRequired={false}
        isReadOnly={false}
        value={userId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId: value,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal,
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
      <SwitchField
        label="Overseas"
        defaultChecked={false}
        isDisabled={false}
        isChecked={overseas}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas: value,
              courseSpecifics,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.overseas ?? value;
          }
          if (errors.overseas?.hasError) {
            runValidationTasks("overseas", value);
          }
          setOverseas(value);
        }}
        onBlur={() => runValidationTasks("overseas", overseas)}
        errorMessage={errors.overseas?.errorMessage}
        hasError={errors.overseas?.hasError}
        {...getOverrideProps(overrides, "overseas")}
      ></SwitchField>
      <TextField
        label="Course specifics"
        isRequired={false}
        isReadOnly={false}
        value={courseSpecifics}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics: value,
              preferredMarker,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.courseSpecifics ?? value;
          }
          if (errors.courseSpecifics?.hasError) {
            runValidationTasks("courseSpecifics", value);
          }
          setCourseSpecifics(value);
        }}
        onBlur={() => runValidationTasks("courseSpecifics", courseSpecifics)}
        errorMessage={errors.courseSpecifics?.errorMessage}
        hasError={errors.courseSpecifics?.hasError}
        {...getOverrideProps(overrides, "courseSpecifics")}
      ></TextField>
      <SwitchField
        label="Preferred marker"
        defaultChecked={false}
        isDisabled={false}
        isChecked={preferredMarker}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker: value,
              bucketVal,
            };
            const result = onChange(modelFields);
            value = result?.preferredMarker ?? value;
          }
          if (errors.preferredMarker?.hasError) {
            runValidationTasks("preferredMarker", value);
          }
          setPreferredMarker(value);
        }}
        onBlur={() => runValidationTasks("preferredMarker", preferredMarker)}
        errorMessage={errors.preferredMarker?.errorMessage}
        hasError={errors.preferredMarker?.hasError}
        {...getOverrideProps(overrides, "preferredMarker")}
      ></SwitchField>
      <TextField
        label="Bucket val"
        isRequired={false}
        isReadOnly={false}
        value={bucketVal}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              givenName,
              familyName,
              upi,
              auid,
              preferredEmail,
              validNzWorkPermit,
              degree,
              yearsOfStudy,
              underPostGrad,
              currentTutor,
              maxHours,
              transcriptId,
              cvId,
              userId,
              overseas,
              courseSpecifics,
              preferredMarker,
              bucketVal: value,
            };
            const result = onChange(modelFields);
            value = result?.bucketVal ?? value;
          }
          if (errors.bucketVal?.hasError) {
            runValidationTasks("bucketVal", value);
          }
          setBucketVal(value);
        }}
        onBlur={() => runValidationTasks("bucketVal", bucketVal)}
        errorMessage={errors.bucketVal?.errorMessage}
        hasError={errors.bucketVal?.hasError}
        {...getOverrideProps(overrides, "bucketVal")}
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
          isDisabled={!(idProp || markerApplicationModelProp)}
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
              !(idProp || markerApplicationModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
