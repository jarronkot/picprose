"use client";
import React, { useEffect } from "react";
  
import { useShapesContext } from "./context/useShapesContext";
import { ImagePropertyPanel } from "./component/ImagePropertyPanel" 

export const RightPropertyPanel = (props) => {
  const {selectedShape, setSelectedShape} = useShapesContext();

 
  useEffect(() => {
      console.log("gezhaoyouhhh")
  }, [selectedShape])

  return (
    <div className="w-full flex flex-col h-screen">
       {selectedShape?.type === "image" && <ImagePropertyPanel/>}
    </div>
  );
};
