# MCQ Generator Application - Technical Specifications

## Project Overview

An AI-powered Multiple Choice Question (MCQ) generator application that allows users to create, take, and review tests based on topics of their choice. The application leverages AI to automatically generate questions based on user-defined parameters.

---

## Table of Contents

1. [Core Features](#core-features)
2. [User Authentication](#user-authentication)
3. [Dashboard](#dashboard)
4. [Test Creation](#test-creation)
5. [Test Taking Interface](#test-taking-interface)
6. [Test Results](#test-results)
7. [User Stories](#user-stories)
8. [Technical Requirements](#technical-requirements)
9. [UI/UX Requirements](#uiux-requirements)
10. [Data Models](#data-models)

---

## Core Features

### 1. User Authentication

### 2. Dashboard Management

### 3. AI-Powered Test Creation

### 4. Interactive Test Taking

### 5. Comprehensive Results Review

---

## User Authentication

### Login Flow

- **Fields Required:**
  - Username
  - Password (implied)
- **Actions:**
  - Login button
- **Post-Login:**
  - Navigate to Dashboard

### Signup Flow

- **Fields Required:**
  - Username
  - Email
  - Emoji (unique user identifier/avatar)
- **Actions:**
  - Create account
- **Post-Signup:**
  - Navigate to Dashboard or Login

### Technical Considerations

- Secure authentication mechanism
- Session management
- Password encryption (if applicable)
- Email validation
- Username uniqueness validation

---

## Dashboard

### Purpose

Central hub for managing all user tests and initiating new test creation.

### Components

#### Header Section

- **"Create Test" Button**
  - Primary action button positioned at the top
  - Opens modal for test creation
  - Should be prominently displayed

#### Test List View

- **Display:** All tests created by the user
- **Information per test:**
  - Test topic
  - Date created
  - Number of questions
  - Test duration
  - Status (completed/in-progress/pending)
  - Score (if completed)
- **Actions:**
  - View test details
  - Start test (if not completed)
  - View results (if completed)
  - Delete test (optional)
  - Edit test (optional)

### Layout Considerations

- Responsive grid or list layout
- Search/filter functionality (optional enhancement)
- Sorting options (by date, topic, score)
- Pagination for large test lists

---

## Test Creation

### Modal/Form Interface

Opens when user clicks "Create Test" button from the dashboard.

### Required Input Fields

#### 1. Topic

- **Type:** Text input
- **Description:** Subject matter for the test
- **Validation:** Non-empty, reasonable character limit
- **Example:** "World War II History", "JavaScript Arrays", "Human Anatomy"

#### 2. Number of Questions

- **Type:** Number input or dropdown
- **Description:** Total questions to be generated
- **Options:** Suggested range (5, 10, 15, 20, 25, 30)
- **Validation:** Minimum 1, maximum depending on system capabilities

#### 3. Question Type

- **Type:** Dropdown or radio buttons
- **Options:**
  - Yes/No questions
  - Multiple choice (with 4 options)
  - True/False
  - Multiple choice (with 3 options)
  - Other variants as needed
- **Description:** Format of questions to be generated

#### 4. Test Duration/Timing

- **Type:** Time input (minutes) or time picker
- **Description:** Total time allocated for the test
- **Options:** Suggested durations (10, 15, 20, 30, 45, 60 minutes)
- **Validation:** Reasonable time range

### Modal Actions

- **Create:** Submit test parameters to AI for question generation
- **Cancel:** Close modal without creating test

### AI Integration Point

- Parameters collected from form sent to AI service
- AI generates MCQs based on:
  - Topic
  - Number of questions
  - Question type
  - Difficulty level (optional future enhancement)
- Response contains generated questions with answers
- Store test in database with generated content

---

## Test Taking Interface

### Layout Structure

#### Top Section - Timer

- **Display:** Countdown timer
- **Format:** MM:SS (e.g., 15:00 for 15 minutes)
- **Behavior:**
  - Starts when test begins
  - Counts down to 00:00
  - Visual warning when time is running low (e.g., last 2 minutes in red)
  - Auto-submit when time reaches 00:00

#### Center Section - Question Display

- **Display:** One question at a time
- **Components:**
  - Question number (e.g., "Question 1 of 20")
  - Question text
  - Answer options (based on question type)
    - Radio buttons for single choice
    - Checkboxes for multiple choice (if applicable)
  - Clear visual indication of selected answer

#### Right Section - Question Navigator

- **Display:** All questions as numbered buttons
- **Format:** `[1] [2] [3] [4] ... [20]`
- **States:**
  - Default: Not visited (gray or light color)
  - Visited: User has viewed the question (different color)
  - Answered: User has selected an answer (highlighted - e.g., blue)
  - Current: Currently displayed question (distinct highlight - e.g., bold border)
- **Interaction:**
  - Click any button to jump to that question
  - Scroll if many questions

#### Bottom Section - Navigation Controls

- **Previous Button**
  - Goes to previous question in sequence
  - Disabled on Question 1
- **Next Button**
  - Goes to next question in sequence
  - Changes to "Submit Test" on last question
- **Submit Test Button**
  - Appears on last question (or always visible)
  - Confirmation dialog before submission
  - "Are you sure you want to submit? You have X unanswered questions."

### Technical Considerations

- State management for:
  - Current question index
  - Answered questions tracking
  - User's selected answers
  - Timer state
- Auto-save functionality (optional enhancement)
- Warning on browser close/refresh
- Accessibility considerations (keyboard navigation)

---

## Test Results

### Triggering Events

- User clicks "Submit Test"
- Timer reaches 00:00 (auto-submit)

### Post-Submission Actions

1. Stop timer
2. Calculate score
3. Navigate to Results Page
4. Test marked as completed in database

### Results Page Layout

#### Header Summary

- **Display:**
  - Total score (e.g., "15/20" or "75%")
  - Test topic
  - Time taken
  - Date completed
  - Pass/Fail status (if applicable)

#### Scrolling Question Review

- **Display:** All questions in a scrollable list
- **Per Question Display:**
  - Question number
  - Question text
  - Answer options
  - User's selected answer
  - Correct answer
  - Result indicator

#### Visual Indicators

- **Correct Answers:**
  - Background color: Green
  - Icon: ✓ checkmark
  - Highlight user's selection in green
- **Incorrect Answers:**
  - Background color: Red highlight on user's wrong answer
  - Icon: ✗ cross
  - Show correct answer in green alongside
  - Clear differentiation between what was selected vs. what was correct

#### Actions

- **Return to Dashboard** button
- **Retake Test** button (optional)
- **Share Results** (optional enhancement)
- **Print/Export Results** (optional enhancement)

### Technical Considerations

- Calculate correct/incorrect answers
- Store results in database
- Generate results summary
- Responsive layout for long content

---

## User Stories

### As a User:

1. **Authentication**
   - I want to sign up with my username, email, and emoji so I can create a personalized account
   - I want to log in with my username so I can access my tests

2. **Dashboard**
   - I want to see all my created tests so I can track my learning progress
   - I want to click "Create Test" so I can generate a new test

3. **Test Creation**
   - I want to enter a topic so the AI can generate relevant questions
   - I want to specify the number of questions so I can control test length
   - I want to choose question types so the test matches my learning style
   - I want to set a time limit so I can challenge myself

4. **Taking Tests**
   - I want to see one question at a time so I can focus
   - I want to see a countdown timer so I know how much time I have left
   - I want to navigate between questions easily so I can review my answers
   - I want to see which questions I've answered so I don't miss any
   - I want to submit my test when I'm done so I can see my results

5. **Results**
   - I want to see my score immediately after submission
   - I want to review all questions with correct answers so I can learn from mistakes
   - I want to see correct answers in green and wrong answers in red for quick visual feedback
   - I want to return to the dashboard to take more tests

---

## Technical Requirements

### Frontend

- **Framework:** React, Vue, or Angular (to be decided)
- **State Management:** Redux, Vuex, or Context API
- **Routing:** React Router or equivalent
- **UI Library:** Material-UI, Ant Design, or custom components
- **Styling:** CSS/SCSS/Styled-components/Tailwind

### Backend

- **API:** RESTful or GraphQL
- **Authentication:** JWT or session-based
- **AI Integration:** OpenAI API, Google Gemini, or similar
- **Database:** MongoDB, PostgreSQL, or Firebase

### Data Persistence

- User accounts
- Test configurations
- Generated questions and answers
- User responses
- Test results and scores
- Test history

### Security

- Secure password storage
- Protected API endpoints
- Input validation and sanitization
- Rate limiting for AI API calls

---

## UI/UX Requirements

### Responsive Design

- Mobile-friendly interface
- Tablet optimization
- Desktop experience

### Accessibility

- ARIA labels for screen readers
- Keyboard navigation support
- Color contrast compliance (WCAG)
- Focus indicators

### Performance

- Fast page load times
- Smooth transitions
- Optimized AI API calls
- Efficient state management

### User Experience

- Clear visual hierarchy
- Intuitive navigation
- Loading states for AI generation
- Error handling and user feedback
- Confirmation dialogs for destructive actions

---

## Data Models

### User

```javascript
{
  id: string,
  username: string,
  email: string,
  emoji: string,
  createdAt: timestamp,
  tests: [Test]
}
```

### Test

```javascript
{
  id: string,
  userId: string,
  topic: string,
  numberOfQuestions: number,
  questionType: string,
  duration: number, // in minutes
  questions: [Question],
  status: string, // 'pending', 'in-progress', 'completed'
  createdAt: timestamp,
  startedAt: timestamp,
  completedAt: timestamp,
  score: number,
  timeSpent: number
}
```

### Question

```javascript
{
  id: string,
  testId: string,
  questionText: string,
  questionType: string,
  options: [string], // for multiple choice
  correctAnswer: string | [string],
  userAnswer: string | [string],
  isCorrect: boolean,
  order: number
}
```

### TestResult

```javascript
{
  id: string,
  testId: string,
  userId: string,
  score: number,
  totalQuestions: number,
  correctAnswers: number,
  incorrectAnswers: number,
  timeSpent: number,
  completedAt: timestamp
}
```

---

## Implementation Phases

### Phase 1: MVP

- User authentication (login/signup)
- Basic dashboard
- Test creation with AI integration
- Test taking interface
- Basic results display

### Phase 2: Enhancements

- Improved UI/UX
- Question navigator highlighting
- Auto-save functionality
- Test history and analytics
- Search and filter in dashboard

### Phase 3: Advanced Features

- Multiple difficulty levels
- Question explanations
- Study mode (no timer, hints)
- Performance analytics
- Social features (sharing, leaderboards)
- Multiple test templates

---

## Notes and Considerations

1. **AI API Rate Limits:** Consider implementing caching or question banks to reduce API calls
2. **Test Integrity:** Implement measures to prevent cheating (tab switching detection, etc.)
3. **Data Privacy:** Ensure user data and test results are properly secured
4. **Scalability:** Design database schema for efficient querying with many users
5. **Error Handling:** Graceful handling of AI API failures, network issues
6. **Loading States:** Clear feedback during AI question generation (may take several seconds)
7. **Browser Compatibility:** Test across major browsers
8. **Offline Mode:** Consider PWA capabilities for offline test taking (future enhancement)

---

## Success Metrics

- User engagement (tests created per user)
- Completion rate (tests started vs. finished)
- User satisfaction scores
- AI question quality feedback
- System performance (response times, uptime)

---

_Last Updated: April 6, 2026_
