import React from "react";
import { calculateBMI, calculateBMR, calculateTDEE, calculateMacros } from "../../utils/calculations";


function ExercisePlan() {
  const userName = localStorage.getItem("userName");
  const formData = JSON.parse(localStorage.getItem("formData"));

  if (!formData) return <p>Please submit your health goals first.</p>;

  const bmi = calculateBMI(formData.weight, formData.heightFeet, formData.heightInch);
  const bmr = calculateBMR(formData.age, formData.gender, formData.weight, formData.heightFeet, formData.heightInch);
  const tdee = calculateTDEE(bmr, formData.intensity);

  return (
    <div className="exercise-section">
      <h2>Exercise Plan</h2>
      <p>Hello {userName}, based on your input:</p>
      <ul>
        <li>BMI: {bmi}</li>
        <li>BMR: {bmr}</li>
        <li>TDEE: {tdee}</li>
        <li>Exercise Intensity: {formData.intensity}</li>
      </ul>
      <p>👉 Personalized Exercise Plan will be recommended using ML/AI (Local + Cloud).</p>
    </div>
  );
}

export default ExercisePlan;
