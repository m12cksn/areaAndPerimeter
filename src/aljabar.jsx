import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const DATA = {
  title: "Aljabar HOTS (SMP)",
  description:
    "Latihan aljabar tingkat tinggi: pemodelan cerita, persamaan/pertidaksamaan, dan manipulasi bentuk aljabar.",
  questions: [
    {
      id: "q1",
      type: "short_answer",
      question: "Sederhanakan: 2(3x − 5) − (x − 7) = ...",
      answer: "5x-3",
      explanation: "6x − 10 − x + 7 = 5x − 3.",
    },
    {
      id: "q2",
      type: "short_answer",
      question: "Tentukan x: 2x − 3 = 5x + 12",
      answer: "-5",
      explanation: "-3 − 12 = 5x − 2x → -15 = 3x → x = -5.",
    },
    {
      id: "q3",
      type: "multiple_choice",
      question: "Jika 3x + 2 > 11, maka x adalah ...",
      choices: ["x > 3", "x < 3", "x > 5", "x < 5"],
      answer: "x > 3",
      explanation: "3x > 9 → x > 3.",
    },
    {
      id: "q4",
      type: "story_problem",
      question:
        "Harga 2 pensil dan 3 pulpen adalah Rp14.000. Harga 1 pensil dan 2 pulpen adalah Rp8.000. Tentukan harga 1 pulpen.",
      answer: "4000",
      explanation:
        "Misal p = pulpen, s = pensil. 2s + 3p = 14.000 dan s + 2p = 8.000. Dari s = 8.000 − 2p, substitusi: 2(8.000 − 2p) + 3p = 14.000 → p = 4.000.",
    },
    {
      id: "q5",
      type: "short_answer",
      question: "Sederhanakan: (x^2 − 9) / (x − 3), dengan x ≠ 3",
      answer: "x+3",
      explanation: "x^2 − 9 = (x − 3)(x + 3) → hasil x + 3.",
    },
    {
      id: "q6",
      type: "multiple_choice",
      question: "Bentuk faktorisasi yang benar untuk 6x^2 − 15x adalah ...",
      choices: ["3x(2x − 5)", "6x(x − 5)", "5x(6x − 3)", "3(2x − 5)"],
      answer: "3x(2x − 5)",
      explanation: "6x^2 − 15x = 3x(2x − 5).",
    },
    {
      id: "q7",
      type: "short_answer",
      question: "Jika a + b = 10 dan a − b = 4, tentukan nilai a.",
      answer: "7",
      explanation: "Jumlahkan persamaan: 2a = 14 → a = 7.",
    },
    {
      id: "q8",
      type: "story_problem",
      question:
        "Luas persegi panjang adalah 30 cm^2. Panjangnya (x + 3) cm dan lebarnya (x + 2) cm. Tentukan nilai x.",
      answer: "3",
      explanation:
        "(x + 3)(x + 2) = 30 → x^2 + 5x + 6 = 30 → x^2 + 5x − 24 = 0 → (x + 8)(x − 3) = 0 → x = 3.",
    },
    {
      id: "q9",
      type: "multiple_choice",
      question: "Jika x = 2y + 1 dan y = 3, maka nilai x adalah ...",
      choices: ["5", "6", "7", "8"],
      answer: "7",
      explanation: "x = 2(3) + 1 = 7.",
    },
    {
      id: "q10",
      type: "short_answer",
      question: "Sederhanakan: 4x − 3(2x − 5) = ...",
      answer: "-2x+15",
      explanation: "4x − 6x + 15 = -2x + 15.",
    },
    {
      id: "q11",
      type: "story_problem",
      question:
        "Keliling segitiga sama kaki 40 cm. Dua sisi yang sama panjang adalah x cm, dan alasnya 2x − 4 cm. Tentukan x.",
      answer: "11",
      explanation: "2x + (2x − 4) = 40 → 4x − 4 = 40 → x = 11.",
    },
    {
      id: "q12",
      type: "short_answer",
      question: "Tentukan x: (1/3)x + 5 = 17",
      answer: "36",
      explanation: "x/3 = 12 → x = 36.",
    },
    {
      id: "q13",
      type: "multiple_choice",
      question: "Nilai dari (x − 2)^2 − (x + 2)^2 adalah ...",
      choices: ["-8x", "8x", "-4x", "4x"],
      answer: "-8x",
      explanation: "(x^2 − 4x + 4) − (x^2 + 4x + 4) = -8x.",
    },
    {
      id: "q14",
      type: "story_problem",
      question:
        "Harga 4 kg apel dan 2 kg jeruk adalah Rp50.000. Harga 2 kg apel dan 3 kg jeruk adalah Rp55.000. Tentukan harga 1 kg apel.",
      answer: "5000",
      explanation:
        "Misal a = apel, j = jeruk. 4a + 2j = 50.000 dan 2a + 3j = 55.000. Kalikan persamaan kedua dengan 2: 4a + 6j = 110.000. Selisih → 4j = 60.000 → j = 15.000. Substitusi: 4a + 30.000 = 50.000 → a = 5.000.",
    },
    {
      id: "q15",
      type: "short_answer",
      question: "Tentukan x: (x − 1) / (x + 2) = 2/3",
      answer: "7",
      explanation: "3(x − 1) = 2(x + 2) → 3x − 3 = 2x + 4 → x = 7.",
    },
  ],
};

const QUESTIONS = DATA.questions;

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "");
}

export default function Aljabar() {
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
      if (user === undefined || user === null || user === "")
        return failIfNone();
    } else {
      if (!user || String(user).trim() === "") return failIfNone();
    }

    let ok = false;
    if (q.type === "multiple_choice") {
      ok = normalizeText(user) === normalizeText(q.answer);
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

                {q.type !== "multiple_choice" && (
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
