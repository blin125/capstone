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
import { Course } from "../models";
import { fetchByPath, validateField } from "./utils";
import { DataStore } from "aws-amplify";
export default function CourseUpdateForm(props) {
  const {
    id: idProp,
    course: courseModelProp,
    onSuccess,
    onError,
    onSubmit,
    onValidate,
    onChange,
    overrides,
    ...rest
  } = props;
  const initialValues = {
    coordinatorName: "",
    coordinatorEmail: "",
    courseCode: "",
    yearSemester: "",
    faculty: "",
    preassignMarkers: false,
    requireMarkers: false,
    estimatedStudents: "",
    enrolledStudents: "",
    summary: "",
    minGrade: "",
    totalHours: "",
    appOpen: false,
    description: "",
    directorName: "",
    directorEmail: "",
    name: "",
    thumbnailId: "",
    markersNeeded: "",
    markersAssigned: "",
  };
  const [coordinatorName, setCoordinatorName] = React.useState(
    initialValues.coordinatorName
  );
  const [coordinatorEmail, setCoordinatorEmail] = React.useState(
    initialValues.coordinatorEmail
  );
  const [courseCode, setCourseCode] = React.useState(initialValues.courseCode);
  const [yearSemester, setYearSemester] = React.useState(
    initialValues.yearSemester
  );
  const [faculty, setFaculty] = React.useState(initialValues.faculty);
  const [preassignMarkers, setPreassignMarkers] = React.useState(
    initialValues.preassignMarkers
  );
  const [requireMarkers, setRequireMarkers] = React.useState(
    initialValues.requireMarkers
  );
  const [estimatedStudents, setEstimatedStudents] = React.useState(
    initialValues.estimatedStudents
  );
  const [enrolledStudents, setEnrolledStudents] = React.useState(
    initialValues.enrolledStudents
  );
  const [summary, setSummary] = React.useState(initialValues.summary);
  const [minGrade, setMinGrade] = React.useState(initialValues.minGrade);
  const [totalHours, setTotalHours] = React.useState(initialValues.totalHours);
  const [appOpen, setAppOpen] = React.useState(initialValues.appOpen);
  const [description, setDescription] = React.useState(
    initialValues.description
  );
  const [directorName, setDirectorName] = React.useState(
    initialValues.directorName
  );
  const [directorEmail, setDirectorEmail] = React.useState(
    initialValues.directorEmail
  );
  const [name, setName] = React.useState(initialValues.name);
  const [thumbnailId, setThumbnailId] = React.useState(
    initialValues.thumbnailId
  );
  const [markersNeeded, setMarkersNeeded] = React.useState(
    initialValues.markersNeeded
  );
  const [markersAssigned, setMarkersAssigned] = React.useState(
    initialValues.markersAssigned
  );
  const [errors, setErrors] = React.useState({});
  const resetStateValues = () => {
    const cleanValues = courseRecord
      ? { ...initialValues, ...courseRecord }
      : initialValues;
    setCoordinatorName(cleanValues.coordinatorName);
    setCoordinatorEmail(cleanValues.coordinatorEmail);
    setCourseCode(cleanValues.courseCode);
    setYearSemester(cleanValues.yearSemester);
    setFaculty(cleanValues.faculty);
    setPreassignMarkers(cleanValues.preassignMarkers);
    setRequireMarkers(cleanValues.requireMarkers);
    setEstimatedStudents(cleanValues.estimatedStudents);
    setEnrolledStudents(cleanValues.enrolledStudents);
    setSummary(cleanValues.summary);
    setMinGrade(cleanValues.minGrade);
    setTotalHours(cleanValues.totalHours);
    setAppOpen(cleanValues.appOpen);
    setDescription(cleanValues.description);
    setDirectorName(cleanValues.directorName);
    setDirectorEmail(cleanValues.directorEmail);
    setName(cleanValues.name);
    setThumbnailId(cleanValues.thumbnailId);
    setMarkersNeeded(cleanValues.markersNeeded);
    setMarkersAssigned(cleanValues.markersAssigned);
    setErrors({});
  };
  const [courseRecord, setCourseRecord] = React.useState(courseModelProp);
  React.useEffect(() => {
    const queryData = async () => {
      const record = idProp
        ? await DataStore.query(Course, idProp)
        : courseModelProp;
      setCourseRecord(record);
    };
    queryData();
  }, [idProp, courseModelProp]);
  React.useEffect(resetStateValues, [courseRecord]);
  const validations = {
    coordinatorName: [],
    coordinatorEmail: [],
    courseCode: [],
    yearSemester: [],
    faculty: [],
    preassignMarkers: [],
    requireMarkers: [],
    estimatedStudents: [],
    enrolledStudents: [],
    summary: [],
    minGrade: [],
    totalHours: [],
    appOpen: [],
    description: [],
    directorName: [],
    directorEmail: [],
    name: [],
    thumbnailId: [],
    markersNeeded: [],
    markersAssigned: [],
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
          coordinatorName,
          coordinatorEmail,
          courseCode,
          yearSemester,
          faculty,
          preassignMarkers,
          requireMarkers,
          estimatedStudents,
          enrolledStudents,
          summary,
          minGrade,
          totalHours,
          appOpen,
          description,
          directorName,
          directorEmail,
          name,
          thumbnailId,
          markersNeeded,
          markersAssigned,
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
            Course.copyOf(courseRecord, (updated) => {
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
      {...getOverrideProps(overrides, "CourseUpdateForm")}
      {...rest}
    >
      <TextField
        label="Coordinator name"
        isRequired={false}
        isReadOnly={false}
        value={coordinatorName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName: value,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.coordinatorName ?? value;
          }
          if (errors.coordinatorName?.hasError) {
            runValidationTasks("coordinatorName", value);
          }
          setCoordinatorName(value);
        }}
        onBlur={() => runValidationTasks("coordinatorName", coordinatorName)}
        errorMessage={errors.coordinatorName?.errorMessage}
        hasError={errors.coordinatorName?.hasError}
        {...getOverrideProps(overrides, "coordinatorName")}
      ></TextField>
      <TextField
        label="Coordinator email"
        isRequired={false}
        isReadOnly={false}
        value={coordinatorEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail: value,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.coordinatorEmail ?? value;
          }
          if (errors.coordinatorEmail?.hasError) {
            runValidationTasks("coordinatorEmail", value);
          }
          setCoordinatorEmail(value);
        }}
        onBlur={() => runValidationTasks("coordinatorEmail", coordinatorEmail)}
        errorMessage={errors.coordinatorEmail?.errorMessage}
        hasError={errors.coordinatorEmail?.hasError}
        {...getOverrideProps(overrides, "coordinatorEmail")}
      ></TextField>
      <TextField
        label="Course code"
        isRequired={false}
        isReadOnly={false}
        value={courseCode}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode: value,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.courseCode ?? value;
          }
          if (errors.courseCode?.hasError) {
            runValidationTasks("courseCode", value);
          }
          setCourseCode(value);
        }}
        onBlur={() => runValidationTasks("courseCode", courseCode)}
        errorMessage={errors.courseCode?.errorMessage}
        hasError={errors.courseCode?.hasError}
        {...getOverrideProps(overrides, "courseCode")}
      ></TextField>
      <TextField
        label="Year semester"
        isRequired={false}
        isReadOnly={false}
        value={yearSemester}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester: value,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.yearSemester ?? value;
          }
          if (errors.yearSemester?.hasError) {
            runValidationTasks("yearSemester", value);
          }
          setYearSemester(value);
        }}
        onBlur={() => runValidationTasks("yearSemester", yearSemester)}
        errorMessage={errors.yearSemester?.errorMessage}
        hasError={errors.yearSemester?.hasError}
        {...getOverrideProps(overrides, "yearSemester")}
      ></TextField>
      <TextField
        label="Faculty"
        isRequired={false}
        isReadOnly={false}
        value={faculty}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty: value,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.faculty ?? value;
          }
          if (errors.faculty?.hasError) {
            runValidationTasks("faculty", value);
          }
          setFaculty(value);
        }}
        onBlur={() => runValidationTasks("faculty", faculty)}
        errorMessage={errors.faculty?.errorMessage}
        hasError={errors.faculty?.hasError}
        {...getOverrideProps(overrides, "faculty")}
      ></TextField>
      <SwitchField
        label="Preassign markers"
        defaultChecked={false}
        isDisabled={false}
        isChecked={preassignMarkers}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers: value,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.preassignMarkers ?? value;
          }
          if (errors.preassignMarkers?.hasError) {
            runValidationTasks("preassignMarkers", value);
          }
          setPreassignMarkers(value);
        }}
        onBlur={() => runValidationTasks("preassignMarkers", preassignMarkers)}
        errorMessage={errors.preassignMarkers?.errorMessage}
        hasError={errors.preassignMarkers?.hasError}
        {...getOverrideProps(overrides, "preassignMarkers")}
      ></SwitchField>
      <SwitchField
        label="Require markers"
        defaultChecked={false}
        isDisabled={false}
        isChecked={requireMarkers}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers: value,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.requireMarkers ?? value;
          }
          if (errors.requireMarkers?.hasError) {
            runValidationTasks("requireMarkers", value);
          }
          setRequireMarkers(value);
        }}
        onBlur={() => runValidationTasks("requireMarkers", requireMarkers)}
        errorMessage={errors.requireMarkers?.errorMessage}
        hasError={errors.requireMarkers?.hasError}
        {...getOverrideProps(overrides, "requireMarkers")}
      ></SwitchField>
      <TextField
        label="Estimated students"
        isRequired={false}
        isReadOnly={false}
        value={estimatedStudents}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents: value,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.estimatedStudents ?? value;
          }
          if (errors.estimatedStudents?.hasError) {
            runValidationTasks("estimatedStudents", value);
          }
          setEstimatedStudents(value);
        }}
        onBlur={() =>
          runValidationTasks("estimatedStudents", estimatedStudents)
        }
        errorMessage={errors.estimatedStudents?.errorMessage}
        hasError={errors.estimatedStudents?.hasError}
        {...getOverrideProps(overrides, "estimatedStudents")}
      ></TextField>
      <TextField
        label="Enrolled students"
        isRequired={false}
        isReadOnly={false}
        value={enrolledStudents}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents: value,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.enrolledStudents ?? value;
          }
          if (errors.enrolledStudents?.hasError) {
            runValidationTasks("enrolledStudents", value);
          }
          setEnrolledStudents(value);
        }}
        onBlur={() => runValidationTasks("enrolledStudents", enrolledStudents)}
        errorMessage={errors.enrolledStudents?.errorMessage}
        hasError={errors.enrolledStudents?.hasError}
        {...getOverrideProps(overrides, "enrolledStudents")}
      ></TextField>
      <TextField
        label="Summary"
        isRequired={false}
        isReadOnly={false}
        value={summary}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary: value,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.summary ?? value;
          }
          if (errors.summary?.hasError) {
            runValidationTasks("summary", value);
          }
          setSummary(value);
        }}
        onBlur={() => runValidationTasks("summary", summary)}
        errorMessage={errors.summary?.errorMessage}
        hasError={errors.summary?.hasError}
        {...getOverrideProps(overrides, "summary")}
      ></TextField>
      <TextField
        label="Min grade"
        isRequired={false}
        isReadOnly={false}
        value={minGrade}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade: value,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.minGrade ?? value;
          }
          if (errors.minGrade?.hasError) {
            runValidationTasks("minGrade", value);
          }
          setMinGrade(value);
        }}
        onBlur={() => runValidationTasks("minGrade", minGrade)}
        errorMessage={errors.minGrade?.errorMessage}
        hasError={errors.minGrade?.hasError}
        {...getOverrideProps(overrides, "minGrade")}
      ></TextField>
      <TextField
        label="Total hours"
        isRequired={false}
        isReadOnly={false}
        value={totalHours}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours: value,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.totalHours ?? value;
          }
          if (errors.totalHours?.hasError) {
            runValidationTasks("totalHours", value);
          }
          setTotalHours(value);
        }}
        onBlur={() => runValidationTasks("totalHours", totalHours)}
        errorMessage={errors.totalHours?.errorMessage}
        hasError={errors.totalHours?.hasError}
        {...getOverrideProps(overrides, "totalHours")}
      ></TextField>
      <SwitchField
        label="App open"
        defaultChecked={false}
        isDisabled={false}
        isChecked={appOpen}
        onChange={(e) => {
          let value = e.target.checked;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen: value,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.appOpen ?? value;
          }
          if (errors.appOpen?.hasError) {
            runValidationTasks("appOpen", value);
          }
          setAppOpen(value);
        }}
        onBlur={() => runValidationTasks("appOpen", appOpen)}
        errorMessage={errors.appOpen?.errorMessage}
        hasError={errors.appOpen?.hasError}
        {...getOverrideProps(overrides, "appOpen")}
      ></SwitchField>
      <TextField
        label="Description"
        isRequired={false}
        isReadOnly={false}
        value={description}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description: value,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.description ?? value;
          }
          if (errors.description?.hasError) {
            runValidationTasks("description", value);
          }
          setDescription(value);
        }}
        onBlur={() => runValidationTasks("description", description)}
        errorMessage={errors.description?.errorMessage}
        hasError={errors.description?.hasError}
        {...getOverrideProps(overrides, "description")}
      ></TextField>
      <TextField
        label="Director name"
        isRequired={false}
        isReadOnly={false}
        value={directorName}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName: value,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.directorName ?? value;
          }
          if (errors.directorName?.hasError) {
            runValidationTasks("directorName", value);
          }
          setDirectorName(value);
        }}
        onBlur={() => runValidationTasks("directorName", directorName)}
        errorMessage={errors.directorName?.errorMessage}
        hasError={errors.directorName?.hasError}
        {...getOverrideProps(overrides, "directorName")}
      ></TextField>
      <TextField
        label="Director email"
        isRequired={false}
        isReadOnly={false}
        value={directorEmail}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail: value,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.directorEmail ?? value;
          }
          if (errors.directorEmail?.hasError) {
            runValidationTasks("directorEmail", value);
          }
          setDirectorEmail(value);
        }}
        onBlur={() => runValidationTasks("directorEmail", directorEmail)}
        errorMessage={errors.directorEmail?.errorMessage}
        hasError={errors.directorEmail?.hasError}
        {...getOverrideProps(overrides, "directorEmail")}
      ></TextField>
      <TextField
        label="Name"
        isRequired={false}
        isReadOnly={false}
        value={name}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name: value,
              thumbnailId,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.name ?? value;
          }
          if (errors.name?.hasError) {
            runValidationTasks("name", value);
          }
          setName(value);
        }}
        onBlur={() => runValidationTasks("name", name)}
        errorMessage={errors.name?.errorMessage}
        hasError={errors.name?.hasError}
        {...getOverrideProps(overrides, "name")}
      ></TextField>
      <TextField
        label="Thumbnail id"
        isRequired={false}
        isReadOnly={false}
        value={thumbnailId}
        onChange={(e) => {
          let { value } = e.target;
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId: value,
              markersNeeded,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.thumbnailId ?? value;
          }
          if (errors.thumbnailId?.hasError) {
            runValidationTasks("thumbnailId", value);
          }
          setThumbnailId(value);
        }}
        onBlur={() => runValidationTasks("thumbnailId", thumbnailId)}
        errorMessage={errors.thumbnailId?.errorMessage}
        hasError={errors.thumbnailId?.hasError}
        {...getOverrideProps(overrides, "thumbnailId")}
      ></TextField>
      <TextField
        label="Markers needed"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={markersNeeded}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded: value,
              markersAssigned,
            };
            const result = onChange(modelFields);
            value = result?.markersNeeded ?? value;
          }
          if (errors.markersNeeded?.hasError) {
            runValidationTasks("markersNeeded", value);
          }
          setMarkersNeeded(value);
        }}
        onBlur={() => runValidationTasks("markersNeeded", markersNeeded)}
        errorMessage={errors.markersNeeded?.errorMessage}
        hasError={errors.markersNeeded?.hasError}
        {...getOverrideProps(overrides, "markersNeeded")}
      ></TextField>
      <TextField
        label="Markers assigned"
        isRequired={false}
        isReadOnly={false}
        type="number"
        step="any"
        value={markersAssigned}
        onChange={(e) => {
          let value = isNaN(parseInt(e.target.value))
            ? e.target.value
            : parseInt(e.target.value);
          if (onChange) {
            const modelFields = {
              coordinatorName,
              coordinatorEmail,
              courseCode,
              yearSemester,
              faculty,
              preassignMarkers,
              requireMarkers,
              estimatedStudents,
              enrolledStudents,
              summary,
              minGrade,
              totalHours,
              appOpen,
              description,
              directorName,
              directorEmail,
              name,
              thumbnailId,
              markersNeeded,
              markersAssigned: value,
            };
            const result = onChange(modelFields);
            value = result?.markersAssigned ?? value;
          }
          if (errors.markersAssigned?.hasError) {
            runValidationTasks("markersAssigned", value);
          }
          setMarkersAssigned(value);
        }}
        onBlur={() => runValidationTasks("markersAssigned", markersAssigned)}
        errorMessage={errors.markersAssigned?.errorMessage}
        hasError={errors.markersAssigned?.hasError}
        {...getOverrideProps(overrides, "markersAssigned")}
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
          isDisabled={!(idProp || courseModelProp)}
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
              !(idProp || courseModelProp) ||
              Object.values(errors).some((e) => e?.hasError)
            }
            {...getOverrideProps(overrides, "SubmitButton")}
          ></Button>
        </Flex>
      </Flex>
    </Grid>
  );
}
