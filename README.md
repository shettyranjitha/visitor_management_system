# Visitor Management System (VMS)

A **web-based Visitor Management System** that helps organizations record, track, and manage visitors efficiently.  
The system includes **Admin**, **Host**, and **Visitor** modules — ensuring secure and seamless visitor entry management.

---

## 🚀 Key Features

### 🧑‍💼 Admin Module
- Secure **Admin Login**
- Manage all hosts and visitors
- Add or remove hosts
- Monitor visitor activity in real-time

### 👩‍💻 Host Module
- Secure **Host Login**
- View all assigned visitor requests
- **Approve or reject** visitor entries
- On approval, the system **automatically sends email notifications** to both the **Host** and **Visitor**

### 🙋 Visitor Module
- **No login required**
- Directly fill the visitor registration form
- Once submitted, the request is sent to the corresponding host for approval
- Receive an **email confirmation** after approval

---

## 💌 Email Notification Feature

- Uses **Nodemailer** to send automatic email updates.  
- When a host approves a visitor request:
  - The **Visitor** receives an email confirmation with visit details.  
  - The **Host** also receives an email notification of the approval.  

---

## 🧩 Tech Stack

| Area | Technologies |
|------|---------------|
| Frontend | HTML5, CSS3, JavaScript |
| Backend | Node.js, Express.js |
| Database | MongoDB |
| Other Tools | Nodemailer, dotenv, bcrypt, JWT |

---



