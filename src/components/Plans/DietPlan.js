import React, { useEffect, useState }  from "react";
import { auth, db } from "../../firebase";
import { doc, getDoc } from "firebase/firestore";
import { calculateBMI, calculateBMR, calculateTDEE, calculateMacros } from "../../utils/calculations";

function DietPlan() {
  const [formData, setFormData] = useState(null);   // 👉 change হয়েছে
  const [userName, setUserName] = useState("");     // 👉 change হয়েছে

  useEffect(() => {
    const fetchData = async () => {
      const localData = JSON.parse(localStorage.getItem("formData"));
      const user = auth.currentUser;
      if (localData && localData.privacy === "Local") {   
        setFormData(localData);   
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
