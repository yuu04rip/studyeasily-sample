"use client";

import React, { useEffect, useRef } from "react";
import Link from "next/link";

/** Tipi */
type LineCfg = {
    color: string;
    amplitude: number;
    freq: number;
    speed: number;
    stroke: number;
    id: string;
};

type Point = { x: number; y: number };

type LineState = {
    cfg: LineCfg;
    phase: number;
    pathElem: SVGPathElement | null;
    areaElem: SVGPathElement | null;
    dotElem: SVGCircleElement | null;
};

export default function BusinessSection(): JSX.Element {
    const svgRef = useRef<SVGSVGElement | null>(null);
    const animRef = useRef<number | null>(null);

    const linesConfig: LineCfg[] = [
        { color: "#E84CB4", amplitude: 22, freq: 0.9, speed: 0.9, stroke: 3, id: "l1" },
        { color: "#7C5AF0", amplitude: 30, freq: 0.6, speed: 0.6, stroke: 2.5, id: "l2" },
        { color: "#35D6C6", amplitude: 18, freq: 1.3, speed: 1.4, stroke: 2, id: "l3" },
        { color: "#FFD166", amplitude: 12, freq: 0.4, speed: 0.35, stroke: 1.8, id: "l4" },
    ];

    const POINTS = 200;

    const seedFromId = (id: string): number =>
        id.split("").reduce((acc, ch) => acc * 31 + ch.charCodeAt(0), 7) % 1000;

    // funzione di campionamento: envelope centrato (picco al centro X),
    // piccolo drift e pseudo-noise; rimosso ogni bias verso destra.
    const sampleFunction = (cfg: LineCfg, x: number, t: number): number => {
        const seed = seedFromId(cfg.id);
        const idPhase = (seed / 1000) * Math.PI * 2;

        // mix log/lineare per evitare compressione a sinistra ma senza bias direzionale
        const mix = 0.5;
        const logX = mix * Math.log1p(x * 9) + (1 - mix) * (x * 2.0);

        // envelope centrato (peak al centro) per rendere le onde più alte verticalmente
        const centerEnvelope = 0.35 + 0.65 * Math.sin(Math.PI * x); // 0..1 con picco a x=0.5

        // componenti armoniche multiple
        const base =
            Math.sin(logX * Math.PI * 2 * cfg.freq + t * cfg.speed + idPhase) *
            cfg.amplitude *
            centerEnvelope;

        const second =
            Math.sin(logX * Math.PI * 4 * cfg.freq + t * cfg.speed * 1.6 + idPhase * 0.7) *
            (cfg.amplitude * 0.45) *
            (0.6 + 0.4 * Math.sin(Math.PI * x)); // seconda che segue envelope

        const third =
            Math.cos(logX * Math.PI * 1.8 * cfg.freq - t * cfg.speed * 0.45 + idPhase * 0.4) *
            (cfg.amplitude * 0.22);

        // drift lento per movimento globale
        const drift = Math.sin(t * cfg.speed * 0.32 + idPhase * 0.6) * (cfg.amplitude * 0.14);

        // pseudo-noise per rompere monotonia
        const pseudoNoise = Math.sin((x * 60 + t * cfg.speed * 0.9) + idPhase) * (cfg.amplitude * 0.06);

        const combined = base + second + third + drift + pseudoNoise;

        return combined;
    };

    const pointsToSmoothPath = (points: Point[]): string => {
        if (points.length === 0) return "";
        let d = `M ${points[0].x.toFixed(2)} ${points[0].y.toFixed(2)}`;
        for (let i = 1; i < points.length; i++) {
            const prev = points[i - 1];
            const cur = points[i];
            const midX = (prev.x + cur.x) / 2;
            const midY = (prev.y + cur.y) / 2;
            d += ` Q ${prev.x.toFixed(2)} ${prev.y.toFixed(2)} ${midX.toFixed(2)} ${midY.toFixed(2)}`;
        }
        const last = points[points.length - 1];
        d += ` T ${last.x.toFixed(2)} ${last.y.toFixed(2)}`;
        return d;
    };

    useEffect(() => {
        const svg = svgRef.current;
        if (!svg) return;

        const linesState: LineState[] = linesConfig.map((cfg) => ({
            cfg,
            phase: Math.random() * Math.PI * 2,
            pathElem: svg.querySelector<SVGPathElement>(`#path-${cfg.id}`),
            areaElem: svg.querySelector<SVGPathElement>(`#area-${cfg.id}`),
            dotElem: svg.querySelector<SVGCircleElement>(`#dot-${cfg.id}`),
        }));

        let start: number | null = null;

        const animate = (timestamp: number): void => {
            if (start === null) start = timestamp;
            const t = (timestamp - start) / 1000;

            const vb = svg.viewBox && svg.viewBox.baseVal;
            const width = vb && vb.width ? vb.width : svg.clientWidth || 400;
            const height = vb && vb.height ? vb.height : svg.clientHeight || 260;
            const midY = height * 0.5;

            linesState.forEach((state, idx) => {
                const { cfg } = state;
                const pts: Point[] = [];

                // layer vertical shift: rialza gli strati superiori senza spostarli lungo X
                // idx = 0..(N-1), con idx maggiore -> strato più alto
                const layerFactor = idx / Math.max(1, linesState.length - 1);
                const verticalShift = layerFactor * (height * 0.18) - (height * 0.06); // tweak valori per più/meno sollevamento

                for (let i = 0; i < POINTS; i++) {
                    const nx = i / (POINTS - 1);
                    const x = nx * width;
                    const y = midY - sampleFunction(cfg, nx, t + state.phase) - verticalShift;
                    pts.push({ x, y });
                }

                const d = pointsToSmoothPath(pts);

                if (state.pathElem) state.pathElem.setAttribute("d", d);
                if (state.areaElem) {
                    const lastX = pts[pts.length - 1].x;
                    const firstX = pts[0].x;
                    const areaD = `${d} L ${lastX.toFixed(2)} ${height.toFixed(2)} L ${firstX.toFixed(2)} ${height.toFixed(2)} Z`;
                    state.areaElem.setAttribute("d", areaD);
                }

                if (state.dotElem) {
                    const progress = (t * cfg.speed * 0.25) % 1;
                    const idxPt = Math.floor(progress * (pts.length - 1));
                    const p = pts[idxPt];
                    state.dotElem.setAttribute("cx", p.x.toFixed(2));
                    state.dotElem.setAttribute("cy", p.y.toFixed(2));
                }
            });

            animRef.current = window.requestAnimationFrame(animate);
        };

        animRef.current = window.requestAnimationFrame(animate);

        return () => {
            if (animRef.current !== null) window.cancelAnimationFrame(animRef.current);
        };
    }, []);

    return (
        <section className="bg-gradient-to-b from-accent via-purple-700 to-darkPurple py-16">
            <div className="container mx-auto px-4">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                    <div className="relative">
                        <div className="aspect-square bg-gradient-to-br from-purple-600 to-accent/50 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute inset-0 grid grid-cols-8 grid-rows-8 pointer-events-none">
                                {Array.from({ length: 64 }).map((_, i) => (
                                    <div key={i} className="border border-purple-400/30" />
                                ))}
                            </div>

                            <svg
                                ref={svgRef}
                                viewBox="0 0 400 260"
                                preserveAspectRatio="xMidYMid meet"
                                className="w-full h-full relative"
                                aria-hidden="false"
                                role="img"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient id="grad-main" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="0%" stopColor="#E84CB4" stopOpacity="0.28" />
                                        <stop offset="100%" stopColor="#5B4D9D" stopOpacity="0.06" />
                                    </linearGradient>

                                    {linesConfig.map((cfg) => (
                                        <linearGradient key={cfg.id} id={`grad-${cfg.id}`} x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="0%" stopColor={cfg.color} stopOpacity="0.25" />
                                            <stop offset="100%" stopColor={cfg.color} stopOpacity="0.03" />
                                        </linearGradient>
                                    ))}

                                    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
                                        <feGaussianBlur stdDeviation="6" result="coloredBlur" />
                                        <feMerge>
                                            <feMergeNode in="coloredBlur" />
                                            <feMergeNode in="SourceGraphic" />
                                        </feMerge>
                                    </filter>
                                </defs>

                                <g opacity="0.06" transform="translate(0,0)">
                                    <rect x="0" y="0" width="400" height="260" fill="none" />
                                    {[0.15, 0.3, 0.5, 0.7, 0.85].map((pos, i) => (
                                        <line key={i} x1="0" x2="400" y1={pos * 260} y2={pos * 260} stroke="#ffffff" strokeWidth="0.6" />
                                    ))}
                                </g>

                                {linesConfig.map((cfg) => (
                                    <g key={cfg.id} id={`group-${cfg.id}`}>
                                        <path id={`area-${cfg.id}`} d="" fill={`url(#grad-${cfg.id})`} opacity="0.75" />
                                        <path
                                            id={`path-${cfg.id}`}
                                            d=""
                                            fill="none"
                                            stroke={cfg.color}
                                            strokeWidth={cfg.stroke}
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            style={{ mixBlendMode: "screen" }}
                                            filter={cfg.id === "l1" ? "url(#softGlow)" : undefined}
                                        />
                                        <circle id={`dot-${cfg.id}`} r={Math.max(2, cfg.stroke)} fill={cfg.color} opacity="0.95" />
                                    </g>
                                ))}

                                <rect x="0" y="0" width="400" height="260" fill="none" />
                            </svg>
                        </div>
                    </div>

                    <div className="text-white">
                        <h2 className="text-3xl md:text-5xl font-bold mb-6">Let's talk business.</h2>
                        <Link href="/business" className="inline-block bg-accent hover:bg-accent/90 text-white px-8 py-3 rounded-lg font-semibold transition">
                            Learn More
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    );
}