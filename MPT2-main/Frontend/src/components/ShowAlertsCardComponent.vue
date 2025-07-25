<script setup lang="ts">
  import { ref, computed, watch, onMounted } from 'vue';
  import { Switch } from '@/components/ui/switch';
  import { useDataStore } from '@/stores/dataStore.ts';
  import { Button } from '@/components/ui/button';

  const dataStore = useDataStore();

  onMounted(() => {
    dataStore.loadfromLocalStorage();
  });

  const alerts = computed(() => dataStore.alerts);
  const idToRemove = ref<number | null>(null);

  function removeAlert() {
    if (idToRemove.value != null) {
      dataStore.removeAlertById(idToRemove.value);
      idToRemove.value = null;
    }
  }
</script>

<template>
  <div class="overflow-auto scrollbar-hide">
    <div v-for="(alert, index) in alerts" :key="alert.id" class="flex justify-between items-center py-2 border-b">
      <p>
        #{{ alert.id }}  -  {{ alert.item }} {{ alert.symbol }} {{ alert.value }}
      </p>
      <Switch :model-value="alert.enabled" @update:model-value="(newVal) => dataStore.toggleAlert(alert.id, newVal)" />
    </div>
  </div>
  <div class="flex flex-row justify-between items-center mt-4">
    <input type="number" v-model.number="idToRemove" placeholder="Alert ID" class="bg-transparent border px-2 py-1 rounded-lg" />
    <Button @click="removeAlert">Remove alert</Button>
  </div>
</template>

