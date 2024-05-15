import { createContext, useContext } from "react";
import Konva from "konva";
import {useShapes} from "../hooks/useShapes"



interface ShapesContextInterface {
    shapes: Konva.ShapeConfig[];
    selected: boolean;
    setSelected: (shapeId: string) => void;
    getShapeById: (shapeId: string) => Konva.ShapeConfig | undefined;
}

const ShapesContext = createContext<ShapesContextInterface>(
    {
        shapes: [],
        selected: false,
        setSelected: () => {},
        getShapeById: () => undefined,
    }
);
 
export function useShapesContext () {
    const { shapes, setShapes } = useShapes();

  
 
    const context = useContext(ShapesContext);
    return context;
}