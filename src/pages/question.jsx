import '../css/question.css'
const Question = () =>{
    return (<>
      <header>
        <h1>Cộng đồng Hỏi Đáp</h1>
      </header>
      <main>
        <div className="question">
          <i className="fas fa-question-circle"></i>
          <strong>Người Dùng 1:</strong>
          <p>Nguyên tắc cơ bản của lập trình là gì?</p>
        </div>
        <div className="question">
          <i className="fas fa-question-circle"></i>
          <strong>Người Dùng 2:</strong>
          <p>Làm thế nào để khai báo một biến trong JavaScript?</p>
        </div>
        <form>
          <label htmlFor="ask-question">Đặt câu hỏi mới:</label>
          <textarea id="ask-question" name="ask-question" rows="4" placeholder="Nhập câu hỏi của bạn"></textarea>
          <button type="submit">Gửi Câu Hỏi</button>
        </form>
      </main>
    </>)
}
export default Question;