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
  // === 1–5: MCQ basic reasoning on probability language ===
  {
    id: 1,
    type: "mcq",
    title: "Describing probability",
    text: "Which word best describes: 'Rolling a number greater than 0 on a fair six-sided die'?",
    options: ["Impossible", "Unlikely", "Even chance", "Likely", "Certain"],
    correct: "Certain",
    explanation:
      "Every face (1–6) is greater than 0, so it will certainly happen.",
  },
  {
    id: 2,
    type: "mcq",
    title: "Unusual events",
    text: "Which event is best described as 'impossible'?",
    options: [
      "Rolling an 8 on a fair die",
      "Getting tails on a fair coin",
      "Drawing a red ball from a bag with 3 red and 2 blue balls",
      "The sun rising tomorrow",
    ],
    correct: "Rolling an 8 on a fair die",
    explanation: "A die has numbers 1–6; rolling 8 cannot happen.",
  },
  {
    id: 3,
    type: "mcq",
    title: "Even chance event",
    text: "Which event has an even chance of happening?",
    options: [
      "Rolling an even number on a fair six-sided die",
      "Getting a number less than 5 on a die",
      "Tossing a fair coin and getting heads",
      "Picking a red marble from a bag with 3 red and 2 blue",
    ],
    correct: "Tossing a fair coin and getting heads",
    explanation:
      "Each side of a fair coin (head/tail) has equal probability = 1/2.",
  },
  {
    id: 4,
    type: "mcq",
    title: "Likely or unlikely?",
    text: "You spin a spinner divided into 8 equal sections: 6 red and 2 blue. The chance of landing on red is:",
    options: ["Impossible", "Unlikely", "Even chance", "Likely", "Certain"],
    correct: "Likely",
    explanation: "6 out of 8 = 3/4 → more likely to land on red.",
  },
  {
    id: 5,
    type: "mcq",
    title: "Certainty check",
    text: "Which event is most likely to be described as 'certain'?",
    options: [
      "Snow falling in the desert today",
      "You will breathe air in the next 10 minutes",
      "You win a lottery ticket",
      "You meet a unicorn in the park",
    ],
    correct: "You will breathe air in the next 10 minutes",
    explanation: "That event will definitely happen, so it’s certain.",
  },

  // === 6–10: Step-by-step input (fractions and comparison) ===
  {
    id: 6,
    type: "input",
    title: "Compare probability (dice)",
    text: "A fair die is rolled once. Step 1: Probability of rolling a 3. Step 2: Probability of rolling an even number.",
    steps: [
      { label: "Probability of rolling 3", answer: "1/6" },
      { label: "Probability of rolling even", answer: "1/2" },
    ],
    explanation:
      "There’s one 3 out of 6 (1/6), and 3 even numbers (2,4,6) → 3/6 = 1/2.",
  },
  {
    id: 7,
    type: "input",
    title: "Bag of colored cubes",
    text: "A bag has 4 red, 3 blue, and 1 green cube. Step 1: total cubes. Step 2: probability of picking red cube.",
    steps: [
      { label: "Total cubes", answer: "8" },
      { label: "Probability red (fraction)", answer: "1/2" },
    ],
    explanation: "4 red out of 8 → 4/8 = 1/2.",
  },
  {
    id: 8,
    type: "input",
    title: "Even or odd outcomes",
    text: "When rolling one fair die: Step 1: probability of odd number. Step 2: probability of even number. Step 3: compare (equal, more likely, less likely).",
    steps: [
      { label: "Odd (fraction)", answer: "1/2" },
      { label: "Even (fraction)", answer: "1/2" },
      { label: "Comparison", answer: "equally likely" },
    ],
    explanation:
      "There are 3 odd (1,3,5) and 3 even (2,4,6) → same probability.",
  },
  {
    id: 9,
    type: "input",
    title: "Weather probability",
    text: "Forecast: 70% chance of rain, 30% chance of no rain. Step 1: Which is more likely? Step 2: Write your reasoning.",
    steps: [
      { label: "More likely event", answer: "Rain" },
      { label: "Reason (short)", answer: "70% > 30%" },
    ],
    explanation: "Rain is more likely since its probability (0.7) is higher.",
  },
  {
    id: 10,
    type: "input",
    title: "Ball experiment",
    text: "Bag A: 5 blue, 5 red. Bag B: 8 blue, 2 red. Step 1: probability of blue in A. Step 2: probability of blue in B. Step 3: which is more likely?",
    steps: [
      { label: "Blue in A", answer: "1/2" },
      { label: "Blue in B", answer: "4/5" },
      { label: "More likely bag", answer: "B" },
    ],
    explanation: "A=5/10=1/2. B=8/10=4/5 → blue more likely in Bag B.",
  },

  // === 11–15: Checkbox (multi-select) ===
  {
    id: 11,
    type: "checkbox",
    title: "Which are equally likely?",
    text: "Select all equally likely pairs of outcomes:",
    options: [
      "Rolling 1 or 2 on a fair die",
      "Rolling 1 or 6 on a fair die",
      "Getting heads or tails with a fair coin",
      "Picking red or green from bag with 5 red, 2 green",
    ],
    correct: [
      "Rolling 1 or 2 on a fair die",
      "Rolling 1 or 6 on a fair die",
      "Getting heads or tails with a fair coin",
    ],
    explanation:
      "Equally likely means same number of outcomes. Red/green not equal here.",
  },
  {
    id: 12,
    type: "checkbox",
    title: "Select certain events",
    text: "Which of these events are certain to happen?",
    options: [
      "Sun will rise tomorrow",
      "Rolling number less than 7 on a die",
      "Picking a red from all-blue bag",
      "An ice cube feels cold",
    ],
    correct: [
      "Sun will rise tomorrow",
      "Rolling number less than 7 on a die",
      "An ice cube feels cold",
    ],
    explanation: "All guaranteed events are certain.",
  },
  {
    id: 13,
    type: "checkbox",
    title: "Unlikely events",
    text: "Select all events that are unlikely:",
    options: [
      "Winning a lottery",
      "Rolling a 6 twice in a row",
      "Getting tails on a coin",
      "Drawing an ace from a shuffled deck",
    ],
    correct: ["Winning a lottery", "Rolling a 6 twice in a row"],
    explanation:
      "Winning lottery (tiny probability) and double 6s are both unlikely.",
  },
  {
    id: 14,
    type: "checkbox",
    title: "Impossible events",
    text: "Select all impossible events:",
    options: [
      "Rolling a 9 on a six-sided die",
      "Picking red ball from bag with only blue",
      "Getting an odd number when rolling a 2",
      "Flipping coin and getting head or tail",
    ],
    correct: [
      "Rolling a 9 on a six-sided die",
      "Picking red ball from bag with only blue",
    ],
    explanation: "These cannot occur at all — probability 0.",
  },
  {
    id: 15,
    type: "checkbox",
    title: "Likely events",
    text: "Select all likely events:",
    options: [
      "It will snow at the North Pole",
      "Rolling a 1 on a die",
      "Rain in tropical area during wet season",
      "Drawing red from bag with 6 red, 2 blue",
    ],
    correct: [
      "It will snow at the North Pole",
      "Rain in tropical area during wet season",
      "Drawing red from bag with 6 red, 2 blue",
    ],
    explanation: "Events with high probability (>0.5) are likely.",
  },

  // === 16–20: Radio — less/more/equal comparisons ===
  {
    id: 16,
    type: "radio",
    title: "Dice comparison",
    text: "He is ___ to roll a 5 than an even number on a fair die.",
    options: ["less likely", "more likely", "equally likely"],
    correct: "less likely",
    explanation: "1/6 < 1/2 → rolling 5 is less likely.",
  },
  {
    id: 17,
    type: "radio",
    title: "Greater or smaller",
    text: "He is ___ to roll a number greater than 3 than a number smaller than 4.",
    options: ["less likely", "more likely", "equally likely"],
    correct: "equally likely",
    explanation:
      "Greater than 3: 4,5,6 (3 outcomes); smaller than 4: 1,2,3 (3 outcomes). Equal chance.",
  },
  {
    id: 18,
    type: "radio",
    title: "Prime numbers",
    text: "He is ___ to roll a number smaller than 3 than a prime number.",
    options: ["less likely", "more likely", "equally likely"],
    correct: "less likely",
    explanation:
      "Smaller than 3: {1,2} (2 outcomes). Primes: {2,3,5} (3 outcomes) → 2/6 vs 3/6.",
  },
  {
    id: 19,
    type: "radio",
    title: "Factors of 20 vs odd numbers",
    text: "He is ___ to roll a number that is a factor of 20 than an odd number.",
    options: ["less likely", "more likely", "equally likely"],
    correct: "more likely",
    explanation:
      "Factors of 20 on die: {1,2,4,5} (4/6). Odd: {1,3,5} (3/6) → 4/6 > 3/6.",
  },
  {
    id: 20,
    type: "radio",
    title: "Card comparison",
    text: "Drawing a red card (26 in 52) is ___ than drawing a king (4 in 52).",
    options: ["less likely", "more likely", "equally likely"],
    correct: "more likely",
    explanation: "26/52 > 4/52 → more likely.",
  },

  // === 21–25: Drag & Drop (matching / fill blanks) ===
  {
    id: 21,
    type: "drag-match",
    title: "Match event to probability word",
    text: "Match each event to the correct probability word.",
    parts: [
      { id: "a1", label: "Rolling a 9 on a six-sided die" },
      { id: "a2", label: "Tossing a coin and getting tails" },
      { id: "a3", label: "Rain in the desert" },
      { id: "a4", label: "Sun rises tomorrow" },
    ],
    pool: ["Impossible", "Unlikely", "Even chance", "Certain"],
    correctMap: {
      a1: "Impossible",
      a2: "Even chance",
      a3: "Unlikely",
      a4: "Certain",
    },
    explanation: "Based on common real-world likelihoods.",
  },
  {
    id: 22,
    type: "drag-match",
    title: "Match fraction to probability word",
    text: "Match the probability fraction to the corresponding word.",
    parts: [
      { id: "f1", label: "0" },
      { id: "f2", label: "1/2" },
      { id: "f3", label: "1" },
    ],
    pool: ["Impossible", "Even chance", "Certain"],
    correctMap: {
      f1: "Impossible",
      f2: "Even chance",
      f3: "Certain",
    },
    explanation: "0=impossible, 1/2=even chance, 1=certain.",
  },
  {
    id: 23,
    type: "drag-fill",
    title: "Fill probability scale",
    text: "Drag the words to correct positions from lowest to highest likelihood.",
    blanks: [
      "________ (0)",
      "________ (between 0 and 1/2)",
      "________ (1/2)",
      "________ (between 1/2 and 1)",
      "________ (1)",
    ],
    pool: ["Impossible", "Unlikely", "Even chance", "Likely", "Certain"],
    correctBlanks: [
      "Impossible",
      "Unlikely",
      "Even chance",
      "Likely",
      "Certain",
    ],
    explanation: "This is the probability scale from 0 to 1.",
  },
  {
    id: 24,
    type: "drag-match",
    title: "Match spinner color to probability",
    text: "A spinner has 8 sections: 3 red, 3 blue, 2 green. Match color to its probability as fraction.",
    parts: [
      { id: "s1", label: "Red" },
      { id: "s2", label: "Blue" },
      { id: "s3", label: "Green" },
    ],
    pool: ["3/8", "3/8", "2/8"],
    correctMap: {
      s1: "3/8",
      s2: "3/8",
      s3: "2/8",
    },
    explanation: "Each color's probability = number of sections ÷ total (8).",
  },
  {
    id: 25,
    type: "drag-fill",
    title: "Fill missing comparison words",
    text: "Complete the sentences using 'less likely', 'equally likely', or 'more likely'.",
    blanks: [
      "Getting 1 on a die is _______ than getting even number.",
      "Getting head or tail is _______.",
      "Drawing red from bag (5 red, 5 blue) is _______.",
    ],
    pool: ["less likely", "more likely", "equally likely"],
    correctBlanks: ["less likely", "equally likely", "equally likely"],
    explanation:
      "Single 1 vs even (1/6 < 1/2 → less likely); head/tail and 5 red/5 blue → equal chance.",
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
