<script setup lang="ts">
 import ShowAlertsCard from '@/components/ShowAlertsCardComponent.vue';
</script>

<template>
  <h1 class="font-bold pb-5">Current alerts</h1>
  <div class="flex flex-col justify-between h-full pb-10">
    <ShowAlertsCard />
  </div>
</template>
