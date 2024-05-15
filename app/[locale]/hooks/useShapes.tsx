import React, { useState, useRef, useEffect } from "react";
import Konva from "konva";
import { FilterImage } from "../component/filter";
import { Frame } from "../component/frame";

export function useShapes () {
    const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);

    const initShapes = () => {
        const title: Konva.TextConfig = {
          type: "text",
          x: 250,
          y: 720/3,
          width: 1000,
          height: 300,
          fill: "white",
          text: "Why UI designers should understand Flexbox and CSS Grid",
          fontSize: 65,
          align: "center",
          draggable: true,
        };
    
        const author: Konva.TextConfig = {
          type: "text",
          x: (1280 - 100)/2,
          y: 720/3*2,
          width: 300,
          height: 30,
          fill: "white",
          text: "@PicPro",
          fontSize: 40,
          draggable: true,
        };
        setShapes([...shapes, title, author]);
      };
     
      useEffect(() => {
        initShapes()
      }, [])

      return { shapes, setShapes };
};

