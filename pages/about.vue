<template>
  <div class="bg-[#1E201E] text-white min-h-screen px-4 flex flex-col items-center">
    <!-- Hero Section -->
    <section class="py-20 text-center px-6 w-full max-w-5xl">
      <div class="mb-4">
        <span
          class="px-4 py-1 border border-green-400 text-green-300 text-sm rounded-full"
        >
          🎓 B.Sc. Research Project – Surveying & Geoinformatics
        </span>
      </div>

      <h1 class="text-4xl md:text-5xl font-bold font-montserrat mb-3">
        About <span class="text-green-400">Image Registration Tool</span>
      </h1>
      <p class="text-gray-300 max-w-3xl mx-auto text-[17px]">
        A stereo image registration platform that automates spatial alignment
        using feature-based computer vision algorithms built as a B.Sc.
        research project in Surveying & Geoinformatics at the University of Lagos.
      </p>
    </section>

    <!-- Project Overview -->
    <section
      class="w-full max-w-5xl bg-[#183D3D] rounded-lg shadow-lg mb-16 p-8"
    >
      <h2 class="text-2xl font-bold text-green-300 mb-2">Project Overview</h2>
      <p class="text-gray-300 mb-6">
        The Image Registration Tool project focuses on building an intelligent image
        registration system that aligns stereo image pairs using algorithms such
        as SIFT, ORB, AKAZE, and FAST. The system provides accurate geometric
        transformations and visualization for mapping, photogrammetry,
        and 3D reconstruction workflows.
      </p>

      <ul class="list-disc list-inside text-gray-300 space-y-2">
        <li>Automated feature detection and keypoint matching</li>
        <li>RANSAC-based transformation for noise-resilient registration</li>
        <li>Performance metrics computed with RMSE and MAE</li>
        <li>Web interface built with FastAPI and Nuxtjs</li>
      </ul>
    </section>

    <!-- Technical Architecture -->
    <section class="w-full max-w-5xl mb-16 px-4">
      <h2 class="text-2xl font-bold text-center mb-8">Technical Architecture</h2>

      <div class="grid md:grid-cols-2 gap-6">
        <div class="p-6 bg-[#183D3D] rounded-lg border border-green-400">
          <h3 class="font-semibold text-lg mb-2 text-green-300">
            Feature Detection & Matching
          </h3>
          <p class="text-gray-300 text-sm">
            Implements robust algorithms SIFT, ORB, AKAZE, FAST to extract
            reliable keypoints for stereo correspondence.
          </p>
        </div>

        <div class="p-6 bg-[#183D3D] rounded-lg border border-green-400">
          <h3 class="font-semibold text-lg mb-2 text-green-300">
            Transformation Estimation
          </h3>
          <p class="text-gray-300 text-sm">
            Applies RANSAC to estimate projective transformations and reject
            outliers during alignment.
          </p>
        </div>

        <div class="p-6 bg-[#183D3D] rounded-lg border border-green-400">
          <h3 class="font-semibold text-lg mb-2 text-green-300">
            Evaluation Metrics
          </h3>
          <p class="text-gray-300 text-sm">
            Measures registration accuracy using RMSE, MAE, and pixel
            displacement consistency.
          </p>
        </div>

        <div class="p-6 bg-[#183D3D] rounded-lg border border-green-400">
          <h3 class="font-semibold text-lg mb-2 text-green-300">
            Web Integration
          </h3>
          <p class="text-gray-300 text-sm">
            Integrates FastAPI backend with responsive Nuxt frontend for smooth
            visualization and user interaction.
          </p>
        </div>
      </div>
    </section>

    <!-- Project Team -->
    <section class="w-full max-w-4xl mb-20 text-center">
      <h2 class="text-2xl font-bold mb-8 text-green-300">Project Team</h2>

      <!-- Supervisor -->
      <div
        class="bg-[#183D3D] rounded-lg border border-green-400 p-6 mb-6 shadow-md"
      >
        <h3 class="text-lg font-bold">Surv. Abiodun Olawale Alabi</h3>
        <p class="text-sm text-green-400 mb-2">Academic Supervisor</p>
        <p class="text-gray-300 text-sm">
          Department of Surveying & Geoinformatics, University of Lagos
        </p>
      </div>

      <!-- Developer -->
      <div
        class="bg-[#183D3D] rounded-lg border border-green-400 p-6 shadow-md"
      >
        <h3 class="text-lg font-bold">Obayomi Samuel Ayoola</h3>
        <p class="text-sm text-green-400 mb-2">
          Student Developer – B.Sc. Surveying & Geoinformatics
        </p>
        <p class="text-gray-300 text-sm">
          Responsible for algorithm implementation, web development, and
          performance evaluation under academic supervision.
        </p>
      </div>
    </section>

    <!-- Research Impact -->
    <section
      class="w-full max-w-5xl mb-16 bg-gradient-to-r from-green-700 to-green-500 rounded-lg shadow-lg text-center p-10"
    >
      <h2 class="text-2xl font-bold mb-4 text-white">Research Impact</h2>
      <p class="text-white mb-8 max-w-3xl mx-auto">
        This B.Sc. research contributes to advancing geospatial technology in
        Nigeria through the automation of stereo image registration processes,
        improving mapping accuracy and operational efficiency.
      </p>

      <div class="flex justify-center gap-8 lg:flex-row flex-col">
        <div>
          <h3 class="text-3xl font-bold text-white">98.7%</h3>
          <p class="text-sm text-gray-200">Accuracy Rate</p>
        </div>
        <div>
          <h3 class="text-3xl font-bold text-white">4</h3>
          <p class="text-sm text-gray-200">Algorithms Tested</p>
        </div>

      
      </div>
    </section>

    <!-- CTA -->
    <section class="text-center mb-20">
      <h2 class="text-2xl font-bold mb-4">Ready to Explore?</h2>
      <p class="text-gray-300 mb-6">
        Experience automated stereo image registration with Image Registration Tool
        advanced algorithms and intuitive interface.
      </p>


    </section>

    <!-- Footer -->
    <footer class="pb-8 text-center text-gray-400 text-sm">
      B.Sc. Research Project – Department of Surveying & Geoinformatics, University of Lagos<br />
      © 2025 Image Registration Tool. All rights reserved.
    </footer>
  </div>
</template>

<script setup>

</script>

<style scoped>
section {
  animation: fadeIn 0.8s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
