export default async function WebGPUinit(ElementId: string) {
    const CanvasEl = document.getElementById(ElementId)
    if(!CanvasEl || !(CanvasEl instanceof HTMLCanvasElement)) return null
    const context = CanvasEl.getContext("webgpu")
    if(!(context instanceof GPUCanvasContext)) return null 
    if(typeof window === "undefined") return null
    const adapter = await window.navigator.gpu.requestAdapter()
    if(!adapter) return null
    const device = await adapter.requestDevice()
    const format = window.navigator.gpu.getPreferredCanvasFormat()
    context.configure({
        device,
        format,
        alphaMode: "opaque"
    })
    return {
        context,
        device,
        format
    }
}   