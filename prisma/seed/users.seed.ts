import { PrismaClient, Role } from "@prisma/client";
import bcrypt from "bcryptjs";

export async function seedUsers(prisma: PrismaClient) {
  const adminPassword = await bcrypt.hash("Admin@12345", 10);
  const facultyPassword = await bcrypt.hash("Faculty@12345", 10);
  const studentPassword = await bcrypt.hash("Student@12345", 10);

  const admin = await prisma.user.create({
    data: {
      name: "Chief Administrator",
      email: "admin@eventelite.com",
      passwordHash: adminPassword,
      role: Role.ADMIN,
      phone: "+91 9876543210",
      department: "Administration",
      isActive: true,
    },
  });

  const faculty1 = await prisma.user.create({
    data: {
      name: "Dr. Rajesh Sharma",
      email: "faculty@eventelite.com",
      passwordHash: facultyPassword,
      role: Role.FACULTY,
      phone: "+91 9876543211",
      department: "Computer Science & Engineering",
      isActive: true,
    },
  });

  const student1 = await prisma.user.create({
    data: {
      name: "Aarav Patel",
      email: "student@eventelite.com",
      passwordHash: studentPassword,
      role: Role.STUDENT,
      rollNo: "2024-CS-042",
      studentClass: "B.Tech CSE - 6th Semester",
      fatherName: "Suresh Patel",
      phone: "+91 9876543220",
      department: "Computer Science",
      isActive: true,
    },
  });

  const student2 = await prisma.user.create({
    data: {
      name: "Riya Sharma",
      email: "riya@eventelite.com",
      passwordHash: studentPassword,
      role: Role.STUDENT,
      rollNo: "2024-CS-043",
      studentClass: "B.Tech CSE - 6th Semester",
      department: "Computer Science",
      isActive: true,
    },
  });

  console.log("👥 Seeded users (Admin, Faculty, Students).");
  return { admin, faculty1, student1, student2 };
}
