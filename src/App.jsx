import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

/*
  App.jsx
  - 15 questions: Addition & Subtraction using objects/symbols/shapes (two unknowns)
  - types: mcq, input (step-by-step), checkbox, radio, drag-match, drag-fill
  - 2 attempts rule, scale+fade transitions, Tailwind styling (dark theme)
*/

[
  {
    id: 1,
    type: "mcq",
    title: "Probability – Basic",
    text: "Rolling a number greater than 0 on a fair die is...",
    options: ["Impossible", "Unlikely", "Even chance", "Certain"],
    correct: "Certain",
    explanation: "All die numbers (1–6) are greater than 0.",
  },
  {
    id: 2,
    type: "mcq",
    title: "Probability of color",
    text: "A spinner has 4 equal parts: red, blue, green, yellow. Probability of landing on green?",
    options: ["1/2", "1/3", "1/4", "1/5"],
    correct: "1/4",
    explanation: "1 green out of 4 equal parts.",
  },
  {
    id: 3,
    type: "mcq",
    title: "Even chance",
    text: "A bag has 5 red and 5 blue balls. Picking red is...",
    options: ["Impossible", "Unlikely", "Likely", "Even chance"],
    correct: "Even chance",
    explanation: "Both colors have equal amounts.",
  },
  {
    id: 4,
    type: "mcq",
    title: "Likely",
    text: "A box has 7 yellow pencils and 1 black pencil. Picking yellow is...",
    options: ["Unlikely", "Likely", "Impossible", "Even chance"],
    correct: "Likely",
    explanation: "7 out of 8 pencils are yellow.",
  },
  {
    id: 5,
    type: "mcq",
    title: "Probability – Certain",
    text: "A die is rolled. Probability of a number less than 7?",
    options: ["0", "1/2", "5/6", "1"],
    correct: "1",
    explanation: "All outcomes are 1–6.",
  },
  {
    id: 6,
    type: "mcq",
    title: "Probability fraction",
    text: "A box has 3 green, 2 red, and 1 blue ball. Probability of blue?",
    options: ["1/2", "1/6", "1/3", "1/5"],
    correct: "1/6",
    explanation: "1 blue out of 6 total balls.",
  },
  {
    id: 7,
    type: "mcq",
    title: "More likely",
    text: "Which is more likely to pick red? A:2 red + 4 blue OR B:5 red + 1 blue",
    options: ["A", "B"],
    correct: "B",
    explanation: "Probability B = 5/6 is greater than 2/6.",
  },
  {
    id: 8,
    type: "mcq",
    title: "Equal probability",
    text: "A spinner has 3 purple and 3 orange sections. Landing on purple is...",
    options: ["More likely", "Less likely", "Equally likely", "Impossible"],
    correct: "Equally likely",
    explanation: "Both colors appear equally.",
  },
  {
    id: 9,
    type: "mcq",
    title: "Even numbers",
    text: "Probability of rolling an even number on a fair die?",
    options: ["1/3", "1/2", "2/3", "5/6"],
    correct: "1/2",
    explanation: "Even numbers: 2,4,6 → 3 out of 6.",
  },
  {
    id: 10,
    type: "mcq",
    title: "Impossible event",
    text: "A bag has 10 red marbles. Picking a blue marble is...",
    options: ["Likely", "Even chance", "Impossible", "Certain"],
    correct: "Impossible",
    explanation: "There is no blue marble.",
  },
  {
    id: 11,
    type: "mcq",
    title: "Probability – pink",
    text: "A box has 4 pink, 1 yellow, and 1 green erasers. Probability of picking pink?",
    options: ["1/2", "4/6", "3/6", "1/6"],
    correct: "4/6",
    explanation: "4 favourable outcomes out of 6.",
  },
  {
    id: 12,
    type: "mcq",
    title: "Probability comparison",
    text: "Which spinner has a greater chance of landing on red? A:1 red + 3 blue OR B:2 red + 2 blue",
    options: ["A", "B"],
    correct: "B",
    explanation: "Probability B = 2/4 which is greater than 1/4.",
  },

  /* ================================ */
  /* Addition – Subtraction Section   */
  /* ================================ */

  {
    id: 13,
    type: "mcq",
    title: "Unknown number (shape)",
    text: "If 🔵 + 🔵 = 14, what is 🔵?",
    options: ["6", "7", "8", "14"],
    correct: "7",
    explanation: "2x = 14 → x = 7.",
  },
  {
    id: 14,
    type: "mcq",
    title: "Unknown triangle value",
    text: "If △ + 5 = 12, what is △?",
    options: ["5", "6", "7", "8"],
    correct: "7",
    explanation: "7 + 5 = 12.",
  },
  {
    id: 15,
    type: "mcq",
    title: "Unknown square",
    text: "If ⬜ – 3 = 9, what is ⬜?",
    options: ["9", "10", "11", "12"],
    correct: "12",
    explanation: "12 – 3 = 9.",
  },
  {
    id: 16,
    type: "mcq",
    title: "Find the missing number",
    text: "If ● + ▲ = 20 and ● = 12, find ▲.",
    options: ["6", "7", "8", "9"],
    correct: "8",
    explanation: "12 + ▲ = 20 → ▲ = 8.",
  },
  {
    id: 17,
    type: "mcq",
    title: "Integer addition",
    text: "Solve: –6 + 9 =",
    options: ["–15", "3", "–3", "15"],
    correct: "3",
    explanation: "9 – 6 = 3.",
  },
  {
    id: 18,
    type: "mcq",
    title: "Integer addition negative",
    text: "Solve: 7 + (–12) =",
    options: ["19", "–19", "–5", "5"],
    correct: "–5",
    explanation: "7 – 12 = –5.",
  },
  {
    id: 19,
    type: "mcq",
    title: "Add negatives",
    text: "Solve: –8 + (–4) =",
    options: ["12", "–12", "–4", "4"],
    correct: "–12",
    explanation: "Add the negatives.",
  },
  {
    id: 20,
    type: "mcq",
    title: "Subtracting negatives",
    text: "Solve: 13 – (–5) =",
    options: ["8", "–8", "18", "–18"],
    correct: "18",
    explanation: "13 + 5 = 18.",
  },
  {
    id: 21,
    type: "mcq",
    title: "Integer subtraction",
    text: "Solve: –10 – 6 =",
    options: ["–4", "–16", "4", "16"],
    correct: "–16",
    explanation: "–10 + (–6) = –16.",
  },
  {
    id: 22,
    type: "mcq",
    title: "Subtract negative",
    text: "Solve: –15 – (–7) =",
    options: ["–22", "22", "–8", "8"],
    correct: "–8",
    explanation: "–15 + 7 = –8.",
  },
  {
    id: 23,
    type: "mcq",
    title: "Shape unknown",
    text: "If ♦ + 10 = 3, what is ♦?",
    options: ["13", "–13", "–7", "7"],
    correct: "–7",
    explanation: "–7 + 10 = 3.",
  },
  {
    id: 24,
    type: "mcq",
    title: "Division unknown",
    text: "If 2★ = 18, what is ★?",
    options: ["8", "9", "18", "20"],
    correct: "9",
    explanation: "2x = 18 → x = 9.",
  },
  {
    id: 25,
    type: "mcq",
    title: "Subtracting a negative",
    text: "Solve: 5 – (–9) =",
    options: ["4", "–4", "14", "–14"],
    correct: "14",
    explanation: "5 + 9 = 14.",
  },
];

function shuffle(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function App() {
  // UI: fixed dark-ish theme (no toggle)
  const [index, setIndex] = useState(0); // current question index
  const [answers, setAnswers] = useState({}); // id -> value(s)
  const [attempts, setAttempts] = useState({}); // id -> attempts used
  const [completed, setCompleted] = useState({}); // id -> true/false
  const [dragState, setDragState] = useState(() => {
    const init = {};
    QUESTIONS.forEach((q) => {
      if (q.type === "drag-match" || q.type === "drag-fill") {
        init[q.id] = { pool: shuffle(q.pool), placed: {} };
      }
    });
    return init;
  });
  const [showResults, setShowResults] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null); // null | 'correct' | 'wrong'
  const [shakeKey, setShakeKey] = useState(0);

  const q = QUESTIONS[index];

  // helpers
  function incrementAttempt(qid) {
    setAttempts((a) => ({ ...a, [qid]: (a[qid] || 0) + 1 }));
  }
  function mark(qid, ok, value) {
    setCompleted((c) => ({ ...c, [qid]: ok }));
    setAnswers((a) => ({ ...a, [qid]: value }));
  }
  function showCorrectToast() {
    toast.success("Correct!");
    setFeedbackStatus("correct");
    setTimeout(() => setFeedbackStatus(null), 900);
  }
  function showWrongToast(msg = "Wrong — try again") {
    toast.error(msg);
    setFeedbackStatus("wrong");
    setShakeKey((k) => k + 1);
    setTimeout(() => setFeedbackStatus(null), 900);
  }

  // submit logic: includes support for 'input' step-by-step
  function handleSubmit() {
    const qid = q.id;
    const at = attempts[qid] || 0;
    let user = answers[qid];

    // for drag types, read from dragState if not present
    if ((q.type === "drag-match" || q.type === "drag-fill") && !user) {
      user = dragState[qid] ? dragState[qid].placed : {};
    }

    const failIfNone = () => showWrongToast("Please answer before submitting.");

    // validate presence
    if (q.type === "mcq" || q.type === "radio") {
      if (user === undefined || user === null || user === "")
        return failIfNone();
    } else if (q.type === "input") {
      // input has steps
      if (!user || typeof user !== "object") return failIfNone();
      if (q.steps && q.steps.length > 0) {
        let anyEmpty = q.steps.some((s, i) => {
          const v = (user[i] || "").toString().trim();
          return v === "";
        });
        if (anyEmpty) return failIfNone();
      }
    } else if (q.type === "checkbox") {
      if (!user || !Array.isArray(user) || user.length === 0)
        return failIfNone();
    } else if (q.type === "drag-match") {
      for (const p of q.parts) {
        if (!user || !user[p.id]) return failIfNone();
      }
    } else if (q.type === "drag-fill") {
      for (let i = 0; i < q.blanks.length; i++) {
        if (!user || !user[i]) return failIfNone();
      }
    }

    // check correctness
    let ok = false;
    if (q.type === "mcq" || q.type === "radio") {
      ok =
        String(user).trim().toLowerCase() ===
        String(q.correct).trim().toLowerCase();
    } else if (q.type === "input") {
      // compare each step case-insensitive (allow small variations like spaces)
      const inputs = user || {};
      ok = true;
      for (let i = 0; i < q.steps.length; i++) {
        const u = String(inputs[i] || "")
          .trim()
          .toLowerCase();
        const c = String(q.steps[i].answer).trim().toLowerCase();
        if (u !== c) {
          ok = false;
          break;
        }
      }
    } else if (q.type === "checkbox") {
      const userArr = [...user].sort();
      const corr = [...q.correct].sort();
      ok =
        userArr.length === corr.length &&
        userArr.every((v, i) => v === corr[i]);
    } else if (q.type === "drag-match") {
      ok = true;
      for (const p of q.parts) {
        if (!user || user[p.id] !== q.correctMap[p.id]) {
          ok = false;
          break;
        }
      }
    } else if (q.type === "drag-fill") {
      ok = true;
      for (let i = 0; i < q.blanks.length; i++) {
        if (!user || user[i] !== q.correctBlanks[i]) {
          ok = false;
          break;
        }
      }
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
        // second wrong: mark false and advance
        incrementAttempt(qid);
        mark(qid, false, user);
        showWrongToast("Wrong — no more attempts. Moving to next question.");
        setTimeout(() => {
          if (index < QUESTIONS.length - 1) setIndex(index + 1);
          else setShowResults(true);
        }, 900);
      } else {
        // first wrong: allow second attempt
        incrementAttempt(qid);
        showWrongToast("Wrong — you have one more attempt.");
      }
    }
  }

  // drag handlers
  function onDragStart(qid, value) {
    return (e) => {
      e.dataTransfer.setData("text/plain", JSON.stringify({ qid, value }));
    };
  }
  function onDropTo(qid, targetKey) {
    return (e) => {
      e.preventDefault();
      const payload = JSON.parse(e.dataTransfer.getData("text/plain"));
      if (payload.qid !== qid) return;
      setDragState((d) => {
        const cur = d[qid];
        if (!cur) return d;
        const newPool = cur.pool.filter((x) => x !== payload.value);
        const placed = { ...cur.placed, [targetKey]: payload.value };
        setAnswers((a) => ({ ...a, [qid]: placed }));
        return { ...d, [qid]: { pool: newPool, placed } };
      });
    };
  }
  function allowDrop(e) {
    e.preventDefault();
  }
  function returnToPool(qid, value) {
    setDragState((d) => {
      const cur = d[qid];
      if (!cur) return d;
      const pool = [...cur.pool, value];
      const placed = Object.fromEntries(
        Object.entries(cur.placed).filter(([k, v]) => v !== value)
      );
      setAnswers((a) => ({ ...a, [qid]: placed }));
      return { ...d, [qid]: { pool, placed } };
    });
  }

  // reset
  function resetAll() {
    setIndex(0);
    setAnswers({});
    setAttempts({});
    setCompleted({});
    const newDrag = {};
    QUESTIONS.forEach((qq) => {
      if (qq.type === "drag-match" || qq.type === "drag-fill") {
        newDrag[qq.id] = { pool: shuffle(qq.pool), placed: {} };
      }
    });
    setDragState(newDrag);
    setShowResults(false);
    setFeedbackStatus(null);
  }

  const totalCorrect = Object.values(completed).filter(
    (v) => v === true
  ).length;

  const pageVariants = {
    initial: { opacity: 0, scale: 0.97 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.97 },
  };

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 p-6">
      <Toaster position="top-center" />
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold">
            Addition & Subtraction — Shapes
          </h1>
          <div className="text-sm opacity-80">
            Progress: {totalCorrect}/{QUESTIONS.length}
          </div>
        </header>

        {/* Navigation */}
        <nav className="flex gap-2 mb-4 flex-wrap">
          {QUESTIONS.map((qq, i) => (
            <button
              key={qq.id}
              onClick={() => {
                // can open only if previous done/exhausted
                let ok = true;
                for (let j = 0; j < i; j++) {
                  const qid = QUESTIONS[j].id;
                  if (!Object.prototype.hasOwnProperty.call(completed, qid)) {
                    ok = false;
                    break;
                  }
                }
                if (!ok) {
                  toast("Complete previous questions first.", { icon: "🔒" });
                  return;
                }
                setIndex(i);
              }}
              className={`px-3 py-1 rounded text-sm ${
                i === index
                  ? "bg-indigo-500 text-white"
                  : completed[qq.id]
                  ? "bg-emerald-700/30"
                  : "border bg-slate-800"
              }`}
            >
              {i + 1}
            </button>
          ))}
        </nav>

        {/* Card */}
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
                  Question {index + 1} / {QUESTIONS.length}
                </h2>
                <h3 className="font-bold text-xl mb-2">{q.title}</h3>
                <p className="mb-4 text-slate-300">{q.text}</p>

                {/* Render by type */}
                {q.type === "mcq" && (
                  <div className="space-y-3">
                    {q.options.map((opt) => {
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

                {q.type === "input" && (
                  <div className="space-y-3">
                    {q.steps.map((s, idx) => (
                      <div key={idx} className="flex gap-3 items-center">
                        <div className="w-1/2 text-slate-200 font-medium">
                          {s.label}
                        </div>
                        <input
                          className="flex-1 border rounded p-2 bg-slate-900 text-white"
                          value={(answers[q.id] && answers[q.id][idx]) || ""}
                          onChange={(e) =>
                            setAnswers((a) => ({
                              ...a,
                              [q.id]: {
                                ...(a[q.id] || {}),
                                [idx]: e.target.value,
                              },
                            }))
                          }
                          placeholder="Type answer..."
                        />
                      </div>
                    ))}
                  </div>
                )}

                {q.type === "checkbox" && (
                  <div className="space-y-2">
                    {q.options.map((opt) => {
                      const cur = answers[q.id] || [];
                      const checked = cur.includes(opt);
                      return (
                        <label key={opt} className="flex items-center gap-3">
                          <input
                            type="checkbox"
                            className="w-4 h-4"
                            checked={checked}
                            onChange={(e) => {
                              const prev = answers[q.id] || [];
                              const next = e.target.checked
                                ? [...prev, opt]
                                : prev.filter((x) => x !== opt);
                              setAnswers((a) => ({ ...a, [q.id]: next }));
                            }}
                          />
                          <span>{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                )}

                {q.type === "radio" && (
                  <div className="flex gap-3 flex-wrap">
                    {q.options.map((opt) => (
                      <button
                        key={opt}
                        onClick={() => {
                          const at = attempts[q.id] || 0;
                          if (completed[q.id] === true || at >= 2) return;
                          setAnswers((a) => ({ ...a, [q.id]: opt }));
                        }}
                        className={`px-4 py-2 rounded ${
                          answers[q.id] === opt
                            ? "bg-indigo-500 text-white"
                            : "border bg-slate-900"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                )}

                {(q.type === "drag-match" || q.type === "drag-fill") && (
                  <div>
                    <div className="grid grid-cols-3 gap-4 mb-4">
                      {q.type === "drag-match" &&
                        q.parts.map((p) => (
                          <div
                            key={p.id}
                            onDragOver={allowDrop}
                            onDrop={onDropTo(q.id, p.id)}
                            className="min-h-[72px] border rounded p-3 flex flex-col items-center justify-center bg-slate-900"
                          >
                            <div className="font-medium text-slate-100">
                              {p.label}
                            </div>
                            <div className="mt-2 text-indigo-300 font-semibold">
                              {(dragState[q.id] &&
                                dragState[q.id].placed[p.id]) ||
                                "(drop)"}
                            </div>
                            {dragState[q.id] &&
                              dragState[q.id].placed[p.id] && (
                                <button
                                  className="text-xs text-red-400 mt-2"
                                  onClick={() =>
                                    returnToPool(
                                      q.id,
                                      dragState[q.id].placed[p.id]
                                    )
                                  }
                                >
                                  Return
                                </button>
                              )}
                          </div>
                        ))}

                      {q.type === "drag-fill" &&
                        q.blanks.map((b, i) => (
                          <div
                            key={i}
                            onDragOver={allowDrop}
                            onDrop={onDropTo(q.id, i)}
                            className="min-h-[72px] border rounded p-3 flex flex-col items-center justify-center bg-slate-900"
                          >
                            <div className="font-medium text-slate-100">
                              Box {i + 1}
                            </div>
                            <div className="mt-2 text-indigo-300 font-semibold">
                              {(dragState[q.id] && dragState[q.id].placed[i]) ||
                                "(drop)"}
                            </div>
                            {dragState[q.id] && dragState[q.id].placed[i] && (
                              <button
                                className="text-xs text-red-400 mt-2"
                                onClick={() =>
                                  returnToPool(q.id, dragState[q.id].placed[i])
                                }
                              >
                                Return
                              </button>
                            )}
                          </div>
                        ))}
                    </div>

                    <div className="flex gap-3 flex-wrap">
                      {((dragState[q.id] && dragState[q.id].pool) || []).map(
                        (val) => (
                          <div
                            key={val}
                            draggable
                            onDragStart={onDragStart(q.id, val)}
                            className="px-3 py-2 bg-indigo-800/40 rounded cursor-grab"
                          >
                            {val}
                          </div>
                        )
                      )}
                    </div>
                  </div>
                )}

                {/* Controls */}
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
                    className="px-4 py-2 bg-indigo-600 text-white rounded"
                  >
                    Submit Answer
                  </button>

                  <button
                    onClick={() => {
                      setIndex(QUESTIONS.length);
                      setShowResults(true);
                    }}
                    className="ml-auto px-4 py-2 bg-slate-700 rounded"
                  >
                    Finish Early
                  </button>
                </div>

                <div className="mt-3 text-sm text-slate-400">
                  Attempts: {attempts[q.id] || 0} / 2
                </div>
              </motion.div>
            </AnimatePresence>
          ) : (
            // Results UI
            <div>
              <h2 className="text-2xl font-bold mb-2">Results</h2>
              <p className="mb-2">
                You answered <strong>{totalCorrect}</strong> out of{" "}
                <strong>{QUESTIONS.length}</strong> correctly.
              </p>
              <p className="mb-4 text-lg">
                Score:{" "}
                <strong>
                  {Math.round((totalCorrect / QUESTIONS.length) * 100)}%
                </strong>
              </p>

              {totalCorrect > 9 ? (
                <p className="text-2xl text-emerald-400 font-bold">
                  You are amazing! 🌟
                </p>
              ) : totalCorrect > 7 ? (
                <p className="text-2xl text-indigo-300 font-bold">
                  Congratulations! 🎉
                </p>
              ) : (
                <p className="text-2xl text-rose-400 font-bold">
                  Keep practicing! 💪
                </p>
              )}

              <div className="mt-6 space-y-4">
                {QUESTIONS.map((qq, i) => (
                  <div
                    key={qq.id}
                    className="p-4 border rounded bg-slate-900/40"
                  >
                    <div className="flex justify-between">
                      <div>
                        <div className="font-semibold">
                          {i + 1}. {qq.title}
                        </div>
                        <div className="text-sm text-slate-300">{qq.text}</div>
                      </div>
                      <div
                        className={`font-bold ${
                          completed[qq.id]
                            ? "text-emerald-400"
                            : "text-rose-400"
                        }`}
                      >
                        {completed[qq.id] ? "Correct" : "Wrong"}
                      </div>
                    </div>

                    {!completed[qq.id] && (
                      <div className="mt-3 bg-slate-800 p-3 rounded">
                        <div>
                          <strong>Correct answer(s):</strong>
                        </div>
                        <div className="mt-1 text-indigo-300">
                          {qq.type === "mcq" && qq.correct}
                          {qq.type === "input" &&
                            qq.steps &&
                            qq.steps.map((s) => s.answer).join(" → ")}
                          {qq.type === "checkbox" && qq.correct.join(", ")}
                          {qq.type === "radio" && qq.correct}
                          {qq.type === "drag-match" &&
                            Object.values(qq.correctMap).join(", ")}
                          {qq.type === "drag-fill" &&
                            qq.correctBlanks &&
                            qq.correctBlanks.join(", ")}
                        </div>

                        {qq.explanation && (
                          <div className="mt-2 text-slate-300">
                            <strong>Explanation:</strong>
                            <div className="mt-1">{qq.explanation}</div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              <div className="mt-6 flex gap-3 justify-center">
                <button
                  onClick={resetAll}
                  className="px-4 py-2 border rounded bg-slate-900"
                >
                  Try Again
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* shake keyframes fallback */}
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
