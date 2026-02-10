import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const DATA = {
  phase: 1,
  title: "Pengukuran Panjang & Berat",
  description: "Latihan pengukuran panjang dan berat untuk kelas 3.",
  topics: [
    {
      id: "pengukuran_panjang_berat",
      title: "Pengukuran Panjang dan Berat",
      questions: [
        {
          id: "q1",
          type: "short_answer",
          question: "Satuan baku berat untuk benda ringan seperti pensil adalah ...",
          answer: "gram",
          concept: "Satuan berat",
          explanation: "",
        },
        {
          id: "q2",
          type: "short_answer",
          question: "Satuan baku berat untuk karung beras adalah ...",
          answer: "kg",
          concept: "Satuan berat",
          explanation: "",
        },
        {
          id: "q3",
          type: "short_answer",
          question: "Ubah 1.753 gram ke kilogram dan gram.",
          answer: "1 kg 753 gram",
          concept: "Konversi gram ke kg dan gram",
          explanation: "",
        },
        {
          id: "q4",
          type: "short_answer",
          question: "1 kilogram sama dengan ... gram.",
          answer: "1000",
          concept: "Konversi kg ke gram",
          explanation: "",
        },
        {
          id: "q5",
          type: "story_problem",
          question:
            "Meutia punya 8.000 gram mangga dan menjual 4 kg. Sisa mangga adalah ... gram.",
          answer: "4000 gram",
          concept: "Pengurangan satuan berat",
          explanation: "",
        },
        {
          id: "q6",
          type: "short_answer",
          question: "Sebuah buku beratnya 500 gram. Dua buku beratnya ... gram.",
          answer: "1000",
          concept: "Perkalian berat",
          explanation: "",
        },
        {
          id: "q7",
          type: "short_answer",
          question: "Ubah 3 kg 200 gram ke gram.",
          answer: "3200",
          concept: "Konversi kg ke gram",
          explanation: "",
        },
        {
          id: "q8",
          type: "short_answer",
          question: "Ubah 4.500 gram ke kilogram.",
          answer: "4.5 kg",
          answerAlternatives: ["4,5 kg"],
          concept: "Konversi gram ke kg",
          explanation: "",
        },
        {
          id: "q9",
          type: "short_answer",
          question:
            "Alat ukur paling tepat untuk panjang meja kelas adalah ...",
          answer: "meteran",
          concept: "Alat ukur panjang",
          explanation: "",
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

function hasDigit(value) {
  return /\d/.test(String(value || ""));
}

function normalizeNumericString(value) {
  let text = String(value || "").toLowerCase();
  text = text.replace(/kilogram/g, "kg");
  text = text.replace(/\bkg\b/g, "");
  text = text.replace(/\bgram\b/g, "");
  text = text.replace(/\s+/g, "");

  const hasComma = text.includes(",");
  const hasDot = text.includes(".");

  if (hasComma) {
    text = text.replace(/\./g, "");
    text = text.replace(/,/g, ".");
  } else if (hasDot) {
    const parts = text.split(".");
    if (parts.length > 2) {
      text = text.replace(/\./g, "");
    } else if (parts.length === 2) {
      const [left, right] = parts;
      if (/^\d{1,3}$/.test(left) && /^\d{3}$/.test(right)) {
        text = left + right;
      }
    }
  }

  text = text.replace(/[^\d.]/g, "");
  if (text.includes(".")) {
    const [intPart, decPart] = text.split(".");
    const trimmedInt = intPart.replace(/^0+(?=\d)/, "") || "0";
    const trimmedDec = decPart.replace(/0+$/, "");
    return trimmedDec ? `${trimmedInt}.${trimmedDec}` : trimmedInt;
  }
  return text.replace(/^0+(?=\d)/, "") || "0";
}

function matchesAnswer(userValue, answer, alternatives = []) {
  const normUser = normalizeText(userValue);
  const allAnswers = [answer, ...alternatives]
    .filter(Boolean)
    .map((v) => normalizeText(v));
  if (allAnswers.includes(normUser)) return true;

  if (hasDigit(userValue) && hasDigit(answer)) {
    const userNum = normalizeNumericString(userValue);
    return [answer, ...alternatives]
      .filter(Boolean)
      .some((ans) => normalizeNumericString(ans) === userNum);
  }

  return false;
}

export default function PengukuranPanjangBerat() {
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
      q.type === "ordering"
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
      q.type === "open_ended"
    ) {
      ok = matchesAnswer(user, q.answer, q.answerAlternatives);
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
                  q.type === "open_ended") && (
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
                      placeholder="Contoh: 75, 90, 102, 110"
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
