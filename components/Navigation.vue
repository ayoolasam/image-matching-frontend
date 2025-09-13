<template>
  <nav class="bg-white shadow-md">
    <div class="max-w-6xl mx-auto px-4 flex justify-between items-center h-[70px]">
      <!-- Logo / Title -->
      <h1 class="text-2xl font-bold text-green-600 flex items-center gap-2">
        🖼️ Image Tool
      </h1>

      <!-- Links -->
      <ul class="flex space-x-6 text-gray-600 font-medium">
        <li>
          <RouterLink
            to="/image-matching"
            class="hover:text-green-600 transition"
            active-class="text-green-600 font-semibold border-b-2 border-green-600"
          >
            Image Matching
          </RouterLink>
        </li>
        <li>
          <RouterLink
            to="/get-coordinates"
            class="hover:text-green-600 transition"
            active-class="text-green-600 font-semibold border-b-2 border-green-600"
          >
            Get Coordinates
          </RouterLink>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script setup>
</script>

<style scoped>
/* optional: smooth underline animation */
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
  background: #16a34a; /* Tailwind green-600 */
  transition: width 0.3s ease;
}
a:hover::after {
  width: 100%;
}
</style>
