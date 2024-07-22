export default function ResponseRenderPassDescriptor(textureView: GPUTextureView){
    return {
        colorAttachments: [
            {
                view: textureView,
    
                clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },
    
                loadOp: "clear",
    
                storeOp: "store",
            },
        ],
    }  as GPURenderPassDescriptor
}
