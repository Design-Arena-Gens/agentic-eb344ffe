"use client";
import { useEffect, useMemo, useRef, useState } from 'react';

const captions = [
  '??? ????? ???? ???? ?????????? ??? ??????',
  '???? ??? ???? ???? ?? ??? ???? ????',
  '??? ???? ???? ?????? ???????? ???? ????? ????!',
  '??????? ????? ??? ???? ???????',
  '?????? ????? ???? ? ???? ?????? ???????',
  '?? ????? ??? ???? ???? ???? ???????'
];

export default function Page() {
  const [step, setStep] = useState(0);
  const timersRef = useRef([]);

  const reset = () => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setStep(0);
  };

  useEffect(() => {
    // Drive the narrative timeline
    const schedule = [1400, 1600, 1600, 1400, 1600]; // ms delays between steps
    let acc = 0;
    for (let i = 0; i < schedule.length; i++) {
      acc += schedule[i];
      const t = setTimeout(() => setStep(prev => Math.min(prev + 1, captions.length - 1)), acc);
      timersRef.current.push(t);
    }
    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, []);

  const className = useMemo(() => `scene step-${step}`, [step]);

  return (
    <main className={className}>
      <div className="grain" />

      <div className="balcony">
        {/* Background city */}
        <div className="city">
          <div className="sun" />
          {Array.from({ length: 7 }).map((_, i) => (
            <div
              key={i}
              className="building"
              style={{ left: `${6 + i * 13}%`, height: `${30 + (i % 3) * 8}%`, opacity: 0.7 - i * 0.07 }}
            >
              {Array.from({ length: 6 - (i % 3) }).map((_, j) => (
                <div
                  key={j}
                  className="light"
                  style={{ left: `${8 + j * 18}px`, bottom: `${16 + (j % 4) * 18}px`, opacity: 0.4 + (j % 3) * 0.15 }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* Balcony rail and ground */}
        <div className="rail" />
        <div className="ground" />

        {/* Actors */}
        <div className="actor child" style={{ top: '68%', left: '30%' }}>
          <div style={{ fontSize: 'clamp(36px, 7vmin, 72px)' }}>??</div>
          <div className="label">????</div>
        </div>

        <div className="actor hawk" style={{ top: '22%', left: '-10%', transform: 'translate(-50%, -50%)' }}>
          <div style={{ fontSize: 'clamp(38px, 8vmin, 80px)' }}>??</div>
          <div className="label">???</div>
        </div>

        <div className="actor cat" style={{ top: '70%', left: '18%' }}>
          <div style={{ fontSize: 'clamp(32px, 6.5vmin, 68px)' }}>??</div>
          <div className="label">??????</div>
        </div>

        <div className="actor mom" style={{ top: '66%', right: '-20%', transform: 'translate(50%, -50%)' }}>
          <div style={{ fontSize: 'clamp(36px, 7vmin, 72px)' }}>?????</div>
          <div className="label">??</div>
        </div>

        {/* Overlay grading */}
        <div className="vignette" />
        <div className="grade" />

        {/* Caption */}
        <div className="caption" aria-live="polite">{captions[step]}</div>

        {/* Controls */}
        <div className="controls">
          <button className="btn" onClick={reset}>??????? ?????</button>
        </div>
      </div>
    </main>
  );
}
