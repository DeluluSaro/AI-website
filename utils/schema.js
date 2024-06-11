import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";
import { Ratio } from "lucide-react";

export const MockInterview = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResp: text("jsonMockResp").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDesc: varchar("jobDesc").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdAt: varchar("createdAt").notNull(),
  createdBy: varchar("createdby").notNull(),
  mockId: varchar("mockId").notNull(),
});

export const UserAnswer = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockId: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAns: varchar("correctAns").notNull(),
  userAns: varchar("userAns"),
  feedback: varchar("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail"),
  createdAt: varchar("createdAt"),
});
