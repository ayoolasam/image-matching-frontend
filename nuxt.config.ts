import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
   css: ['~/assets/css/main.css'],
   vite: {
    plugins: [
      tailwindcss(),
    ],
  },
    runtimeConfig: {
    public: {
      API_URL:  import.meta.env.NUXT_PUBLIC_API_URL,
     
    },
  },
})
