import { jsxDEV } from "react/jsx-dev-runtime";
import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
const VoxelCharacter = ({
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  color = "#8bc34a",
  action = "idle",
  username = "",
  isGhost = false
}) => {
  const group = useRef();
  const body = useRef();
  const head = useRef();
  const leftArm = useRef();
  const rightArm = useRef();
  const tool = useRef();
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    body.current.position.y = 0.75 + Math.sin(t * 2) * 0.05;
    head.current.position.y = 1.4 + Math.sin(t * 2 - 0.5) * 0.05;
    switch (action) {
      case "idle":
        leftArm.current.rotation.x = Math.sin(t) * 0.1;
        rightArm.current.rotation.x = -Math.sin(t) * 0.1;
        break;
      case "mine":
        rightArm.current.rotation.x = -Math.PI / 2 + Math.sin(t * 10) * 0.5;
        leftArm.current.rotation.x = 0;
        break;
      case "research":
        rightArm.current.rotation.x = -Math.PI / 3;
        leftArm.current.rotation.x = -Math.PI / 3;
        break;
      case "party":
        group.current.position.y = position[1] + Math.abs(Math.sin(t * 8) * 0.5);
        leftArm.current.rotation.z = Math.PI - 0.5 + Math.sin(t * 10) * 0.5;
        rightArm.current.rotation.z = -Math.PI + 0.5 - Math.sin(t * 10) * 0.5;
        break;
      default:
        break;
    }
  });
  return /* @__PURE__ */ jsxDEV("group", { ref: group, position, rotation, children: [
    /* @__PURE__ */ jsxDEV("group", { position: [0, 2.2, 0], children: /* @__PURE__ */ jsxDEV("mesh", { children: [
      /* @__PURE__ */ jsxDEV("planeGeometry", { args: [0, 0] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 59,
        columnNumber: 11
      }),
      " "
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 58,
      columnNumber: 9
    }) }, void 0, false, {
      fileName: "<stdin>",
      lineNumber: 57,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("mesh", { ref: body, position: [0, 0.75, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.6, 0.7, 0.4] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 69,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: isGhost ? "#aaa" : "#fff", transparent: isGhost, opacity: isGhost ? 0.5 : 1 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 70,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0, 0.21], children: [
        /* @__PURE__ */ jsxDEV("planeGeometry", { args: [0.4, 0.5] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 73,
          columnNumber: 12
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 74,
          columnNumber: 12
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 72,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 68,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("mesh", { ref: head, position: [0, 1.4, 0], castShadow: true, receiveShadow: true, children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.5, 0.5, 0.5] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 80,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#8bc34a", transparent: isGhost, opacity: isGhost ? 0.5 : 1 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 81,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.05, 0.26], children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.4, 0.15, 0.05] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 84,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#333", roughness: 0.2 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 85,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 83,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.35, 0], children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.05, 0.3, 0.05] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 89,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#8bc34a" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 90,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 88,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.5, 0], children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.1, 0.1, 0.1] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 93,
          columnNumber: 11
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: action === "party" ? "#ff00ff" : "#e91e63", emissive: action === "party" ? "#ff00ff" : "#000", emissiveIntensity: 0.5 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 94,
          columnNumber: 11
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 92,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 79,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("mesh", { position: [-0.2, 0.35, 0], castShadow: true, children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.15, 0.7, 0.2] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 100,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#e67e22", transparent: isGhost, opacity: isGhost ? 0.5 : 1 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 101,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 99,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("mesh", { position: [0.2, 0.35, 0], castShadow: true, children: [
      /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.15, 0.7, 0.2] }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 104,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#e67e22", transparent: isGhost, opacity: isGhost ? 0.5 : 1 }, void 0, false, {
        fileName: "<stdin>",
        lineNumber: 105,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 103,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("group", { ref: leftArm, position: [-0.4, 1, 0], children: [
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, -0.25, 0], castShadow: true, children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.15, 0.6, 0.2] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 111,
          columnNumber: 12
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#fff", transparent: isGhost, opacity: isGhost ? 0.5 : 1 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 112,
          columnNumber: 12
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 110,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, -0.6, 0], children: [
        /* @__PURE__ */ jsxDEV("sphereGeometry", { args: [0.08] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 115,
          columnNumber: 12
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#8bc34a" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 116,
          columnNumber: 12
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 114,
        columnNumber: 9
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 109,
      columnNumber: 7
    }),
    /* @__PURE__ */ jsxDEV("group", { ref: rightArm, position: [0.4, 1, 0], children: [
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, -0.25, 0], castShadow: true, children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.15, 0.6, 0.2] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 122,
          columnNumber: 12
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#fff", transparent: isGhost, opacity: isGhost ? 0.5 : 1 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 123,
          columnNumber: 12
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 121,
        columnNumber: 9
      }),
      /* @__PURE__ */ jsxDEV("mesh", { position: [0, -0.6, 0], children: [
        /* @__PURE__ */ jsxDEV("sphereGeometry", { args: [0.08] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 126,
          columnNumber: 12
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#8bc34a" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 127,
          columnNumber: 12
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 125,
        columnNumber: 9
      }),
      action === "mine" && /* @__PURE__ */ jsxDEV("mesh", { position: [0, -0.7, 0.2], rotation: [Math.PI / 2, 0, 0], children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.1, 0.8, 0.1] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 132,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#555" }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 133,
          columnNumber: 13
        }),
        /* @__PURE__ */ jsxDEV("mesh", { position: [0, 0.3, 0], rotation: [0, 0, Math.PI / 2], children: [
          /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.1, 0.6, 0.2] }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 135,
            columnNumber: 15
          }),
          /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#aaa" }, void 0, false, {
            fileName: "<stdin>",
            lineNumber: 136,
            columnNumber: 15
          })
        ] }, void 0, true, {
          fileName: "<stdin>",
          lineNumber: 134,
          columnNumber: 13
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 131,
        columnNumber: 11
      }),
      action === "research" && /* @__PURE__ */ jsxDEV("mesh", { position: [0, -0.65, 0.2], rotation: [-Math.PI / 4, 0, 0], children: [
        /* @__PURE__ */ jsxDEV("boxGeometry", { args: [0.3, 0.4, 0.05] }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 142,
          columnNumber: 14
        }),
        /* @__PURE__ */ jsxDEV("meshStandardMaterial", { color: "#00ffff", emissive: "#00ffff", emissiveIntensity: 0.5 }, void 0, false, {
          fileName: "<stdin>",
          lineNumber: 143,
          columnNumber: 14
        })
      ] }, void 0, true, {
        fileName: "<stdin>",
        lineNumber: 141,
        columnNumber: 12
      })
    ] }, void 0, true, {
      fileName: "<stdin>",
      lineNumber: 120,
      columnNumber: 7
    })
  ] }, void 0, true, {
    fileName: "<stdin>",
    lineNumber: 55,
    columnNumber: 5
  });
};
export {
  VoxelCharacter
};
