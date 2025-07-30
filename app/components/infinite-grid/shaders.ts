export const gaussianBlurFragmentShader = /* glsl */ `precision highp float;

uniform sampler2D map;
// uniform float blurAmount; // Removed: Blur amount is now fixed
uniform vec2 resolution;
uniform float uOpacity; // New uniform for controlling opacity from JS

varying vec2 vUv;

void main() {
    vec2 onePixel = vec2(1.0, 1.0) / resolution;

    // Fixed blur amount directly in the shader
    float fixedBlurAmount = 10.0; // Changed to a fixed value as requested

    vec4 sum = vec4(0.0);

    sum += texture2D(map, vUv + onePixel * vec2(-1.0, -1.0) * fixedBlurAmount) * 0.0625;
    sum += texture2D(map, vUv + onePixel * vec2( 0.0, -1.0) * fixedBlurAmount) * 0.125;
    sum += texture2D(map, vUv + onePixel * vec2( 1.0, -1.0) * fixedBlurAmount) * 0.0625;
    sum += texture2D(map, vUv + onePixel * vec2(-1.0,  0.0) * fixedBlurAmount) * 0.125;
    sum += texture2D(map, vUv + onePixel * vec2( 0.0,  0.0) * fixedBlurAmount) * 0.25;
    sum += texture2D(map, vUv + onePixel * vec2( 1.0,  0.0) * fixedBlurAmount) * 0.125;
    sum += texture2D(map, vUv + onePixel * vec2(-1.0,  1.0) * fixedBlurAmount) * 0.0625;
    sum += texture2D(map, vUv + onePixel * vec2( 0.0,  1.0) * fixedBlurAmount) * 0.125;
    sum += texture2D(map, vUv + onePixel * vec2( 1.0,  1.0) * fixedBlurAmount) * 0.0625;

    // Apply the opacity uniform to the alpha channel of the final color
    gl_FragColor = vec4(sum.rgb, sum.a * uOpacity); // sum.a is usually 1.0 from texture, so multiply by uOpacity
}`;

export const gaussianBlurVertexShader = `
  attribute vec2 uv;
  attribute vec3 position;
  
  uniform mat4 modelViewMatrix;
  uniform mat4 projectionMatrix;
  
  varying vec2 vUv;
  
  void main() {
    // Flip UV coordinates 180 degrees (both X and Y)
    vUv = vec2(uv.x, 1.0 - uv.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const postProcessFragmentShader = /* glsl */ `precision highp float;

uniform sampler2D tDiffuse;
uniform vec2 distortion;
uniform float vignetteOffset;
uniform float vignetteDarkness;

varying vec2 vUv;

void main() {
    vec2 shiftedUv = 2.0 * (vUv - 0.5);
    float distanceToCenter = length(shiftedUv);

    // Lens distortion effect
    shiftedUv *= (0.88 + distortion.x * dot(shiftedUv, shiftedUv));
    vec2 transformedUv = shiftedUv * 0.5 + 0.5;

    // Vignette effect
    float vignetteIntensity = smoothstep(vignetteOffset, vignetteDarkness, distanceToCenter);

    // Define the vignette base color (rgb(9,9,9) normalized to 0-1 range)
    vec3 vignetteColor = vec3(9.0/255.0, 9.0/255.0, 9.0/255.0);

    // Sample render texture
    vec3 originalColor = texture2D(tDiffuse, transformedUv).rgb;

    // Blend between original color and vignette color based on intensity
    vec3 color = mix(originalColor, vignetteColor, vignetteIntensity);

    gl_FragColor = vec4(color, 1.0);
}`;
export const postProcessVertexShader = /* glsl */ `
attribute vec2 uv;
attribute vec3 position;

uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;

varying vec2 vUv;

void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}`;
