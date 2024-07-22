import DrawFrame from "./DrawFrame"
import fragWGSL from "./Shaders/Triangle/fragment.wgsl?raw"
import vertWGSL from "./Shaders/Triangle/vertex.wgsl?raw"
import WebGPUinit from "./WebGPUInit"

export default async function TriangleDraw() {
    const response = await WebGPUinit("webgpu")
    if(response === null) return null
    const {context,device,format} = response
    const pipeline = device.createRenderPipeline({
        layout: "auto",
        vertex: {
            module: device.createShaderModule({
                code: vertWGSL
            }),
            entryPoint: "main"
        },
        fragment: {
            module: device.createShaderModule({
                code: fragWGSL
            }),
            entryPoint: "main",
            targets: [
                {
                    format
                }
            ]
        },
        primitive: {
            topology: "triangle-list"
        }
    })
    DrawFrame(context,pipeline,device)
}