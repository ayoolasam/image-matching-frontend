<template>
  <div class="min-h-screen bg-[#1E201E] flex flex-col items-center py-12 px-6">
    <h1 class="text-2xl font-bold text-white mb-6">Distance Measuring Tool</h1>

    <!-- Upload -->
    <div
      class="p-6 border-2 h-[500px] w-full lg:w-[600px] border-green-400 rounded-lg bg-[#183D3D] flex flex-col items-center"
    >
      <div v-if="!image" class="flex flex-col items-center justify-center h-full">
        <h2 class="font-semibold text-white text-lg mb-3">Upload Image</h2>
        <button
          @click="$refs.fileInput.click()"
          class="px-4 py-2 border border-green-500 text-white rounded-md hover:bg-green-600"
        >
          Choose File
        </button>
        <input
          ref="fileInput"
          type="file"
          class="hidden"
          accept="image/*"
          @change="handleFileUpload"
        />
      </div>
      <div v-else class="mt-4 relative w-full overflow-auto">
        <canvas
          ref="canvas"
          class="rounded-md shadow-md cursor-crosshair max-w-full h-auto"
          @click="onCanvasClick"
        ></canvas>
      </div>
    </div>

    <!-- Measurements -->
    <div
      v-if="measurements.length"
      class="mt-8 w-full max-w-2xl bg-[#183D3D] p-6 rounded-lg text-white"
    >
      <h2 class="font-bold text-lg mb-3">Measurements</h2>
      <ul class="text-sm space-y-2">
        <li v-for="(m, idx) in measurements" :key="idx">
          <strong>Line {{ idx + 1 }}:</strong>
          ({{ m.p1.x }}, {{ m.p1.y }}) → ({{ m.p2.x }}, {{ m.p2.y }}) |
          Distance: <span class="text-green-400">{{ m.distance.toFixed(2) }} px</span>
        </li>
      </ul>
    </div>

    <!-- Reset -->
    <div v-if="image" class="mt-6">
      <button
        @click="resetAll"
        class="px-6 py-3 border border-red-500 text-red-400 font-semibold rounded-md hover:bg-red-600 hover:text-white"
      >
        Reset
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, nextTick } from "vue";

const image = ref(null);
const file = ref(null);
const canvas = ref(null);

// temporary click buffer
const tempPoints = ref([]);
// all measurements
const measurements = ref([]);

// Redraw helper
function redrawCanvas() {
  if (!canvas.value || !image.value) return;
  const ctx = canvas.value.getContext("2d");
  const img = new Image();

  img.onload = () => {
    canvas.value.width = img.width;
    canvas.value.height = img.height;
    ctx.clearRect(0, 0, canvas.value.width, canvas.value.height);
    ctx.drawImage(img, 0, 0);

    ctx.textBaseline = "top";
    ctx.lineWidth = 2;

    // Draw all measurements
    measurements.value.forEach((m, i) => {
      // Draw line
      ctx.strokeStyle = "lime";
      ctx.beginPath();
      ctx.moveTo(m.p1.x, m.p1.y);
      ctx.lineTo(m.p2.x, m.p2.y);
      ctx.stroke();

      // Draw points
      [m.p1, m.p2].forEach((p, j) => {
        ctx.fillStyle = "red";
        ctx.beginPath();
        ctx.arc(p.x, p.y, 6, 0, Math.PI * 2);
        ctx.fill();

        ctx.font = "bold 14px Arial";
        ctx.fillStyle = "white";
        ctx.strokeStyle = "black";
        ctx.lineWidth = 3;
        ctx.strokeText(`${j === 0 ? "A" : "B"}${i + 1}`, p.x + 8, p.y - 8);
        ctx.fillText(`${j === 0 ? "A" : "B"}${i + 1}`, p.x + 8, p.y - 8);
      });

      // Draw distance label in middle
      const midX = (m.p1.x + m.p2.x) / 2;
      const midY = (m.p1.y + m.p2.y) / 2;
      ctx.font = "bold 18px Arial";
      ctx.fillStyle = "yellow";
      ctx.strokeStyle = "black";
      ctx.lineWidth = 4;
      ctx.strokeText(`${m.distance.toFixed(2)} px`, midX, midY);
      ctx.fillText(`${m.distance.toFixed(2)} px`, midX, midY);
    });
  };

  img.src = image.value;
}

// Handle upload
async function handleFileUpload(event) {
  file.value = event.target.files[0];
  if (!file.value) return;
  image.value = URL.createObjectURL(file.value);
  tempPoints.value = [];
  measurements.value = [];
  await nextTick();
  redrawCanvas();
}

// Handle clicks
function onCanvasClick(event) {
  if (!image.value) return;
  const rect = canvas.value.getBoundingClientRect();
  const scaleX = canvas.value.width / rect.width;
  const scaleY = canvas.value.height / rect.height;
  const x = (event.clientX - rect.left) * scaleX;
  const y = (event.clientY - rect.top) * scaleY;

  tempPoints.value.push({ x: Math.round(x), y: Math.round(y) });

  if (tempPoints.value.length === 2) {
    const p1 = tempPoints.value[0];
    const p2 = tempPoints.value[1];
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const dist = Math.sqrt(dx * dx + dy * dy);

    measurements.value.push({ p1, p2, distance: dist });
    tempPoints.value = [];
  }

  redrawCanvas();
}

// Reset
function resetAll() {
  image.value = null;
  file.value = null;
  tempPoints.value = [];
  measurements.value = [];
}
</script>
