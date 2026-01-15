import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { motion } from "framer-motion";
const Character = ({ action = "idle" }) => {
  const bodyVariants = {
    idle: {
      y: [0, -10, 0],
      rotate: [0, 1, 0, -1, 0],
      transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
    },
    mine: {
      rotate: [-5, 5, -5],
      y: [0, 2, 0],
      transition: { duration: 0.4, repeat: Infinity }
    },
    research: {
      scale: [1, 1.02, 1],
      transition: { duration: 2, repeat: Infinity }
    },
    party: {
      y: [0, -30, 0],
      rotate: [-10, 10, -10],
      transition: { duration: 0.6, repeat: Infinity }
    }
  };
  const armLeftVariants = {
    idle: { rotate: 0 },
    mine: {
      rotate: [0, -45, 0],
      originX: 0.9,
      originY: 0.1,
      transition: { duration: 0.4, repeat: Infinity }
    },
    research: { rotate: -20 },
    party: { rotate: [130, 160, 130], transition: { duration: 0.3, repeat: Infinity } }
  };
  const armRightVariants = {
    idle: { rotate: 0 },
    mine: { rotate: 20 },
    research: {
      rotate: [0, 20, 0],
      transition: { duration: 1, repeat: Infinity }
    },
    party: { rotate: [-130, -160, -130], transition: { duration: 0.3, repeat: Infinity } }
  };
  const toolVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: { opacity: 1, scale: 1 }
  };
  return /* @__PURE__ */ jsxDEV(
    motion.div,
    {
      style: {
        width: 300,
        height: 300,
        position: "relative",
        filter: "drop-shadow(0px 10px 10px rgba(0,0,0,0.5))"
      },
      children: [
        /* @__PURE__ */ jsxDEV(
          motion.svg,
          {
            viewBox: "0 0 200 300",
            xmlns: "http://www.w3.org/2000/svg",
            animate: action,
            variants: bodyVariants,
            style: { overflow: "visible" },
            children: [
              /* @__PURE__ */ jsxDEV("defs", { children: [
                /* @__PURE__ */ jsxDEV("linearGradient", { id: "suitGrad", x1: "0%", y1: "0%", x2: "100%", y2: "0%", children: [
                  /* @__PURE__ */ jsxDEV("stop", { offset: "0%", stopColor: "#e0e0e0" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 74,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("stop", { offset: "100%", stopColor: "#ffffff" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 75,
                    columnNumber: 13
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 73,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV("linearGradient", { id: "visorGrad", x1: "0%", y1: "0%", x2: "0%", y2: "100%", children: [
                  /* @__PURE__ */ jsxDEV("stop", { offset: "0%", stopColor: "#111" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 78,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("stop", { offset: "50%", stopColor: "#333" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 79,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("stop", { offset: "51%", stopColor: "#000" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 80,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("stop", { offset: "100%", stopColor: "#222" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 81,
                    columnNumber: 13
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 77,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV("filter", { id: "outline", children: [
                  /* @__PURE__ */ jsxDEV("feMorphology", { in: "SourceAlpha", result: "DILATED", operator: "dilate", radius: "2" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 84,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("feFlood", { floodColor: "black", floodOpacity: "1", result: "FLOOD" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 85,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("feComposite", { in: "FLOOD", in2: "DILATED", operator: "in", result: "OUTLINE" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 86,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("feMerge", { children: [
                    /* @__PURE__ */ jsxDEV("feMergeNode", { in: "OUTLINE" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 88,
                      columnNumber: 15
                    }),
                    /* @__PURE__ */ jsxDEV("feMergeNode", { in: "SourceGraphic" }, void 0, false, {
                      fileName: "<stdin>",
                      lineNumber: 89,
                      columnNumber: 15
                    })
                  ] }, void 0, true, {
                    fileName: "<stdin>",
                    lineNumber: 87,
                    columnNumber: 13
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 83,
                  columnNumber: 11
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 72,
                columnNumber: 9
              }),
              /* @__PURE__ */ jsxDEV("g", { filter: "url(#outline)", children: [
                /* @__PURE__ */ jsxDEV("g", { transform: "translate(70, 220)", children: [
                  /* @__PURE__ */ jsxDEV("path", { d: "M0,0 Q-10,30 -20,60 L10,65 Q15,30 25,0 Z", fill: "#ccc", stroke: "#222", strokeWidth: "2" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 97,
                    columnNumber: 14
                  }),
                  /* @__PURE__ */ jsxDEV("path", { d: "M60,0 Q70,30 80,60 L50,65 Q45,30 35,0 Z", fill: "#ccc", stroke: "#222", strokeWidth: "2" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 98,
                    columnNumber: 14
                  }),
                  /* @__PURE__ */ jsxDEV("path", { d: "M-22,55 L12,60 L15,75 L-25,70 Z", fill: "#e67e22" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 100,
                    columnNumber: 14
                  }),
                  /* @__PURE__ */ jsxDEV("path", { d: "M48,60 L82,55 L85,70 L45,75 Z", fill: "#e67e22" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 101,
                    columnNumber: 14
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 96,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV("path", { d: "M40,100 L160,100 L170,200 L30,200 Z", fill: "#7f8c8d" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 105,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV("path", { d: "M60,120 C40,120 40,220 50,230 L150,230 C160,220 160,120 140,120 Z", fill: "url(#suitGrad)", stroke: "#222", strokeWidth: "3" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 108,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV("circle", { cx: "100", cy: "160", r: "20", fill: "#a5d6a7", stroke: "#222", strokeWidth: "2" }, void 0, false, {
                  fileName: "<stdin>",
                  lineNumber: 109,
                  columnNumber: 11
                }),
                /* @__PURE__ */ jsxDEV(
                  motion.g,
                  {
                    style: { originX: 0.9, originY: 0.1 },
                    transform: "translate(50, 130)",
                    variants: armLeftVariants,
                    children: [
                      /* @__PURE__ */ jsxDEV("path", { d: "M0,0 Q-20,40 -10,70", fill: "none", stroke: "#fff", strokeWidth: "20", strokeLinecap: "round" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 117,
                        columnNumber: 13
                      }),
                      /* @__PURE__ */ jsxDEV("circle", { cx: "-10", cy: "70", r: "12", fill: "#8bc34a" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 118,
                        columnNumber: 13
                      }),
                      action === "mine" && /* @__PURE__ */ jsxDEV("g", { transform: "translate(-10, 70) rotate(-90)", children: [
                        /* @__PURE__ */ jsxDEV("path", { d: "M-10,-30 L10,-30 L0,40 Z", fill: "#7f8c8d" }, void 0, false, {
                          fileName: "<stdin>",
                          lineNumber: 122,
                          columnNumber: 17
                        }),
                        /* @__PURE__ */ jsxDEV("rect", { x: "-2", y: "0", width: "4", height: "60", fill: "#8d6e63" }, void 0, false, {
                          fileName: "<stdin>",
                          lineNumber: 123,
                          columnNumber: 17
                        })
                      ] }, void 0, true, {
                        fileName: "<stdin>",
                        lineNumber: 121,
                        columnNumber: 15
                      })
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "<stdin>",
                    lineNumber: 112,
                    columnNumber: 11
                  }
                ),
                /* @__PURE__ */ jsxDEV(
                  motion.g,
                  {
                    style: { originX: 0.1, originY: 0.1 },
                    transform: "translate(150, 130)",
                    variants: armRightVariants,
                    children: [
                      /* @__PURE__ */ jsxDEV("path", { d: "M0,0 Q20,40 10,70", fill: "none", stroke: "#fff", strokeWidth: "20", strokeLinecap: "round" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 134,
                        columnNumber: 13
                      }),
                      /* @__PURE__ */ jsxDEV("circle", { cx: "10", cy: "70", r: "12", fill: "#8bc34a" }, void 0, false, {
                        fileName: "<stdin>",
                        lineNumber: 135,
                        columnNumber: 13
                      }),
                      action === "research" && /* @__PURE__ */ jsxDEV("g", { transform: "translate(10, 60)", children: [
                        /* @__PURE__ */ jsxDEV("path", { d: "M-10,0 L10,0 L15,20 L-15,20 Z", fill: "#fff", stroke: "#222", opacity: "0.8" }, void 0, false, {
                          fileName: "<stdin>",
                          lineNumber: 139,
                          columnNumber: 18
                        }),
                        /* @__PURE__ */ jsxDEV("path", { d: "M-12,15 L12,15 L10,20 L-10,20 Z", fill: "#00ff00" }, void 0, false, {
                          fileName: "<stdin>",
                          lineNumber: 140,
                          columnNumber: 18
                        })
                      ] }, void 0, true, {
                        fileName: "<stdin>",
                        lineNumber: 138,
                        columnNumber: 15
                      })
                    ]
                  },
                  void 0,
                  true,
                  {
                    fileName: "<stdin>",
                    lineNumber: 129,
                    columnNumber: 11
                  }
                ),
                /* @__PURE__ */ jsxDEV("g", { transform: "translate(100, 90)", children: [
                  /* @__PURE__ */ jsxDEV("ellipse", { cx: "0", cy: "0", rx: "45", ry: "35", fill: "#8bc34a", stroke: "#222", strokeWidth: "3" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 147,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("line", { x1: "0", y1: "-35", x2: "0", y2: "-50", stroke: "#8bc34a", strokeWidth: "3" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 149,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("circle", { cx: "0", cy: "-55", r: "5", fill: "#e91e63", children: /* @__PURE__ */ jsxDEV("animate", { attributeName: "opacity", values: "0.5;1;0.5", dur: "1s", repeatCount: "indefinite" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 151,
                    columnNumber: 16
                  }) }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 150,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("path", { d: "M-35,-5 L-5,-5 L-5,10 C-5,15 -15,20 -20,20 C-25,20 -35,15 -35,10 Z", fill: "url(#visorGrad)", stroke: "#fff", strokeWidth: "1" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 155,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("path", { d: "M5,-5 L35,-5 L35,10 C35,15 25,20 20,20 C15,20 5,15 5,10 Z", fill: "url(#visorGrad)", stroke: "#fff", strokeWidth: "1" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 156,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("line", { x1: "-5", y1: "-2", x2: "5", y2: "-2", stroke: "#111", strokeWidth: "2" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 157,
                    columnNumber: 13
                  }),
                  /* @__PURE__ */ jsxDEV("path", { d: "M-10,20 Q0,25 10,20", fill: "none", stroke: "#2e7d32", strokeWidth: "2", strokeLinecap: "round" }, void 0, false, {
                    fileName: "<stdin>",
                    lineNumber: 160,
                    columnNumber: 13
                  })
                ] }, void 0, true, {
                  fileName: "<stdin>",
                  lineNumber: 146,
                  columnNumber: 11
                })
              ] }, void 0, true, {
                fileName: "<stdin>",
                lineNumber: 94,
                columnNumber: 9
              })
            ]
          },
          void 0,
          true,
          {
            fileName: "<stdin>",
            lineNumber: 64,
            columnNumber: 7
          }
        ),
        action === "mine" && /* @__PURE__ */ jsxDEV(motion.div, { style: { position: "absolute", top: 150, left: 20 }, children: /* @__PURE__ */ jsxDEV(motion.div, { animate: { opacity: [0, 1, 0], y: -20, x: -10 }, transition: { duration: 0.8, repeat: Infinity }, children: "\u2728" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 168,
          columnNumber: 12
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 167,
          columnNumber: 9
        }),
        action === "research" && /* @__PURE__ */ jsxDEV(motion.div, { style: { position: "absolute", top: 0, right: 40 }, children: /* @__PURE__ */ jsxDEV(motion.div, { animate: { opacity: [0, 1, 0], y: -30 }, transition: { duration: 1.5, repeat: Infinity }, children: "\u{1F4A1}" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 176,
          columnNumber: 12
        }) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 175,
          columnNumber: 9
        }),
        action === "party" && /* @__PURE__ */ jsxDEV(motion.div, { style: { position: "absolute", inset: -20, pointerEvents: "none" }, children: /* @__PURE__ */ jsxDEV(
          motion.div,
          {
            style: { width: "100%", height: "100%", borderRadius: "50%", border: "2px solid #ff00ff" },
            animate: { scale: [0.8, 1.5], opacity: [1, 0] },
            transition: { duration: 1, repeat: Infinity }
          },
          void 0,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 184,
            columnNumber: 12
          }
        ) }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 183,
          columnNumber: 10
        })
      ]
    },
    void 0,
    true,
    {
      fileName: "<stdin>",
      lineNumber: 56,
      columnNumber: 5
    }
  );
};
export {
  Character
};
