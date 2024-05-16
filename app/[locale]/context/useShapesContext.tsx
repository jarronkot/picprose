import { createContext, useContext, useState } from "react";
import Konva from "konva";
import { useShapes } from "../hooks/useShapes";

interface ShapesContextInterface {
  shapes: Konva.ShapeConfig[];
  selectedShape: Konva.ShapeConfig | undefined;
  setSelectedShape: (shape : Konva.ShapeConfig) => void;
}
 
const ShapesContext = createContext<ShapesContextInterface>({
  shapes: [],
  selectedShape: {},
  setSelectedShape:(shape : Konva.ShapeConfig) => { }
});

export const ShapeContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { shapes, setShapes, selectedShape, setSelectedShape } = useShapes();
  return (
    <ShapesContext.Provider
      value={{
        shapes: shapes,
        selectedShape: selectedShape,
        setSelectedShape: setSelectedShape,
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
