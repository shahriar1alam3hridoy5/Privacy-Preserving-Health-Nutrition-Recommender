import React, { useState } from "react";
import "./HealthGoalForm.css";
import { auth, db } from "../../firebase";   
import { doc, setDoc } from "firebase/firestore";
import { calculateBMI, calculateBMR, calculateTDEE, calculateMacros } from "../../utils/calculations"; 

function HealthGoalForm({ onSubmit }) {
  const [formData, setFormData] = useState({
    age: "",
    gender: "",
    heightFeet: "",
    heightInch: "",
    weight: "",
    goals: [],
    diet: "",
    workout: "",
    duration: "",
    intensity: "",
    privacy: "Local",
    shareOptions: {
      bmi: false,
      calorie: false,
      goals: false,
      diet: false,
      exercise: false,
    }
  });

  const handleChange = (e) => {
    const { name, value, checked } = e.target;
    if (name === "goals") {
      let newGoals = [...formData.goals];
      if (checked) newGoals.push(value);
      else newGoals = newGoals.filter((g) => g !== value);
      setFormData({ ...formData, goals: newGoals });
    } else if (name.startsWith("share_")) {
      const key = name.replace("share_", "");
      setFormData({
        ...formData,
        shareOptions: { ...formData.shareOptions, [key]: checked }
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = auth.currentUser;

    const rawData = { ...formData };   // 👉 change হয়েছে

    // Calculations
    const bmi = calculateBMI(formData.weight, formData.heightFeet, formData.heightInch);   // 👉 change হয়েছে
    const bmr = calculateBMR(formData.age, formData.gender, formData.weight, formData.heightFeet, formData.heightInch);   // 👉 change হয়েছে
    const tdee = calculateTDEE(bmr, formData.intensity);   // 👉 change হয়েছে
    const macros = calculateMacros(tdee, formData.goals);   

    const finalData = {   // 👉 change হয়েছে
      userId: user.uid,
      ...rawData,
      bmi,
      bmr,
      tdee,
      macros,
      createdAt: new Date(),
    };
    localStorage.setItem("formData", JSON.stringify(finalData)); // ✅ Save data
    

  
    // Cloud save (Firestore)
    if (user && formData.privacy === "Cloud") {   // 👉 change হয়েছে
      await setDoc(doc(db, "healthGoals", user.uid), finalData);   // 👉 change হয়েছে
    }
    onSubmit(finalData);
    alert("Please check DietPlan and ExercisePlan");
  };

  return (
    <div className="dashboard-container">
      {/* Left Side Form */}
      <div className="form-section">
        <h2 className="form-title">Health Goal Input</h2>
        <form onSubmit={handleSubmit}>
          {/* Basic Info */}
          <div className="form-group">
            <label>Age</label>
            <input type="number" name="age" value={formData.age} onChange={handleChange} />
          </div>
          <div className="form-group">
            <label>Gender</label>
            <select name="gender" value={formData.gender} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>
          <div className="form-group">
            <label>Height</label>
            <div className="height-inputs">
              <input type="number" name="heightFeet" placeholder="Feet" value={formData.heightFeet} onChange={handleChange} />
              <input type="number" name="heightInch" placeholder="Inch" value={formData.heightInch} onChange={handleChange} />
            </div>
          </div>
          <div className="form-group">
            <label>Weight (kg)</label>
            <input type="number" name="weight" value={formData.weight} onChange={handleChange} />
          </div>

          {/* Health Goals */}
          <div className="form-group goals-section">
            <label>Health Goals</label>
            <div className="goal-options">
              <div className="goal-row">
                <span>Weight Loss</span>
                <input type="checkbox" name="goals" value="Weight Loss" onChange={handleChange}/>
              </div>
              <div className="goal-row">
                <span>Muscle Gain</span>
                <input type="checkbox" name="goals" value="Muscle Gain" onChange={handleChange}/>
              </div>
              <div className="goal-row">
                <span>Balanced Diet</span>
                <input type="checkbox" name="goals" value="Balanced Diet" onChange={handleChange}/>
              </div>
              <div className="goal-row">
                <span>Fitness Maintenance</span>
                <input type="checkbox" name="goals" value="Fitness Maintenance" onChange={handleChange}/>
              </div>
            </div>
          </div>

          {/* Exercise Preferences */}
          <div className="form-group">
            <label>Workout Type</label>
            <select name="workout" value={formData.workout} onChange={handleChange}>
              <option value="">None</option>
              <option value="Cardio">Cardio</option>
              <option value="Strength">Strength</option>
              <option value="Yoga">Yoga</option>
              <option value="Mixed">Mixed</option>
              <option value="Other">Other (Write Below)</option>
            </select>
            {formData.workout === "Other" && (
              <input type="text" name="workout" placeholder="Write your workout type"
              value={formData.workoutOther || ""} onChange={handleChange} />
            )}
          </div>

          <div className="form-group">
            <label>Duration (minutes/day)</label>
            <select name="duration" value={formData.duration} onChange={handleChange}>
              <option value="">None</option>
              <option value="15">15 min</option>
              <option value="30">30 min</option>
              <option value="45">45 min</option>
              <option value="60">60 min</option>
            </select>
          </div>

          <div className="form-group">
            <label>Intensity</label>
            <select name="intensity" value={formData.intensity} onChange={handleChange}>
              <option value="">Select</option>
              <option value="Low">Low (Light exercise)</option>
              <option value="Medium">Medium (Moderate exercise)</option>
              <option value="High">High (Intense exercise)</option>
            </select>
          </div>

          {/* Data Sharing Section */}
          <div className="form-group">
            <label>Data Sharing</label>
            <select name="privacy" value={formData.privacy} onChange={handleChange}>
              <option value="Local">Local Only (Save in device)</option>
              <option value="Cloud">Cloud (Share all data)</option>
              <option value="Custom">User Control (Select options)</option>
            </select>
          </div>

          {formData.privacy === "Custom" && (
            <div className="form-group share-options">
              <label>Select Data to Share:</label>
              <label><input type="checkbox" name="share_bmi" onChange={handleChange}/> BMI</label>
              <label><input type="checkbox" name="share_calorie" onChange={handleChange}/> Calorie Stats</label>
              <label><input type="checkbox" name="share_goals" onChange={handleChange}/> Health Goals</label>
              <label><input type="checkbox" name="share_diet" onChange={handleChange}/> Diet Preferences</label>
              <label><input type="checkbox" name="share_exercise" onChange={handleChange}/> Exercise Preferences</label>
              <p className="recommend-note">👉 Recommendation: BMI & Calorie stats are important for better AI suggestions.</p>
            </div>
          )}

          <button type="submit" className="btn btn-success">Submit</button>
        </form>
      </div>

      {/* Right Side Images + Motivation */}
      <div className="image-section">
        <div className="motivation-block">
          <img src="/images/motivation1.jpg" alt="Motivation 1" className="side-image" />
          <p>"Stay strong, every step counts!"</p>
        </div>
        <div className="motivation-block">
          <img src="/images/motivation2.jpg" alt="Motivation 2" className="side-image" />
          <p>"Healthy choices build a healthy future."</p>
        </div>
        <div className="motivation-block">
          <img src="/images/motivation3.jpg" alt="Motivation 3" className="side-image" />
          <p>"Consistency beats intensity every time."</p>
        </div>
        <div className="motivation-block">
          <img src="/images/motivation4.jpg" alt="Motivation 4" className="side-image" />
          <p>"Your body achieves what your mind believes."</p>
        </div>
      </div>
    </div>
  );
}

export default HealthGoalForm;
