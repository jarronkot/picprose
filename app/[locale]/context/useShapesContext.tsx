import { createContext, useContext, useState } from "react";
import Konva from "konva";
import { useShapes } from "../hooks/useShapes";

interface ShapesContextInterface {
  shapes: Konva.ShapeConfig[];
  selectedShapeId: string | undefined;
  setSelected: (shapeId: string | undefined) => void;
  getShapeById: (shapeId: string) => Konva.ShapeConfig | undefined;
}
 
const ShapesContext = createContext<ShapesContextInterface>({
  shapes: [],
  selectedShapeId: '',
  setSelected: () => {},
  getShapeById: () => undefined,
});

export const ShapeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { shapes, setShapes, selectedShapeId, setSelectedShapeId } = useShapes();
  return (
    <ShapesContext.Provider
      value={{
        shapes: shapes,
        selectedShapeId: selectedShapeId,
        setSelected: setSelectedShapeId,
        getShapeById: () => undefined,
      }}
    >
      {children}
    </ShapesContext.Provider>
  );
};

export function useShapesContext() {
  const context = useContext(ShapesContext);
  return context;
}
