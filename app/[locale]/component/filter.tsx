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
import useImage from "use-image";

export const FilterImage = ({width, height, url, keepRatio, onClick, ...props} : {width: number, height: number, url: string, keepRatio: boolean, onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void}) => {
    // const ppp = 'https://images.unsplash.com/photo-1715314945142-2980c03c93be?q=80&w=3087&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D'
    const [image] = useImage(url,'Anonymous');
 
    const imageRef = React.useRef<Konva.Image>(null);
    React.useEffect(() => {
      if(image && imageRef.current) {
        imageRef.current.cache();
        // 
        imageRef.current.red(31);
        imageRef.current.green(41);
        imageRef.current.blue(55);
        imageRef.current.alpha(0.6);
      }
    }, [image]);

    return (
      <KonvaImage
        ref={imageRef}
        draggable 
        width={width}
        height={keepRatio&&image ? width * (image.height / image?.width) : height}
        image={image}
        filters={[Konva.Filters.RGBA, Konva.Filters.Blur]}
        blurRadius={0}
        onClick={onClick}
        {...props}
      />
    );
  };
