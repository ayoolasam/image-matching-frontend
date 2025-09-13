<template>
  <div class="flex flex-col items-center justify-center min-h-screen">
 
   
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();


onMounted(()=>{
  router.push('/image-matching')
})

</script>
