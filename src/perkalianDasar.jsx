import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const DATA = {
  title: "Perkalian Dasar (1–5 x 1–10)",
  description: "Latihan perkalian dasar untuk angka 1–5 dikali 1–10.",
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      question: "Jika 4 × ? = 28, maka ? = ...",
      choices: ["5", "6", "7", "8"],
      answer: "7",
      explanation: "28 ÷ 4 = 7.",
    },
    {
      id: "q2",
      type: "multiple_choice",
      question: "Nilai 5 × 7 dapat dihitung sebagai 5 × (5 + 2) = ...",
      choices: ["25", "27", "35", "45"],
      answer: "35",
      explanation: "5 × (5 + 2) = 25 + 10 = 35.",
    },
    {
      id: "q3",
      type: "multiple_choice",
      question: "Manakah yang nilainya sama dengan 3 × 8?",
      choices: ["3 × 6 + 3 × 2", "3 × 10 − 3 × 4", "3 × 7 − 3", "3 × 5 + 5"],
      answer: "3 × 6 + 3 × 2",
      explanation: "3 × 6 + 3 × 2 = 18 + 6 = 24.",
    },
    {
      id: "q4",
      type: "multiple_choice",
      question: "Jika 2 × 9 = 18, maka 2 × 10 − 2 × 1 = ...",
      choices: ["16", "18", "20", "22"],
      answer: "18",
      explanation: "2 × 10 − 2 × 1 = 20 − 2 = 18.",
    },
    {
      id: "q5",
      type: "multiple_choice",
      question: "Hasil 5 × 6 lebih besar dari 4 × 7 sebesar ...",
      choices: ["2", "4", "6", "8"],
      answer: "2",
      explanation: "5 × 6 = 30 dan 4 × 7 = 28, selisih 2.",
    },
    {
      id: "q6",
      type: "multiple_choice",
      question: "Jika 3 × 5 = 15, maka 3 × 6 = ...",
      choices: ["16", "17", "18", "19"],
      answer: "18",
      explanation: "Tambah 3 karena naik satu kali: 15 + 3 = 18.",
    },
    {
      id: "q7",
      type: "multiple_choice",
      question: "Manakah yang benar?",
      choices: ["5 × 8 = 4 × 10", "5 × 8 = 5 × 7 + 2", "5 × 8 = 5 × 4", "5 × 8 = 6 × 8"],
      answer: "5 × 8 = 4 × 10",
      explanation: "5 × 8 = 40 dan 4 × 10 = 40.",
    },
    {
      id: "q8",
      type: "multiple_choice",
      question: "Jika 4 × 9 = 36, maka 4 × 8 = ...",
      choices: ["28", "30", "32", "34"],
      answer: "32",
      explanation: "Turun satu kali 4: 36 − 4 = 32.",
    },
    {
      id: "q9",
      type: "multiple_choice",
      question: "Nilai 2 × 7 + 2 × 3 sama dengan ...",
      choices: ["2 × 9", "2 × 10", "2 × 11", "2 × 12"],
      answer: "2 × 10",
      explanation: "2 × 7 + 2 × 3 = 2 × (7 + 3) = 2 × 10.",
    },
    {
      id: "q10",
      type: "multiple_choice",
      question: "Bilangan yang membuat 5 × ? = 45 adalah ...",
      choices: ["7", "8", "9", "10"],
      answer: "9",
      explanation: "45 ÷ 5 = 9.",
    },
    {
      id: "q11",
      type: "multiple_choice",
      question: "Jika 3 × 9 = 27, maka 3 × 9 + 3 × 1 = ...",
      choices: ["27", "28", "29", "30"],
      answer: "30",
      explanation: "3 × 9 + 3 × 1 = 27 + 3 = 30.",
    },
    {
      id: "q12",
      type: "multiple_choice",
      question: "Manakah yang sama dengan 4 × 7?",
      choices: ["4 × 5 + 4 × 2", "4 × 10 − 4 × 1", "4 × 6 − 2", "4 × 3 + 3"],
      answer: "4 × 5 + 4 × 2",
      explanation: "4 × (5 + 2) = 28.",
    },
    {
      id: "q13",
      type: "multiple_choice",
      question: "Jika 2 × 8 = 16, maka 4 × 8 = ...",
      choices: ["20", "24", "28", "32"],
      answer: "32",
      explanation: "4 × 8 adalah dua kali 2 × 8, jadi 2 × 16 = 32.",
    },
    {
      id: "q14",
      type: "multiple_choice",
      question: "Hasil 5 × 10 − 5 × 6 adalah ...",
      choices: ["10", "15", "20", "25"],
      answer: "20",
      explanation: "50 − 30 = 20.",
    },
    {
      id: "q15",
      type: "multiple_choice",
      question: "Manakah yang nilainya paling besar?",
      choices: ["5 × 7", "4 × 9", "3 × 10", "2 × 12"],
      answer: "4 × 9",
      explanation: "5 × 7 = 35, 4 × 9 = 36, 3 × 10 = 30, 2 × 12 = 24.",
    },
    {
      id: "q16",
      type: "multiple_choice",
      question: "Jika 3 × 4 = 12, maka 3 × 4 + 3 × 2 = ...",
      choices: ["14", "16", "18", "20"],
      answer: "18",
      explanation: "12 + 6 = 18.",
    },
    {
      id: "q17",
      type: "multiple_choice",
      question: "Pernyataan yang benar adalah ...",
      choices: ["2 × 9 = 3 × 6", "2 × 9 = 4 × 4", "2 × 9 = 5 × 3", "2 × 9 = 6 × 2"],
      answer: "2 × 9 = 3 × 6",
      explanation: "2 × 9 = 18 dan 3 × 6 = 18.",
    },
    {
      id: "q18",
      type: "multiple_choice",
      question: "Jika 4 × 5 = 20, maka 4 × 6 = ...",
      choices: ["22", "24", "26", "28"],
      answer: "24",
      explanation: "Tambah 4: 20 + 4 = 24.",
    },
    {
      id: "q19",
      type: "multiple_choice",
      question: "Nilai 5 × 9 − 5 × 4 adalah ...",
      choices: ["15", "20", "25", "30"],
      answer: "25",
      explanation: "45 − 20 = 25.",
    },
    {
      id: "q20",
      type: "multiple_choice",
      question: "Jika 2 × 10 = 20, maka 2 × 10 − 2 × 7 = ...",
      choices: ["4", "6", "8", "10"],
      answer: "6",
      explanation: "20 − 14 = 6.",
    },
    {
      id: "q21",
      type: "multiple_choice",
      question: "Manakah yang bernilai 30?",
      choices: ["5 × 5 + 5", "4 × 7 + 2", "3 × 9 + 3", "2 × 10 + 8"],
      answer: "3 × 9 + 3",
      explanation: "3 × 9 + 3 = 27 + 3 = 30.",
    },
    {
      id: "q22",
      type: "multiple_choice",
      question: "Jika 5 × 8 = 40, maka 5 × 8 − 5 × 3 = ...",
      choices: ["10", "15", "20", "25"],
      answer: "25",
      explanation: "40 − 15 = 25.",
    },
    {
      id: "q23",
      type: "multiple_choice",
      question: "Nilai 4 × 9 + 4 × 1 adalah ...",
      choices: ["36", "37", "38", "40"],
      answer: "40",
      explanation: "36 + 4 = 40.",
    },
    {
      id: "q24",
      type: "multiple_choice",
      question: "Jika 3 × 10 = 30, maka 3 × 10 − 3 × 4 = ...",
      choices: ["12", "15", "18", "21"],
      answer: "18",
      explanation: "30 − 12 = 18.",
    },
    {
      id: "q25",
      type: "multiple_choice",
      question: "Manakah pasangan yang hasilnya sama?",
      choices: ["5 × 6 dan 3 × 10", "4 × 8 dan 2 × 12", "3 × 7 dan 5 × 4", "2 × 9 dan 4 × 5"],
      answer: "5 × 6 dan 3 × 10",
      explanation: "5 × 6 = 30 dan 3 × 10 = 30.",
    },
  ],
};

const QUESTIONS = DATA.questions;

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

export default function PerkalianDasar() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [attempts, setAttempts] = useState({});
  const [completed, setCompleted] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const q = QUESTIONS[index];

  const totalCorrect = Object.values(completed).filter(
    (v) => v === true
  ).length;

  function incrementAttempt(qid) {
    setAttempts((a) => ({ ...a, [qid]: (a[qid] || 0) + 1 }));
  }

  function mark(qid, ok, value) {
    setCompleted((c) => ({ ...c, [qid]: ok }));
    setAnswers((a) => ({ ...a, [qid]: value }));
  }

  function showCorrectToast() {
    toast.success("Benar!");
    setFeedbackStatus("correct");
    setTimeout(() => setFeedbackStatus(null), 900);
  }

  function showWrongToast(msg = "Salah — coba lagi") {
    toast.error(msg);
    setFeedbackStatus("wrong");
    setShakeKey((k) => k + 1);
    setTimeout(() => setFeedbackStatus(null), 900);
  }

  function canOpenQuestion(targetIndex) {
    if (targetIndex === 0) return true;
    for (let i = 0; i < targetIndex; i++) {
      const id = QUESTIONS[i].id;
      if (!Object.prototype.hasOwnProperty.call(completed, id)) return false;
    }
    return true;
  }

  function handleSubmit() {
    const qid = q.id;
    const at = attempts[qid] || 0;
    const user = answers[qid];

    const failIfNone = () => showWrongToast("Isi jawaban terlebih dahulu.");

    if (q.type === "multiple_choice") {
      if (user === undefined || user === null || user === "") return failIfNone();
    } else {
      if (!user || String(user).trim() === "") return failIfNone();
    }

    const ok = normalizeText(user) === normalizeText(q.answer);

    if (ok) {
      incrementAttempt(qid);
      mark(qid, true, user);
      showCorrectToast();
      setTimeout(() => {
        if (index < QUESTIONS.length - 1) setIndex(index + 1);
        else setShowResults(true);
      }, 700);
    } else {
      if (at >= 1) {
        incrementAttempt(qid);
        mark(qid, false, user);
        showWrongToast("Salah — lanjut ke soal berikutnya.");
        setTimeout(() => {
          if (index < QUESTIONS.length - 1) setIndex(index + 1);
          else setShowResults(true);
        }, 900);
      } else {
        incrementAttempt(qid);
        showWrongToast("Salah — kamu punya 1 kesempatan lagi.");
      }
    }
  }

  const pageVariants = useMemo(
    () => ({
      initial: { opacity: 0, scale: 0.97 },
      animate: { opacity: 1, scale: 1 },
      exit: { opacity: 0, scale: 0.97 },
    }),
    []
  );

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <Toaster position="top-center" />
      <div className="max-w-5xl mx-auto">
        <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
          <div>
            <h1 className="text-2xl font-bold">{DATA.title}</h1>
            <p className="text-sm text-slate-300">{DATA.description}</p>
          </div>
          <div className="text-sm text-slate-300">
            Progress: {totalCorrect}/{QUESTIONS.length}
          </div>
        </header>

        <nav className="flex gap-2 mb-4 flex-wrap">
          {QUESTIONS.map((qq, i) => {
            const locked = !canOpenQuestion(i);
            const isActive = i === index && !showResults;
            const done = Object.prototype.hasOwnProperty.call(
              completed,
              qq.id
            );
            return (
              <button
                key={qq.id}
                onClick={() => {
                  if (showResults) return;
                  if (locked) {
                    toast("Selesaikan soal sebelumnya dulu.", { icon: "🔒" });
                    return;
                  }
                  setIndex(i);
                }}
                className={[
                  "w-8 h-8 rounded-full text-xs font-semibold border transition-colors",
                  isActive
                    ? "bg-emerald-500/20 text-emerald-200 border-emerald-400/50"
                    : done
                    ? "bg-indigo-500/20 text-indigo-200 border-indigo-400/40"
                    : locked
                    ? "bg-slate-800 text-slate-500 border-slate-700"
                    : "bg-slate-800 text-slate-200 border-slate-600",
                ].join(" ")}
              >
                {i + 1}
              </button>
            );
          })}
        </nav>

        <div className="bg-slate-800 rounded-xl shadow p-6">
          {!showResults ? (
            <AnimatePresence exitBeforeEnter>
              <motion.div
                key={index + "-" + (shakeKey || 0)}
                variants={pageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ duration: 0.28 }}
                className={`relative ${
                  feedbackStatus === "wrong" ? "animate-[shake_0.5s]" : ""
                }`}
              >
                <h2 className="text-sm font-semibold mb-1">
                  Soal {index + 1} / {QUESTIONS.length}
                </h2>
                <h3 className="font-bold text-lg mb-2">{q.question}</h3>

                {q.type === "multiple_choice" ? (
                  <div className="space-y-3">
                    {q.choices.map((opt) => {
                      const selected = answers[q.id] === opt;
                      const at = attempts[q.id] || 0;
                      const isWrong =
                        at >= 1 && selected && completed[q.id] === false;
                      const isCorrect = completed[q.id] === true && selected;
                      return (
                        <button
                          key={opt}
                          onClick={() => {
                            if (completed[q.id] === true || at >= 2) return;
                            setAnswers((a) => ({ ...a, [q.id]: opt }));
                          }}
                          className={`block w-full text-left p-3 rounded border transition-colors ${
                            selected
                              ? isCorrect
                                ? "bg-emerald-700/30 border-emerald-500"
                                : isWrong
                                ? "bg-red-600/20 border-red-500"
                                : "bg-indigo-700/10 border-indigo-500"
                              : "bg-slate-900 border-slate-700"
                          }`}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                ) : (
                  <div>
                    <input
                      type="text"
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                      }
                      className="w-full border rounded p-2 bg-slate-900 text-white"
                      placeholder="Ketik jawaban..."
                    />
                  </div>
                )}

                <div className="mt-6 flex items-center gap-3">
                  <button
                    onClick={() => index > 0 && setIndex(index - 1)}
                    className="px-4 py-2 border rounded bg-slate-900"
                    disabled={index === 0}
                  >
                    Previous
                  </button>

                  <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-emerald-600 text-white rounded"
                  >
                    Submit
                  </button>
                </div>

                <div className="mt-3 text-sm text-slate-400">
                  Attempts: {attempts[q.id] || 0} / 2
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            <div>
              <h2 className="text-2xl font-bold mb-2">Hasil</h2>
              <p className="mb-2">
                Kamu menjawab <strong>{totalCorrect}</strong> dari{" "}
                <strong>{QUESTIONS.length}</strong> soal dengan benar.
              </p>
              <p className="mb-4 text-lg">
                Skor:{" "}
                <strong>
                  {Math.round((totalCorrect / QUESTIONS.length) * 100)}%
                </strong>
              </p>

              {totalCorrect / QUESTIONS.length >= 0.8 ? (
                <p className="mb-4 text-xl text-emerald-400 font-bold">
                  Luar biasa! Kamu sudah sangat paham. Pertahankan ya!
                </p>
              ) : totalCorrect / QUESTIONS.length >= 0.6 ? (
                <p className="mb-4 text-xl text-indigo-300 font-bold">
                  Bagus! Tinggal sedikit lagi untuk jadi makin mahir.
                </p>
              ) : (
                <p className="mb-4 text-xl text-rose-300 font-bold">
                  Semangat! Terus latihan, kamu pasti bisa.
                </p>
              )}
            </div>
          )}
        </div>
      </div>

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
        .animate-\\[shake_0\\.5s\\] { animation: shake 0.5s; }
      `}</style>
    </div>
  );
}
