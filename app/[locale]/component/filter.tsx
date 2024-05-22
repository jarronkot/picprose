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

export const FilterImage = ({
  width,
  height,
  url,
  keepRatio,
  onClick,
  blur,
  ...props
}: {
  width: number;
  height: number;
  url: string;
  keepRatio: boolean;
  onClick: (e: Konva.KonvaEventObject<MouseEvent>) => void;
  blur: number;
}) => {
  const [image] = useImage(url, 'anonymous');
  const imageRef = React.useRef<Konva.Image>(null);
  React.useEffect(() => {
    if (image && imageRef.current) {
      // 
      imageRef.current.cache({pixelRatio: 0.6});
    }
  }, [image]);
 
  React.useEffect(() => {
    if (image && imageRef.current) {
      imageRef.current.red(31);
      imageRef.current.green(41);
      imageRef.current.blue(55);
      imageRef.current.alpha(blur/100);
    }
  }, [blur]);
 
  return (
    <KonvaImage
      id = "sdfsadfwer"
      ref={imageRef}
      draggable
      width={width}
      height={
        keepRatio && image ? width * (image.height / image?.width) : height
      }
      image={image}
      filters={[Konva.Filters.RGBA, Konva.Filters.Blur]}
      blurRadius={0}
      onClick={onClick}
      onDragMove={ () => {
        imageRef.current?.x(0)
      } }
      {...props}
    />
  );
};
