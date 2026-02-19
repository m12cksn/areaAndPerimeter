import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const DATA = {
  phase: 1,
  title: "Fraction",
  description:
    "Operations on fractions and decimals (Cambridge Primary Mathematics Class 5, p.181–202).",
  topics: [
    {
      id: "fraction_decimal_ops",
      title: "Fractions & Decimals Operations",
      questions: [
        // 1) Add/Subtract related fractions
        {
          id: "q1",
          type: "multiple_choice",
          question: "Estimate first: Which is closest to 1? 3/8 + 5/8",
          choices: ["7/8", "1", "1 1/8", "1 3/8"],
          answer: "1",
          concept: "Estimating fraction sums",
          explanation: "3/8 + 5/8 = 8/8 = 1, exactly 1.",
        },
        {
          id: "q2",
          type: "short_answer",
          question: "Calculate: 7/12 + 3/12 = ?",
          answer: "10/12",
          concept: "Add fractions with same denominator",
          explanation: "Add numerators: (7+3)/12 = 10/12.",
        },
        {
          id: "q3",
          type: "multiple_choice",
          question: "Simplify the result: 10/12 = ?",
          choices: ["5/6", "2/3", "4/5", "6/10"],
          answer: "5/6",
          concept: "Simplifying fractions",
          explanation: "Divide numerator and denominator by 2: 10/12 = 5/6.",
        },
        {
          id: "q4",
          type: "short_answer",
          question: "Calculate: 11/15 - 6/15 = ?",
          answer: "5/15",
          concept: "Subtract fractions with same denominator",
          explanation: "Subtract numerators: (11-6)/15 = 5/15.",
        },
        {
          id: "q5",
          type: "multiple_choice",
          question: "Which is greater? 3/4 or 6/8",
          choices: ["3/4", "6/8", "Equal", "Cannot tell"],
          answer: "Equal",
          concept: "Equivalent fractions",
          explanation: "6/8 simplifies to 3/4, so they are equal.",
        },
        {
          id: "q6",
          type: "short_answer",
          question: "Calculate: 2/3 + 1/6 = ? (Give answer as a fraction)",
          answer: "5/6",
          concept: "Add related fractions using equivalent fractions",
          explanation: "2/3 = 4/6, so 4/6 + 1/6 = 5/6.",
        },
        {
          id: "q7",
          type: "short_answer",
          question: "How much more is 5/6 than 2/3? (Give a fraction)",
          answer: "1/6",
          concept: "Subtract related fractions (how much more)",
          explanation: "2/3 = 4/6, so 5/6 - 4/6 = 1/6.",
        },

        // 2) Multiply unit fractions by whole numbers
        {
          id: "q8",
          type: "multiple_choice",
          question: "Compute: (1/5) × 4 = ?",
          choices: ["1/20", "4/5", "5/4", "1/9"],
          answer: "4/5",
          concept: "Multiply a unit fraction by a whole number",
          explanation: "(1/5) × 4 = 4/5 (repeated addition of 1/5 four times).",
        },
        {
          id: "q9",
          type: "short_answer",
          question: "Compute: (1/8) × 6 = ?",
          answer: "6/8",
          concept: "Multiply unit fractions by whole numbers",
          explanation: "Keep denominator 8, multiply numerator 1×6 = 6 → 6/8.",
        },
        {
          id: "q10",
          type: "multiple_choice",
          question: "Which is the best estimate for (1/6) × 5 ?",
          choices: ["Less than 1", "Equal to 1", "Greater than 1", "Exactly 2"],
          answer: "Less than 1",
          concept: "Estimating fraction multiplication",
          explanation: "5/6 is less than 1, so the product is less than 1.",
        },

        // 3) Divide unit fractions by whole numbers
        {
          id: "q11",
          type: "short_answer",
          question: "Compute: (1/2) ÷ 4 = ?",
          answer: "1/8",
          concept: "Divide a unit fraction by a whole number",
          explanation: "Sharing 1/2 into 4 equal parts gives 1/8.",
        },
        {
          id: "q12",
          type: "multiple_choice",
          question: "Compute: (1/3) ÷ 2 = ?",
          choices: ["1/6", "2/3", "2/6", "1/5"],
          answer: "1/6",
          concept: "Divide unit fractions by whole numbers",
          explanation:
            "Dividing by 2 makes each share half as big: 1/3 ÷ 2 = 1/6.",
        },
        {
          id: "q13",
          type: "multiple_choice",
          question: "True or False: (1/5) ÷ 3 is greater than (1/5).",
          choices: ["True", "False"],
          answer: "False",
          concept: "Reasoning about division of fractions",
          explanation: "Dividing by a number greater than 1 makes it smaller.",
        },

        // 4) Add and subtract decimals
        {
          id: "q14",
          type: "short_answer",
          question: "Calculate: 3.47 + 2.8 = ?",
          answer: "6.27",
          concept: "Adding decimals (align decimal points)",
          explanation: "3.47 + 2.80 = 6.27 (line up decimal points).",
        },
        {
          id: "q15",
          type: "short_answer",
          question: "Calculate: 10.00 - 4.75 = ?",
          answer: "5.25",
          concept: "Subtracting decimals (place value columns)",
          explanation: "10.00 - 4.75 = 5.25.",
        },
        {
          id: "q16",
          type: "multiple_choice",
          question: "Estimate: 6.98 - 3.02 is closest to…",
          choices: ["4", "3", "2", "1"],
          answer: "4",
          concept: "Estimating decimal subtraction",
          explanation: "About 7.00 - 3.00 = 4.00.",
        },
        {
          id: "q17",
          type: "short_answer",
          question: "Calculate: 0.6 + 0.08 + 1.3 = ?",
          answer: "1.98",
          concept: "Adding decimals with different places",
          explanation: "0.60 + 0.08 + 1.30 = 1.98.",
        },

        // 5) Multiply decimals by 1-digit numbers
        {
          id: "q18",
          type: "short_answer",
          question: "Calculate: 2.5 × 3 = ?",
          answer: "7.5",
          concept: "Multiply decimals by 1-digit numbers",
          explanation: "2.5 × 3 = 7.5.",
        },
        {
          id: "q19",
          type: "multiple_choice",
          question: "Calculate: 0.7 × 8 = ?",
          choices: ["5.6", "0.56", "56", "6.2"],
          answer: "5.6",
          concept: "Decimal multiplication (tenths)",
          explanation: "7 tenths × 8 = 56 tenths = 5.6.",
        },
        {
          id: "q20",
          type: "short_answer",
          question: "Calculate: 1.25 × 4 = ?",
          answer: "5",
          concept: "Decimal multiplication (hundredths)",
          explanation: "1.25 × 4 = 5.00.",
        },
        {
          id: "q21",
          type: "multiple_choice",
          question: "Estimate: 3.9 × 6 is closest to…",
          choices: ["24", "18", "12", "6"],
          answer: "24",
          concept: "Estimating decimal multiplication",
          explanation: "About 4 × 6 = 24.",
        },

        // 6) Mixed practice / word problems
        {
          id: "q22",
          type: "story_problem",
          question:
            "Mia drank 3/10 L of juice in the morning and 2/10 L in the afternoon. How many liters did she drink in total?",
          answer: "5/10 L",
          concept: "Add fractions with same denominator in context",
          explanation: "3/10 + 2/10 = 5/10 L.",
        },
        {
          id: "q23",
          type: "story_problem",
          question:
            "A ribbon is 1/2 m long. It is shared equally among 5 children. How long is each piece?",
          answer: "1/10 m",
          concept: "Divide a unit fraction/amount by a whole number",
          explanation: "1/2 ÷ 5 = 1/10.",
        },
        {
          id: "q24",
          type: "story_problem",
          question:
            "A bag of rice weighs 2.4 kg. Lina uses 3/8 of the rice. How many kg of rice does she use?",
          answer: "0.9 kg",
          concept: "Finding a fraction of a decimal quantity",
          explanation: "2.4 ÷ 8 = 0.3, then 0.3 × 3 = 0.9 kg.",
        },
        {
          id: "q25",
          type: "ordering",
          question: "Order these from smallest to largest: 0.6, 3/5, 0.58",
          answer: ["0.58", "3/5", "0.6"],
          concept: "Compare fractions and decimals",
          explanation: "3/5 = 0.6, so 0.58 < 0.6 = 3/5.",
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
  })),
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

  const totalCorrect = Object.values(completed).filter(
    (v) => v === true,
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
    [],
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
                        ),
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
