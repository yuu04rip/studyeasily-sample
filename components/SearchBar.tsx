// components/SearchBar.tsx
"use client";

import React, { useState } from "react";

const SearchBar: React.FC = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className="search-container">
            <div className="search">
                <button
                    type="button"
                    aria-label="Cerca"
                    className={`search-btn ${open ? "open" : ""}`}
                    onClick={() => setOpen(!open)}
                >
                    <span className="click-hint">Click me!</span>
                    <svg
                        className="search-icon"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                    >
                        <circle cx="11" cy="11" r="8" />
                        <path d="m21 21-4.3-4.3" />
                    </svg>
                </button>
                <input
                    type="text"
                    placeholder="Cerca corsi..."
                    aria-label="Cerca corsi"
                    className={open ? "open" : ""}
                />
            </div>

            <style jsx>{`
                .search-container {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    padding: 2rem 0;
                }

                .search {
                    position: relative;
                    width: 100%;
                    max-width: 700px;
                    height: 50px;
                }

                input {
                    width: 40px;
                    height: 50px;
                    position: absolute;
                    right: 0;
                    top: 0;
                    padding: 0 25px;
                    border-radius: 25px;
                    border: none;
                    font-size: 18px;
                    font-weight: 300;
                    color: #4e4e4e;
                    background: white;
                    box-shadow: 0 0 10px rgba(255, 255, 255, 0.2),
                    0 0 20px rgba(255, 255, 255, 0.1),
                    0 0 30px rgba(255, 255, 255, 0.05);
                    transition: width 0.4s ease, box-shadow 0.3s ease;
                    z-index: 5;
                }

                input.open {
                    width: 100%;
                    box-shadow: 0 0 10px #7c3aed, 0 0 20px #9333ea, 0 0 30px #a855f7;
                }

                input::placeholder {
                    color: #999;
                    opacity: 0;
                    transition: opacity 0.3s ease;
                }

                input.open::placeholder {
                    opacity: 1;
                }

                .search-btn {
                    width: 50px;
                    height: 50px;
                    border-radius: 50%;
                    border: none;
                    position: absolute;
                    right: 0;
                    top: 0;
                    background: #2d2926;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    z-index: 10;
                    transition: box-shadow 0.3s ease, transform 0.3s ease;
                    overflow: visible;
                }

                /* Click hint animation */
                .click-hint {
                    position: absolute;
                    bottom: 60px;
                    font-size: 12px;
                    color: #a855f7;
                    opacity: 0;
                    pointer-events: none;
                    animation: hintAnim 1.2s infinite;
                }

                @keyframes hintAnim {
                    0%, 100% { transform: translateY(0); opacity: 0; }
                    50% { transform: translateY(-5px); opacity: 1; }
                }

                .search-btn:hover .search-icon,
                .search-btn.open .search-icon {
                    filter: drop-shadow(0 0 5px #7c3aed)
                    drop-shadow(0 0 10px #9333ea)
                    drop-shadow(0 0 15px #a855f7);
                    transform: rotate(20deg);
                    transition: transform 0.3s ease, filter 0.3s ease;
                }

                .search-btn.open .click-hint {
                    display: none;
                }

                /* Responsive */
                @media (max-width: 768px) {
                    .search {
                        max-width: 500px;
                    }
                }

                @media (max-width: 480px) {
                    .search {
                        max-width: 350px;
                    }
                }

                @media (max-width: 360px) {
                    .search {
                        max-width: 280px;
                    }
                }
            `}</style>
        </div>
    );
};

export default SearchBar;
