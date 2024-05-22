import React, { useState, useRef, useEffect } from "react";
import {
  Rect,
  Group,
} from "react-konva";
import { SceneContext } from "konva/lib/Context";
 
const drawRoundedRectClip = (
  ctx: SceneContext,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number
) => {
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

export const Frame = ({
  children,
  x,
  y,
  width,
  height,
  radius,
  ...props
}: {
  children: React.ReactNode;
  x: number;
  y: number;
  width: number;
  height: number;
  radius: number;
}) => {
  return (
    <Group
      draggable
      x={x}
      y={y}
      clipFunc={(ctx) => {
        drawRoundedRectClip(ctx, x, y, width, height, radius);
      }}
    >
      <Rect
        name="frame-background"
        x={x}
        y={y}
        width={width}
        height={height}
        cornerRadius = {radius}
        fill="white"
      />
      {children}
    </Group>
  );
};
