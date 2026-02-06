import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const BASE_SOLUTION = [
  [null, null, null, null, null, null, null],
  [null, null, 1, 2, null, null, null],
  [null, 3, 4, null, 1, 2, null],
  [null, 1, 2, null, 3, 4, null],
  [null, null, 3, 4, null, null, null],
  [null, null, null, null, null, null, null],
  [null, null, null, null, null, null, null],
];

const PERMS = [
  [1, 2, 3, 4, 5, 6, 7, 8, 9],
  [2, 1, 3, 4, 5, 6, 7, 8, 9],
  [1, 2, 4, 3, 5, 6, 7, 8, 9],
];

const PUZZLES = PERMS.map((perm, i) => ({
  id: `k${i + 1}`,
  title: `Kakuro #${i + 1}`,
  solution: permuteSolution(BASE_SOLUTION, perm),
}));

function permuteSolution(solution, perm) {
  return solution.map((row) =>
    row.map((cell) => (cell == null ? null : perm[cell - 1]))
  );
}

function computeClues(solution) {
  const size = solution.length;
  const clues = Array.from({ length: size }, () => Array(size).fill(null));

  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      if (solution[r][c] != null) continue;

      let right = null;
      if (c + 1 < size && solution[r][c + 1] != null) {
        let product = 1;
        let cc = c + 1;
        while (cc < size && solution[r][cc] != null) {
          product *= solution[r][cc];
          cc += 1;
        }
        right = product;
      }

      let down = null;
      if (r + 1 < size && solution[r + 1][c] != null) {
        let product = 1;
        let rr = r + 1;
        while (rr < size && solution[rr][c] != null) {
          product *= solution[rr][c];
          rr += 1;
        }
        down = product;
      }

      if (right != null || down != null) {
        clues[r][c] = { right, down };
      }
    }
  }

  return clues;
}

const DATA = {
  title: "Kakuro Perkalian (Mudah)",
  description:
    "Isi angka 1–9. Segmen lebih pendek dan angka lebih kecil agar lebih mudah.",
  questions: PUZZLES,
};

export default function KakuroPerkalian() {
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [attempts, setAttempts] = useState({});
  const [completed, setCompleted] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);

  const q = DATA.questions[index];
  const solution = q.solution;
  const clues = useMemo(() => computeClues(solution), [solution]);

  const totalCorrect = Object.values(completed).filter(
    (v) => v === true
  ).length;

  function incrementAttempt(qid) {
    setAttempts((a) => ({ ...a, [qid]: (a[qid] || 0) + 1 }));
  }

  function mark(qid, ok) {
    setCompleted((c) => ({ ...c, [qid]: ok }));
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
      const id = DATA.questions[i].id;
      if (!Object.prototype.hasOwnProperty.call(completed, id)) return false;
    }
    return true;
  }

  function setCellValue(r, c, value) {
    const key = `${r}-${c}`;
    setAnswers((prev) => {
      const next = { ...prev };
      const map = { ...(next[q.id] || {}) };
      map[key] = value;
      next[q.id] = map;
      return next;
    });
  }

  function handleSubmit() {
    const qid = q.id;
    const at = attempts[qid] || 0;
    const map = answers[qid] || {};

    for (let r = 0; r < solution.length; r++) {
      for (let c = 0; c < solution.length; c++) {
        if (solution[r][c] == null) continue;
        const key = `${r}-${c}`;
        if (!map[key]) {
          return showWrongToast("Lengkapi semua kotak terlebih dahulu.");
        }
      }
    }

    let ok = true;
    for (let r = 0; r < solution.length; r++) {
      for (let c = 0; c < solution.length; c++) {
        if (solution[r][c] == null) continue;
        const key = `${r}-${c}`;
        const userVal = Number(map[key]);
        if (userVal !== solution[r][c]) ok = false;
      }
    }

    if (ok) {
      incrementAttempt(qid);
      mark(qid, true);
      showCorrectToast();
      setTimeout(() => {
        if (index < DATA.questions.length - 1) setIndex(index + 1);
        else setShowResults(true);
      }, 700);
    } else {
      if (at >= 1) {
        incrementAttempt(qid);
        mark(qid, false);
        showWrongToast("Salah — lanjut ke soal berikutnya.");
        setTimeout(() => {
          if (index < DATA.questions.length - 1) setIndex(index + 1);
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
            Progress: {totalCorrect}/{DATA.questions.length}
          </div>
        </header>

        <nav className="flex gap-2 mb-4 flex-wrap">
          {DATA.questions.map((qq, i) => {
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
                  Soal {index + 1} / {DATA.questions.length}
                </h2>
                <h3 className="font-bold text-lg mb-4">{q.title}</h3>

                <div className="inline-block rounded-lg border border-slate-700 bg-slate-900 p-2">
                  <div className="grid grid-cols-7 gap-1">
                    {solution.map((row, r) =>
                      row.map((cell, c) => {
                        const key = `${r}-${c}`;
                        const isBlock = cell == null;
                        const clue = clues[r][c];

                        if (isBlock) {
                          return (
                            <div
                              key={key}
                              className="w-12 h-12 bg-slate-800 relative"
                              style={{
                                backgroundImage:
                                  clue
                                    ? "linear-gradient(135deg, transparent 49%, #475569 50%, transparent 51%)"
                                    : "none",
                              }}
                            >
                              {clue?.down != null && (
                                <div className="absolute bottom-1 left-1 text-[10px] text-slate-300">
                                  {clue.down}
                                </div>
                              )}
                              {clue?.right != null && (
                                <div className="absolute top-1 right-1 text-[10px] text-slate-300">
                                  {clue.right}
                                </div>
                              )}
                            </div>
                          );
                        }

                        return (
                          <input
                            key={key}
                            inputMode="numeric"
                            maxLength={1}
                            value={(answers[q.id] || {})[key] || ""}
                            onChange={(e) => {
                              const v = e.target.value.replace(/[^1-9]/g, "");
                              setCellValue(r, c, v);
                            }}
                            className="w-12 h-12 text-center text-lg font-semibold bg-slate-900 border border-slate-700 text-white"
                          />
                        );
                      })
                    )}
                  </div>
                </div>

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
                <strong>{DATA.questions.length}</strong> soal dengan benar.
              </p>
              <p className="mb-4 text-lg">
                Skor:{" "}
                <strong>
                  {Math.round((totalCorrect / DATA.questions.length) * 100)}%
                </strong>
              </p>

              {totalCorrect / DATA.questions.length >= 0.8 ? (
                <p className="mb-4 text-xl text-emerald-400 font-bold">
                  Luar biasa! Kamu sudah sangat paham. Pertahankan ya!
                </p>
              ) : totalCorrect / DATA.questions.length >= 0.6 ? (
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
