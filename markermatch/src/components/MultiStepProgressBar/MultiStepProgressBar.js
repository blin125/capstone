import React from "react";
import "./MultiStepProgressBar.css";
import { ProgressBar, Step } from "react-step-progress-bar";

const MultiStepProgressBar = ({ step, onPageNumberClick }) => {
  const stepTexts = ["Documents", "Personal Details", "Courses"];
  const stepPercentage = [0, 50, 100];

  return (
    <div className="progress-container" style={{ paddingBottom: '20px' }}>
      <ProgressBar percent={stepPercentage[step - 1]}>
        {stepTexts.map((text, index) => (
          <Step key={index}>
            {({ accomplished }) => (
              <div
                className={`indexedStep ${accomplished ? "accomplished" : null}`}
                onClick={() => onPageNumberClick((index + 1).toString())}
              >
                {index + 1}
              </div>
            )}
          </Step>
        ))}
      </ProgressBar>
      <div className="stepTextContainer">
        {stepTexts.map((text, index) => (
          <div className="stepText" key={index}>
            {text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default MultiStepProgressBar;