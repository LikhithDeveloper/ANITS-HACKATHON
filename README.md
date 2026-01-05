# Product Requirement Document (PRD): AI Agent for Resume Screening & Skill-Gap Analysis

## 1. Executive Summary

**Project Name:** TalentScout AI  
**Version:** 1.0  
**Status:** Draft  
**Target Audience:** HR Departments, Recruitment Agencies, Hiring Managers, Job Seekers  

**Overview:**  
TalentScout AI is an intelligent agent designed to automate the initial screening of candidate resumes against job descriptions (JDs). Beyond simple keyword matching, it leverages Large Language Models (LLMs) to perform semantic analysis, identifying true skill matches and providing a detailed "gap analysis" to highlight what a candidate is missing for a specific role.

---

## 2. Problem Statement

Recruiters and hiring managers are often overwhelmed by the sheer volume of applications for open positions. Manual screening presents several critical issues:
*   **Time Consumption:** Reviewing hundreds of resumes is manually intensive.
*   **Human Bias:** Unconscious bias can affect objective decision-making.
*   **Keyword Fatigue:** Traditional ATS (Applicant Tracking Systems) often reject good candidates because they miss specific keywords, even if the candidate describes the same skill differently.
*   **Lack of Feedback:** Candidates rarely receive constructive feedback on why they weren't selected, specifically regarding which skills they lacked.

---

## 3. Product Vision & Goals

**Vision:** To democratize fair and efficient hiring by providing an AI assistant that understands human potential beyond keywords.

**Core Goals:**
1.  **Efficiency:** Reduce time-to-shortlist by 80%.
2.  **Accuracy:** Improve match quality using semantic understanding rather than keyword counting.
3.  **Transparency:** Provide explainable AI insights on why a candidate was ranked high or low.
4.  **Empowerment:** Offer actionable skill-gap reports to help candidates or upskilling platforms understand training needs.

---

## 4. User Personas

| Persona | Needs | Pain Points |
| :--- | :--- | :--- |
| **Recruiter (Sarah)** | Needs to filter 500+ applicants for a Senior Dev role quickly. | "I spend hours reading resumes that are clearly unqualified." |
| **Hiring Manager (David)** | Needs to see *why* a candidate is a good fit, not just a score. | "I don't trust the ATS score; I need to know if they actually know System Design." |
| **Candidate (Alex)** | Wants to know why they were rejected and what to learn next. | "I apply and never hear back. I don't know if I lack experience or just missed a keyword." |

---

## 5. Functional Requirements

### 5.1. Job Description (JD) Parsing
*   **Input:** Users can upload a JD (PDF/Text) or paste a URL.
*   **Processing:** The agent extracts key requirements: Hard Skills, Soft Skills, Experience Level, Education, and "Nice-to-Haves".
*   **Output:** Structured JSON object representing the Ideal Candidate Profile.

### 5.2. Resume Parsing & Analysis
*   **Input:** Bulk upload of resumes (PDF, DOCX).
*   **Processing:**
    *   segment resume into Education, Experience, Skills, Projects.
    *   Handle various formats and layouts standard in the industry.
*   **Privacy:** PII (Personally Identifiable Information) redaction option for unbiased screening.

### 5.3. Semantic Matching Engine
*   **Vector Embeddings:** Convert both JD requirements and Resume segments into vector embeddings.
*   **Semantic Search:** Match candidates based on *context* (e.g., "created a REST API" matches "Backend Development" even if the exact term isn't used).
*   **Scoring:** Generate a match percentage (0-100%) based on weighted criteria (Skills 40%, Experience 30%, Education 10%, etc.).

### 5.4. Skill-Gap Analysis (The Differentiator)
*   **Gap Identification:** Explicitly list skills found in the JD but missing or weakly evidenced in the resume.
*   **Categorization:** Classify gaps as "Critical" (Must-have) vs "Optional" (Nice-to-have).
*   **Course Recommendation (Future):** Suggest learning resources for identified gaps.

### 5.5. Reporting & Dashboard
*   **Ranked List:** Display candidates sorted by match score.
*   **Detail View:** Click on a candidate to see the "Why?" – a summary of strengths and the specific skill gap analysis.
*   **Export:** Download reports in CSV/Excel.

---

## 6. Technical Architecture

### 6.1. Tech Stack
*   **Frontend:** React.js (Vite) / Next.js (for a responsive, modern dashboard).
*   **Backend:** Node.js with Express.js.
*   **AI/LLM:** 
    *   Google Gemini Pro / GPT-4o (via Node.js SDKs).
    *   LangChain.js for orchestration and embedding management.
*   **Database:** 
    *   MongoDB (Mongoose) for structured data (User info, Jobs).
    *   Pinecone / MongoDB Atlas Vector Search (for semantic matching).
*   **Orchestration:** LangChain.js for managing LLM flows.

### 6.2. Workflow
1.  **Ingest:** User uploads JD and Resumes.
2.  **Extract:** System parses text from documents.
3.  **Embed:** Resume chunks and JD requirements are vectorized.
4.  **Compare:** 
    *   *Step 1: Metric Check:* (Years of exp, degree) -> Filter.
    *   *Step 2: Semantic Check:* Vector similarity search.
    *   *Step 3: LLM Evaluation:* The LLM acts as the final judge to synthesize the "Gap Analysis".
5.  **Output:** JSON response sent to Frontend for visualization.

---

## 7. User Stories

1.  **As a Recruiter**, I want to upload a folder of 50 resumes and a single JD so that I can get a ranked list of the top 5 candidates in under a minute.
2.  **As a Hiring Manager**, I want to see a "Missing Skills" report for the top candidate so I know what to probe during the interview.
3.  **As an Administrator**, I want to adjust the weight of "Soft Skills" vs "Hard Skills" for different roles.

---

## 8. Non-Functional Requirements
*   **Scalability:** Must handle parsing 100+ resumes concurrently without timeout.
*   **Accuracy:** Resume parsing accuracy > 95%.
*   **Security:** Data encryption at rest and in transit. GDPR compliance for candidate data.
*   **Latency:** Max 5 seconds per resume for full analysis.

---
