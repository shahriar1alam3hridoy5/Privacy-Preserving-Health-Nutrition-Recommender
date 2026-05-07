import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js"; // ✅ Bootstrap JS import
import "./WelcomeSection.css";
import { auth, db } from "../../firebase";          // ✅ Firebase import
import { doc, getDoc } from "firebase/firestore";  // ✅ Firestore import

function WelcomeSection() {
  const [userName, setUserName] = useState("User");

   useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDocRef = doc(db, "users", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <div className="welcome-section">
      {/* Welcome Text */}
      <div className="text-center py-4">
        <h1 className="welcome-text">Welcome, {userName}</h1>
        <p className="tagline">✨ Your personalized health journey starts here ✨</p>
      </div>

      {/* Banner Carousel */}
      <div id="bannerCarousel" className="carousel slide" data-bs-ride="carousel" data-bs-interval="3000">
        <div className="carousel-inner">
          {/* Banner 1 */}
          <div className="carousel-item active">
            <img src="/banners/banner1.jpg" className="d-block w-100 banner-img" alt="Banner 1" />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
              <h2 className="banner-text">Eat Healthy, Stay Strong</h2>
            </div>
          </div>

          {/* Banner 2 */}
          <div className="carousel-item">
            <img src="/banners/banner2.jpg" className="d-block w-100 banner-img" alt="Banner 2" />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
              <h2 className="banner-text">Your Privacy, Your Health</h2>
            </div>
          </div>

          {/* Banner 3 */}
          <div className="carousel-item">
            <img src="/banners/banner3.jpg" className="d-block w-100 banner-img" alt="Banner 3" />
            <div className="carousel-caption d-flex flex-column justify-content-center align-items-center">
              <h2 className="banner-text">Smart AI, Better You</h2>
            </div>
          </div>
        </div>

        {/* Left/Right Arrows */}
        <button className="carousel-control-prev" type="button" data-bs-target="#bannerCarousel" data-bs-slide="prev">
          <span className="carousel-control-prev-icon"></span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#bannerCarousel" data-bs-slide="next">
          <span className="carousel-control-next-icon"></span>
        </button>
      </div>
    </div>
  );
}

export default WelcomeSection;
