<template>
  <div class="min-h-screen bg-[#1E201E] flex flex-col items-center py-12 px-6">
    <!-- Uploads -->
    <div class="grid gap-4 w-full place-items-center md:grid-cols-2">
      <!-- Query Upload -->
      <label
        for="query-upload"
        class="p-6 border-2 cursor-pointer hover:border-green-600 h-[450px] w-full lg:w-[500px] border-green-400 rounded-lg bg-[#183D3D] flex flex-col items-center"
      >
        <h2 v-if="!queryImage" class="font-semibold text-white text-lg mb-3">
          Upload Left Image
        </h2>
        <label
          for="query-upload"
          class="cursor-pointer text-center text-white hover:text-green-600"
        >
          <p class="text-sm">Click to upload or drag & drop</p>
          <input
            id="query-upload"
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleFileUpload($event, 'query')"
          />
        </label>
        <div v-if="queryImage" class="mt-4">
          <img
            :src="queryImage"
            alt="Query preview"
            class="h-[300px] rounded-md shadow-md"
          />
        </div>
      </label>

      <!-- Target Upload -->
      <label
        for="target-upload"
        class="p-6 border-2 cursor-pointer hover:border-green-600 h-[450px] w-full lg:w-[500px] border-green-400 rounded-lg bg-[#183D3D] flex flex-col items-center"
      >
        <h2 v-if="!targetImage" class="font-semibold text-white text-lg mb-3">
          Upload Right Image
        </h2>
        <label
          for="target-upload"
          class="cursor-pointer text-center text-white hover:text-green-600"
        >
          <p class="text-sm">Click to upload or drag & drop</p>
          <input
            id="target-upload"
            type="file"
            class="hidden"
            accept="image/*"
            @change="handleFileUpload($event, 'target')"
          />
        </label>
        <div v-if="targetImage" class="mt-4">
          <img
            :src="targetImage"
            alt="Target preview"
            class="h-[300px] rounded-md shadow-md"
          />
        </div>
      </label>
    </div>

    <!-- Algorithm select -->
<div class="w-full max-w-2xl mt-8 relative">
  <label class="block text-white mb-2 font-medium font-montserrat">
    Select Algorithm
  </label>

  <div class="relative inline-block w-full">
    <div
      @click="isDropdownOpen = !isDropdownOpen"
      class="w-full p-3 border border-green-500 rounded-md bg-[#183D3D] text-white flex justify-between items-center cursor-pointer"
    >
      <span class="font-montserrat text-[16px]">
        {{ selectedAlgorithmLabel || 'Choose an algorithm' }}
      </span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="w-5 h-5 text-green-400 transform transition-transform duration-200"
        :class="{ 'rotate-180': isDropdownOpen }"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 9l6 6 6-6" />
      </svg>
    </div>

    <transition name="fade">
      <ul
        v-if="isDropdownOpen"
        class=" mt-1 w-full bg-[#183D3D] border border-green-500 rounded-md shadow-lg z-50  overflow-y-auto"
      >
        <li
          v-for="algo in algorithms"
          :key="algo.value"
          @click="selectAlgorithm(algo)"
          class="px-4 py-2 cursor-pointer font-montserrat text-[15px] hover:bg-green-700 hover:text-white text-white"
        >
          {{ algo.label }}
        </li>
      </ul>
    </transition>
  </div>
</div>



    <!-- Process + Reset buttons -->
    <div class="mt-6 flex gap-4">
      <button
        class="px-6 py-3 bg-transparent border-green-500 border text-white font-semibold rounded-md hover:bg-green-700 disabled:opacity-50"
        :disabled="!queryFile || !targetFile || !selectedAlgorithm || loading"
        @click="submitForMatching"
      >
        {{ loading ? "Processing..." : "Process Images" }}
      </button>

      <button
        v-if="queryFile || targetFile || resultImages.length"
        @click="resetAll"
        class="px-6 py-3 border border-red-500 text-red-400 font-semibold rounded-md hover:bg-red-600 hover:text-white"
      >
        Reset
      </button>
    </div>

    <!-- Show result buttons -->
    <div
      v-if="resultImages.length"
      class="mt-6 flex gap-4 flex-wrap justify-center"
    >
      <button
        v-if="registeredImage"
        @click="openModal(registeredImage)"
        class="px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700"
      >
        Show Registered Image
      </button>
      <button
        v-if="matchedImage"
        @click="openModal(matchedImage)"
        class="px-6 py-3 bg-purple-600 text-white font-semibold rounded-md hover:bg-purple-700"
      >
        Show Matched Keypoints
      </button>
    </div>

    <!-- Metrics -->
    <div v-if="metricsText" class="mt-10 p-6 bg-[#183D3D] rounded-lg shadow max-w-3xl w-full">
      <h3 class="font-semibold text-lg text-white mb-3">Evaluation Metrics</h3>
      <pre class="text-sm text-white whitespace-pre-wrap">{{ metricsText }}</pre>
    </div>

    <!-- Download ZIP -->
    <div v-if="zipBlob" class="mt-6 text-center">
      <button
        @click="downloadZip"
        class="px-6 py-3 border-green-500 border text-white font-semibold rounded-md hover:bg-green-700"
      >
        Download Full Results (ZIP)
      </button>
    </div>

    <!-- 🔹 Modal -->
    <div
      v-if="selectedImage"
      class="fixed inset-0 bg-black/70 flex items-center justify-center z-50"
      @click.self="closeModal"
    >
      <div class="bg-[#183D3D] h-[500px] p-4 rounded-lg max-w-4xl w-full relative">
        <button
          @click="closeModal"
          class="absolute top-2 right-2 text-white hover:text-red-600 text-2xl"
        >
          ✕
        </button>
        <h2 class="text-lg text-white font-bold mb-3 text-center">
          {{ selectedImage.name }}
        </h2>
        <img
          :src="selectedImage.data"
          :alt="selectedImage.name"
          class="h-[400px] w-full mx-auto rounded shadow"
        />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import JSZip from "jszip";

const queryImage = ref(null);
const targetImage = ref(null);
const queryFile = ref(null);
const targetFile = ref(null);
const config = useRuntimeConfig();
const processingApi = config.public.API_URL;

const selectedAlgorithm = ref("");
const loading = ref(false);
const zipBlob = ref(null);
const resultImages = ref([]);
const metricsText = ref(null);
const selectedImage = ref(null);


const isDropdownOpen = ref(false);

const algorithms = [
  { label: "FAST", value: "fast" },
  { label: "ORB", value: "orb" },
  { label: "SIFT", value: "sift" },
  { label: "AKAZE", value: "akaze" },
  { label: "BRISK", value: "brisk" },
];

const selectedAlgorithmLabel = computed(() => {
  const found = algorithms.find((a) => a.value === selectedAlgorithm.value);
  return found ? found.label : "";
});

function selectAlgorithm(algo) {
  selectedAlgorithm.value = algo.value;
  isDropdownOpen.value = false;
}

const registeredImage = ref(null);
const matchedImage = ref(null);

function openModal(img) {
  selectedImage.value = img;
}
function closeModal() {
  selectedImage.value = null;
}

// Handle uploads
function handleFileUpload(event, type) {
  const file = event.target.files[0];
  if (!file) return;
  if (type === "query") {
    queryFile.value = file;
    queryImage.value = URL.createObjectURL(file);
  } else {
    targetFile.value = file;
    targetImage.value = URL.createObjectURL(file);
  }
}

// API call
async function submitForMatching() {
  loading.value = true;
  resultImages.value = [];
  metricsText.value = null;
  zipBlob.value = null;
  registeredImage.value = null;
  matchedImage.value = null;

  try {
    const formData = new FormData();
    formData.append("left", queryFile.value);
    formData.append("right", targetFile.value);
    formData.append("detection_algorithm", selectedAlgorithm.value);

    const res = await fetch(`${processingApi}/register`, {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("API error");
    const blob = await res.blob();
    zipBlob.value = blob;

    // unzip
    const zip = await JSZip.loadAsync(blob);
    for (const filename of Object.keys(zip.files)) {
      const file = zip.files[filename];

      if (filename === "registered_output.jpg") {
        const content = await file.async("base64");
        registeredImage.value = {
          name: "Registered Image",
          data: `data:image/jpeg;base64,${content}`,
        };
        resultImages.value.push(registeredImage.value);
      } else if (filename === "matched_keypoints.jpg") {
        const content = await file.async("base64");
        matchedImage.value = {
          name: "Matched Keypoints",
          data: `data:image/jpeg;base64,${content}`,
        };
        resultImages.value.push(matchedImage.value);
      } else if (filename === "evaluation_metrics.txt") {
        metricsText.value = await file.async("string");
      }
    }
  } catch (err) {
    console.error("❌ Matching failed:", err.message);
  } finally {
    loading.value = false;
  }
}

function downloadZip() {
  if (!zipBlob.value) return;
  const url = URL.createObjectURL(zipBlob.value);
  const a = document.createElement("a");
  a.href = url;
  a.download = "registration_result.zip";
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

// ✅ Reset everything
function resetAll() {
  queryImage.value = null;
  targetImage.value = null;
  queryFile.value = null;
  targetFile.value = null;
  selectedAlgorithm.value = "";
  loading.value = false;
  zipBlob.value = null;
  resultImages.value = [];
  metricsText.value = null;
  selectedImage.value = null;
  registeredImage.value = null;
  matchedImage.value = null;
}
</script>
