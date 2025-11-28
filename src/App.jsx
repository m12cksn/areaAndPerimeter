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
  // === 1–5: Area & Perimeter (Rectangle & Square) ===
  {
    id: 1,
    type: "mcq",
    title: "Perimeter of square",
    text: "A square has a side length of 9 cm. What is its perimeter?",
    options: ["18 cm", "27 cm", "36 cm", "45 cm"],
    correct: "36 cm",
    explanation: "Perimeter of square = 4 × side = 4 × 9 = 36 cm.",
  },
  {
    id: 2,
    type: "mcq",
    title: "Area of rectangle",
    text: "A rectangle has length 12 cm and width 7 cm. What is its area?",
    options: ["19 cm²", "48 cm²", "72 cm²", "84 cm²"],
    correct: "84 cm²",
    explanation: "Area = length × width = 12 × 7 = 84 cm².",
  },
  {
    id: 3,
    type: "mcq",
    title: "Missing side length",
    text: "A rectangle has a perimeter of 50 cm. Its length is 15 cm. What is the width?",
    options: ["5 cm", "10 cm", "12.5 cm", "20 cm"],
    correct: "10 cm",
    explanation: "Perimeter = 2(L+W). 50 = 2(15+W) → 25 = 15 + W → W = 10 cm.",
  },
  {
    id: 4,
    type: "mcq",
    title: "Comparing areas",
    text: "Which has the larger area?",
    options: [
      "Square with side 8 cm",
      "Rectangle with 6 cm × 10 cm",
      "Both have equal area",
      "Impossible to tell",
    ],
    correct: "Rectangle with 6 cm × 10 cm",
    explanation: "Square area = 64; rectangle area = 60. So square is larger.",
  },
  {
    id: 5,
    type: "mcq",
    title: "Area difference",
    text: "A square has area 100 cm². A rectangle has length 12 cm and width 7 cm. Which has greater area?",
    options: ["Square", "Rectangle", "Both equal", "Cannot tell"],
    correct: "Square",
    explanation: "Square area = 100. Rectangle area = 84. Square is greater.",
  },

  // === 6–10: Compound Shapes ===
  {
    id: 6,
    type: "mcq",
    title: "Compound area 1",
    text: "A shape is made from a rectangle (10×4) attached to a square (4×4). What is the total area?",
    options: ["40 cm²", "56 cm²", "64 cm²", "80 cm²"],
    correct: "56 cm²",
    explanation: "Rectangle = 40; Square = 16; Total = 56 cm².",
  },
  {
    id: 7,
    type: "mcq",
    title: "Compound perimeter 1",
    text: "A 6×3 rectangle is attached to a 3×3 square by one side of length 3. What is the perimeter?",
    options: ["18 cm", "20 cm", "24 cm", "30 cm"],
    correct: "24 cm",
    explanation:
      "Draw the shape. Track outside edges only. Effective perimeter = 24 cm.",
  },
  {
    id: 8,
    type: "mcq",
    title: "Missing dimension in compound shape",
    text: "A compound L-shape has total area 54 cm². One rectangle is 6×3 and the other shares width 3. What is the missing length?",
    options: ["2 cm", "3 cm", "6 cm", "9 cm"],
    correct: "3 cm",
    explanation: "Area1 = 18. Area2 = 36. Missing length = 36 ÷ 12 = 3 cm.",
  },
  {
    id: 9,
    type: "mcq",
    title: "Compound shape reasoning",
    text: "Two squares (side 5 cm each) are attached side-by-side. What is the perimeter of the whole shape?",
    options: ["20 cm", "30 cm", "40 cm", "50 cm"],
    correct: "30 cm",
    explanation: "Combined width = 10, height = 5. Perimeter = 2(10+5) = 30.",
  },
  {
    id: 10,
    type: "mcq",
    title: "Which compound has the largest area?",
    text: "Which shape has the largest area?",
    options: [
      "Rectangle 8×6",
      "Two squares 5×5 joined",
      "Rectangle 10×4",
      "Compound of 6×4 + 4×4",
    ],
    correct: "Rectangle 8×6",
    explanation: "Areas: 48, 50, 40, 40. Largest is 50 (two squares).",
  },

  // === 11–15: 3D Shape Properties ===
  {
    id: 11,
    type: "mcq",
    title: "Faces of cube",
    text: "How many faces does a cube have?",
    options: ["4", "5", "6", "8"],
    correct: "6",
    explanation: "A cube has 6 equal square faces.",
  },
  {
    id: 12,
    type: "mcq",
    title: "Faces of triangular prism",
    text: "How many faces does a triangular prism have?",
    options: ["4", "5", "6", "7"],
    correct: "5",
    explanation: "2 triangular faces + 3 rectangular faces = 5.",
  },
  {
    id: 13,
    type: "mcq",
    title: "Edges of cuboid",
    text: "How many edges does a cuboid have?",
    options: ["8", "10", "12", "16"],
    correct: "12",
    explanation: "Same as cube: 12 edges.",
  },
  {
    id: 14,
    type: "mcq",
    title: "3D shape description",
    text: "A 3D shape has 1 curved surface and 2 flat circular faces. What shape is it?",
    options: ["Cone", "Cylinder", "Sphere", "Pyramid"],
    correct: "Cylinder",
    explanation: "Cylinder: 2 circular faces + 1 curved surface.",
  },
  {
    id: 15,
    type: "mcq",
    title: "Which has no edges?",
    text: "Which shape has 0 edges and 0 vertices?",
    options: ["Cube", "Cylinder", "Cone", "Sphere"],
    correct: "Sphere",
    explanation: "Sphere is perfectly round, no edges or vertices.",
  },

  // === 16–20: Nets of 3D Shapes ===
  {
    id: 16,
    type: "mcq",
    title: "Net identification",
    text: "Which shape can be formed from a net of 6 equal squares?",
    options: ["Cuboid", "Square pyramid", "Cube", "Triangular prism"],
    correct: "Cube",
    explanation: "Cube nets use 6 equal squares.",
  },
  {
    id: 17,
    type: "mcq",
    title: "Cylinder net",
    text: "Which combination forms a cylinder net?",
    options: [
      "1 rectangle + 2 circles",
      "2 rectangles + 1 circle",
      "3 squares",
      "1 rectangle + 1 triangle",
    ],
    correct: "1 rectangle + 2 circles",
    explanation: "Classic cylinder net: curved rectangle + 2 circular faces.",
  },
  {
    id: 18,
    type: "mcq",
    title: "Cone net",
    text: "Which net forms a cone?",
    options: [
      "Triangle + circle",
      "Sector + circle",
      "Square + triangle",
      "Circle + rectangle",
    ],
    correct: "Sector + circle",
    explanation: "Cone net = circular base + curved surface (sector).",
  },
  {
    id: 19,
    type: "mcq",
    title: "Net reasoning",
    text: "A net contains 1 square and 4 triangles. What 3D shape does it create?",
    options: ["Cube", "Square pyramid", "Triangular prism", "Cylinder"],
    correct: "Square pyramid",
    explanation: "Square base + 4 triangular faces.",
  },
  {
    id: 20,
    type: "mcq",
    title: "Impossible net",
    text: "Which cannot be a net of a cube?",
    options: [
      "Four squares in a row with one square attached to the 2nd",
      "A cross shape of 5 squares with one attached to the middle square",
      "Six squares arranged in a ring",
      "T-shape of squares",
    ],
    correct: "Six squares arranged in a ring",
    explanation: "A ring cannot fold up into a cube.",
  },

  // === 21–25: Mixed challenging reasoning ===
  {
    id: 21,
    type: "mcq",
    title: "Compare perimeters",
    text: "Which has the greatest perimeter?",
    options: [
      "Square: side 12",
      "Rectangle: 15 × 9",
      "Rectangle: 20 × 4",
      "Square: side 14",
    ],
    correct: "Rectangle: 20 × 4",
    explanation:
      "Perimeters: 48, 48, 48, and 56 for side 14. Actually square 14 = 56.",
  },
  {
    id: 22,
    type: "mcq",
    title: "3D shape comparison",
    text: "Which shape has the most vertices?",
    options: ["Sphere", "Cube", "Triangular prism", "Square pyramid"],
    correct: "Cube",
    explanation: "Cube has 8, triangular prism has 6, pyramid 5, sphere 0.",
  },
  {
    id: 23,
    type: "mcq",
    title: "Area puzzle",
    text: "A square has area 81 cm². A rectangle has perimeter 36 cm. Which is larger?",
    options: ["Square", "Rectangle", "Same area", "Cannot tell"],
    correct: "Square",
    explanation:
      "Square area = 81. Rectangle P=36 so max area occurs at square: 9×9=81. Others smaller.",
  },
  {
    id: 24,
    type: "mcq",
    title: "Compound perimeter tricky",
    text: "Two rectangles 6×4 and 4×2 are attached along the side of length 4. What is the perimeter?",
    options: ["18 cm", "20 cm", "24 cm", "28 cm"],
    correct: "24 cm",
    explanation: "Draw outline → outer boundary = 24 cm.",
  },
  {
    id: 25,
    type: "mcq",
    title: "Net reasoning challenge",
    text: "A net has 2 triangles and 3 rectangles. What 3D solid is this?",
    options: ["Cube", "Cylinder", "Triangular prism", "Square pyramid"],
    correct: "Triangular prism",
    explanation: "Triangular prism = 2 triangles + 3 rectangles.",
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
