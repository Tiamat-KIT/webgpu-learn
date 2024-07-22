const quadVertexSize = 4 * 8; // Byte size of one vertex.
const quadPositionOffset = 4 * 0;
const quadColorOffset = 4 * 4; // Byte offset of cube vertex color attribute.
const quadVertexCount = 4;

const quadVertexArray = new Float32Array([
  // float4 position, float4 color
  -1,  1, 0, 1,   0, 1, 0, 1,
  -1, -1, 0, 1,   0, 0, 0, 1,
   1, -1, 0, 1,   1, 0, 0, 1,
   1,  1, 0, 1,   1, 1, 0, 1,
]);

export {
    quadVertexSize,
    quadPositionOffset,
    quadColorOffset,
    quadVertexCount,
    quadVertexArray
}