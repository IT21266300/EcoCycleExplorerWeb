# EcoCycle Explorer  

**AI-Driven Approach for Sustainable Bicycle Tourism Development in Sri Lanka**  

EcoCycle Explorer is an innovative Android mobile application designed to revolutionize sustainable bicycle tourism in Sri Lanka. Leveraging artificial intelligence, the app ensures enhanced user safety, optimized routes, and immersive experiences while promoting eco-friendly tourism. A key component of the project is the integration of a machine learning (ML) model for hazard detection, utilizing real-time mobile phone sensor data.  

---

## Table of Contents  

1. [Overview](#overview)  
2. [Features](#features)  
3. [System Architecture](#system-architecture)  
4. [Technologies and Dependencies](#technologies-and-dependencies)  
5. [How It Works](#how-it-works)  

---

## Overview  

### Project ID:  
24-25J-217  

### Supervisors:  
- Dr. Samantha Rajapaksha  
- Mr. Nelum Chathuranga Amarasena  

### Team Members:  
- Bandara K.M.V.T. (Team Leader)  
- Bandara R.M.D.L.  
- Chandrasena H.M.K.G.J.K  
- Kumara M.G.S.D  

### Objective:  
To develop an AI-driven mobile application to:  
- Enhance sustainable bicycle tourism in Sri Lanka.  
- Provide real-time hazard detection and route optimization using ML models.  
- Deliver an immersive cycling experience integrating eco-friendly and culturally rich elements.  

---

## Features  

### Core Features:  
1. **AI-Driven Route Optimization**  
   - Personalized routes based on user preferences, weather conditions, and road hazards.  

2. **Hazard Detection (ML-Based)**  
   - Real-time detection of dangerous road bends, sandy surfaces, and other hazards using mobile phone sensors.  

3. **Voice-Guided Navigation**  
   - Multilingual voice assistance for safe and hands-free navigation.  

4. **3D Audio Immersion**  
   - Adaptive audio environment based on user behavior, such as heartbeat sounds for speed warnings or forest sounds during scenic rides.  

5. **Safety Notifications**  
   - Alerts cyclists about dangers ahead and hazards detected by other users on the same route.  

6. **Health Monitoring**  
   - Tracks vital signs and provides emergency notifications in case of abnormal readings.  

7. **Cultural Integration**  
   - Highlights eco-friendly routes and culturally significant landmarks.  

---

## System Architecture  

![System Architecture](image.png)  

The architecture integrates:  
- Machine learning models for hazard detection using real-time sensor data.  
- AI-based route optimization engines.  
- APIs for real-time weather and navigation data.  
- Adaptive audio technology for immersive cycling experiences.  

---

## Technologies and Dependencies  

### Programming Languages and Frameworks:  
- **Python**: AI and backend development.  
- **JavaScript**: Frontend and mobile app development.  
- **React Native**: For building cross-platform mobile applications.  
- **Node.js**: Backend framework.  

### Machine Learning:  
- **TensorFlow**: For training and deploying ML models.  
- **OpenCV**: For real-time hazard analysis.  

### Data and APIs:
- **Google Maps API**: For route planning and navigation.
- **OpenWeatherMap**: For real-time weather updates.
- **Kaggle Datasets**: For training AI models.

### Database and Storage:  
- **MongoDB**: For user data and app metadata storage.  

---

## How It Works  

### **Hazard Detection Using Mobile Sensors**  
- Real-time mobile phone sensor data (accelerometer, gyroscope, and GPS) is fed into a custom-trained ML model.  
- The model identifies potential hazards such as dangerous road bends, sandy roads, or steep slopes.  
- Cyclists are alerted via voice notifications and 3D adaptive audio to ensure proactive safety measures.  

### **Safety Enhancements**  
- An algorithm analyzes sensor data from nearby cyclists to detect and relay alerts about road dangers.  
- Alerts are shared with cyclists further behind to prevent accidents.   

### **Route Optimization and Navigation**  
- AI algorithms dynamically calculate the most efficient and safe routes.  
- Factors like road conditions, real-time weather, and user preferences are considered.  

### **Cultural and Eco-Friendly Integration**  
- Routes are designed to include eco-friendly paths and culturally significant landmarks, fostering sustainable tourism.  

---

## Conclusion  

EcoCycle Explorer combines cutting-edge AI and ML technologies with real-time sensor data to ensure safe, immersive, and sustainable bicycle tourism. Its innovative hazard detection system and adaptive audio features set a new standard for eco-friendly travel experiences.  
