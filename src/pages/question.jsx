// Community.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/question.css';

const Community = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newAnswerContent, setNewAnswerContent] = useState('');
  const [username, setUsername] = useState('');
  const [showAnswers, setShowAnswers] = useState(false); // State to track whether to show answers

  useEffect(() => {
    // Fetch questions from the backend when the component mounts
    fetchQuestions();

    // Get the username from localStorage
    const storedUsername = localStorage.getItem('username');
    setUsername(storedUsername);
  }, []);

  const fetchQuestions = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/v1/questions');
      setQuestions(response.data);
    } catch (error) {
      console.error('Error fetching questions:', error);
    }
  };

  const fetchAnswers = async (questionId) => {
    try {
      const response = await axios.get(`http://localhost:8080/api/v1/questions/${questionId}/answers`);
      const updatedQuestions = questions.map((question) => {
        if (question.id === questionId) {
          question.answers = response.data;
        }
        return question;
      });
      setQuestions(updatedQuestions);
    } catch (error) {
      console.error('Error fetching answers:', error);
    }
  };

  const handleQuestionSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new question
      await axios.post('http://localhost:8080/api/v1/questions', {
        content: newQuestionContent,
        username: localStorage.getItem('username'), // Include the username in the request
        userid: localStorage.getItem('id')
      });

      // Fetch updated list of questions
      fetchQuestions();

      // Clear the input field
      setNewQuestionContent('');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleQuestionClick = (questionId) => {
    setSelectedQuestion(questionId);
    setShowAnswers(true); // Show answers when a question is clicked
    fetchAnswers(questionId);
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    try {
      // Send a POST request to create a new answer
      await axios.post(`http://localhost:8080/api/v1/questions/${selectedQuestion}/answers`, {
        content: newAnswerContent,
        // username: username, // Include the username in the request
        username:localStorage.getItem('username'),
        userid: localStorage.getItem('id')
      });

      // Fetch updated answers for the selected question
      fetchAnswers(selectedQuestion);
      // fetchAnswers();
      // Clear the input field
      setNewAnswerContent('');
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  };

  const handleToggleAnswers = () => {
    setShowAnswers(!showAnswers); // Toggle the state to show/hide answers
  };

  return (
    <div className="community-container">
      <h2>Diễn đàn thảo luận</h2>

      {/* Question Form */}
      <form onSubmit={handleQuestionSubmit}>
        <label>
          Tạo câu hỏi
          <input
            type="text"
            value={newQuestionContent}
            onChange={(e) => setNewQuestionContent(e.target.value)}
          />
        </label>
        <button type="submit">Xác nhận</button>
      </form>

      {/* List of Questions */}
      <ul>
        {questions.map((question) => (
          <li key={question.id}>
            {question.content} by {question.username}{' '}
            <button onClick={() => handleQuestionClick(question.id)}>Xem các câu trả lời</button>
            {selectedQuestion === question.id && showAnswers && (
              <div>
                {/* Answer Form */}
                <form onSubmit={handleAnswerSubmit}>
                  <label>
                    Your Answer:
                    <input
                      type="text"
                      value={newAnswerContent}
                      onChange={(e) => setNewAnswerContent(e.target.value)}
                    />
                  </label>
                  <button type="submit">Xác nhận</button>
                </form>
                <button onClick={handleToggleAnswers}>Đóng</button>

                {/* List of Answers */}
                <ul>
                  {question.answers &&
                    question.answers.map((answer) => (
                      <li key={answer.id}>{answer.content} by {answer.username}</li>
                    ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;
