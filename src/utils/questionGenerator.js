// Simulates AI question generation
// In production, this would call an actual AI API (OpenAI, Gemini, etc.)

// Programming topics and their languages
const programmingTopics = {
  javascript: "javascript",
  js: "javascript",
  typescript: "typescript",
  ts: "typescript",
  python: "python",
  java: "java",
  "c++": "cpp",
  cpp: "cpp",
  "c#": "csharp",
  csharp: "csharp",
  react: "jsx",
  css: "css",
  sql: "sql",
};

// Check if topic is programming-related
const isProgrammingTopic = (topic) => {
  const lowerTopic = topic.toLowerCase();
  return Object.keys(programmingTopics).some((key) => lowerTopic.includes(key));
};

// Get programming language from topic
const getLanguage = (topic) => {
  const lowerTopic = topic.toLowerCase();
  for (const [key, lang] of Object.entries(programmingTopics)) {
    if (lowerTopic.includes(key)) {
      return lang;
    }
  }
  return "javascript";
};

// Programming question templates with code
const programmingQuestionTemplates = {
  javascript: [
    {
      question:
        "What will be the output of the following code?\n\n```javascript\nconst arr = [1, 2, 3, 4, 5];\nconst result = arr.map(x => x * 2).filter(x => x > 5);\nconsole.log(result);\n```",
      options: ["[6, 8, 10]", "[2, 4, 6, 8, 10]", "[3, 4, 5]", "[10, 8, 6]"],
      correctAnswer: "[6, 8, 10]",
    },
    {
      question:
        "What does the following function return?\n\n```javascript\nfunction mystery(num) {\n  return num === 0 ? 1 : num * mystery(num - 1);\n}\nmystery(5);\n```",
      options: ["120", "25", "15", "Error"],
      correctAnswer: "120",
    },
    {
      question:
        "What will `result` be?\n\n```javascript\nconst obj = { a: 1, b: 2 };\nconst { a, ...rest } = obj;\nconst result = rest;\n```",
      options: ["{ b: 2 }", "{ a: 1, b: 2 }", "{ a: 1 }", "undefined"],
      correctAnswer: "{ b: 2 }",
    },
    {
      question:
        "What's the output?\n\n```javascript\nconst promise = new Promise((resolve) => {\n  setTimeout(() => resolve('Done'), 100);\n});\npromise.then(console.log);\nconsole.log('Start');\n```",
      options: [
        "'Start' then 'Done'",
        "'Done' then 'Start'",
        "'Done'",
        "Error",
      ],
      correctAnswer: "'Start' then 'Done'",
    },
    {
      question:
        "Which statement about this code is correct?\n\n```javascript\nconst nums = [1, 2, 3];\nnums.push(4);\n```",
      options: [
        "Array is modified, length is 4",
        "Error: cannot modify const",
        "Creates new array",
        "Returns undefined",
      ],
      correctAnswer: "Array is modified, length is 4",
    },
  ],
  python: [
    {
      question:
        "What will be printed?\n\n```python\ndef func(x, y=[]):\n    y.append(x)\n    return y\n\nprint(func(1))\nprint(func(2))\n```",
      options: ["[1] then [2]", "[1] then [1, 2]", "[2]", "Error"],
      correctAnswer: "[1] then [1, 2]",
    },
    {
      question:
        "What's the result?\n\n```python\nnums = [1, 2, 3, 4, 5]\nresult = [x**2 for x in nums if x % 2 == 0]\nprint(result)\n```",
      options: ["[4, 16]", "[1, 4, 9, 16, 25]", "[2, 4]", "[1, 9, 25]"],
      correctAnswer: "[4, 16]",
    },
  ],
};

// Regular non-programming templates
const questionTemplates = {
  "Multiple Choice (4 options)": [
    {
      question: "What is the primary purpose of {topic}?",
      options: [
        "To provide functionality A",
        "To provide functionality B",
        "To provide functionality C",
        "To provide functionality D",
      ],
      correctAnswer: "To provide functionality A",
    },
    {
      question: "Which of the following best describes {topic}?",
      options: [
        "Description A",
        "Description B",
        "Description C",
        "Description D",
      ],
      correctAnswer: "Description B",
    },
    {
      question: "When should you use {topic}?",
      options: [
        "In scenario A",
        "In scenario B",
        "In scenario C",
        "In scenario D",
      ],
      correctAnswer: "In scenario C",
    },
    {
      question: "What is a key advantage of {topic}?",
      options: ["Advantage A", "Advantage B", "Advantage C", "Advantage D"],
      correctAnswer: "Advantage B",
    },
  ],
  "Multiple Choice (3 options)": [
    {
      question: "What is the main concept behind {topic}?",
      options: ["Concept A", "Concept B", "Concept C"],
      correctAnswer: "Concept B",
    },
    {
      question: "Which statement about {topic} is correct?",
      options: ["Statement A", "Statement B", "Statement C"],
      correctAnswer: "Statement A",
    },
  ],
  "True/False": [
    {
      question: "{topic} is essential for modern applications.",
      options: ["True", "False"],
      correctAnswer: "True",
    },
    {
      question: "{topic} was first introduced in the 1990s.",
      options: ["True", "False"],
      correctAnswer: "False",
    },
    {
      question: "{topic} can be implemented without any prerequisites.",
      options: ["True", "False"],
      correctAnswer: "False",
    },
  ],
  "Yes/No": [
    {
      question: "Is {topic} commonly used in professional development?",
      options: ["Yes", "No"],
      correctAnswer: "Yes",
    },
    {
      question: "Does {topic} require advanced knowledge to understand?",
      options: ["Yes", "No"],
      correctAnswer: "No",
    },
  ],
};

export const generateQuestions = (topic, numberOfQuestions, questionType) => {
  const questions = [];
  const isProgramming = isProgrammingTopic(topic);
  const language = isProgramming ? getLanguage(topic) : null;

  // Use programming templates if it's a programming topic
  if (isProgramming && programmingQuestionTemplates[language]) {
    const progTemplates = programmingQuestionTemplates[language];

    // Mix programming questions with concept questions
    for (let i = 0; i < numberOfQuestions; i++) {
      let template;

      // 70% programming questions, 30% concept questions
      if (i % 10 < 7 && progTemplates.length > 0) {
        template = progTemplates[i % progTemplates.length];
      } else {
        const conceptTemplates =
          questionTemplates[questionType] ||
          questionTemplates["Multiple Choice (4 options)"];
        template = conceptTemplates[i % conceptTemplates.length];
        template = {
          ...template,
          question: template.question.replace("{topic}", topic),
        };
      }

      questions.push({
        id: `q${i + 1}`,
        questionText: template.question,
        questionType,
        options: [...template.options],
        correctAnswer: template.correctAnswer,
        userAnswer: null,
        isCorrect: false,
        order: i + 1,
      });
    }
  } else {
    // Use regular templates for non-programming topics
    const templates =
      questionTemplates[questionType] ||
      questionTemplates["Multiple Choice (4 options)"];

    for (let i = 0; i < numberOfQuestions; i++) {
      const template = templates[i % templates.length];
      const questionText = template.question.replace("{topic}", topic);

      questions.push({
        id: `q${i + 1}`,
        questionText,
        questionType,
        options: [...template.options],
        correctAnswer: template.correctAnswer,
        userAnswer: null,
        isCorrect: false,
        order: i + 1,
      });
    }
  }

  return questions;
};
