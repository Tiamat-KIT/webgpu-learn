import ResponseRenderPassDescriptor from "./RenderPassDescriptor"
import WebGPUinit from "./WebGPUInit"
import fragWGSL from "./Shaders/Square/fragment.wgsl?raw"
import vertWGSL from "./Shaders/Square/vertex.wgsl?raw"
import { quadVertexSize, quadPositionOffset, quadColorOffset, quadVertexArray } from "./IndexQuadValues"

const IndexArray = new Uint16Array([0, 1, 2, 0, 2, 3]);

export default async function IndexBufferView(){
    const response = await WebGPUinit("webgpu3")
    if(response === null) return null
    const {context,device,format} = response

    const verticesBuffer = device.createBuffer({
        size: quadVertexArray.byteLength,
        usage: GPUBufferUsage.VERTEX,
        mappedAtCreation: true,
    });
      
    new Float32Array(verticesBuffer.getMappedRange()).set(quadVertexArray);
    verticesBuffer.unmap();

    const indicesBuffer = device.createBuffer({
        size: IndexArray.byteLength,
        usage: GPUBufferUsage.INDEX,
        mappedAtCreation: true,
    })
    new Uint16Array(indicesBuffer.getMappedRange()).set(IndexArray)
    indicesBuffer.unmap()

    const pipeline = device.createRenderPipeline({
        layout: 'auto',
        vertex: {
          module: device.createShaderModule({
            code: vertWGSL,
          }),
          entryPoint: 'main',
          buffers: [ // <--------------------- 今回の追加箇所
            {
              // 配列の要素間の距離をバイト単位で指定します。
              arrayStride: quadVertexSize,
    
              // 頂点バッファの属性を指定します。
              attributes: [
                {
                  // position
                  shaderLocation: 0, // @location(0) in vertex shader
                  offset: quadPositionOffset,
                  format: 'float32x4',
                },
                {
                  // color
                  shaderLocation: 1, // @location(1) in vertex shader
                  offset: quadColorOffset,
                  format: 'float32x4',
                },
              ],
            },
          ] as Iterable<GPUVertexBufferLayout>,
        },
        fragment: {
          module: device.createShaderModule({
            code: fragWGSL,
          }),
          entryPoint: 'main',
          targets: [
            {
              format: format,
            },
          ],
        },
        primitive: {
          topology: 'triangle-list',
        },
    });
    render({device,context,pipeline,verticesBuffer,indicesBuffer})
}

function render(
  {
    device,
    context,
    pipeline,
    verticesBuffer,
    indicesBuffer
  }:{
    device: GPUDevice,
    context: GPUCanvasContext,
    pipeline: GPURenderPipeline,
    verticesBuffer: GPUBuffer,
    indicesBuffer: GPUBuffer
  }) {
  const commandEncoder = device.createCommandEncoder()
    const textureView = context.getCurrentTexture().createView();
    const renderPassEncoder = ResponseRenderPassDescriptor(textureView)
    const passEncoder = commandEncoder.beginRenderPass(renderPassEncoder) 
    passEncoder.setPipeline(pipeline);
    passEncoder.setVertexBuffer(0, verticesBuffer);
    passEncoder.setIndexBuffer(indicesBuffer, 'uint16');
    passEncoder.drawIndexed(IndexArray.length);
    passEncoder.end();
    device.queue.submit([commandEncoder.finish()]);
    requestAnimationFrame(render.bind(render, { device,context, pipeline, verticesBuffer,indicesBuffer }))
}

