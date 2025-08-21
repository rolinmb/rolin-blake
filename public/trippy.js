const canvas = document.getElementById("trippy-bg");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

let time = 0;

function draw() {
  const w = canvas.width;
  const h = canvas.height;
  const imageData = ctx.createImageData(w, h);
  const data = imageData.data;

  for (let y = 0; y < h; y++) {
    for (let x = 0; x < w; x++) {
      const index = (y * w + x) * 4;

      // Normalize coordinates
      const nx = x / w;
      const ny = y / h;

      // Trippy equations
      const r = Math.floor(128 + 127 * Math.sin(10 * nx + time + 5 * ny));
      const g = Math.floor(128 + 127 * Math.sin(10 * ny - time + 3 * nx));
      const b = Math.floor(128 + 127 * Math.sin(5 * nx * ny + time));
      const a = 255; // opaque

      data[index]     = r;
      data[index + 1] = g;
      data[index + 2] = b;
      data[index + 3] = a;
    }
  }

  ctx.putImageData(imageData, 0, 0);
  time += 0.02;
  requestAnimationFrame(draw);
}

draw();
