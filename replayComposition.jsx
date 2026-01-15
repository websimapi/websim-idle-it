import { jsxDEV } from "react/jsx-dev-runtime";
import React from "react";
import { AbsoluteFill, useVideoConfig, useCurrentFrame, interpolate, Img, Audio, staticFile } from "remotion";
const OfflineReplay = ({ simulationData, username }) => {
  const { fps, durationInFrames } = useVideoConfig();
  const frame = useCurrentFrame();
  const { goldEarned, effectiveHours, actionName, drops } = simulationData;
  const bgTranslate = interpolate(frame, [0, durationInFrames], [0, -100]);
  const charY = interpolate(frame, [0, 30, 60], [0, -20, 0], {
    extrapolateLeft: "clamp",
    extrapolateRight: "clamp"
  });
  const currentGold = Math.floor(interpolate(frame, [0, durationInFrames - 30], [0, goldEarned], {
    extrapolateRight: "clamp"
  }));
  const timeDisplay = interpolate(frame, [0, durationInFrames], [0, effectiveHours]);
  return /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { backgroundColor: "#000", overflow: "hidden" }, children: [
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { children: /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: staticFile("space_bg.png"),
        style: {
          width: "120%",
          height: "120%",
          transform: `translateY(${bgTranslate}px) scale(1.1)`
        }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 32,
        columnNumber: 9
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 31,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 40,
      left: 0,
      width: "100%",
      textAlign: "center",
      color: "#00ffff",
      fontFamily: "monospace",
      fontSize: 32,
      fontWeight: "bold",
      textShadow: "0 0 10px #00ffff"
    }, children: [
      "LOG REPLAY: ",
      username
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 43,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { style: {
      position: "absolute",
      top: 80,
      left: 0,
      width: "100%",
      textAlign: "center",
      color: "#fff",
      fontSize: 24
    }, children: [
      "Task: ",
      actionName
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { justifyContent: "center", alignItems: "center" }, children: /* @__PURE__ */ jsxDEV("div", { style: { transform: `translateY(${Math.sin(frame / 10) * 10}px)` }, children: /* @__PURE__ */ jsxDEV(
      Img,
      {
        src: staticFile("alien_char.png"),
        style: { width: 200, height: 200 }
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 73,
        columnNumber: 12
      }
    ) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 72,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 71,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV(AbsoluteFill, { style: { justifyContent: "center", alignItems: "center", top: -150 }, children: [
      /* @__PURE__ */ jsxDEV("div", { style: {
        fontSize: 60,
        color: "#ffd700",
        fontWeight: "bold",
        textShadow: "2px 2px 0px #000"
      }, children: [
        "+",
        currentGold,
        " Gold"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 82,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("div", { style: { fontSize: 30, color: "#aaa" }, children: [
        "Time: ",
        timeDisplay.toFixed(1),
        " hrs"
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 90,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 81,
      columnNumber: 7
    }),
    drops.map((drop, i) => {
      const startFrame = durationInFrames / 2 + i * 20;
      const opacity = interpolate(frame, [startFrame, startFrame + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      const scale = interpolate(frame, [startFrame, startFrame + 10], [0, 1], { extrapolateLeft: "clamp", extrapolateRight: "clamp" });
      return /* @__PURE__ */ jsxDEV("div", { style: {
        position: "absolute",
        bottom: 100 + i * 60,
        left: "10%",
        right: "10%",
        backgroundColor: "rgba(0,0,0,0.8)",
        border: "2px solid #00ffff",
        padding: 10,
        borderRadius: 10,
        opacity,
        transform: `scale(${scale})`,
        display: "flex",
        alignItems: "center",
        gap: 10
      }, children: [
        /* @__PURE__ */ jsxDEV(Img, { src: staticFile("card_frame.png"), style: { width: 40, height: 40 } }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 118,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("span", { style: { color: "#fff" }, children: [
          "Found: ",
          drop.name,
          "!"
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 119,
          columnNumber: 13
        })
      ] }, i, true, {
        fileName: "<stdin>",
        lineNumber: 103,
        columnNumber: 11
      });
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 29,
    columnNumber: 5
  });
};
export {
  OfflineReplay
};
