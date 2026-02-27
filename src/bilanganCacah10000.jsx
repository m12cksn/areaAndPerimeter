import React, { useMemo, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const DATA = {
  title: "Bilangan Cacah 10.000",
  description:
    "Latihan penjumlahan, pengurangan, dan perbandingan bilangan cacah 4 digit (HOTS).",
  questions: [
    {
      id: "q1",
      type: "multiple_choice",
      question: "Hitung: 4.728 + 3.165 = ...",
      choices: ["7.883", "7.893", "7.993", "8.003"],
      answer: "7.893",
      explanation: "4.728 + 3.165 = 7.893.",
    },
    {
      id: "q2",
      type: "multiple_choice",
      question: "Hitung: 9.004 − 3.587 = ...",
      choices: ["5.317", "5.417", "5.507", "5.617"],
      answer: "5.417",
      explanation: "9.004 − 3.587 = 5.417.",
    },
    {
      id: "q3",
      type: "multiple_choice",
      question: "Hitung: 7.560 − 2.845 = ...",
      choices: ["4.715", "4.725", "4.705", "4.615"],
      answer: "4.715",
      explanation: "7.560 − 2.845 = 4.715.",
    },
    {
      id: "q4",
      type: "multiple_choice",
      question: "Hitung: 6.409 + 2.796 = ...",
      choices: ["9.105", "9.205", "9.215", "9.305"],
      answer: "9.205",
      explanation: "6.409 + 2.796 = 9.205.",
    },
    {
      id: "q5",
      type: "multiple_choice",
      question: "Bandingkan: 8.120 ___ 8.201",
      choices: ["<", ">", "="],
      answer: "<",
      explanation: "8.120 lebih kecil dari 8.201.",
    },
    {
      id: "q6",
      type: "multiple_choice",
      question:
        "Urutan dari terkecil ke terbesar untuk 3.409, 3.490, 3.904, 3.940 adalah ...",
      choices: [
        "3.409, 3.490, 3.904, 3.940",
        "3.409, 3.904, 3.490, 3.940",
        "3.490, 3.409, 3.904, 3.940",
        "3.490, 3.904, 3.940, 3.409",
      ],
      answer: "3.409, 3.490, 3.904, 3.940",
      explanation: "Bandingkan ribuan sama, lihat ratusan dan seterusnya.",
    },
    {
      id: "q7",
      type: "multiple_choice",
      question: "Lengkapi: 9.999 ___ 10.000",
      choices: ["<", ">", "="],
      answer: "<",
      explanation: "9.999 lebih kecil dari 10.000.",
    },
    {
      id: "q8",
      type: "multiple_choice",
      question:
        "Stok buku awal 7.250. Terjual 1.875 buku dan datang pasokan 2.430 buku. Berapa stok akhir?",
      choices: ["7.705", "7.805", "7.905", "8.005"],
      answer: "7.805",
      explanation: "7.250 − 1.875 + 2.430 = 7.805.",
    },
    {
      id: "q9",
      type: "multiple_choice",
      question:
        "Sebuah toko memiliki 6.840 kelereng. Hari ini terjual 2.375 kelereng dan besok terjual 1.460 kelereng. Berapa sisa kelereng?",
      choices: ["2.905", "3.005", "3.105", "3.205"],
      answer: "3.005",
      explanation: "6.840 − 2.375 − 1.460 = 3.005.",
    },
    {
      id: "q10",
      type: "multiple_choice",
      question:
        "Dua bilangan 4 digit jumlahnya 9.000. Jika salah satunya 4.365, bilangan lainnya adalah ...",
      choices: ["4.535", "4.635", "4.565", "4.755"],
      answer: "4.635",
      explanation: "9.000 − 4.365 = 4.635.",
    },
    {
      id: "q11",
      type: "multiple_choice",
      question:
        "Bilangan A lebih besar dari 5.700 tetapi lebih kecil dari 5.750. Jika jumlah digitnya 19, salah satu kemungkinan A adalah ...",
      choices: ["5.724", "5.735", "5.743", "5.749"],
      answer: "5.743",
      explanation: "5+7+4+3=19 dan 5.700 < 5.743 < 5.750.",
    },
    {
      id: "q12",
      type: "multiple_choice",
      question: "Manakah pernyataan yang benar? (HOTS)",
      choices: [
        "8.430 lebih dekat ke 8.500 daripada 8.400",
        "8.430 lebih dekat ke 8.400 daripada 8.500",
        "8.430 sama jauhnya dari 8.400 dan 8.500",
        "Tidak dapat ditentukan",
      ],
      answer: "8.430 lebih dekat ke 8.400 daripada 8.500",
      explanation: "Jarak ke 8.400 = 30, ke 8.500 = 70.",
    },
    {
      id: "q13",
      type: "multiple_choice",
      question: "Lengkapi: 7.605 ___ 7.560",
      choices: ["<", ">", "="],
      answer: ">",
      explanation: "7.605 lebih besar dari 7.560.",
    },
    {
      id: "q14",
      type: "multiple_choice",
      question:
        "HOTS: Sebuah angka 4 digit dibentuk dari 2, 4, 6, 8 (tanpa pengulangan). Bilangan terbesar yang bisa dibuat adalah ...",
      choices: ["8.642", "8.624", "6.842", "6.824"],
      answer: "8.642",
      explanation: "Susun dari terbesar ke terkecil: 8-6-4-2.",
    },
    {
      id: "q15",
      type: "multiple_choice",
      question:
        "HOTS: Jumlah dua bilangan 4 digit adalah 8.500. Selisihnya 1.260. Bilangan yang lebih besar adalah ...",
      choices: ["4.780", "4.830", "4.880", "4.930"],
      answer: "4.880",
      explanation:
        "Misal x+y=8.500, x−y=1.260 → x=(8.500+1.260)/2=4.880.",
    },
    {
      id: "q16",
      type: "multiple_choice",
      question: "Nilai tempat angka 6 pada bilangan 6.482 adalah ...",
      choices: ["6", "60", "600", "6.000"],
      answer: "6.000",
      explanation: "Angka 6 berada di ribuan.",
    },
    {
      id: "q17",
      type: "multiple_choice",
      question: "Berapa yang harus ditambahkan ke 4.785 agar menjadi 5.000?",
      choices: ["115", "205", "215", "225"],
      answer: "215",
      explanation: "5.000 − 4.785 = 215.",
    },
    {
      id: "q18",
      type: "multiple_choice",
      question: "Hitung: 3.999 + 1.001 = ...",
      choices: ["4.900", "5.000", "5.100", "5.200"],
      answer: "5.000",
      explanation: "3.999 + 1.001 = 5.000.",
    },
    {
      id: "q19",
      type: "multiple_choice",
      question: "7.460 dibulatkan ke ribuan terdekat menjadi ...",
      choices: ["7.000", "7.400", "7.500", "8.000"],
      answer: "7.000",
      explanation: "460 < 500, dibulatkan turun ke 7.000.",
    },
    {
      id: "q20",
      type: "multiple_choice",
      question: "Selisih 9.500 dan 6.375 adalah ...",
      choices: ["3.025", "3.125", "3.225", "3.325"],
      answer: "3.125",
      explanation: "9.500 − 6.375 = 3.125.",
    },
    {
      id: "q21",
      type: "multiple_choice",
      question: "Hitung: (8.000 − 3.465) + 1.230 = ...",
      choices: ["5.665", "5.745", "5.765", "5.845"],
      answer: "5.765",
      explanation: "8.000 − 3.465 = 4.535, lalu + 1.230 = 5.765.",
    },
    {
      id: "q22",
      type: "multiple_choice",
      question: "Bilangan yang berada di antara 4.980 dan 5.010 adalah ...",
      choices: ["4.975", "4.995", "5.015", "5.020"],
      answer: "4.995",
      explanation: "4.995 berada di antara 4.980 dan 5.010.",
    },
    {
      id: "q23",
      type: "multiple_choice",
      question: "Jumlah 2.345 dan 7.655 adalah ...",
      choices: ["9.900", "9.950", "10.000", "10.100"],
      answer: "10.000",
      explanation: "2.345 + 7.655 = 10.000.",
    },
    {
      id: "q24",
      type: "multiple_choice",
      question: "Jika A = 6.400, maka B yang lebih besar 725 dari A adalah ...",
      choices: ["7.025", "7.105", "7.125", "7.225"],
      answer: "7.125",
      explanation: "6.400 + 725 = 7.125.",
    },
    {
      id: "q25",
      type: "multiple_choice",
      question:
        "Urutan dari terbesar ke terkecil untuk 9.120, 9.210, 9.201, 9.102 adalah ...",
      choices: [
        "9.210, 9.201, 9.120, 9.102",
        "9.210, 9.120, 9.201, 9.102",
        "9.201, 9.210, 9.120, 9.102",
        "9.201, 9.120, 9.210, 9.102",
      ],
      answer: "9.210, 9.201, 9.120, 9.102",
      explanation: "Bandingkan ratusan lalu puluhan dan satuan.",
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

function normalizeList(value) {
  return normalizeText(value)
    .split(",")
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function BilanganCacah10000() {
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
    } else if (q.type === "ordering" || q.type === "comparison") {
      if (!user || String(user).trim() === "") return failIfNone();
    } else {
      if (!user || String(user).trim() === "") return failIfNone();
    }

    let ok = false;
    if (q.type === "multiple_choice") {
      ok = normalizeText(user) === normalizeText(q.answer);
    } else if (q.type === "ordering") {
      const u = normalizeList(user);
      const c = q.answer.map((v) => String(v));
      ok = u.length === c.length && u.every((v, i) => v === c[i]);
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

                {(q.type === "short_answer" ||
                  q.type === "story_problem" ||
                  q.type === "comparison") && (
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
                      placeholder="Contoh: 3409, 3490, 3904, 3940"
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
