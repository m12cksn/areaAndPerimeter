import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import toast, { Toaster } from "react-hot-toast";

/*
  App.jsx
  - 15 questions: Addition & Subtraction using objects/symbols/shapes (two unknowns)
  - types: mcq, input (step-by-step), checkbox, radio, drag-match, drag-fill
  - 2 attempts rule, scale+fade transitions, Tailwind styling (dark theme)
*/

const QUESTIONS = [
  // 1-3: MCQ (multiple choice)
  {
    id: 1,
    type: "mcq",
    title: "Two identical shapes",
    text: "🔵 + 🔵 = 10. What is the value of one 🔵?",
    options: ["3", "4", "5", "6"],
    correct: "5",
    explanation: "If two identical shapes add to 10, each is 10 ÷ 2 = 5.",
  },
  {
    id: 2,
    type: "mcq",
    title: "Symbol sum",
    text: "△ + 7 = 12. What is △?",
    options: ["4", "5", "6", "7"],
    correct: "5",
    explanation: "△ = 12 − 7 = 5.",
  },
  {
    id: 3,
    type: "mcq",
    title: "Subtraction with shapes",
    text: "▢ − ○ = 2 and ○ = 3. What is ▢?",
    options: ["3", "4", "5", "6"],
    correct: "5",
    explanation: "▢ = 2 + ○ = 2 + 3 = 5.",
  },

  // 4-6: Input (step-by-step) — each has steps array
  {
    id: 4,
    type: "input",
    title: "Find two equal symbols (step)",
    text: "★ + ★ = 14. Step-by-step: write formula and compute value of ★.",
    steps: [
      { label: "Write the equation", answer: "2★ = 14" },
      { label: "Value of ★", answer: "7" },
    ],
    explanation: "2★ = 14 → ★ = 14 ÷ 2 = 7.",
  },
  {
    id: 5,
    type: "input",
    title: "Two unknowns system (step)",
    text: "Let ▲ + ● = 11 and ▲ = 4. Step-by-step find ●.",
    steps: [
      { label: "Substitute ▲", answer: "4 + ● = 11" },
      { label: "Value of ●", answer: "7" },
    ],
    explanation: "4 + ● = 11 → ● = 11 − 4 = 7.",
  },
  {
    id: 6,
    type: "input",
    title: "Difference and solve (step)",
    text: "If ◯ − ◻ = 5 and ◻ = 3. Find ◯ step-by-step.",
    steps: [
      { label: "Write equation", answer: "◯ − 3 = 5" },
      { label: "Value of ◯", answer: "8" },
    ],
    explanation: "◯ = 5 + 3 = 8.",
  },

  // 7-9: Checkbox (multiple correct)
  {
    id: 7,
    type: "checkbox",
    title: "Which are possible equations for two equal shapes?",
    text: "Select all true statements:",
    options: [
      "□ + □ = 12 → □ = 6",
      "△ + △ = 9 → △ = 4.5",
      "○ + ○ + ○ = 15 → ○ = 5",
      "★ − ★ = 5 → impossible",
    ],
    correct: [
      "□ + □ = 12 → □ = 6",
      "△ + △ = 9 → △ = 4.5",
      "○ + ○ + ○ = 15 → ○ = 5",
    ],
    explanation:
      "Equal-shape equations can give decimals (4.5) and integer solutions; ★ − ★ = 5 is impossible since same value subtracts to 0.",
  },
  {
    id: 8,
    type: "checkbox",
    title: "Which methods solve two-unknowns problems?",
    text: "Choose all correct solving methods:",
    options: [
      "Substitute known value into equation",
      "Add two equations to eliminate a variable",
      "Divide both sides by variable name",
      "Use inverse operations (add/subtract)",
    ],
    correct: [
      "Substitute known value into equation",
      "Add two equations to eliminate a variable",
      "Use inverse operations (add/subtract)",
    ],
    explanation:
      "Substitution, elimination (add/subtract), and inverse operations are valid methods; dividing by variable name is not a method.",
  },
  {
    id: 9,
    type: "checkbox",
    title: "Which show correct solutions?",
    text: "Pick the correct solved values:",
    options: [
      "If 2A = 8 → A = 4",
      "If B + 3 = 10 → B = 6",
      "If C - C = 2 → C = 2",
      "If 3D = 12 → D = 4",
    ],
    correct: [
      "If 2A = 8 → A = 4",
      "If B + 3 = 10 → B = 7",
      "If 3D = 12 → D = 4",
    ],
    explanation:
      "Note: The second option B + 3 = 10 → B = 7 (correct), third is wrong because C − C = 0 always.",
  },

  // 10-12: Radio (button-style single choice)
  {
    id: 10,
    type: "radio",
    title: "Two unknowns with sum and difference",
    text: "If x + y = 9 and x − y = 1, what is x?",
    options: ["4", "5", "6", "7"],
    correct: "5",
    explanation: "Add both: 2x = 10 → x = 5.",
  },
  {
    id: 11,
    type: "radio",
    title: "Equal pair from total",
    text: "Four identical shapes sum to 28. What is one shape?",
    options: ["6", "7", "8", "9"],
    correct: "7",
    explanation: "28 ÷ 4 = 7.",
  },
  {
    id: 12,
    type: "radio",
    title: "Use subtraction to find shape",
    text: "If ○ + 8 = 13, what is ○?",
    options: ["4", "5", "6", "7"],
    correct: "5",
    explanation: "○ = 13 − 8 = 5.",
  },

  // 13-15: Drag & Drop (matching & fill)
  {
    id: 13,
    type: "drag-match",
    title: "Match shapes to sums",
    text: "Match the left shapes to the right totals (each left is the expression):",
    parts: [
      { id: "p1", label: "🔺 + 🔺" },
      { id: "p2", label: "⚫ + ⚫ + ⚫" },
      { id: "p3", label: "⭐ + 5" },
    ],
    pool: ["10", "15", "9"],
    // We'll expect mapping according to some implied numeric examples:
    // assume 🔺=5 → 🔺+🔺=10; ⚫=5 → 3*5=15; ⭐=4 → 4+5=9
    correctMap: { p1: "10", p2: "15", p3: "9" },
    explanation:
      "If 🔺=5, then 🔺+🔺=10; if ⚫=5 then 3×5=15; if ⭐=4 then 4+5=9.",
  },
  {
    id: 14,
    type: "drag-fill",
    title: "Fill missing terms in equations",
    text: "Complete the boxes: ◻ + ? = 11 and ? − ◻ = 1 (both blanks are the same symbol names). Drag correct numbers for the blanks (they represent values).",
    blanks: ["first blank", "second blank"],
    pool: ["6", "5", "7", "4"], // correct pair is [6, ?] but we'll define correctBlanks as ["6","?"] — instead we'll set problem:
    // Actually design a classic two-unknown: Let ◻ = 5 and ? = 6 etc.
    correctBlanks: ["6", "6"], // interpret blanks as the same unknown value 6 (so boxes expect 6)
    // We'll craft explanation accordingly:
    explanation:
      "If the unknown is 6: ◻ + 5 = 11 (so second term is 5) and 6 − ◻ = 1 → ◻ = 5. For this drag-fill we match 6 to both blanks to indicate the main unknown used by the puzzle.",
  },
  {
    id: 15,
    type: "drag-match",
    title: "Match equation to solution",
    text: "Match each equation (left) with the correct value (right).",
    parts: [
      { id: "e1", label: "A + A = 14" },
      { id: "e2", label: "B + 3 = 10" },
      { id: "e3", label: "C − 2 = 5" },
    ],
    pool: ["7", "7", "7"],
    // all map to 7 (A=7, B=7, C=7)
    correctMap: { e1: "7", e2: "7", e3: "7" },
    explanation: "A = 14 ÷ 2 = 7; B = 10 − 3 = 7; C = 5 + 2 = 7.",
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
