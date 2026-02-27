import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const DATA = {
  title: "Perkalian & Pembagian (Mudah)",
  description:
    "Latihan dasar perkalian dan pembagian pada bilangan bulat serta desimal sederhana.",
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      question: "Hasil dari 8 × 7 adalah ...",
      choices: ["54", "56", "58", "64"],
      answer: "56",
      explanation: "8 × 7 = 56.",
    },
    {
      id: "q2",
      type: "multiple_choice",
      question: "Jika 9 × 6 = 54, maka 9 × 7 = ...",
      choices: ["60", "61", "62", "63"],
      answer: "63",
      explanation: "Tambah 9 satu kali: 54 + 9 = 63.",
    },
    {
      id: "q3",
      type: "multiple_choice",
      question: "Hitung: 96 ÷ 12 = ...",
      choices: ["6", "7", "8", "9"],
      answer: "8",
      explanation: "96 ÷ 12 = 8.",
    },
    {
      id: "q4",
      type: "multiple_choice",
      question: "Nilai 3,6 ÷ 0,9 = ...",
      choices: ["3", "4", "5", "6"],
      answer: "4",
      explanation: "3,6 ÷ 0,9 = 4.",
    },
    {
      id: "q5",
      type: "multiple_choice",
      question: "Hitung: 0,8 × 25 = ...",
      choices: ["18", "20", "22", "24"],
      answer: "20",
      explanation: "0,8 × 25 = 20.",
    },
    {
      id: "q6",
      type: "multiple_choice",
      question: "Manakah yang sama dengan 12 × 4?",
      choices: ["6 × 8", "3 × 20", "16 × 4", "12 × 5"],
      answer: "6 × 8",
      explanation: "6 × 8 = 48 dan 12 × 4 = 48.",
    },
    {
      id: "q7",
      type: "multiple_choice",
      question: "Sebuah pita 72 cm dipotong menjadi 9 bagian sama panjang. Panjang tiap bagian ...",
      choices: ["7 cm", "8 cm", "9 cm", "10 cm"],
      answer: "8 cm",
      explanation: "72 ÷ 9 = 8.",
    },
    {
      id: "q8",
      type: "multiple_choice",
      question: "Jika 15 × 6 = 90, maka 90 ÷ 3 = ...",
      choices: ["20", "25", "30", "35"],
      answer: "30",
      explanation: "90 ÷ 3 = 30.",
    },
    {
      id: "q9",
      type: "multiple_choice",
      question: "Hitung: (18 × 5) ÷ 6 = ...",
      choices: ["12", "15", "18", "20"],
      answer: "15",
      explanation: "18 × 5 = 90, lalu 90 ÷ 6 = 15.",
    },
    {
      id: "q10",
      type: "multiple_choice",
      question: "Nilai 2,4 × 1,5 = ...",
      choices: ["3,2", "3,4", "3,6", "3,8"],
      answer: "3,6",
      explanation: "2,4 × 1,5 = 3,6.",
    },
    {
      id: "q11",
      type: "multiple_choice",
      question: "Hitung: 4,2 ÷ 0,7 = ...",
      choices: ["5", "6", "7", "8"],
      answer: "6",
      explanation: "4,2 ÷ 0,7 = 6.",
    },
    {
      id: "q12",
      type: "multiple_choice",
      question: "Hasil dari 125 ÷ 5 adalah ...",
      choices: ["20", "25", "30", "35"],
      answer: "25",
      explanation: "125 ÷ 5 = 25.",
    },
    {
      id: "q13",
      type: "multiple_choice",
      question: "Manakah yang bernilai 64?",
      choices: ["8 × 8", "4 × 12", "96 ÷ 2", "72 ÷ 3"],
      answer: "8 × 8",
      explanation: "8 × 8 = 64.",
    },
    {
      id: "q14",
      type: "multiple_choice",
      question: "Jika 7 × 8 = 56, maka 56 ÷ 7 = ...",
      choices: ["6", "7", "8", "9"],
      answer: "8",
      explanation: "56 ÷ 7 = 8.",
    },
    {
      id: "q15",
      type: "multiple_choice",
      question:
        "Sebuah toko memiliki 15 pak, tiap pak berisi 12 botol. Semua botol dibagi rata ke 10 rak. Tiap rak berisi ...",
      choices: ["16", "18", "20", "22"],
      answer: "18",
      explanation: "15 × 12 = 180, lalu 180 ÷ 10 = 18.",
    },
    {
      id: "q16",
      type: "multiple_choice",
      question: "Nilai 3 × 10 − 3 × 4 = ...",
      choices: ["16", "18", "20", "24"],
      answer: "18",
      explanation: "30 − 12 = 18.",
    },
    {
      id: "q17",
      type: "multiple_choice",
      question: "Hitung: 6,5 × 4 = ...",
      choices: ["24", "25", "26", "27"],
      answer: "26",
      explanation: "6,5 × 4 = 26.",
    },
    {
      id: "q18",
      type: "multiple_choice",
      question: "Hitung: 7,2 ÷ 0,9 = ...",
      choices: ["6", "7", "8", "9"],
      answer: "8",
      explanation: "7,2 ÷ 0,9 = 8.",
    },
    {
      id: "q19",
      type: "multiple_choice",
      question: "Jika 48 ÷ 6 = 8, maka 48 ÷ 3 = ...",
      choices: ["12", "14", "16", "18"],
      answer: "16",
      explanation: "Membagi dengan 3 hasilnya dua kali 8: 16.",
    },
    {
      id: "q20",
      type: "multiple_choice",
      question: "Hasil 14 × 3 = ...",
      choices: ["36", "40", "42", "44"],
      answer: "42",
      explanation: "14 × 3 = 42.",
    },
    {
      id: "q21",
      type: "multiple_choice",
      question: "Nilai terbesar adalah ...",
      choices: ["5 × 9", "6 × 7", "8 × 6", "9 × 5"],
      answer: "8 × 6",
      explanation: "Nilai terbesar 48.",
    },
    {
      id: "q22",
      type: "multiple_choice",
      question: "Hitung: 3,5 × 2 = ...",
      choices: ["6", "7", "8", "9"],
      answer: "7",
      explanation: "3,5 × 2 = 7.",
    },
    {
      id: "q23",
      type: "multiple_choice",
      question:
        "Sebuah kolam diisi 6 ember, tiap ember 12 liter. Air digunakan 18 liter. Sisa air ...",
      choices: ["48 liter", "50 liter", "54 liter", "60 liter"],
      answer: "54 liter",
      explanation: "6 × 12 = 72, lalu 72 − 18 = 54.",
    },
    {
      id: "q24",
      type: "multiple_choice",
      question: "Hitung: 36 ÷ 1,2 = ...",
      choices: ["24", "28", "30", "32"],
      answer: "30",
      explanation: "36 ÷ 1,2 = 30.",
    },
    {
      id: "q25",
      type: "multiple_choice",
      question: "Hitung: (25 × 4) ÷ 5 = ...",
      choices: ["15", "20", "25", "30"],
      answer: "20",
      explanation: "25 × 4 = 100, lalu 100 ÷ 5 = 20.",
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

export default function PerkalianPembagian() {
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

    if (q.type === "multiple_choice" || q.type === "true_false") {
      if (user === undefined || user === null || user === "")
        return failIfNone();
    } else {
      if (!user || String(user).trim() === "") return failIfNone();
    }

    let ok = false;
    if (q.type === "multiple_choice") {
      ok = normalizeText(user) === normalizeText(q.answer);
    } else if (q.type === "true_false") {
      ok = String(user) === String(q.answer);
    } else {
      ok = normalizeText(user) === normalizeText(q.answer);
    }

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

                {q.type === "multiple_choice" && (
                  <div className="space-y-3">
                    {q.choices.map((opt) => {
                      const selected = answers[q.id] === opt;
                      const at = attempts[q.id] || 0;
                      const isWrong =
                        at >= 1 && selected && completed[q.id] === false;
                      const isCorrect =
                        completed[q.id] === true && selected;
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
                )}

                {q.type === "true_false" && (
                  <div className="flex gap-3">
                    {[
                      { label: "Benar", value: true },
                      { label: "Salah", value: false },
                    ].map((opt) => (
                      <button
                        key={opt.label}
                        onClick={() =>
                          setAnswers((a) => ({ ...a, [q.id]: opt.value }))
                        }
                        className={`px-4 py-2 rounded border ${
                          answers[q.id] === opt.value
                            ? "bg-indigo-500/30 border-indigo-400"
                            : "bg-slate-900 border-slate-700"
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </div>
                )}

                {(q.type === "short_answer" || q.type === "story_problem") && (
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

              <div className="mt-4 grid gap-4 sm:grid-cols-2">
                <div className="p-4 rounded border border-emerald-500/30 bg-emerald-500/10">
                  <div className="font-semibold text-emerald-200 mb-2">
                    Soal Benar
                  </div>
                  {QUESTIONS.filter((qq) => completed[qq.id]).length === 0 ? (
                    <div className="text-sm text-slate-300">
                      Belum ada yang benar.
                    </div>
                  ) : (
                    <ul className="text-sm text-slate-200">
                      {QUESTIONS.filter((qq) => completed[qq.id]).map((qq) => (
                        <li key={qq.id}>
                          {qq.id}. {qq.question}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="p-4 rounded border border-rose-500/30 bg-rose-500/10">
                  <div className="font-semibold text-rose-200 mb-2">
                    Soal Salah
                  </div>
                  {QUESTIONS.filter((qq) => completed[qq.id] === false).length ===
                  0 ? (
                    <div className="text-sm text-slate-300">
                      Tidak ada yang salah.
                    </div>
                  ) : (
                    <ul className="text-sm text-slate-200">
                      {QUESTIONS.filter((qq) => completed[qq.id] === false).map(
                        (qq) => (
                          <li key={qq.id}>
                            {qq.id}. {qq.question}
                          </li>
                        )
                      )}
                    </ul>
                  )}
                </div>
              </div>

              <div className="mt-6 space-y-4">
                {QUESTIONS.map((qq, i) => (
                  <div
                    key={qq.id}
                    className="p-4 border rounded bg-slate-900/40"
                  >
                    <div className="flex justify-between gap-4">
                      <div>
                        <div className="font-semibold">
                          {i + 1}. {qq.question}
                        </div>
                      </div>
                      <div
                        className={`font-bold ${
                          completed[qq.id]
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {completed[qq.id] ? "Benar" : "Salah"}
                      </div>
                    </div>

                    <div className="mt-3 bg-slate-800 p-3 rounded">
                      <div className="text-sm">
                        <strong>Jawaban benar:</strong>{" "}
                        {Array.isArray(qq.answer)
                          ? qq.answer.join(", ")
                          : String(qq.answer)}
                      </div>
                      {qq.explanation && (
                        <div className="mt-2 text-sm text-slate-300">
                          <strong>Penjelasan:</strong> {qq.explanation}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
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
