import fragWGSL from "./Shaders/Square/fragment.wgsl?raw"
import vertWGSL from "./Shaders/Square/vertex.wgsl?raw"
import WebGPUinit from "./WebGPUInit";
import { quadVertexSize, quadPositionOffset, quadColorOffset, quadVertexCount, quadVertexArray } from "./QuadValues";

export default async function DrawQuad(){ 
    const response = await WebGPUinit("webgpu2")
    if(response === null) throw new Error("WebGPU init failed")
    const {context,device,format} = response

      // create a render pipeline
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

    const verticesBuffer = device.createBuffer({
      size: quadVertexArray.byteLength,
      usage: GPUBufferUsage.VERTEX,
      mappedAtCreation: true,
    });
    new Float32Array(verticesBuffer.getMappedRange()).set(quadVertexArray);
    verticesBuffer.unmap();
    frame({device,context,pipeline,verticesBuffer})
}

function frame({
  device,
  context,
  pipeline,
  verticesBuffer,
}: {
  device: GPUDevice,
  context: GPUCanvasContext;
  pipeline: GPURenderPipeline;
  verticesBuffer: GPUBuffer;
}) {
  const commandEncoder = device.createCommandEncoder();
  const textureView = context.getCurrentTexture().createView();

  const renderPassDescriptor: GPURenderPassDescriptor = {
    colorAttachments: [
        {
          view: textureView,

          clearValue: { r: 0.0, g: 0.0, b: 0.0, a: 1.0 },

          loadOp: "clear",

          storeOp: "store",
        },
      ],
    }  as GPURenderPassDescriptor;

    const passEncoder = commandEncoder.beginRenderPass(renderPassDescriptor);
    passEncoder.setPipeline(pipeline);
    passEncoder.setVertexBuffer(0, verticesBuffer); // <--- VertexBufferをセットする
    passEncoder.draw(quadVertexCount, 1, 0, 0);
    passEncoder.end();

    device.queue.submit([commandEncoder.finish()]);
    /* requestAnimationFrame(
      frame.bind(frame, { device,context, pipeline, verticesBuffer }),
    ); */
}