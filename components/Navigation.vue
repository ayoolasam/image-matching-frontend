<template>
  <nav class="bg-[#1E201E] py-2 shadow-md">
    <div class="max-w-6xl mx-auto px-4 flex justify-between items-center h-[70px]">
      <!-- Logo / Title -->
      <h1 class="text-md lg:text-2xl font-bold text-green-600 flex items-center gap-2">
        Image Registration Tool
      </h1>

      <!-- Hamburger Button (only on mobile) -->
      <button 
        @click="isOpen = !isOpen" 
        class="lg:hidden text-white focus:outline-none"
      >
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          class="h-6 w-6" 
          fill="none" 
          viewBox="0 0 24 24" 
          stroke="currentColor"
        >
          <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            stroke-width="2" 
            d="M4 6h16M4 12h16M4 18h16" 
          />
        </svg>
      </button>

      <!-- Links (desktop) -->
      <ul class="hidden lg:flex space-x-6 text-white font-medium">
        <li>
          <RouterLink
            to="/image-matching"
            class="hover:text-green-600 transition"
            active-class="text-green-600 font-semibold border-b-2 border-green-600"
          >
            Image Matching and Registration
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/image-measurement"
            class="hover:text-green-600 transition"
            active-class="text-green-600 font-semibold border-b-2 border-green-600"
          >
            Image Measurement
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/distance-measurement"
            class="hover:text-green-600 transition"
            active-class="text-green-600 font-semibold border-b-2 border-green-600"
          >
            Distance Measurement
          </RouterLink>
        </li>
      </ul>
    </div>

    <!-- Mobile Dropdown -->
    <div 
      v-if="isOpen" 
      class="lg:hidden bg-[#1E201E] px-4 pb-4"
    >
      <ul class="flex flex-col gap-4 text-white font-medium">
        <li>
          <RouterLink
            to="/image-matching"
            class="hover:text-green-600 transition block"
            active-class="text-green-600 font-semibold"
            @click="isOpen = false"
          >
            Image Matching and Registration
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/image-measurement"
            class="hover:text-green-600 transition block"
            active-class="text-green-600 font-semibold"
            @click="isOpen = false"
          >
            Image Measurement
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/distance-measurement"
            class="hover:text-green-600 transition block"
            active-class="text-green-600 font-semibold"
            @click="isOpen = false"
          >
            Distance Measurement
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
import { ref } from "vue"

const isOpen = ref(false)
</script>

<style scoped>
a {
  position: relative;
  padding-bottom: 4px;
}
a::after {
  content: "";
  position: absolute;
  left: 0;
  bottom: 0;
  width: 0%;
  height: 2px;
  background: #16a34a;
  transition: width 0.3s ease;
}
a:hover::after {
  width: 100%;
}
</style>
