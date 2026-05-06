// src/utils/calculations.js

export function calculateBMI(weight, heightFeet, heightInch) {
  const heightMeters = (heightFeet * 0.3048) + (heightInch * 0.0254);
  return (weight / (heightMeters * heightMeters)).toFixed(2);
}

export function calculateBMR(age, gender, weight, heightFeet, heightInch) {
  const heightCm = (heightFeet * 30.48) + (heightInch * 2.54);
  if (gender === "Male") {
    return (10 * weight + 6.25 * heightCm - 5 * age + 5).toFixed(2);
  } else {
    return (10 * weight + 6.25 * heightCm - 5 * age - 161).toFixed(2);
  }
}

export function calculateTDEE(bmr, intensity) {
  let factor = 1.2;
  if (intensity === "Low") factor = 1.375;
  else if (intensity === "Medium") factor = 1.55;
  else if (intensity === "High") factor = 1.725;
  return (bmr * factor).toFixed(2);
}

export function calculateMacros(tdee, goal) {
  let protein = 0.3, carbs = 0.5, fat = 0.2;
  if (goal.includes("Weight Loss")) {
    protein = 0.4; carbs = 0.4; fat = 0.2;
  } else if (goal.includes("Muscle Gain")) {
    protein = 0.35; carbs = 0.45; fat = 0.2;
  }
  return {
    protein: (tdee * protein / 4).toFixed(0) + " g",
    carbs: (tdee * carbs / 4).toFixed(0) + " g",
    fat: (tdee * fat / 9).toFixed(0) + " g"
  };
}
