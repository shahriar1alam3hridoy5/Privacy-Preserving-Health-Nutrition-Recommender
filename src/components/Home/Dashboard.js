import React, { useState } from "react";
import HealthGoalForm from "./HealthGoalForm";

function Dashboard() {
  const [recommendation, setRecommendation] = useState(null);

  const handleFormSubmit = (data) => {
    // ✅ Simple calculation demo
    const heightM = data.height / 100;
    const bmi = (data.weight / (heightM * heightM)).toFixed(2);
    const calorie = (10 * data.weight + 6.25 * data.height - 5 * data.age + (data.gender === "Male" ? 5 : -161)).toFixed(0);

    setRecommendation({
      bmi,
      calorie,
      goals: data.goals,
      diet: data.diet,
      workout: data.workout,
      intensity: data.intensity,
    });
  };

  return (
    <div className="dashboard">
      <HealthGoalForm onSubmit={handleFormSubmit} />

      {recommendation && (
        <div className="recommendation">
          <h2>📊 Your Health Report</h2>
          <p><b>BMI:</b> {recommendation.bmi}</p>
          <p><b>Calorie Need:</b> {recommendation.calorie} kcal/day</p>
          <p><b>Goals:</b> {recommendation.goals.join(", ")}</p>

          <h3>🍎 Personalized Diet Plan</h3>
          <p>Based on your goal ({recommendation.goals.join(", ")}), we recommend a {recommendation.diet} diet with balanced macros.</p>

          <h3>💪 Personalized Exercise Plan</h3>
          <p>Workout Type: {recommendation.workout}</p>
          <p>Intensity: {recommendation.intensity}</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
