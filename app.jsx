import { Fragment, jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import { Player } from "@websim/remotion/player";
import { OfflineReplay } from "./replayComposition.jsx";
import { ACTIONS, calculateOfflineProgress, INITIAL_STATE } from "./gameLogic.js";
import { motion, AnimatePresence } from "framer-motion";
import { GameScene } from "./GameScene.jsx";
const ROOM = new WebsimSocket();
function App() {
  const [user, setUser] = useState(null);
  const [record, setRecord] = useState(null);
  const [simulation, setSimulation] = useState(null);
  const [showReplay, setShowReplay] = useState(false);
  const [showActions, setShowActions] = useState(false);
  const [loading, setLoading] = useState(true);
  const [posting, setPosting] = useState(false);
  const [ghosts, setGhosts] = useState([]);
  const sfxCollect = useRef(null);
  useEffect(() => {
    init();
  }, []);
  const init = async () => {
    await ROOM.initialize();
    const u = await window.websim.getCurrentUser();
    setUser(u);
    const records = await ROOM.collection("idle_it_v1").filter({ username: u.username }).getList();
    let currentRecord = records[0];
    const activePeersCount = Object.keys(ROOM.peers).length;
    const ghostsNeeded = Math.max(0, 32 - activePeersCount);
    if (ghostsNeeded > 0) {
      const ghostRecords = await ROOM.collection("idle_it_v1").filter({ username: { "!=": u.username } }).getList({ sort: "-updated", perPage: ghostsNeeded });
      setGhosts(ghostRecords);
    }
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
    setShowActions(false);
  };
  const playSound = (type) => {
    const audio = new Audio(type === "collect" ? "sfx_collect.mp3" : "sfx_levelup.mp3");
    audio.volume = 0.5;
    audio.play();
  };
  const collectReward = () => {
    playSound("collect");
    setSimulation(null);
    setShowReplay(false);
  };
  if (loading) return /* @__PURE__ */ jsxDEV("div", { className: "loading", children: "Waking up from cryosleep..." }, void 0, false, {
    fileName: "<stdin>",
    lineNumber: 118,
    columnNumber: 23
  }, this);
  return /* @__PURE__ */ jsxDEV("div", { className: "game-container", children: [
    /* @__PURE__ */ jsxDEV(
      GameScene,
      {
        room: ROOM,
        currentAction: record?.current_action || "idle",
        ghosts
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 123,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("div", { className: "ui-layer", children: [
      /* @__PURE__ */ jsxDEV("header", { children: [
        /* @__PURE__ */ jsxDEV("div", { className: "user-badge", children: [
          /* @__PURE__ */ jsxDEV("img", { src: user?.avatar_url, className: "avatar" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 133,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "info", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "username", children: user?.username }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 135,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "level", children: [
              "Lvl ",
              Math.floor((record?.xp || 0) / 1e3) + 1
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 136,
              columnNumber: 15
            }, this)
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
        /* @__PURE__ */ jsxDEV("div", { className: "resources", children: [
          /* @__PURE__ */ jsxDEV("div", { className: "res", children: [
            /* @__PURE__ */ jsxDEV("img", { src: "icon_energy.png" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 142,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: [
              Math.floor(record?.energy || 0),
              "h"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 143,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 141,
            columnNumber: 13
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "res", children: [
            /* @__PURE__ */ jsxDEV("img", { src: "icon_gold.png" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 146,
              columnNumber: 15
            }, this),
            /* @__PURE__ */ jsxDEV("span", { children: record?.gold || 0 }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 147,
              columnNumber: 15
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 145,
            columnNumber: 13
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 140,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 131,
        columnNumber: 9
      }, this),
      /* @__PURE__ */ jsxDEV("div", { className: "status-footer", children: [
        /* @__PURE__ */ jsxDEV("div", { className: "status-badge", children: [
          "Status: ",
          ACTIONS[record?.current_action?.toUpperCase()]?.label || "Unknown"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 154,
          columnNumber: 11
        }, this),
        /* @__PURE__ */ jsxDEV("div", { className: "controls-hint", children: "WASD / Touch to move" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 157,
          columnNumber: 11
        }, this)
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 153,
        columnNumber: 9
      }, this)
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 130,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV("button", { className: "fab", onClick: () => setShowActions(true), children: /* @__PURE__ */ jsxDEV("img", { src: "icon_energy.png", alt: "Actions" }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 165,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 164,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(AnimatePresence, { children: showActions && /* @__PURE__ */ jsxDEV(Fragment, { children: [
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          className: "modal-overlay",
          initial: { opacity: 0 },
          animate: { opacity: 1 },
          exit: { opacity: 0 },
          onClick: () => setShowActions(false),
          style: { zIndex: 90 }
        },
        void 0,
        false,
        {
          fileName: "<stdin>",
          lineNumber: 172,
          columnNumber: 13
        },
        this
      ),
      /* @__PURE__ */ jsxDEV(
        motion.div,
        {
          className: "action-drawer",
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          transition: { type: "spring", damping: 25, stiffness: 300 },
          children: [
            /* @__PURE__ */ jsxDEV("div", { className: "drawer-header", children: [
              /* @__PURE__ */ jsxDEV("h3", { children: "Select Protocol" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 188,
                columnNumber: 17
              }, this),
              /* @__PURE__ */ jsxDEV("button", { className: "close-btn", onClick: () => setShowActions(false), children: "\u2715" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 189,
                columnNumber: 17
              }, this)
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 187,
              columnNumber: 15
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
                    lineNumber: 200,
                    columnNumber: 21
                  }, this),
                  /* @__PURE__ */ jsxDEV("div", { className: "action-rate", children: action.desc }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 201,
                    columnNumber: 21
                  }, this)
                ]
              },
              key,
              true,
              {
                fileName: "<stdin>",
                lineNumber: 193,
                columnNumber: 19
              },
              this
            )) }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 191,
              columnNumber: 15
            }, this)
          ]
        },
        void 0,
        true,
        {
          fileName: "<stdin>",
          lineNumber: 180,
          columnNumber: 13
        },
        this
      )
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 171,
      columnNumber: 11
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 169,
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
            lineNumber: 222,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("p", { children: [
            "You were gone for ",
            /* @__PURE__ */ jsxDEV("strong", { children: [
              simulation.hoursPassed.toFixed(1),
              " hours"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 223,
              columnNumber: 40
            }, this),
            "."
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 223,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "rewards-list", children: [
            /* @__PURE__ */ jsxDEV("div", { className: "reward-item", children: [
              /* @__PURE__ */ jsxDEV("img", { src: "icon_gold.png" }, void 0, false, {
                fileName: "<stdin>",
                lineNumber: 227,
                columnNumber: 23
              }, this),
              " +",
              simulation.goldEarned,
              " Gold"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 226,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("div", { className: "reward-item", children: [
              "\u2728 +",
              simulation.xpEarned,
              " XP"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 229,
              columnNumber: 21
            }, this),
            simulation.drops.length > 0 && /* @__PURE__ */ jsxDEV("div", { className: "reward-item special", children: [
              "\u{1F0CF} Found ",
              simulation.drops.length,
              " Item(s)!"
            ] }, void 0, true, {
              fileName: "<stdin>",
              lineNumber: 233,
              columnNumber: 23
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 225,
            columnNumber: 19
          }, this),
          /* @__PURE__ */ jsxDEV("div", { className: "button-group", children: [
            /* @__PURE__ */ jsxDEV("button", { className: "primary-btn", onClick: collectReward, children: "Collect & Continue" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 240,
              columnNumber: 21
            }, this),
            /* @__PURE__ */ jsxDEV("button", { className: "secondary-btn", onClick: () => {
              setShowReplay(true);
              playSound("levelup");
            }, children: "\u{1F4FA} Watch Replay" }, void 0, false, {
              fileName: "<stdin>",
              lineNumber: 241,
              columnNumber: 21
            }, this)
          ] }, void 0, true, {
            fileName: "<stdin>",
            lineNumber: 239,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 221,
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
                username: user?.username || "Space Pilot"
              },
              style: {
                width: "100%",
                height: "auto",
                aspectRatio: "2/3",
                borderRadius: "12px",
                overflow: "hidden",
                border: "2px solid #00ffff"
              },
              autoPlay: true,
              loop: false,
              controls: true
            },
            void 0,
            false,
            {
              fileName: "<stdin>",
              lineNumber: 251,
              columnNumber: 19
            },
            this
          ),
          /* @__PURE__ */ jsxDEV("button", { className: "close-replay", onClick: () => setShowReplay(false), children: "Back to Summary" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 273,
            columnNumber: 19
          }, this)
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 250,
          columnNumber: 17
        }, this) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 219,
          columnNumber: 13
        }, this)
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 213,
        columnNumber: 11
      },
      this
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 211,
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
          background: transparent;
          pointer-events: none;
        }
        .ui-layer > * {
          pointer-events: auto;
        }
        header {
          pointer-events: none;
        }
        .user-badge, .resources {
          pointer-events: auto;
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

        
        .status-footer {
          position: absolute;
          bottom: 20px;
          left: 20px;
          pointer-events: none;
        }
        .status-badge {
          padding: 8px 16px;
          background: rgba(0,0,0,0.6);
          border: 1px solid #00ffff;
          border-radius: 10px;
          color: #00ffff;
          text-transform: uppercase;
          letter-spacing: 2px;
          font-size: 0.8em;
          margin-bottom: 5px;
        }
        .controls-hint {
          color: #aaa;
          font-size: 0.8em;
        }

        /* Action Drawer */
        .action-drawer {
          position: fixed;
          bottom: 0;
          left: 0;
          right: 0;
          background: #151520;
          border-top: 2px solid #00ffff;
          padding: 20px;
          border-radius: 20px 20px 0 0;
          z-index: 95;
          box-shadow: 0 -10px 30px rgba(0,0,0,0.5);
        }
        .drawer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 20px;
        }
        .drawer-header h3 { margin: 0; color: #fff; }
        .close-btn { background: none; border: none; color: #aaa; font-size: 1.5em; cursor: pointer; }
        
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
        
        /* Floating Action Button */
        .fab {
          position: fixed;
          bottom: 30px;
          right: 30px;
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: linear-gradient(135deg, #00ffff, #0099ff);
          border: 2px solid #fff;
          box-shadow: 0 5px 20px rgba(0,255,255,0.4);
          display: flex;
          justify-content: center;
          align-items: center;
          cursor: pointer;
          z-index: 50;
          transition: transform 0.2s;
        }
        .fab:active { transform: scale(0.95); }
        .fab img { width: 40px; height: 40px; }

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
      lineNumber: 281,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 121,
    columnNumber: 5
  }, this);
}
const root = createRoot(document.getElementById("app"));
root.render(/* @__PURE__ */ jsxDEV(App, {}, void 0, false, {
  fileName: "<stdin>",
  lineNumber: 557,
  columnNumber: 13
}));
