import React, { useEffect, useState } from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { calculateBMI, calculateBMR, calculateTDEE, calculateMacros } from "../../utils/calculations";


function ExercisePlan() {
  const [formData, setFormData] = useState(null);  
  const [userName, setUserName] = useState("");   
  useEffect(() => {   
    const fetchData = async () => {   
      const localData = JSON.parse(localStorage.getItem("formData"));  
      const user = auth.currentUser;   

      if (localData && localData.privacy === "Local") {   
        setFormData(localData);   // 👉 change হয়েছে
        setUserName(localStorage.getItem("userName"));   
      } else if (user && localData && localData.privacy === "Cloud") {   
        const goalDoc = await getDoc(doc(db, "healthGoals", user.uid));   
        if (goalDoc.exists()) {   
          setFormData(goalDoc.data());   
          setUserName(user.email);   
        }
      }
    };
    fetchData();  
  }, []);   

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
