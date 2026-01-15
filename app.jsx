import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { OfflineReplay } from "./replayComposition.jsx";
import { ACTIONS, calculateOfflineProgress, INITIAL_STATE } from "./gameLogic.js";
import { motion, AnimatePresence } from "framer-motion";
const ROOM = new WebsimSocket();
function App() {
  const [user, setUser] = useState(null);
  const [record, setRecord] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [showReplay, setShowReplay] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const sfxCollect = useRef(null);
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    const u = await window.websim.getCurrentUser();
    setUser(u);
    const records = await ROOM.collection("idle_it_v1").filter({ username: u.username }).getList();
    let currentRecord = records[0];
    if (!currentRecord) {
      currentRecord = await ROOM.collection("idle_it_v1").create({
        ...INITIAL_STATE,
        username: u.username
      });
      setRecord(currentRecord);
      setLoading(false);
    } else {
      const result = calculateOfflineProgress(currentRecord);
      setSimulation(result);
      const updatedData = {
        energy: 24,
        // Reset energy on checkin
        gold: (currentRecord.gold || 0) + result.goldEarned,
        xp: (currentRecord.xp || 0) + result.xpEarned,
        last_checkin: (/* @__PURE__ */ new Date()).toISOString(),
        inventory: [...currentRecord.inventory || [], ...result.drops]
      };
      setRecord({ ...currentRecord, ...updatedData });
      await ROOM.collection("idle_it_v1").update(currentRecord.id, updatedData);
      setLoading(false);
    }
  };
  const handleActionChange = async (actionKey) => {
    if (posting) return;
    setPosting(true);
    const action = ACTIONS[actionKey];
    try {
      await window.websim.postComment({
        content: `I am starting to ${action.label}! \u{1F680} #idleit`
      });
    } catch (e) {
      console.error("Comment failed", e);
    }
    const updated = await ROOM.collection("idle_it_v1").update(record.id, {
      current_action: action.id,
      last_checkin: (/* @__PURE__ */ new Date()).toISOString()
      // Reset timer for new action
    });
    setRecord(updated);
    setPosting(false);
  };
  const playSound = (type) => {
    const audio = new Audio(type === "collect" ? "sfx_collect.mp3" : "sfx_levelup.mp3");
    audio.volume = 0.5;
    audio.play();
  };
  const collectReward = () => {
    playSound("collect");
    setSimulation(null);
  };
  if (loading) return /* @__PURE__ */ jsxDEV("div", { className: "loading", children: "Waking up from cryosleep..." }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 100,
    columnNumber: 23
  }, this);
  return /* @__PURE__ */ jsxDEV("div", { className: "game-container", children: [
    /* @__PURE__ */ jsxDEV("div", { className: "bg-layer", style: { backgroundImage: "url(space_bg.png)" } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 105,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("div", { className: "ui-layer", children: [
      /* @__PURE__ */ jsxDEV("header", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "user-badge", children: [
          /* @__PURE__ */ jsxDEV("img", { src: user?.avatar_url, className: "avatar" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 111,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "info", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "username", children: user?.username }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 113,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "level", children: [
              "Lvl ",
              Math.floor((record?.xp || 0) / 1e3) + 1
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 114,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 112,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 110,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "resources", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "res", children: [
            /* @__PURE__ */ jsxDEV("img", { src: "icon_energy.png" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 120,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              Math.floor(record?.energy || 0),
              "h"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 121,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 119,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "res", children: [
            /* @__PURE__ */ jsxDEV("img", { src: "icon_gold.png" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 124,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: record?.gold || 0 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 125,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 123,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 118,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 109,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("main", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "character-stage", children: [
          /* @__PURE__ */ jsxDEV("img", { src: "alien_char.png", className: "char-sprite floating" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 133,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "status-badge", children: [
            "Status: ",
            ACTIONS[record?.current_action?.toUpperCase()]?.label || "Unknown"
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 134,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 132,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "action-panel", children: [
          /* @__PURE__ */ jsxDEV("h3", { children: "Choose Next Task" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 140,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "action-grid", children: Object.entries(ACTIONS).map(([key, action]) => /* @__PURE__ */ jsxDEV(
            "button",
            {
              className: `action-btn ${record?.current_action === action.id ? "active" : ""}`,
              onClick: () => handleActionChange(key),
              disabled: posting,
              style: { "--btn-color": action.color },
              children: [
                /* @__PURE__ */ jsxDEV("div", { className: "action-label", children: action.label }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 150,
                  columnNumber: 19
                }, this),
                /* @__PURE__ */ jsxDEV("div", { className: "action-rate", children: action.desc }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 151,
                  columnNumber: 19
                }, this)
              ]
            },
            key,
            true,
            {
              fileName: "<stdin>",
              lineNumber: 143,
              columnNumber: 17
            },
            this
          )) }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 141,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 139,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 131,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 108,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: simulation && simulation.effectiveHours > 0.01 && /* @__PURE__ */ jsxDEV(
      motion.div,
      {
        className: "modal-overlay",
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        children: /* @__PURE__ */ jsxDEV("div", { className: "modal-content", children: !showReplay ? /* @__PURE__ */ jsxDEV(Fragment, { children: [
          /* @__PURE__ */ jsxDEV("h2", { children: "Mission Report" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 171,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: [
            "You were gone for ",
            /* @__PURE__ */ jsxDEV("strong", { children: [
              simulation.hoursPassed.toFixed(1),
              " hours"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 172,
              columnNumber: 40
            }, this),
            "."
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 172,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "rewards-list", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "reward-item", children: [
              /* @__PURE__ */ jsxDEV("img", { src: "icon_gold.png" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 176,
                columnNumber: 23
              }, this),
              " +",
              simulation.goldEarned,
              " Gold"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 175,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "reward-item", children: [
              "\u2728 +",
              simulation.xpEarned,
              " XP"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 178,
              columnNumber: 21
            }, this),
            simulation.drops.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "reward-item special", children: [
              "\u{1F0CF} Found ",
              simulation.drops.length,
              " Item(s)!"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 182,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 174,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "button-group", children: [
            /* @__PURE__ */ jsxDEV("button", { className: "primary-btn", onClick: collectReward, children: "Collect & Continue" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 189,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("button", { className: "secondary-btn", onClick: () => setShowReplay(true), children: "\u{1F4FA} Watch Replay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 190,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 188,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 170,
          columnNumber: 17
        }, this) : /* @__PURE__ */ jsxDEV("div", { className: "replay-container", children: [
          /* @__PURE__ */ jsxDEV(
            Player,
            {
              component: OfflineReplay,
              durationInFrames: 300,
              fps: 30,
              compositionWidth: 400,
              compositionHeight: 600,
              inputProps: {
                simulationData: simulation,
                username: user.username
              },
              style: { width: "100%", height: "100%" },
              autoPlay: true,
              loop: false,
              controls: true
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 197,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("button", { className: "close-replay", onClick: collectReward, children: "Close" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 212,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 196,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 168,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 162,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 160,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("style", { jsx: true, children: `
        .game-container {
          position: relative;
          height: 100vh;
          width: 100vw;
          overflow: hidden;
        }
        .bg-layer {
          position: absolute;
          inset: 0;
          background-size: cover;
          background-position: center;
          opacity: 0.8;
          z-index: 0;
        }
        .ui-layer {
          position: relative;
          z-index: 10;
          height: 100%;
          display: flex;
          flex-direction: column;
          background: rgba(0,0,0,0.3);
        }
        
        header {
          padding: 20px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          background: linear-gradient(to bottom, rgba(0,0,0,0.9), transparent);
        }
        .user-badge {
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .avatar {
          width: 50px;
          height: 50px;
          border-radius: 50%;
          border: 2px solid #00ffff;
        }
        .username { font-weight: bold; color: #00ffff; }
        .level { font-size: 0.8em; color: #aaa; }
        
        .resources {
          display: flex;
          gap: 15px;
        }
        .res {
          display: flex;
          align-items: center;
          gap: 5px;
          background: rgba(0,0,0,0.6);
          padding: 5px 10px;
          border-radius: 20px;
          border: 1px solid #333;
        }
        .res img { width: 24px; height: 24px; }

        main {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding-bottom: 20px;
        }

        .character-stage {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        .char-sprite {
          width: 250px;
          image-rendering: pixelated;
        }
        .floating {
          animation: float 3s ease-in-out infinite;
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }
        
        .status-badge {
          margin-top: 20px;
          padding: 8px 16px;
          background: rgba(0,255,255,0.1);
          border: 1px solid #00ffff;
          border-radius: 10px;
          color: #00ffff;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8em;
        }

        .action-panel {
          background: rgba(0,0,0,0.8);
          border-top: 2px solid #333;
          padding: 20px;
          border-radius: 20px 20px 0 0;
        }
        .action-panel h3 { margin: 0 0 15px 0; color: #aaa; font-size: 0.9em; text-transform: uppercase; }
        .action-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }
        .action-btn {
          background: rgba(255,255,255,0.05);
          border: 1px solid #444;
          padding: 15px;
          border-radius: 10px;
          color: white;
          text-align: left;
          cursor: pointer;
          transition: all 0.2s;
          position: relative;
          overflow: hidden;
        }
        .action-btn::before {
          content: '';
          position: absolute;
          left: 0; top: 0; bottom: 0; width: 4px;
          background: var(--btn-color);
        }
        .action-btn.active {
          background: rgba(255,255,255,0.15);
          border-color: #fff;
        }
        .action-label { font-weight: bold; margin-bottom: 5px; }
        .action-rate { font-size: 0.75em; color: #aaa; }

        /* Modal */
        .modal-overlay {
          position: fixed;
          inset: 0;
          background: rgba(0,0,0,0.85);
          z-index: 100;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 20px;
        }
        .modal-content {
          background: #1a1a2e;
          padding: 30px;
          border-radius: 20px;
          border: 1px solid #00ffff;
          text-align: center;
          max-width: 400px;
          width: 100%;
          box-shadow: 0 0 50px rgba(0,255,255,0.2);
        }
        .rewards-list {
          background: rgba(0,0,0,0.3);
          padding: 15px;
          border-radius: 10px;
          margin: 20px 0;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .reward-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 1.2em;
          color: #ffd700;
        }
        .reward-item img { width: 24px; }
        .reward-item.special { color: #ff00ff; }
        
        .button-group {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .primary-btn {
          background: #00ffff;
          color: #000;
          border: none;
          padding: 15px;
          border-radius: 10px;
          font-weight: bold;
          font-size: 1.1em;
          cursor: pointer;
        }
        .secondary-btn {
          background: transparent;
          color: #00ffff;
          border: 1px solid #00ffff;
          padding: 10px;
          border-radius: 10px;
          cursor: pointer;
        }
        
        .replay-container {
          height: 60vh;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        .close-replay {
          padding: 10px;
          background: #333;
          color: white;
          border: none;
          border-radius: 5px;
        }
        .loading {
          height: 100vh;
          display: flex;
          justify-content: center;
          align-items: center;
          color: #00ffff;
          font-family: monospace;
          background: #000;
        }
      ` }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 220,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 103,
    columnNumber: 5
  }, this);
}
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 450,
  columnNumber: 13
}));
