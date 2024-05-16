"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Transformer,
  Image as KonvaImage,
  Group,
} from "react-konva";
import Konva from "konva";
import { FilterImage } from "./component/filter";
import { Frame } from "./component/frame";
import WebFontLoader from "webfontloader";
import { useShapesContext } from "./context/useShapesContext";

export const Canvas = () => {
  const stageRef = useRef<Konva.Stage>();
  const layerRef = useRef<Konva.Layer>();
  const trRef = useRef<Transformer>();

  const [loaded, setLoaded] = useState(false);
  const { shapes, selectedShapeId, setSelected, getShapeById } = useShapesContext();

  const initFont = () => {
    // Fetch necessary fonts.
    WebFontLoader.load({
      google: {
        families: [
          "Open Sans:400,600,700",
          "Roboto",
          "Raleway",
          "Droid Sans",
          "Droid Serif",
          "Anek Latin",
        ],
      },
      fontactive: () => {
        setTimeout(() => {
          setLoaded(true);
        }, 1000);
      },
    });
  };

  useEffect(() => {
    initFont();

    function handleResize() {
      setStageDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }

    if (typeof window !== "undefined") {
      handleResize(); // 初始化时设置舞台尺寸
      window.addEventListener("resize", handleResize); // 监听窗口尺寸变化

      // 清理函数，防止内存泄漏
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const [stageDimensions, setStageDimensions] = useState({
    width: 1280,
    height: 720,
  });
  const url =
    "https://images.unsplash.com/photo-1715314945142-2980c03c93be?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";
  return (
    <Stage
      ref={stageRef}
      width={stageDimensions.width}
      height={stageDimensions.height - 15}
      className="bg-slate-100 overflow-x-scroll"
    >
      <Layer scaleX={0.5} scaleY={0.5} ref={layerRef}>
        <Frame width={1280} height={720} radius={10}>
          {shapes.map((attr, index) => {
            console.log(attr.type);
            if (attr.type === "rect") 
              return (<Rect key={attr.id} {...attr} />)
            else if (attr.type === "text")
              return (
                <Text
                  key={attr.id}
                  fontFamily={loaded ? "Anek Latin" : "Arial"}
                  fontSize={40}
                  onClick={ () =>  setSelected(attr.id)}
                  {...attr}
                />
              );
            else if (attr.type === "image")
              return (
                <FilterImage
                  width={1280}
                  height={720}
                  keepRatio={true}
                  url={attr.url}
                  onClick={ () =>  setSelected(attr.id)}
                />
              );
          })}
        </Frame>
      </Layer>
    </Stage>
  );
};
