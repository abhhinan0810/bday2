
import './App.css';

  import { useState, useEffect } from "react";

/*
📁 FILE SETUP
-------------
public/downloads/song.mp3
public/downloads/rhea.mp4
*/

const birthdaySong = "/downloads/song.mp3";
const birthdayVideo = "/rhea.mp4";

export default function App() {
  const [page, setPage] = useState(1);
  const [effects, setEffects] = useState([]);
  const [shake, setShake] = useState(false);
  const [giftOpen, setGiftOpen] = useState(false);
  const [noPos, setNoPos] = useState({ x: 0, y: 0 });
  const [bgIndex, setBgIndex] = useState(0);

  const gradients = [
    "linear-gradient(135deg,#ff0844,#ffb199)",
    "linear-gradient(135deg,#00f2fe,#4facfe)",
    "linear-gradient(135deg,#43e97b,#38f9d7)",
    "linear-gradient(135deg,#fa709a,#fee140)",
    "linear-gradient(135deg,#a18cd1,#fbc2eb)",
  ];

  useEffect(() => {
    const i = setInterval(() => {
      setBgIndex((p) => (p + 1) % gradients.length);
    }, 800);
    return () => clearInterval(i);
  }, [gradients.length]);

  const spawn = (emoji, count = 40) => {
    const arr = Array.from({ length: count }).map(() => ({
      id: Math.random(),
      left: Math.random() * 100,
      size: 24 + Math.random() * 20,
      emoji,
    }));
    setEffects(arr);
    setTimeout(() => setEffects([]), 1800);
  };

  const explodeFireworks = () => {
    setShake(true);
    spawn("🎆", 70);
    spawn("🎇", 50);
    spawn("✨", 30);
    setTimeout(() => setShake(false), 600);
  };

  const moveNo = () => {
    setNoPos({
      x: Math.random() * 140 - 70,
      y: Math.random() * 140 - 70,
    });
  };

  return (
    <div
      style={{
        background: gradients[bgIndex],
        height: "100vh",
        width: "100vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        animation: shake ? "shake 0.4s" : "none",
        fontFamily: "'Comic Sans MS', cursive",
      }}
    >
      <audio src={birthdaySong} autoPlay loop />

      {effects.map((e) => (
        <div
          key={e.id}
          style={{
            position: "absolute",
            bottom: "-20px",
            left: `${e.left}%`,
            fontSize: e.size,
            animation: "float 1.8s ease-out",
          }}
        >
          {e.emoji}
        </div>
      ))}

      <style>{`
        @keyframes float {
          to { transform: translateY(-260px) rotate(360deg); opacity: 0; }
        }
        @keyframes shake {
          25% { transform: translate(6px); }
          50% { transform: translate(-6px); }
          75% { transform: translate(6px); }
        }
        .card {
          background: rgba(255,255,255,0.9);
          padding: 2rem;
          border-radius: 30px;
          width: 90%;
          max-width: 420px;
          text-align: center;
          box-shadow: 0 25px 40px rgba(0,0,0,0.3);
        }
        .btn {
          padding: 14px 28px;
          margin: 12px;
          font-size: 17px;
          border-radius: 18px;
          border: none;
          cursor: pointer;
          font-weight: bold;
          background: linear-gradient(135deg,#ff6fd8,#ffc371);
        }
        .back {
          background: none;
          border: none;
          text-decoration: underline;
          cursor: pointer;
        }
        .gift {
          font-size: 80px;
          cursor: pointer;
        }
        .videoBox {
  margin-top: 1rem;
  width: 100%;
  max-width: 280px;      /* phone width */
  aspect-ratio: 9 / 16; /* 🔥 vertical video */
  border-radius: 24px;  /* curved edges */
  overflow: hidden;
  background: black;
  box-shadow: 0 15px 30px rgba(0,0,0,0.4);
  display: flex;
  align-items: center;
  justify-content: center;
}

      `}</style>

      <div className="card">
        {page === 1 && (
          <>
            <h2>Is your name Rhea twin?</h2>
            <button
              className="btn"
              style={{ transform: `translate(${noPos.x}px,${noPos.y}px)` }}
              onMouseEnter={moveNo}
              onClick={() => setPage("gtfo")}
            >
              No
            </button>
            <button className="btn" onClick={() => setPage(2)}>
              Yes
            </button>
          </>
        )}

        {page === "gtfo" && (
          <>
            <h2>GTFO 💀</h2>
            <button className="back" onClick={() => setPage(1)}>Go back</button>
          </>
        )}

        {page === 2 && (
          <>
            <h2>Is your bday today twin?</h2>
            <button
              className="btn"
              style={{ transform: `translate(${noPos.x}px,${noPos.y}px)` }}
              onMouseEnter={moveNo}
              onClick={() => setPage("sybau")}
            >
              No
            </button>
            <button className="btn" onClick={() => { explodeFireworks(); setPage(3); }}>
              Yes
            </button>
          </>
        )}

        {page === "sybau" && (
          <>
            <h2>SYBAU 😭</h2>
            <button className="back" onClick={() => setPage(2)}>Go back</button>
          </>
        )}

        {page === 3 && (
          <>
            <h1>HAPPY BIRTHDAY 🎉</h1>
            <p>Tap the gift 👇</p>
            <div className="gift" onClick={() => { setGiftOpen(true); explodeFireworks(); }}>
              {giftOpen ? "💖" : "🎁"}
            </div>

            {giftOpen && (
              <div className="videoBox">
                🎬 Video Surprise Loading…
                 
                <video
  src={birthdayVideo}
  autoPlay
  controls
  playsInline
  style={{
    width: "100%",
    height: "100%",
    objectFit: "cover",
    borderRadius: "24px",
  }}
/>

              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}


