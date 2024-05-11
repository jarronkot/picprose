"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Stage,
  Layer,
  Rect,
  Text,
  Transformer,
  Image,
  Group,
} from "react-konva";
import Konva from "konva";
import useImage from "use-image";

export const Canvas = () => {
  const stageRef = useRef(Konva.Stage);
  const layerRef = useRef();
  const trRef = useRef();
  const rectRef = useRef<any>(null);
  //  window size
  const [stageDimensions, setStageDimensions] = useState({
    width: 800,
    height: 800,
  });
  const [isSelected, setIsSelected] = useState(false);

  const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([]);

  const createShape = () => {
    //  const rect : Konva.RectConfig = {
    //     type: 'rect',
    //     x: 0,
    //     y: 0,
    //     width: 1280,
    //     height: 720,
    //     fill: 'white',
    //     cornerRadius: 10,
    //  };

    const title: Konva.TextConfig = {
      type: "text",
      x: 0,
      y: 0,
      width: 300,
      height: 30,
      fill: "white",
      text: "Title",
      fontSize: 65,
      draggable: true,
    };

    const author: Konva.TextConfig = {
      type: "text",
      x: 0,
      y: 110,
      width: 300,
      height: 30,
      fill: "white",
      text: "@Author",
      fontSize: 40,
      draggable: true,
    };
    setShapes([...shapes, title, author]);
  };

  // useEffect(() => {
  //     if (isSelected) {
  //       // we need to attach transformer manually
  //       trRef.current.nodes([shapeRef.current]);
  //       trRef.current.getLayer().batchDraw();
  //     }
  //   }, [isSelected]);

  useEffect(() => {
    if (rectRef.current) {
      rectRef.current.cache();
    }
    console.log(rectRef.current);
  }, [rectRef]);

  const createFilterImg = () => {};

  useEffect(() => {
    createShape();
    createFilterImg();
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

  const onMouseDownOnStage = () => {};

  const onMouseMoveOnStage = () => {};

  const onMouseUpOnStage = () => {};

  const FilterImage = () => {
    // const [image, status] = useImage('wave-blue.svg');

    const [image, status] = useImage(
      "https://images.unsplash.com/photo-1715314945142-2980c03c93be?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    );
    // const [image] = useImage('https://img.pixpark.net/macos-android-webrtc-build-2.png');


    const imageRef = React.useRef();
    // when image is loaded we need to cache the shape
    React.useEffect(() => {
      console.log('gezhaoyou');
      console.log(status);
      if (status == 'loaded') {
        // you many need to reapply cache on some props changes like shadow, stroke, etc.
        imageRef.current.cache();
        imageRef.current.red(200);
        imageRef.current.green(0);
        imageRef.current.blue(0);
        imageRef.current.alpha(0.6);
      }
    }, [status]);
     
    return (
      <Image
        ref={imageRef}
        x={0}
        y={0}
        width={1380}
        height={820} 
        draggable 
        image={image}
        filters={[Konva.Filters.Blur]}
        blurRadius={10}
      />
    );
  };

  const drawRoundedRect = (ctx, x, y, width, height, radius) => {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.arc(x + width - radius, y + radius, radius, Math.PI * 1.5, Math.PI * 2);
    ctx.lineTo(x + width, y + height - radius);
    ctx.arc(x + width - radius, y + height - radius, radius, 0, Math.PI * 0.5);
    ctx.lineTo(x + radius, y + height);
    ctx.arc(x + radius, y + height - radius, radius, Math.PI * 0.5, Math.PI);
    ctx.lineTo(x, y + radius);
    ctx.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 1.5);
    ctx.closePath();
  };

  return (
    <Stage
      ref={stageRef}
      width={stageDimensions.width}
      height={stageDimensions.height}
      className="bg-slate-100"
      //   draggable={false}
      //   onMouseDown={onMouseDownOnStage}
      //   onMouseMove={onMouseMoveOnStage}
      //   onMouseUp={onMouseUpOnStage}
    >
      <Layer scaleX={0.5} scaleY={0.5} ref={layerRef}>
        <Transformer
          ref={trRef}
          keepRatio
          shouldOverdrawWholeArea
          boundBoxFunc={(oldBox, newBox) => {
            // limit resize
            if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
              return oldBox;
            }
            return newBox;
          }}
          anchorStyleFunc={(anchor) => {
            // anchor is Konva.Rect instance
            // you manually change its styling
            anchor.cornerRadius(10);
            if (
              anchor.hasName("top-center") ||
              anchor.hasName("bottom-center")
            ) {
              anchor.height(6);
              anchor.offsetY(3);
              anchor.width(30);
              anchor.offsetX(15);
            }
            if (
              anchor.hasName("middle-left") ||
              anchor.hasName("middle-right")
            ) {
              anchor.height(30);
              anchor.offsetY(15);
              anchor.width(6);
              anchor.offsetX(3);
            }
          }}
        />

        {/* 鼠标拖动选择时绘制的矩形区域 */}
        <Rect
          name="select-box"
          x={0}
          y={0}
          width={200}
          height={300}
          visible={false}
        />
        <Group
          draggable
          x={800}
          y={300}
          clipX={0}
          clipY={0}
          clipWidth={1280}
          clipHeight={720}
          clipFunc={(ctx) => {
            drawRoundedRect(ctx, 0, 0, 1280, 720, 10);
          }}
        >
          <Rect name="bg" x={0} y={0} width={1280} height={720} fill="white" />
          <FilterImage/>
          {shapes.map((attr, index) => {
            console.log(attr.type);
            if (attr.type === "rect") return <Rect key="dd" {...attr} />;
            else if (attr.type === "text") return <Text key="ds" {...attr} />;
          })}
        </Group>
      
      </Layer>
    </Stage>
  );
};
