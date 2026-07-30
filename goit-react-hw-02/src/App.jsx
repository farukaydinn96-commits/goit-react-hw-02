import { useState, useEffect } from "react";
import Description from "./components/Description/Description";
import Options from "./components/Options/Options";
import Feedback from "./components/Feedback/Feedback";
import Notification from "./components/Notification/Notification";
import "./App.css";

const App = () => {
  // 1. LocalStorage'dan veri okuma ve State başlatma
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem("feedback-state");
    if (savedFeedback) {
      return JSON.parse(savedFeedback);
    }
    return { good: 0, neutral: 0, bad: 0 };
  });

  // 2. State her değiştiğinde LocalStorage'a yazma
  useEffect(() => {
    localStorage.setItem("feedback-state", JSON.stringify(feedback));
  }, [feedback]);

  // 3. Oyları artıran fonksiyon
  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  // 4. Oyları sıfırlayan fonksiyon
  const resetFeedback = () => {
    setFeedback({ good: 0, neutral: 0, bad: 0 });
  };

  // 5. Toplam oy ve pozitif yüzdesini hesaplama
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  const positivePercentage =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  return (
    <div>
      <Description />

      <Options
        updateFeedback={updateFeedback}
        totalFeedback={totalFeedback}
        resetFeedback={resetFeedback}
      />

      {/* Koşullu Render: Toplam oy 0'dan büyükse istatistikleri, değilse mesajı göster */}
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          total={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
};

export default App;
