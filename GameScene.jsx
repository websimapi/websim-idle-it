import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Stars, Text, Html, PerspectiveCamera, Environment } from "@react-three/drei";
import * as THREE from "three";
import nipplejs from "nipplejs";
import { VoxelCharacter } from "./VoxelCharacter.jsx";
import { ACTIONS } from "./gameLogic.js";
function Ground() {
  return /* @__PURE__ */ jsxDEV("mesh", { rotation: [-Math.PI / 2, 0, 0], position: [0, -0.1, 0], receiveShadow: true, children: [
    /* @__PURE__ */ jsxDEV("planeGeometry", { args: [100, 100] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 14,
      columnNumber: 7
    }, this),
    /* @__PURE__ */ jsxDEV(
      "meshStandardMaterial",
      {
        color: "#222",
        roughness: 0.8,
        metalness: 0.2
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 15,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV("gridHelper", { args: [100, 50, "#444", "#111"], rotation: [-Math.PI / 2, 0, 0] }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 20,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 13,
    columnNumber: 5
  }, this);
}
function PlayerController({ room, currentAction }) {
  const { camera } = useThree();
  const playerRef = useRef();
  const [position, setPosition] = useState(new THREE.Vector3(0, 0, 0));
  const [rotation, setRotation] = useState(0);
  const moveState = useRef({ x: 0, y: 0 });
  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          moveState.current.y = -1;
          break;
        case "s":
          moveState.current.y = 1;
          break;
        case "a":
          moveState.current.x = -1;
          break;
        case "d":
          moveState.current.x = 1;
          break;
      }
    };
    const handleKeyUp = (e) => {
      switch (e.key.toLowerCase()) {
        case "w":
          if (moveState.current.y === -1) moveState.current.y = 0;
          break;
        case "s":
          if (moveState.current.y === 1) moveState.current.y = 0;
          break;
        case "a":
          if (moveState.current.x === -1) moveState.current.x = 0;
          break;
        case "d":
          if (moveState.current.x === 1) moveState.current.x = 0;
          break;
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    let manager = null;
    if (isMobile) {
      const zone = document.getElementById("joystick-zone");
      if (zone) {
        manager = nipplejs.create({
          zone,
          mode: "static",
          position: { left: "50%", bottom: "50px" },
          color: "cyan"
        });
        manager.on("move", (evt, data) => {
          if (data.vector) {
            moveState.current.x = data.vector.x;
            moveState.current.y = -data.vector.y;
          }
        });
        manager.on("end", () => {
          moveState.current.x = 0;
          moveState.current.y = 0;
        });
      }
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
      if (manager) manager.destroy();
    };
  }, []);
  useFrame((state, delta) => {
    const speed = 5 * delta;
    const move = new THREE.Vector3(moveState.current.x, 0, moveState.current.y);
    if (move.length() > 0.1) {
      move.normalize().multiplyScalar(speed);
      const newPos = position.clone().add(move);
      setPosition(newPos);
      const targetRotation = Math.atan2(move.x, move.z);
      let rot = rotation;
      const diff = targetRotation - rot;
      const angle = Math.atan2(Math.sin(diff), Math.cos(diff));
      setRotation(rot + angle * 0.1);
    }
    const camOffset = new THREE.Vector3(0, 5, 8);
    const targetCamPos = position.clone().add(camOffset);
    camera.position.lerp(targetCamPos, 0.1);
    camera.lookAt(position.x, position.y + 1, position.z);
    if (state.clock.getElapsedTime() % 0.1 < delta) {
      room.updatePresence({
        x: position.x,
        z: position.z,
        ry: rotation,
        action: currentAction
      });
    }
  });
  return /* @__PURE__ */ jsxDEV(
    VoxelCharacter,
    {
      position: [position.x, 0, position.z],
      rotation: [0, rotation, 0],
      action: currentAction,
      color: ACTIONS[currentAction.toUpperCase()]?.color
    },
    void 0,
    false,
    {
      fileName: "<stdin>",
      lineNumber: 131,
      columnNumber: 5
    },
    this
  );
}
function RemotePlayer({ peerId, peer, presence }) {
  if (!presence) return null;
  const { x = 0, z = 0, ry = 0, action = "idle" } = presence;
  return /* @__PURE__ */ jsxDEV("group", { position: [x, 0, z], rotation: [0, ry, 0], children: [
    /* @__PURE__ */ jsxDEV(
      VoxelCharacter,
      {
        action,
        color: ACTIONS[action.toUpperCase()]?.color || "#fff"
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 148,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(Html, { position: [0, 2.5, 0], center: true, children: /* @__PURE__ */ jsxDEV("div", { style: {
      color: "white",
      background: "rgba(0,0,0,0.5)",
      padding: "2px 5px",
      borderRadius: "4px",
      fontSize: "10px",
      fontFamily: "monospace",
      whiteSpace: "nowrap"
    }, children: peer.username }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 153,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 152,
      columnNumber: 7
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 147,
    columnNumber: 5
  }, this);
}
function GhostPlayer({ data, index }) {
  const radius = 8 + index % 3 * 3;
  const angle = index / 10 * Math.PI * 2;
  const x = Math.cos(angle) * radius;
  const z = Math.sin(angle) * radius;
  const action = data.current_action || "idle";
  return /* @__PURE__ */ jsxDEV("group", { position: [x, 0, z], rotation: [0, -angle + Math.PI / 2, 0], children: [
    /* @__PURE__ */ jsxDEV(
      VoxelCharacter,
      {
        action,
        color: ACTIONS[action.toUpperCase()]?.color || "#aaa",
        isGhost: true
      },
      void 0,
      false,
      {
        fileName: "<stdin>",
        lineNumber: 181,
        columnNumber: 7
      },
      this
    ),
    /* @__PURE__ */ jsxDEV(Html, { position: [0, 2.5, 0], center: true, children: /* @__PURE__ */ jsxDEV("div", { style: {
      color: "#aaa",
      fontSize: "10px",
      fontFamily: "monospace",
      textShadow: "0 0 2px black"
    }, children: [
      "\u{1F47B} ",
      data.username
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 187,
      columnNumber: 9
    }, this) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 186,
      columnNumber: 8
    }, this)
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 180,
    columnNumber: 5
  }, this);
}
const GameScene = ({ room, currentAction, ghosts }) => {
  const [presence, setPresence] = useState({});
  useEffect(() => {
    const unsub = room.subscribePresence((p) => {
      setPresence(p);
    });
    return unsub;
  }, [room]);
  return /* @__PURE__ */ jsxDEV("div", { style: { width: "100%", height: "100%", position: "absolute", top: 0, left: 0, zIndex: 1 }, children: [
    /* @__PURE__ */ jsxDEV(Canvas, { shadows: true, dpr: [1, 2], children: [
      /* @__PURE__ */ jsxDEV(PerspectiveCamera, { makeDefault: true, position: [0, 5, 10], fov: 50 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 214,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("ambientLight", { intensity: 0.5 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 215,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("pointLight", { position: [10, 10, 10], intensity: 1, castShadow: true }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 216,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("pointLight", { position: [-10, 10, -10], intensity: 0.5, color: "blue" }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 217,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(Stars, { radius: 100, depth: 50, count: 5e3, factor: 4, saturation: 0, fade: true, speed: 1 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 219,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(Ground, {}, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 221,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV(PlayerController, { room, currentAction }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 224,
        columnNumber: 9
      }),
      Object.entries(room.peers).map(([id, peer]) => {
        if (id === room.clientId) return null;
        return /* @__PURE__ */ jsxDEV(
          RemotePlayer,
          {
            peerId: id,
            peer,
            presence: presence[id]
          },
          id,
          false,
          {
            fileName: "<stdin>",
            lineNumber: 230,
            columnNumber: 13
          }
        );
      }),
      ghosts.map((g, i) => /* @__PURE__ */ jsxDEV(GhostPlayer, { data: g, index: i }, g.id || i, false, {
        fileName: "<stdin>",
        lineNumber: 241,
        columnNumber: 11
      }))
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 213,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("div", { id: "joystick-zone", style: {
      position: "absolute",
      bottom: "20px",
      left: "50%",
      transform: "translateX(-50%)",
      width: "150px",
      height: "150px",
      zIndex: 20,
      pointerEvents: "none"
      // Nipple handles its own events
    } }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 247,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 212,
    columnNumber: 5
  });
};
export {
  GameScene
};
