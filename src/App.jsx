
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { useEffect, useRef, useState } from "react";



/*
 extract hidden URL from the challenge DOM
  Run this in the browser console on the /challenge page......

  function extractHiddenUrl(doc = document) {
    const nodes = doc.querySelectorAll(
      'section[data-id^="92"] article[data-class$="45"] div[data-tag*="78"] b.ref[value]'
    );
    return Array.from(nodes, n => n.getAttribute('value')).join('');
  }
  console.log(extractHiddenUrl());
*/


export default function App() {
  // ⬇️ Step 2 The hidden URL obtained from has been inserted.
  const FLAG_URL = "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/616d69";

  const [loading, setLoading] = useState(true);
  const [flag, setFlag] = useState("");
  const [typed, setTyped] = useState([]);

  // Step 4: fetch API 
  useEffect(() => {
    let cancelled = false;

    async function loadFlag() {
      try {
        const res = await fetch(FLAG_URL, { cache: "no-store" });
        const text = await res.text();
        if (!cancelled) {
          setFlag(text.trim());
          setLoading(false);
        }
      } catch (err) {
        if (!cancelled) {
          setFlag("ERROR");
          setLoading(false);
        }
      }
    }

    loadFlag();
    return () => {
      cancelled = true;
    };
  }, [FLAG_URL]);

  // Step 5: Typewriter effect – 1 character every 500ms, runs only once
  const started = useRef(false);
  useEffect(() => {
    if (loading || !flag || started.current) return;
    started.current = true;

    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setTyped(flag.slice(0, i).split(""));
      if (i >= flag.length) clearInterval(id);
    }, 500);

    return () => clearInterval(id);
  }, [loading, flag]);

  if (loading) return <div>Loading...</div>;

  return (
    <ul>
      {typed.map((ch, idx) => (
        <li key={idx}>{ch}</li>
      ))}
    </ul>
  );
}
