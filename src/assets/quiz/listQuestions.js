const quiz = {
    questions: [
      {
        question: "What is the capital of France?",
        answers: [
          { text: "London", correct: false },
          { text: "Paris", correct: true },
          { text: "Berlin", correct: false },
          { text: "Madrid", correct: false }
        ]
      },
      {
        question: "What is the largest planet in our solar system?",
        answers: [
          { text: "Jupiter", correct: true },
          { text: "Mars", correct: false },
          { text: "Venus", correct: false },
          { text: "Neptune", correct: false }
        ]
      },
      {
        question: "Who wrote the novel 'To Kill a Mockingbird'?",
        answers: [
          { text: "Harper Lee", correct: true },
          { text: "F. Scott Fitzgerald", correct: false },
          { text: "William Faulkner", correct: false },
          { text: "Ernest Hemingway", correct: false }
        ]
      },
    ]
  };

export default quiz;