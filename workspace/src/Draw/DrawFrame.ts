export default function DrawFrame(context: GPUCanvasContext,pipeline: GPURenderPipeline,device: GPUDevice){
    const commandEncoder = device.createCommandEncoder()
    const textureView = context.getCurrentTexture().createView()
    const renderPassDescriptor = {
        colorAttachments: [
            {
                view: textureView,
                clearValue: {
                    r: 0,
                    g: 0,
                    b: 0,
                    a: 1
                },
                loadOp: "clear",
                storeOp: "store"
            } as GPURenderPassColorAttachment,
        ]  
    } as GPURenderPassDescriptor
    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor)
    passEncoder.setPipeline(pipeline)

    passEncoder.draw(3,1,0,0)
    passEncoder.end()
    device.queue.submit([commandEncoder.finish()])
}