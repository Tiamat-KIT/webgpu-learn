"use client"

import DrawQuad from "../Draw/DrawQuad"
import IndexBufferView from "../Draw/IndexBufferRender"
import TriangleDraw from "../Draw/Triangle"
import { useEffect } from "react"

export default function WebGPUCanvas() {
    useEffect(() => {
        // TriangleDraw()
        DrawQuad()
        TriangleDraw()
        IndexBufferView()
    },[])

    return (
        <div className="flex flex-col">  
            <p>Triangle</p>
            <canvas id="webgpu" width="300" height="300"></canvas>

            <p>Square</p>
            <canvas id="webgpu2" width="300" height="300"></canvas>

            <p>IndexBuffer -Square-</p>
            <canvas id="webgpu3" width="300" height="300"></canvas>
        </div>
        
    )
}