const quadVertexSize = 4 * 8; // Byte size of a vertex.
const quadPositionOffset = 4 * 0;  // Byte offset of quad vertex position attribute.
const quadColorOffset = 4 * 4; // Byte offset of quad vertex color attribute.
const quadVertexCount = 6; // Number of vertices in the quad.

const quadVertexArray = new Float32Array([
    // float4 position, float4 color
    -1,  1, 0, 1,   0, 1, 0, 1,
    -1, -1, 0, 1,   0, 0, 0, 1,
    1, -1, 0, 1,   1, 0, 0, 1,
    -1,  1, 0, 1,   0, 1, 0, 1,
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