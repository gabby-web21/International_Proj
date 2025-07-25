<script setup lang="ts">
import ShowAlertsComponent from '@/components/ShowAlertsComponent.vue';
import SetupAlertsComponent from '@/components/SetupAlertsComponent.vue';
</script>

<template>
  <div class="flex columns-2 h-full overflow-hidden">
    <div class="w-1/2 flex justify-center">
      <div class="w-5/6 p-4 ">
        <SetupAlertsComponent />
      </div>
    </div>
    <div class="w-1/2 flex justify-center h-full">
      <div class="w-5/6 border-2 border-green-800 p-4 h-full">
        <ShowAlertsComponent />
      </div>
    </div>
  </div>
</template>
