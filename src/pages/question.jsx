import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../css/question.css';

const Community = () => {
  const [questions, setQuestions] = useState([]);
  const [newQuestionContent, setNewQuestionContent] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [newAnswerContent, setNewAnswerContent] = useState('');
  const [newReplyContent, setNewReplyContent] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [username, setUsername] = useState('');
  const [showAnswers, setShowAnswers] = useState(false);

  useEffect(() => {
    fetchQuestions();

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
      await axios.post('http://localhost:8080/api/v1/questions', {
        content: newQuestionContent,
        username: localStorage.getItem('username'),
        userid: localStorage.getItem('id')
      });

      fetchQuestions();

      setNewQuestionContent('');
    } catch (error) {
      console.error('Error creating question:', error);
    }
  };

  const handleQuestionClick = (questionId) => {
    if (selectedQuestion === questionId) {
      setSelectedQuestion(null);
      setShowAnswers(false);
    } else {
      setSelectedQuestion(questionId);
      setShowAnswers(true);
      fetchAnswers(questionId);
    }
  };

  const handleAnswerSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post(`http://localhost:8080/api/v1/questions/${selectedQuestion}/answers`, {
        content: newAnswerContent,
        username: localStorage.getItem('username'),
        userid: localStorage.getItem('id')
      });

      fetchAnswers(selectedQuestion);

      setNewAnswerContent('');
    } catch (error) {
      console.error('Error creating answer:', error);
    }
  };

  const handleReplySubmit = async (e, answerId) => {
    e.preventDefault();
  
    try {
      // Gửi POST request để tạo câu trả lời mới cho câu trả lời của câu hỏi đã chọn
      await axios.post(`http://localhost:8080/api/v1/questions/${selectedQuestion}/answers`, {
        content: newReplyContent,
        username: localStorage.getItem('username'),
        userid: localStorage.getItem('id')
      });
  
      // Lấy danh sách câu trả lời mới cho câu hỏi được chọn
      fetchAnswers(selectedQuestion);
  
      // Xóa trường input
      setNewReplyContent('');
    } catch (error) {
      console.error('Lỗi khi tạo câu trả lời:', error);
    }
  };

  const handleToggleAnswers = () => {
    setSelectedQuestion(null);
    setSelectedAnswer(null);
    setShowAnswers(false);
  };

  const handleReplyClick = (answerId) => {
    if (selectedAnswer === answerId) {
      setSelectedAnswer(null);
    } else {
      setSelectedAnswer(answerId);
    }
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
           
            <div className='nguoidung'>
            <img
                alt="User"
                src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                className="rounded-circle img-responsive mt-2"
                width="50"
                height="50"
              />
              <div>
              {question.username}
              <p className="cauhoi">{question.content}</p>
              {!showAnswers && (
              <button className='xemcautraloi' onClick={() => handleQuestionClick(question.id)}>Xem các câu trả lời</button>
          
          )}
          
          {selectedQuestion === question.id && showAnswers && (
              <div>
                {/* Answer Form */}
            

                {/* List of Answers */}
                <ul>
                  {question.answers &&
                    question.answers.map((answer) => (
                      <li key={answer.id}>
                        <div className='nguoidungtraloi'>
                          <img
                            alt="User"
                            src="https://www.shutterstock.com/image-vector/user-profile-icon-vector-avatar-600nw-2247726673.jpg"
                            className="rounded-circle img-responsive mt-2"
                            width="50"
                            height="50"
                          />
                          <div>
                          {answer.username}

                          <p className='cautraloi'>{answer.content}</p>
                        {!showAnswers && (
                          <button onClick={() => handleReplyClick(answer.id)}>Trả lời</button>
                        )}
                         <button onClick={() => handleReplyClick(answer.id)}>Trả lời</button>
                        
                          </div>
                        </div>
                      
                       
                         {selectedAnswer === answer.id && (
          <div>
            {/* Reply Form */}
            <form onSubmit={(e) => handleReplySubmit(e, answer.id)}>
              <label>
                Câu trả lời của bạn:
                <input
                  type="text"
                  value={newReplyContent}
                  onChange={(e) => setNewReplyContent(e.target.value)}
                />
              </label>
              <button type="submit">Trả lời</button>
            </form>

          {/* List of Replies */}
          <ul className="replies">
              {answer.replies &&
                answer.replies.map((reply) => (
                  <li key={reply.id}>
                    <p>{reply.content}</p>
                  </li>
                ))}
            </ul>
                          </div>
                        )}
                      </li>
                    ))}
                </ul>
                <div className='cautraloicuaban'>
             <form onSubmit={handleAnswerSubmit}>
                  <label>
                  Câu trả lời của bạn1:
                    <input
                      type="text"
                      value={newAnswerContent}
                      onChange={(e) => setNewAnswerContent(e.target.value)}
                    />
                  </label>

                  <button style={{ marginLeft: '500px' }} type="submit">Xác nhận</button>
                <button style={{ marginLeft: '20px' }}  onClick={handleToggleAnswers}>Đóng</button>

                </form>
             </div>
              </div>
            )}
              </div>
            </div>
            <br />

           

          </li>
        ))}
      </ul>
    </div>
  );
};

export default Community;
