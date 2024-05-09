"use client"
import React, {useState, useRef, useEffect } from "react";
import { Stage, Layer, Rect, Circle, Transformer } from 'react-konva'
import Konva from "konva"



export const Canvas = () => {
    const stageRef = useRef(Konva.Stage);
    const layerRef = useRef()
    const trRef = useRef()
    const shapeRef = useRef()
    //  window size
    const [stageDimensions, setStageDimensions] = useState({ width: 800, height: 800 });
    const [isSelected, setIsSelected] = useState(false);
    
    const [shapes, setShapes] = useState<Konva.ShapeConfig[]>([])
 
    const createShape = () => {
     const rect : Konva.RectConfig = {
        x: 100,
        y: 100,
        width: 100,
        height: 100,
        fill: 'red',
        stroke: 'black',
        strokeWidth: 4,
        draggable: true,
     };
      setShapes([...shapes, rect])
    }
    
    useEffect(() => {
        if (isSelected) {
          // we need to attach transformer manually
          trRef.current.nodes([shapeRef.current]);
          trRef.current.getLayer().batchDraw();
        }
      }, [isSelected]);

    useEffect(() => {
        createShape()
        
        function handleResize() {
            setStageDimensions({
              width: window.innerWidth,
              height: window.innerHeight,
            });
        }

        if (typeof window !== "undefined") {
            handleResize(); // 初始化时设置舞台尺寸
            window.addEventListener('resize', handleResize); // 监听窗口尺寸变化

            // 清理函数，防止内存泄漏
            return () => window.removeEventListener('resize', handleResize);
        }
    }, []);

    const onMouseDownOnStage = () => {
    }

    const onMouseMoveOnStage = () => {
    }

    const onMouseUpOnStage = () => {
    }

    return(
        <Stage
          ref={stageRef}
          width={stageDimensions.width}
          height={stageDimensions.height}
        //   draggable={false}
        //   onMouseDown={onMouseDownOnStage}
        //   onMouseMove={onMouseMoveOnStage}
        //   onMouseUp={onMouseUpOnStage}
          >
 
            <Layer ref={layerRef}>
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
                      }
                    }
                    anchorStyleFunc = { 
                        (anchor) => {
                          // anchor is Konva.Rect instance
                          // you manually change its styling
                          anchor.cornerRadius(10);
                          if (anchor.hasName('top-center') || anchor.hasName('bottom-center')) {
                            anchor.height(6);
                            anchor.offsetY(3);
                            anchor.width(30);
                            anchor.offsetX(15);
                          }
                          if (anchor.hasName('middle-left') || anchor.hasName('middle-right')) {
                            anchor.height(30);
                            anchor.offsetY(15);
                            anchor.width(6);
                            anchor.offsetX(3);
                          }
                        }
                      }
                />  
                {/* 鼠标拖动选择时绘制的矩形区域 */}
                <Rect
                    name="select-box"
                    x={0}
                    y={0}
                    width={0}
                    height={0}
                    stroke = '#0D99FF'
                    strokeWidth = {1}
                    fill="#87CEEB80"
                    visible={false}
                />

              {
                shapes.map((shape, index) => {
                  console.log(index) 
                 
                  var rect = new Konva.Rect({
                    x: 120,
                    y: 10,
                    width: 100,
                    height: 50,
                    fill: 'red'
                  });
                  layerRef.current.add(rect)
                  console.log(rect.getClassName()) 
                })
              }
            </Layer>
        </Stage>
    )
}
