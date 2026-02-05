import React, { useMemo, useState } from "react";
import { DndProvider, useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import toast, { Toaster } from "react-hot-toast";
import { AnimatePresence, motion } from "framer-motion";

const SHAPES = {
  big: { w: 140, h: 140, polygon: "0,0 140,0 0,140" },
  medium: { w: 105, h: 105, polygon: "0,0 105,0 0,105" },
  small: { w: 80, h: 80, polygon: "0,0 80,0 0,80" },
  square: { w: 80, h: 80, polygon: "0,0 80,0 80,80 0,80" },
  para: { w: 140, h: 80, polygon: "20,0 140,0 120,80 0,80" },
};

const PIECES = [
  { id: "big1", type: "big", color: "#f97316" },
  { id: "big2", type: "big", color: "#fb7185" },
  { id: "med1", type: "medium", color: "#22c55e" },
  { id: "small1", type: "small", color: "#38bdf8" },
  { id: "small2", type: "small", color: "#a78bfa" },
  { id: "square1", type: "square", color: "#facc15" },
  { id: "para1", type: "para", color: "#60a5fa" },
];

const DATA = {
  title: "Tangram (SMP)",
  description:
    "Seret 7 keping tangram ke siluet di kanan. Cocokkan jenis dan posisi bentuknya.",
  questions: [
    {
      id: "q1",
      title: "Perahu",
      slots: [
        { id: "s1", type: "big", x: 30, y: 20, r: 0 },
        { id: "s2", type: "big", x: 140, y: 20, r: 90 },
        { id: "s3", type: "medium", x: 110, y: 130, r: 0 },
        { id: "s4", type: "small", x: 10, y: 150, r: 0 },
        { id: "s5", type: "small", x: 80, y: 180, r: 90 },
        { id: "s6", type: "square", x: 200, y: 150, r: 0 },
        { id: "s7", type: "para", x: 230, y: 200, r: 0 },
      ],
    },
    {
      id: "q2",
      title: "Rumah",
      slots: [
        { id: "s1", type: "big", x: 40, y: 70, r: 0 },
        { id: "s2", type: "big", x: 150, y: 70, r: 90 },
        { id: "s3", type: "medium", x: 95, y: 10, r: 45 },
        { id: "s4", type: "small", x: 30, y: 200, r: 0 },
        { id: "s5", type: "small", x: 100, y: 200, r: 90 },
        { id: "s6", type: "square", x: 180, y: 200, r: 0 },
        { id: "s7", type: "para", x: 230, y: 130, r: 0 },
      ],
    },
    {
      id: "q3",
      title: "Ikan",
      slots: [
        { id: "s1", type: "big", x: 20, y: 80, r: 0 },
        { id: "s2", type: "big", x: 120, y: 80, r: 180 },
        { id: "s3", type: "medium", x: 200, y: 100, r: 90 },
        { id: "s4", type: "small", x: 250, y: 40, r: 45 },
        { id: "s5", type: "small", x: 250, y: 170, r: 315 },
        { id: "s6", type: "square", x: 110, y: 170, r: 0 },
        { id: "s7", type: "para", x: 40, y: 170, r: 0 },
      ],
    },
    {
      id: "q4",
      title: "Kucing",
      slots: [
        { id: "s1", type: "big", x: 60, y: 140, r: 0 },
        { id: "s2", type: "big", x: 200, y: 140, r: 90 },
        { id: "s3", type: "medium", x: 300, y: 80, r: 45 },
        { id: "s4", type: "small", x: 360, y: 40, r: 45 },
        { id: "s5", type: "small", x: 360, y: 160, r: 315 },
        { id: "s6", type: "square", x: 260, y: 220, r: 0 },
        { id: "s7", type: "para", x: 120, y: 240, r: 0 },
      ],
    },
    {
      id: "q5",
      title: "Lilin",
      slots: [
        { id: "s1", type: "big", x: 180, y: 40, r: 270 },
        { id: "s2", type: "big", x: 320, y: 40, r: 90 },
        { id: "s3", type: "medium", x: 250, y: 0, r: 0 },
        { id: "s4", type: "small", x: 240, y: 180, r: 0 },
        { id: "s5", type: "small", x: 320, y: 180, r: 90 },
        { id: "s6", type: "square", x: 250, y: 260, r: 0 },
        { id: "s7", type: "para", x: 120, y: 260, r: 0 },
      ],
    },
    {
      id: "q6",
      title: "Burung",
      slots: [
        { id: "s1", type: "big", x: 40, y: 120, r: 0 },
        { id: "s2", type: "big", x: 200, y: 80, r: 45 },
        { id: "s3", type: "medium", x: 300, y: 160, r: 90 },
        { id: "s4", type: "small", x: 360, y: 80, r: 0 },
        { id: "s5", type: "small", x: 120, y: 240, r: 90 },
        { id: "s6", type: "square", x: 210, y: 240, r: 0 },
        { id: "s7", type: "para", x: 300, y: 260, r: 0 },
      ],
    },
    {
      id: "q7",
      title: "Panah",
      slots: [
        { id: "s1", type: "big", x: 20, y: 100, r: 0 },
        { id: "s2", type: "big", x: 120, y: 100, r: 180 },
        { id: "s3", type: "medium", x: 200, y: 100, r: 90 },
        { id: "s4", type: "small", x: 260, y: 60, r: 45 },
        { id: "s5", type: "small", x: 260, y: 170, r: 315 },
        { id: "s6", type: "square", x: 80, y: 190, r: 0 },
        { id: "s7", type: "para", x: 20, y: 190, r: 0 },
      ],
    },
    {
      id: "q8",
      title: "Kapal",
      slots: [
        { id: "s1", type: "big", x: 80, y: 120, r: 0 },
        { id: "s2", type: "big", x: 220, y: 120, r: 90 },
        { id: "s3", type: "medium", x: 320, y: 80, r: 90 },
        { id: "s4", type: "small", x: 40, y: 240, r: 0 },
        { id: "s5", type: "small", x: 120, y: 260, r: 90 },
        { id: "s6", type: "square", x: 220, y: 260, r: 0 },
        { id: "s7", type: "para", x: 300, y: 260, r: 0 },
      ],
    },
    {
      id: "q9",
      title: "Orang",
      slots: [
        { id: "s1", type: "big", x: 200, y: 40, r: 0 },
        { id: "s2", type: "big", x: 200, y: 180, r: 180 },
        { id: "s3", type: "medium", x: 90, y: 140, r: 270 },
        { id: "s4", type: "small", x: 140, y: 10, r: 45 },
        { id: "s5", type: "small", x: 320, y: 10, r: 315 },
        { id: "s6", type: "square", x: 240, y: 300, r: 0 },
        { id: "s7", type: "para", x: 320, y: 200, r: 0 },
      ],
    },
    {
      id: "q10",
      title: "Pohon",
      slots: [
        { id: "s1", type: "big", x: 30, y: 40, r: 0 },
        { id: "s2", type: "big", x: 150, y: 40, r: 90 },
        { id: "s3", type: "medium", x: 110, y: 150, r: 0 },
        { id: "s4", type: "small", x: 20, y: 190, r: 0 },
        { id: "s5", type: "small", x: 90, y: 210, r: 90 },
        { id: "s6", type: "square", x: 180, y: 210, r: 0 },
        { id: "s7", type: "para", x: 220, y: 150, r: 0 },
      ],
    },
    {
      id: "q11",
      title: "Gunung",
      slots: [
        { id: "s1", type: "big", x: 20, y: 60, r: 0 },
        { id: "s2", type: "big", x: 140, y: 60, r: 90 },
        { id: "s3", type: "medium", x: 110, y: 160, r: 0 },
        { id: "s4", type: "small", x: 20, y: 190, r: 0 },
        { id: "s5", type: "small", x: 80, y: 210, r: 90 },
        { id: "s6", type: "square", x: 170, y: 210, r: 0 },
        { id: "s7", type: "para", x: 230, y: 150, r: 0 },
      ],
    },
    {
      id: "q12",
      title: "Layang-layang",
      slots: [
        { id: "s1", type: "big", x: 90, y: 10, r: 45 },
        { id: "s2", type: "big", x: 90, y: 120, r: 225 },
        { id: "s3", type: "medium", x: 10, y: 120, r: 315 },
        { id: "s4", type: "small", x: 10, y: 30, r: 45 },
        { id: "s5", type: "small", x: 210, y: 30, r: 135 },
        { id: "s6", type: "square", x: 140, y: 210, r: 45 },
        { id: "s7", type: "para", x: 210, y: 140, r: 0 },
      ],
    },
    {
      id: "q13",
      title: "Hati",
      slots: [
        { id: "s1", type: "big", x: 20, y: 60, r: 0 },
        { id: "s2", type: "big", x: 140, y: 60, r: 180 },
        { id: "s3", type: "medium", x: 110, y: 150, r: 90 },
        { id: "s4", type: "small", x: 10, y: 170, r: 45 },
        { id: "s5", type: "small", x: 240, y: 170, r: 315 },
        { id: "s6", type: "square", x: 100, y: 210, r: 0 },
        { id: "s7", type: "para", x: 200, y: 200, r: 0 },
      ],
    },
    {
      id: "q14",
      title: "Kunci",
      slots: [
        { id: "s1", type: "big", x: 30, y: 20, r: 0 },
        { id: "s2", type: "big", x: 150, y: 20, r: 90 },
        { id: "s3", type: "medium", x: 210, y: 120, r: 90 },
        { id: "s4", type: "small", x: 10, y: 170, r: 0 },
        { id: "s5", type: "small", x: 80, y: 210, r: 90 },
        { id: "s6", type: "square", x: 160, y: 210, r: 0 },
        { id: "s7", type: "para", x: 220, y: 200, r: 0 },
      ],
    },
    {
      id: "q15",
      title: "Bintang",
      slots: [
        { id: "s1", type: "big", x: 40, y: 70, r: 0 },
        { id: "s2", type: "big", x: 160, y: 70, r: 180 },
        { id: "s3", type: "medium", x: 120, y: 10, r: 45 },
        { id: "s4", type: "small", x: 10, y: 190, r: 0 },
        { id: "s5", type: "small", x: 260, y: 190, r: 90 },
        { id: "s6", type: "square", x: 120, y: 200, r: 0 },
        { id: "s7", type: "para", x: 200, y: 140, r: 0 },
      ],
    },
  ],
};

function TangramPiece({ piece, position, onDropBack }) {
  const [{ isDragging }, dragRef] = useDrag(
    () => ({
      type: "PIECE",
      item: { id: piece.id },
      end: (item, monitor) => {
        if (!monitor.didDrop() && onDropBack) onDropBack(item.id);
      },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [piece.id, onDropBack]
  );

  const shape = SHAPES[piece.type];
  const style = position
    ? {
        position: "absolute",
        left: position.x,
        top: position.y,
        transform: `rotate(${position.r || 0}deg)`,
      }
    : {};

  return (
    <div
      ref={dragRef}
      className="cursor-grab active:cursor-grabbing"
      style={{
        opacity: isDragging ? 0.5 : 1,
        width: shape.w,
        height: shape.h,
        ...style,
      }}
    >
      <svg
        width={shape.w}
        height={shape.h}
        viewBox={`0 0 ${shape.w} ${shape.h}`}
      >
        <polygon points={shape.polygon} fill={piece.color} />
      </svg>
    </div>
  );
}

function TangramSlot({ slot, children, onDrop }) {
  const [{ isOver }, dropRef] = useDrop(
    () => ({
      accept: "PIECE",
      drop: (item) => onDrop(slot.id, item.id),
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    }),
    [slot.id, onDrop]
  );

  const shape = SHAPES[slot.type];
  return (
    <div
      ref={dropRef}
      style={{
        position: "absolute",
        left: slot.x,
        top: slot.y,
        width: shape.w,
        height: shape.h,
        transform: `rotate(${slot.r || 0}deg)`,
        borderRadius: 6,
      }}
    >
      <svg
        width={shape.w}
        height={shape.h}
        viewBox={`0 0 ${shape.w} ${shape.h}`}
      >
        <polygon
          points={shape.polygon}
          fill="rgba(148,163,184,0.4)"
        />
      </svg>
      {children}
    </div>
  );
}

export default function Tangram() {
  const [index, setIndex] = useState(0);
  const [attempts, setAttempts] = useState({});
  const [completed, setCompleted] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [feedbackStatus, setFeedbackStatus] = useState(null);
  const [shakeKey, setShakeKey] = useState(0);
  const [placements, setPlacements] = useState({});

  const q = DATA.questions[index];
  const currentPlacement = placements[q.id] || {};

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

  function handleDrop(slotId, pieceId) {
    setPlacements((prev) => {
      const next = { ...prev };
      const map = { ...(next[q.id] || {}) };
      const existingSlot = Object.keys(map).find((k) => map[k] === pieceId);
      if (existingSlot) delete map[existingSlot];
      map[slotId] = pieceId;
      next[q.id] = map;
      return next;
    });
  }

  function removePlacement(pieceId) {
    setPlacements((prev) => {
      const next = { ...prev };
      const map = { ...(next[q.id] || {}) };
      const existingSlot = Object.keys(map).find((k) => map[k] === pieceId);
      if (existingSlot) delete map[existingSlot];
      next[q.id] = map;
      return next;
    });
  }

  function handleSubmit() {
    const qid = q.id;
    const at = attempts[qid] || 0;

    if (Object.keys(currentPlacement).length < q.slots.length) {
      return showWrongToast("Lengkapi semua keping dulu.");
    }

    const allCorrect = q.slots.every((slot) => {
      const pieceId = currentPlacement[slot.id];
      if (!pieceId) return false;
      const piece = PIECES.find((p) => p.id === pieceId);
      return piece && piece.type === slot.type;
    });

    if (allCorrect) {
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
        showWrongToast("Belum tepat — lanjut ke soal berikutnya.");
        setTimeout(() => {
          if (index < DATA.questions.length - 1) setIndex(index + 1);
          else setShowResults(true);
        }, 900);
      } else {
        incrementAttempt(qid);
        showWrongToast("Belum tepat — kamu punya 1 kesempatan lagi.");
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

  const placedPieces = new Set(Object.values(currentPlacement));
  const unplaced = PIECES.filter((p) => !placedPieces.has(p.id));

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900 p-6">
      <DndProvider backend={HTML5Backend}>
        <Toaster position="top-center" />
        <div className="max-w-6xl mx-auto">
          <header className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-slate-500 mb-1">
                Part 1
              </div>
              <h1 className="text-2xl font-bold text-slate-900">
                {DATA.title}
              </h1>
              <p className="text-sm text-slate-600">{DATA.description}</p>
            </div>
            <div className="text-sm text-slate-600">
              Attempt: {(attempts[q.id] || 0) + 1}/2
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
                      ? "bg-indigo-100 text-indigo-700 border-indigo-400"
                      : done
                      ? "bg-emerald-100 text-emerald-700 border-emerald-400"
                      : locked
                      ? "bg-slate-100 text-slate-400 border-slate-200"
                      : "bg-white text-slate-700 border-slate-300 hover:border-slate-400",
                  ].join(" ")}
                >
                  {i + 1}
                </button>
              );
            })}
          </nav>

          <div className="bg-white rounded-xl shadow p-6 border border-slate-200">
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
                  <h3 className="font-bold text-lg mb-2">
                    Kumpulkan patung {q.title.toLowerCase()}.
                  </h3>

                  <div className="grid gap-6 lg:grid-cols-[0.55fr_1fr]">
                    <div className="bg-white border border-slate-300 rounded-lg p-3">
                      <div className="text-sm text-slate-600 mb-2">
                        Keping tangram
                      </div>
                      <div className="flex flex-wrap gap-3">
                        {unplaced.map((piece) => (
                          <TangramPiece
                            key={piece.id}
                            piece={piece}
                            onDropBack={removePlacement}
                          />
                        ))}
                      </div>
                    </div>

                    <div className="bg-white border border-slate-300 rounded-lg p-3">
                      <div className="text-sm text-slate-600 mb-2">Siluet</div>
                      <div
                        className="relative bg-white rounded-lg border border-slate-200"
                        style={{ width: 560, height: 380 }}
                      >
                        {q.slots.map((slot) => (
                          <TangramSlot
                            key={slot.id}
                            slot={slot}
                            onDrop={handleDrop}
                          >
                            {currentPlacement[slot.id] && (
                              <TangramPiece
                                piece={PIECES.find(
                                  (p) => p.id === currentPlacement[slot.id]
                                )}
                                position={{ x: 0, y: 0, r: 0 }}
                                onDropBack={removePlacement}
                              />
                            )}
                          </TangramSlot>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex items-center gap-3">
                    <button
                      onClick={() => index > 0 && setIndex(index - 1)}
                      className="px-4 py-2 border rounded bg-white text-slate-700 border-slate-300"
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

                  <div className="mt-3 text-sm text-slate-500">
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
                  <p className="mb-4 text-xl text-emerald-600 font-bold">
                    Luar biasa! Kamu sudah sangat paham. Pertahankan ya!
                  </p>
                ) : totalCorrect / DATA.questions.length >= 0.6 ? (
                  <p className="mb-4 text-xl text-indigo-600 font-bold">
                    Bagus! Tinggal sedikit lagi untuk jadi makin mahir.
                  </p>
                ) : (
                  <p className="mb-4 text-xl text-rose-600 font-bold">
                    Semangat! Terus latihan, kamu pasti bisa.
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </DndProvider>

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
