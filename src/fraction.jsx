import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const DATA = {
  phase: 1,
  title: "Fraction",
  description: "Latihan pecahan berbasis cerita dan pemahaman konsep.",
  topics: [
    {
      id: "fraction_core",
      title: "Fraction",
      questions: [
        {
          id: "q1",
          type: "multiple_choice",
          question:
            "Izzy has 10 magnets. 3/5 of them are yellow. How many yellow magnets are there?",
          choices: ["4", "5", "6", "7"],
          answer: "6",
          concept: "Finding a fraction of a quantity",
          explanation: "10 ÷ 5 = 2, then 2 × 3 = 6.",
        },
        {
          id: "q2",
          type: "essay",
          question:
            "A rope is 200 cm long. James cuts 3/10 of the rope. How long is the piece he cuts?",
          answer: "60 cm",
          concept: "Finding a fraction of a quantity",
          explanation: "200 ÷ 10 = 20, then 20 × 3 = 60.",
        },
        {
          id: "q3",
          type: "multiple_choice",
          question:
            "2/3 of the length of a table is 20 cm. What is the full length of the table?",
          choices: ["20 cm", "30 cm", "40 cm", "60 cm"],
          answer: "30 cm",
          concept: "Finding the whole from a fraction",
          explanation: "If 2/3 is 20, then 1/3 is 10, so the whole is 30.",
        },
        {
          id: "q4",
          type: "essay",
          question:
            "3/5 of a table’s length is 24 cm. Find the full length of the table.",
          answer: "40 cm",
          concept: "Finding the whole from a fraction",
          explanation: "24 ÷ 3 = 8, then 8 × 5 = 40.",
        },
        {
          id: "q5",
          type: "multiple_choice",
          question:
            "At a fruit stall, 1/4 of the fruit are pears. There are 150 pears. How many pieces of fruit are there in total?",
          choices: ["450", "500", "600", "750"],
          answer: "600",
          concept: "Finding the whole from a fraction",
          explanation: "If 1/4 is 150, then 4/4 is 150 × 4 = 600.",
        },
        {
          id: "q6",
          type: "essay",
          question:
            "Natalie has some apples. 2/5 are red and the rest are green. If there are 15 green apples, how many apples did Natalie buy?",
          answer: "25 apples",
          concept: "Finding the whole from a fraction",
          explanation: "Green are 3/5. If 3/5 is 15, then 1/5 is 5, so total is 25.",
        },
        {
          id: "q7",
          type: "multiple_choice",
          question:
            "Craig spent 3/7 of his money and had $28 left. Did he have more than $50 at first?",
          choices: ["Yes", "No", "Cannot tell", "Only if he saved"],
          answer: "No",
          concept: "Fraction of a whole",
          explanation:
            "If 4/7 is $28, then 1/7 is $7, so total is $49, not more than $50.",
        },
        {
          id: "q8",
          type: "essay",
          question:
            "A water tank is 240 L. If 5/8 of the tank is full, how many liters of water are in the tank?",
          answer: "150 L",
          concept: "Finding a fraction of a quantity",
          explanation: "240 ÷ 8 = 30, then 30 × 5 = 150.",
        },
        {
          id: "q9",
          type: "multiple_choice",
          question: "Which is the correct method to find 4/9 of 81?",
          choices: ["81 ÷ 4 × 9", "81 ÷ 9 × 4", "81 × 4 × 9", "81 ÷ 36"],
          answer: "81 ÷ 9 × 4",
          concept: "Fraction as operator",
          explanation: "Divide by denominator, then multiply by numerator.",
        },
        {
          id: "q10",
          type: "essay",
          question:
            "5/6 of a jar of beads is 30 beads. How many beads are in a full jar?",
          answer: "36 beads",
          concept: "Finding the whole from a fraction",
          explanation: "30 ÷ 5 = 6, then 6 × 6 = 36.",
        },
        {
          id: "q11",
          type: "multiple_choice",
          question:
            "A ribbon is 2.4 m long. Mary cuts 3/8 of it. How long is the piece?",
          choices: ["0.6 m", "0.9 m", "1.2 m", "1.5 m"],
          answer: "0.9 m",
          concept: "Finding a fraction of a quantity",
          explanation: "2.4 ÷ 8 = 0.3, then 0.3 × 3 = 0.9.",
        },
        {
          id: "q12",
          type: "essay",
          question:
            "3/4 of a class is 27 students. How many students are in the class?",
          answer: "36 students",
          concept: "Finding the whole from a fraction",
          explanation: "27 ÷ 3 = 9, then 9 × 4 = 36.",
        },
        {
          id: "q13",
          type: "multiple_choice",
          question:
            "A bakery sells 1/5 of its cupcakes in the morning. If it sold 24 cupcakes, how many cupcakes did it bake?",
          choices: ["96", "100", "120", "140"],
          answer: "120",
          concept: "Finding the whole from a fraction",
          explanation: "24 is 1/5, so total is 24 × 5 = 120.",
        },
        {
          id: "q14",
          type: "essay",
          question:
            "A car used 3/10 of a full tank on a trip. If that was 12 L, how many liters does the full tank hold?",
          answer: "40 L",
          concept: "Finding the whole from a fraction",
          explanation: "12 ÷ 3 = 4, then 4 × 10 = 40.",
        },
        {
          id: "q15",
          type: "multiple_choice",
          question: "Which statement is true when finding a fraction of a quantity?",
          choices: [
            "Multiply by the denominator first",
            "Divide by the denominator then multiply by the numerator",
            "Always multiply by the numerator only",
            "Always divide by the numerator only",
          ],
          answer: "Divide by the denominator then multiply by the numerator",
          concept: "Fraction as operator",
          explanation:
            "This is the standard method for finding a fraction of a quantity.",
        },
        {
          id: "q16",
          type: "essay",
          question:
            "2/7 of a stack of books is 12 books. How many books are in the stack?",
          answer: "42 books",
          concept: "Finding the whole from a fraction",
          explanation: "12 ÷ 2 = 6, then 6 × 7 = 42.",
        },
        {
          id: "q17",
          type: "multiple_choice",
          question: "If 4/9 of a number is 20, the number is",
          choices: ["36", "40", "45", "60"],
          answer: "45",
          concept: "Finding the whole from a fraction",
          explanation: "20 ÷ 4 = 5, then 5 × 9 = 45.",
        },
        {
          id: "q18",
          type: "essay",
          question:
            "A farmer harvested 5/6 of his field, which equals 25 hectares. How large is the whole field?",
          answer: "30 hectares",
          concept: "Finding the whole from a fraction",
          explanation: "25 ÷ 5 = 5, then 5 × 6 = 30.",
        },
        {
          id: "q19",
          type: "multiple_choice",
          question: "A rope is 180 cm long. If 7/9 of it is used, how much is left?",
          choices: ["20 cm", "40 cm", "60 cm", "80 cm"],
          answer: "40 cm",
          concept: "Fraction of a quantity and remainder",
          explanation: "Used 7/9, so left 2/9. 180 ÷ 9 = 20, 20 × 2 = 40.",
        },
        {
          id: "q20",
          type: "essay",
          question:
            "A tank is 3/5 full. If 24 L is added to make it full, how much does the tank hold?",
          answer: "60 L",
          concept: "Finding the whole from fractional remainder",
          explanation:
            "3/5 full means 2/5 is missing. If 2/5 is 24, then 1/5 is 12, so total is 60.",
        },
      ],
    },
  ],
};

const QUESTIONS = DATA.topics.flatMap((t) =>
  t.questions.map((q) => ({
    ...q,
    topicId: t.id,
    topicTitle: t.title,
  }))
);

function normalizeText(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/\s+/g, " ");
}

function normalizeList(value) {
  return normalizeText(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function Fraction() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [attempts, setAttempts] = useState({});
  const [completed, setCompleted] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const q = QUESTIONS[index];

  const totalCorrect = Object.values(completed).filter((v) => v === true)
    .length;

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
    } else if (
      q.type === "short_answer" ||
      q.type === "story_problem" ||
      q.type === "comparison" ||
      q.type === "open_ended" ||
      q.type === "ordering" ||
      q.type === "essay"
    ) {
      if (!user || String(user).trim() === "") return failIfNone();
    }

    let ok = false;
    if (q.type === "multiple_choice") {
      ok = normalizeText(user) === normalizeText(q.answer);
    } else if (q.type === "true_false") {
      ok = String(user) === String(q.answer);
    } else if (q.type === "ordering") {
      const u = normalizeList(user);
      const c = q.answer.map((v) => String(v));
      ok = u.length === c.length && u.every((v, i) => v === c[i]);
    } else if (
      q.type === "short_answer" ||
      q.type === "story_problem" ||
      q.type === "comparison" ||
      q.type === "open_ended" ||
      q.type === "essay"
    ) {
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
            const done = Object.prototype.hasOwnProperty.call(completed, qq.id);
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
                <div className="text-xs text-slate-400 mb-1">
                  Topik: {q.topicTitle}
                </div>
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

                {(q.type === "short_answer" ||
                  q.type === "story_problem" ||
                  q.type === "comparison" ||
                  q.type === "open_ended" ||
                  q.type === "essay") && (
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

                {q.type === "ordering" && (
                  <div>
                    <input
                      type="text"
                      value={answers[q.id] || ""}
                      onChange={(e) =>
                        setAnswers((a) => ({ ...a, [q.id]: e.target.value }))
                      }
                      className="w-full border rounded p-2 bg-slate-900 text-white"
                      placeholder="Contoh: -4, -1, 0, 2, 6"
                    />
                    <p className="text-xs text-slate-400 mt-2">
                      Pisahkan dengan koma.
                    </p>
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
                  {QUESTIONS.filter((qq) => completed[qq.id] === false)
                    .length === 0 ? (
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
                        <div className="text-xs text-slate-400">
                          Topik: {qq.topicTitle}
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
