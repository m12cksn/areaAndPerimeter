import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

const TIMER = 25; // 25 seconds per question

// 20 questions: counting & simple addition/subtraction up to 10
const QUESTIONS = [
  {
    id: 1,
    type: "mcq",
    title: "Count the rockets",
    text: "🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀 🚀",
    options: ["8", "9", "10", "11"],
    correct: "9",
    explanation: "There are 9 rockets.",
  },
  {
    id: 2,
    type: "mcq",
    title: "Add the fruits",
    text: "🍎🍎🍎🍎 + 🍌🍌🍌 = ?",
    options: ["6", "7", "8", "9"],
    correct: "7",
    explanation: "4 + 3 = 7.",
  },
  {
    id: 3,
    type: "mcq",
    title: "Count the animals",
    text: "🐶🐶🐶🐶🐶 🐱🐱🐱🐱",
    options: ["8", "9", "10", "11"],
    correct: "9",
    explanation: "5 dogs + 4 cats = 9.",
  },
  {
    id: 4,
    type: "mcq",
    title: "Make 12",
    text: "⭐ ⭐ ⭐ ⭐ ⭐ + ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ ⭐ = ?",
    options: ["11", "12", "13", "14"],
    correct: "12",
    explanation: "5 + 7 = 12.",
  },
  {
    id: 5,
    type: "mcq",
    title: "Big subtraction",
    text: "🍪🍪🍪🍪🍪🍪🍪🍪🍪🍪 🍪🍪 − 🍪🍪🍪 = ?",
    options: ["7", "8", "9", "10"],
    correct: "9",
    explanation: "12 − 3 = 9.",
  },
  {
    id: 6,
    type: "mcq",
    title: "Which is 15?",
    text: "Tap the group with 15 objects",
    options: [
      "🦆🦆🦆🦆🦆🦆🦆🦆🦆🦆",
      "🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟",
      "🍓🍓🍓🍓🍓🍓🍓🍓",
      "⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽⚽",
    ],
    correct: "🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟🐟",
    explanation: "The fish group shows 15.",
  },
  {
    id: 7,
    type: "mcq",
    title: "Double add",
    text: "3 + 4 + 5 = ?",
    options: ["10", "11", "12", "13"],
    correct: "12",
    explanation: "3 + 4 = 7, 7 + 5 = 12.",
  },
  {
    id: 8,
    type: "mcq",
    title: "Count the hearts",
    text: "❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️ ❤️",
    options: ["11", "12", "13", "14"],
    correct: "13",
    explanation: "There are 13 hearts.",
  },
  {
    id: 9,
    type: "mcq",
    title: "Missing to 15",
    text: "10 + ? = 15",
    options: ["3", "4", "5", "6"],
    correct: "5",
    explanation: "10 + 5 = 15.",
  },
  {
    id: 10,
    type: "mcq",
    title: "Three-step count",
    text: "🐸🐸🐸🐸 🐸🐸 🐸🐸🐸",
    options: ["7", "8", "9", "10"],
    correct: "9",
    explanation: "4 + 2 + 3 = 9.",
  },
  {
    id: 11,
    type: "mcq",
    title: "Subtract carefully",
    text: "15 − 7 = ?",
    options: ["6", "7", "8", "9"],
    correct: "8",
    explanation: "15 − 7 = 8.",
  },
  {
    id: 12,
    type: "mcq",
    title: "Which is bigger?",
    text: "Compare: 🧸🧸🧸🧸🧸🧸🧸🧸  vs  🪀🪀🪀🪀🪀🪀🪀🪀🪀",
    options: ["Left bigger", "Right bigger", "Same", "Cannot tell"],
    correct: "Right bigger",
    explanation: "Left has 8, right has 9.",
  },
  {
    id: 13,
    type: "mcq",
    title: "Make 14",
    text: "9 + ? = 14",
    options: ["4", "5", "6", "7"],
    correct: "5",
    explanation: "9 + 5 = 14.",
  },
  {
    id: 14,
    type: "mcq",
    title: "Visual subtraction",
    text: "🚗🚗🚗🚗🚗🚗🚗🚗🚗🚗 🚗🚗🚗🚗 − 🚗🚗🚗 = ?",
    options: ["7", "8", "9", "10"],
    correct: "11",
    explanation: "14 − 3 = 11.",
  },
  {
    id: 15,
    type: "mcq",
    title: "Final challenge",
    text: "🐠🐠🐠 + 🐠🐠🐠🐠 + 🐠🐠🐠🐠🐠 = ?",
    options: ["11", "12", "13", "14"],
    correct: "12",
    explanation: "3 + 4 + 5 = 12.",
  },
  {
    id: 16,
    type: "mcq",
    title: "Which shows 14?",
    text: "Pick the correct group",
    options: [
      "🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉",
      "🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉",
      "🍉🍉🍉🍉🍉🍉🍉🍉",
      "🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉",
    ],
    correct: "🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉🍉",
    explanation: "This group has 14 watermelons.",
  },
  {
    id: 17,
    type: "mcq",
    title: "Add to 15",
    text: "8 + 7 = ?",
    options: ["13", "14", "15", "16"],
    correct: "15",
    explanation: "8 + 7 = 15.",
  },
  {
    id: 18,
    type: "mcq",
    title: "Tiny difference",
    text: "15 − 14 = ?",
    options: ["0", "1", "2", "3"],
    correct: "1",
    explanation: "15 − 14 = 1.",
  },
  {
    id: 19,
    type: "mcq",
    title: "Mixed objects",
    text: "⚽⚽⚽⚽⚽ ⚾⚾⚾⚾⚾⚾",
    options: ["10", "11", "12", "13"],
    correct: "11",
    explanation: "5 + 6 = 11.",
  },
  {
    id: 20,
    type: "mcq",
    title: "Last big count",
    text: "🌟🌟🌟🌟🌟🌟🌟🌟 🌟🌟🌟🌟🌟🌟🌟",
    options: ["13", "14", "15", "16"],
    correct: "15",
    explanation: "8 + 7 = 15.",
  },
];

export default function App() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [completed, setCompleted] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const [timeLeft, setTimeLeft] = useState(TIMER);
  const [timerKey, setTimerKey] = useState(0); // to restart timer even if index stays 0

  const q = QUESTIONS[index];

  useEffect(() => {
    if (showResults) return;

    setTimeLeft(TIMER);
    const id = setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          clearInterval(id);
          handleTimeUp();
          return 0;
        }
        return t - 1;
      });
    }, 1000);

    return () => clearInterval(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, showResults, timerKey]);

  function handleTimeUp() {
    toast("Time's up! Back to question 1 ⏰", { icon: "⏰" });
    setTimerKey((k) => k + 1);
    setIndex(0);
  }

  function showCorrectToast() {
    toast.success("Great job! ✅");
    setFeedbackStatus("correct");
    setTimeout(() => setFeedbackStatus(null), 700);
  }

  function showWrongToast() {
    toast.error("Try again! 😊");
    setFeedbackStatus("wrong");
    setShakeKey((k) => k + 1);
    setTimeout(() => setFeedbackStatus(null), 700);
  }

  function handleSubmit() {
    const user = answers[q.id];

    if (user === undefined || user === null || user === "") {
      toast("Please tap an answer 💡");
      return;
    }

    const ok =
      String(user).trim().toLowerCase() ===
      String(q.correct).trim().toLowerCase();

    if (ok) {
      setCompleted((c) => ({ ...c, [q.id]: true }));
      showCorrectToast();
      setTimeout(() => {
        if (index < QUESTIONS.length - 1) {
          setIndex(index + 1);
        } else {
          setShowResults(true);
        }
      }, 600);
    } else {
      showWrongToast();
    }
  }

  function canOpenQuestion(targetIndex) {
    if (targetIndex === 0) return true;
    for (let i = 0; i < targetIndex; i++) {
      const id = QUESTIONS[i].id;
      if (!completed[id]) return false;
    }
    return true;
  }

  const totalCorrect = Object.values(completed).filter(Boolean).length;

  const pageVariants = {
    initial: { opacity: 0, scale: 0.95, y: 20 },
    animate: { opacity: 1, scale: 1, y: 0 },
    exit: { opacity: 0, scale: 0.95, y: -20 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-900 via-slate-900 to-indigo-900 text-slate-100 px-3 py-4 sm:p-6">
      <Toaster position="top-center" />
      <div className="max-w-xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-4 sm:mb-6 gap-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <motion.div
              initial={{ rotate: -10, scale: 0.9 }}
              animate={{ rotate: 10, scale: 1 }}
              transition={{
                repeat: Infinity,
                repeatType: "reverse",
                duration: 1.5,
              }}
              className="text-2xl sm:text-3xl"
            >
              🧠
            </motion.div>
            <div className="leading-tight">
              <h1 className="text-lg sm:text-2xl font-bold">
                Bimbel Iwan Trial Class
              </h1>
              <p className="text-[11px] sm:text-xs text-slate-300">
                Tap the answer before the time runs out!
              </p>
            </div>
          </div>
          <div className="text-[11px] sm:text-sm text-right">
            <div className="font-semibold">
              Progress: {totalCorrect}/{QUESTIONS.length}
            </div>
            <div className="text-slate-300">
              Q {index + 1} / {QUESTIONS.length}
            </div>
          </div>
        </header>

        {/* Timer bar */}
        {!showResults && (
          <div className="mb-3 sm:mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-[10px] sm:text-xs uppercase tracking-wide text-slate-300">
                Time Left
              </span>
              <span className="text-xs sm:text-sm font-semibold">
                {timeLeft}s
              </span>
            </div>
            <div className="w-full h-2 sm:h-2.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                style={{ width: `${(timeLeft / TIMER) * 100}%` }}
                className="h-full bg-lime-400 transition-[width] duration-1000"
              ></div>
            </div>
          </div>
        )}

        {/* Navigation bubbles */}
        <nav className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 flex-wrap justify-center">
          {QUESTIONS.map((qq, i) => {
            const locked = !canOpenQuestion(i);
            const isCurrent = i === index && !showResults;
            const done = !!completed[qq.id];

            return (
              <button
                key={qq.id}
                onClick={() => {
                  if (showResults) return;
                  if (!canOpenQuestion(i)) {
                    toast("Finish the earlier questions first 🔒");
                    return;
                  }
                  setIndex(i);
                }}
                className={[
                  "w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-[10px] sm:text-xs font-bold border transition-colors",
                  isCurrent
                    ? "bg-pink-500 border-pink-300 text-white"
                    : done
                    ? "bg-emerald-500/30 border-emerald-300 text-emerald-100"
                    : locked
                    ? "bg-slate-800 border-slate-700 text-slate-500"
                    : "bg-slate-800 border-slate-600 text-slate-100",
                ].join(" ")}
              >
                {i + 1}
              </button>
            );
          })}
        </nav>

        {/* Main Card */}
        <div className="bg-slate-900/80 rounded-3xl shadow-2xl p-4 sm:p-6 border border-slate-700/60">
          {!showResults ? (
            <AnimatePresence mode="wait">
              <motion.div
                key={index + "-" + (shakeKey || 0)}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.25 }}
                className={`relative ${
                  feedbackStatus === "wrong" ? "animate-[shake_0.5s]" : ""
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h2 className="text-[11px] sm:text-sm font-semibold text-slate-300">
                    Question {index + 1}
                  </h2>
                  <motion.div
                    initial={{ scale: 0.9 }}
                    animate={{ scale: 1.1 }}
                    transition={{
                      repeat: Infinity,
                      repeatType: "reverse",
                      duration: 1,
                    }}
                    className="text-xl sm:text-2xl"
                  >
                    🎮
                  </motion.div>
                </div>

                <h3 className="font-bold text-lg sm:text-xl mb-1 sm:mb-2">
                  {q.title}
                </h3>
                <p className="mb-4 text-slate-100 text-2xl sm:text-3xl text-center break-words">
                  {q.text}
                </p>

                {/* Options */}
                <div className="space-y-2.5 sm:space-y-3">
                  {q.options.map((opt) => {
                    const selected = answers[q.id] === opt;
                    return (
                      <motion.button
                        key={opt}
                        whileTap={{ scale: 0.96 }}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [q.id]: opt }))
                        }
                        className={`block w-full max-w-full text-center px-3 py-2.5 sm:px-4 sm:py-3 rounded-2xl border text-lg sm:text-xl font-bold tracking-wide transition-colors ${
                          selected
                            ? "bg-lime-400 text-slate-900 border-lime-300"
                            : "bg-slate-800 text-slate-100 border-slate-700 hover:bg-slate-700"
                        }`}
                      >
                        {opt}
                      </motion.button>
                    );
                  })}
                </div>

                {/* Controls */}
                <div className="mt-5 sm:mt-6 flex items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => index > 0 && setIndex(index - 1)}
                    className="px-3 py-2 sm:px-4 sm:py-2 border rounded-2xl bg-slate-800 text-[11px] sm:text-sm"
                    disabled={index === 0}
                  >
                    ◀ Back
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 sm:px-6 sm:py-2 bg-pink-500 hover:bg-pink-400 text-white rounded-2xl text-[11px] sm:text-sm font-semibold shadow-lg shadow-pink-500/30"
                  >
                    Submit ✅
                  </button>

                  <button
                    onClick={() => {
                      setShowResults(true);
                    }}
                    className="ml-auto px-3 py-2 sm:px-4 sm:py-2 bg-slate-800 rounded-2xl text-[11px] sm:text-sm"
                  >
                    Finish Now
                  </button>
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            // Results
            <div className="text-center">
              <h2 className="text-xl sm:text-2xl font-bold mb-2">
                Great Work! 🎉
              </h2>
              <p className="mb-1 text-sm sm:text-base">
                You answered <strong>{totalCorrect}</strong> out of{" "}
                <strong>{QUESTIONS.length}</strong> questions correctly.
              </p>
              <p className="mb-3 sm:mb-4 text-base sm:text-lg">
                Score:{" "}
                <strong>
                  {Math.round((totalCorrect / QUESTIONS.length) * 100)}%
                </strong>
              </p>

              {totalCorrect >= 18 ? (
                <p className="text-xl sm:text-2xl text-emerald-400 font-bold">
                  Amazing math hero! 🌟
                </p>
              ) : totalCorrect >= 12 ? (
                <p className="text-xl sm:text-2xl text-sky-300 font-bold">
                  Good job! Keep going! 🚀
                </p>
              ) : (
                <p className="text-xl sm:text-2xl text-rose-300 font-bold">
                  You're learning! Try again 💪
                </p>
              )}

              <div className="mt-5 sm:mt-6 flex gap-3 justify-center">
                <button
                  onClick={() => {
                    setAnswers({});
                    setCompleted({});
                    setIndex(0);
                    setShowResults(false);
                    setTimerKey((k) => k + 1);
                    toast("Let's try again! 🎲");
                  }}
                  className="px-5 py-2 border rounded-2xl bg-slate-800 text-sm"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* shake keyframes */}
      <style>{`
        @keyframes shake {
          0% { transform: translateX(0); }
          10% { transform: translateX(-8px); }
          20% { transform: translateX(8px); }
          30% { transform: translateX(-6px); }
          40% { transform: translateX(6px); }
          50% { transform: translateX(-4px); }
          60% { transform: translateX(4px); }
          70% { transform: translateX(-2px); }
          80% { transform: translateX(2px); }
          100% { transform: translateX(0); }
        }
        .animate-[shake_0.5s] { animation: shake 0.5s; }
      `}</style>
    </div>
  );
}
