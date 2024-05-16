import React, { useState, useRef, useEffect } from "react";
import Konva from "konva";
import { FilterImage } from "../component/filter";
import { Frame } from "../component/frame";

export function useShapes () {
    const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);
    const [selectedShapeId, setSelectedShapeId] = useState('')

    const initShapes = () => {
        const title: Konva.TextConfig = {
          id: "001",
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
          id: "002",
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

        const image: Konva.ImageConfig = {
          id: "003",
          type: "image",
          x: 0,
          y: 0,
          width: 1280,
          height: 720,
          image: new Image(),
          draggable: true,
          src : ""
        };
        setShapes([...shapes, image, title, author]);
      };
     
      useEffect(() => {
        initShapes()
      }, [])

      useEffect(() => {
        console.log(selectedShapeId)
      }, [selectedShapeId])

 

      return { shapes, setShapes, selectedShapeId, setSelectedShapeId};
};

