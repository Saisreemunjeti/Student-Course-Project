# Student Course Enrollment Project

Project Overview

The Student Course Enrollment Project is a full-stack web application for managing courses and student enrollments. Students can view available courses, enroll in them, and access course materials like PDFs and videos. Admins can manage courses and upload course content.

This project demonstrates a real-world online learning platform workflow.

---

## **Features**

### **Frontend (React)**

* User registration and login
* Display available courses with details
* Enroll in courses
* Show enrolled courses in dashboard
* API integration with backend using Axios

### **Backend (Spring Boot)**

* User management (students and admins)
* Course management (add, update, delete)
* File uploads for PDFs and videos
* Enrollment management (prevent duplicate enrollment)
* REST APIs for frontend integration
* Database support (H2, MySQL, or PostgreSQL)

### **Admin Features**

* Add new courses
* Update existing courses
* Delete courses
* Upload course PDFs/videos
* Filter courses for interview kits or resume templates

---

## **Tech Stack**

* **Frontend:** React, JavaScript, Axios, CSS
* **Backend:** Spring Boot, Java, JPA/Hibernate
* **Database:** H2 (for testing) / MySQL / PostgreSQL
* **File Storage:** Local storage (`uploads/courses`)
* **Version Control:** Git & GitHub

---

## **Project Structure**

```
student-course-enrollment/
│
├─ frontend/              # React frontend
│  ├─ src/
│  │  ├─ pages/
│  │  ├─ services/
│  │  └─ App.jsx
│  └─ package.json
│
├─ backend/               # Spring Boot backend
│  ├─ src/main/java/com/enrollment/studentEnrollment/
│  │  ├─ controller/
│  │  ├─ model/
│  │  ├─ repository/
│  │  └─ StudentEnrollmentApplication.java
│  └─ pom.xml
│
└─ README.md
```

---

## **How It Works**

1. Students register or login via frontend.
2. Frontend fetches courses from backend using REST APIs.
3. Students can enroll in courses; backend validates and stores enrollments.
4. Admin can manage courses and upload course materials.
5. Enrolled courses are displayed in student dashboard.

---

## **Setup Instructions**

### **Frontend**

1. Navigate to frontend folder:

   ```bash
   cd student-course-enrollment/student-project
   ```
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the frontend server:

   ```bash
   npm start
   ```

   Frontend runs on `http://localhost:3000`.

### **Backend**

1. Navigate to backend folder:

   ```bash
   cd student-course-enrollment/studentEnrollment
   ```
2. Build and run the Spring Boot application (using STS or command line):

   ```bash
   mvn spring-boot:run
   ```

   Backend runs on `http://localhost:8080`.

---

## **APIs Overview**

* **Courses**

  * `GET /api/courses/all` → Get all courses
  * `POST /api/courses/add` → Add a new course
  * `PUT /api/courses/{id}` → Update course
  * `DELETE /api/courses/{id}` → Delete course
  * `POST /api/courses/{id}/upload` → Upload PDF/video
* **Enrollments**

  * `POST /api/enrollments` → Enroll a student
  * `GET /api/enrollments/student/{studentId}` → Get student's enrollments
* **Users**

  * `POST /api/auth/register` → Register student
  * `POST /api/auth/login` → Login student/admin

---

Author

Saisree Munjeti
Email: saisreemunjeti@gmail.com

GitHub: https://github.com/Saisreemunjeti
