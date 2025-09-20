<template>
  <div class="min-h-screen bg-[#1E201E] flex flex-col items-center py-12 px-4">
    <!-- Title -->
    <h1 class="text-2xl md:text-3xl font-extrabold text-white mb-6">
      Image Coordinate Picker
    </h1>

    <!-- Upload Section -->
    <label
      class="cursor-pointer border-2 border-green-400 bg-[#183D3D] rounded-xl p-8 w-full lg:w-[700px] flex flex-col items-center shadow-md hover:shadow-lg transition"
    >
      <p class="text-white font-medium mb-2">Click to upload or drag & drop</p>
      <input
        type="file"
        accept="image/*"
        class="hidden"
        @change="handleFileUpload"
      />
      <div v-if="!imageSrc" class="text-sm text-gray-400">No image uploaded</div>
    </label>

    <!-- Image Viewer -->
    <div v-if="imageSrc" class="mt-8 w-full max-w-3xl">
      <div class="relative border rounded-xl shadow-lg bg-white overflow-hidden">
        <img
          ref="imageRef"
          :src="imageSrc"
          alt="Uploaded"
          class="w-full h-auto cursor-crosshair"
          @click="getCoordinates"
        />

        <!-- Click Markers -->
        <div
          v-for="(pt, idx) in clickedPoints"
          :key="idx"
          class="absolute w-4 h-4 bg-red-500 border-2 border-white rounded-full -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          :style="{ left: pt.displayX + 'px', top: pt.displayY + 'px' }"
        >
          <span
            class="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold bg-black/70 text-white px-1.5 py-0.5 rounded"
          >
            {{ idx + 1 }}
          </span>
        </div>
      </div>
    </div>

    <!-- Coordinates Table -->
    <div
      v-if="clickedPoints.length"
      class="mt-10 w-full max-w-md bg-white rounded-xl shadow-lg p-6"
    >
      <h2 class="font-semibold text-lg text-gray-800 mb-4">
        Clicked Points
      </h2>
      <div class="overflow-x-auto">
        <table class="w-full text-sm text-left border-collapse">
          <thead>
            <tr class="bg-green-100 text-gray-700">
              <th class="px-3 py-2 border">#</th>
              <th class="px-3 py-2 border">X</th>
              <th class="px-3 py-2 border">Y</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="(pt, idx) in clickedPoints"
              :key="idx"
              class="hover:bg-green-50"
            >
              <td class="px-3 py-2 border text-center font-medium">
                {{ idx + 1 }}
              </td>
              <td class="px-3 py-2 border">{{ pt.x }}</td>
              <td class="px-3 py-2 border">{{ pt.y }}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Action Buttons -->
      <div class="mt-6 flex justify-center gap-4">
        <button
          @click="downloadCSV"
          class="px-6 py-3 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition"
        >
          Download CSV
        </button>
        <button
          @click="resetPoints"
          class="px-6 py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
        >
          Reset
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";

const imageSrc = ref(null);
const imageRef = ref(null);
const clickedPoints = ref([]);

// Handle upload
function handleFileUpload(event) {
  const file = event.target.files[0];
  if (file) {
    imageSrc.value = URL.createObjectURL(file);
    clickedPoints.value = [];
  }
}

// Handle click
function getCoordinates(event) {
  const img = imageRef.value;
  if (!img) return;

  const rect = img.getBoundingClientRect();

  const displayX = event.clientX - rect.left;
  const displayY = event.clientY - rect.top;

  const scaleX = img.naturalWidth / rect.width;
  const scaleY = img.naturalHeight / rect.height;

  const x = Math.round(displayX * scaleX);
  const y = Math.round(displayY * scaleY);

  clickedPoints.value.push({ x, y, displayX, displayY });
}

// Download CSV
function downloadCSV() {
  if (!clickedPoints.value.length) return;

  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "Index,X,Y\n";
  clickedPoints.value.forEach((pt, idx) => {
    csvContent += `${idx + 1},${pt.x},${pt.y}\n`;
  });

  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "coordinates.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Reset points
function resetPoints() {
  clickedPoints.value = [];
}
</script>
