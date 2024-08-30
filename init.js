var gl;
var shaderProgram;
var uMMatrixLocation;
var uColorLoc;
var aPositionLocation;  // Declare in global scope
var mode = 's';

var mMatrix = mat4.create(); // Initialize mMatrix as a 4x4 matrix
mat4.identity(mMatrix); // Set mMatrix to identity

const vertexShaderCode = `#version 300 es
in vec2 aPosition;
uniform mat4 uMMatrix;

void main() {
    gl_Position = uMMatrix * vec4(aPosition, 0.0, 1.0);
    gl_PointSize = 5.0;
}`;

const fragmentShaderCode = `#version 300 es
precision mediump float;
uniform vec4 uColor;
out vec4 fragColor;

void main() {
    fragColor = uColor;
}`;

function initGL(canvas) {
    try {
        gl = canvas.getContext("webgl2"); // the graphics webgl2 context
        gl.viewportWidth = canvas.width; // the width of the canvas
        gl.viewportHeight = canvas.height; // the height
    } catch (e) {}
    if (!gl) {
        alert("WebGL initialization failed");
    }
}

function vertexShaderSetup(vertexShaderCode) {
    const shader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(shader, vertexShaderCode);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function fragmentShaderSetup(fragShaderCode) {
    const shader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(shader, fragShaderCode);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        alert(gl.getShaderInfoLog(shader));
        return null;
    }
    return shader;
}

function initShaders() {
    shaderProgram = gl.createProgram();
    const vertexShader = vertexShaderSetup(vertexShaderCode);
    const fragmentShader = fragmentShaderSetup(fragmentShaderCode);

    gl.attachShader(shaderProgram, vertexShader);
    gl.attachShader(shaderProgram, fragmentShader);
    gl.linkProgram(shaderProgram);

    if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
        console.log(gl.getShaderInfoLog(vertexShader));
        console.log(gl.getShaderInfoLog(fragmentShader));
    }

    gl.useProgram(shaderProgram);

    // Get locations of attributes and uniforms
    aPositionLocation = gl.getAttribLocation(shaderProgram, "aPosition");  // Initialize here
    uMMatrixLocation = gl.getUniformLocation(shaderProgram, "uMMatrix");
    uColorLoc = gl.getUniformLocation(shaderProgram, "uColor");

    // Enable attribute arrays
    gl.enableVertexAttribArray(aPositionLocation);

    // Initialize buffers (functions defined elsewhere)
    initSquareBuffer();
    initTriangleBuffer();
    initCircleBuffer();
    initRayBuffer();
    initFanBladesBuffer();

    drawScene(); // Ensure this function exists
}

function webGLStart() {
    const canvas = document.getElementById("scenery");
    initGL(canvas);
    initShaders();
}
