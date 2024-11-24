# Course Selling App Backend

A Node.js-based backend application for managing users, courses, and purchases. The system supports user authentication, course creation, and purchase functionality. This is ideal for educational platforms looking to manage courses and users effectively.

---

## **Features**

- **User Management**:  
  - Users can sign up and log in.  
  - Retrieve purchased courses for logged-in users.

- **Admin Management**:  
  - Admins can sign up and log in.  
  - Create, update, and fetch courses created by admins.  

- **Course Management**:  
  - View all courses.  
  - Purchase courses by users.

- **Authentication**:  
  - Uses JSON Web Tokens (JWT) for secure authentication.  

---

## **Prerequisites**

Ensure you have the following installed:

- Node.js (v16 or above)  
- MongoDB  

---

## **Getting Started**

### **1. Clone the repository**
```bash
git clone https://github.com/Shantanupokale/course-selling-app.git
cd course-selling-app
```

### **2. Install Dependencies**
```bash
npm install
```

### **3. Set Up Environment Variables**
Create a `.env` file in the project root with the following values:

```env
MONGO_URL=<Your MongoDB Connection URL>
JWT_USER_PASSWORD=<Your JWT Secret for Users>
JWT_ADMIN_PASSWORD=<Your JWT Secret for Admins>
```

### **4. Run the Application**
Start the server:
```bash
node index.js
```

The app will start listening on **http://localhost:3000**.

---

## **API Endpoints**

### **User Routes (`/api/v1/user`)**

1. **Sign Up**  
   **POST** `/signup`  
   **Body**:  
   ```json
   {
       "email": "user@example.com",
       "password": "password",
       "firstName": "John",
       "lastName": "Doe"
   }
   ```

2. **Sign In**  
   **POST** `/signin`  
   **Body**:  
   ```json
   {
       "email": "user@example.com",
       "password": "password"
   }
   ```

3. **View Purchases**  
   **GET** `/purchases`  
   **Headers**:  
   ```json
   {
       "token": "<JWT Token>"
   }
   ```

---

### **Admin Routes (`/api/v1/admin`)**

1. **Sign Up**  
   **POST** `/signup`  
   **Body**:  
   ```json
   {
       "email": "admin@example.com",
       "password": "password",
       "firstName": "Jane",
       "lastName": "Smith"
   }
   ```

2. **Sign In**  
   **POST** `/signin`  
   **Body**:  
   ```json
   {
       "email": "admin@example.com",
       "password": "password"
   }
   ```

3. **Update Course**  
   **PUT** `/course`  
   **Body**:  
   ```json
   {
       "title": "New Course Title",
       "description": "Updated description",
       "price": 100,
       "imageUrl": "https://example.com/image.jpg",
       "courseId": "<Course ID>"
   }
   ```

4. **Fetch All Courses**  
   **GET** `/course/bulk`  

---

### **Course Routes (`/api/v1/course`)**

1. **Purchase Course**  
   **POST** `/purchase`  
   **Headers**:  
   ```json
   {
       "token": "<JWT Token>"
   }
   ```  
   **Body**:  
   ```json
   {
       "courseId": "<Course ID>"
   }
   ```

2. **Preview Courses**  
   **GET** `/preview`  

---

## **Database Models**

1. **User**  
   ```json
   {
       "email": "string",
       "password": "string",
       "firstName": "string",
       "lastName": "string"
   }
   ```

2. **Admin**  
   ```json
   {
       "email": "string",
       "password": "string",
       "firstName": "string",
       "lastName": "string"
   }
   ```

3. **Course**  
   ```json
   {
       "title": "string",
       "description": "string",
       "price": "number",
       "imageUrl": "string",
       "creatorId": "ObjectId"
   }
   ```

4. **Purchase**  
   ```json
   {
       "userId": "ObjectId",
       "courseId": "ObjectId"
   }
   ```

---

## **Middleware**

1. **User Middleware**: Verifies JWT tokens for user routes.  
2. **Admin Middleware**: Verifies JWT tokens for admin routes.  

---

## **Future Improvements**

- Add payment gateway integration for course purchases.  
- Implement detailed logging and error handling.  
- Enhance course filtering and search capabilities.

---

Feel free to contribute and enhance this project! 🎉
