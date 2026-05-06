import React from "react";
import { calculateBMI, calculateBMR, calculateTDEE, calculateMacros } from "../../utils/calculations";

function DietPlan() {
  const userName = localStorage.getItem("userName");
  const formData = JSON.parse(localStorage.getItem("formData"));

  if (!formData) return <p>Please submit your health goals first.</p>;

  const bmi = calculateBMI(formData.weight, formData.heightFeet, formData.heightInch);
  const bmr = calculateBMR(formData.age, formData.gender, formData.weight, formData.heightFeet, formData.heightInch);
  const tdee = calculateTDEE(bmr, formData.intensity);
  const macros = calculateMacros(tdee, formData.goals);

  return (
    <div className="diet-section">
      <h2>Diet Plan</h2>
      <p>Hello {userName}, based on your input:</p>
      <ul>
        <li>BMI: {bmi}</li>
        <li>BMR: {bmr} kcal/day</li>
        <li>TDEE (Calories Needed): {tdee} kcal/day</li>
        <li>Macronutrient Split: Protein {macros.protein}, Carbs {macros.carbs}, Fat {macros.fat}</li>
      </ul>
      <p>👉 Personalized Diet Plan will be recommended using ML/AI (Local + Cloud).</p>
    </div>
  );
}

export default DietPlan;
