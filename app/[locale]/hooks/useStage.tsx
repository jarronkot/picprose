import React, { useState, useRef, useEffect } from "react";
import Konva from "konva";

export function useStage () {
    const [stage, setStage] = useState<Konva.Stage>();
    const [stageScale, setStageScale] = useState<{x: number, y: number}>({x: 1, y: 1})

    useEffect(() => {
        setStageScale({x: 0.6, y: 0.6})
    }, []);

    return { stage, setStage, stageScale, setStageScale};
};

