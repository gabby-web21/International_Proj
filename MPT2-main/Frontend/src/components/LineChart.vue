<script setup lang="ts">
import { defineComponent } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale
} from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, LineElement, PointElement, CategoryScale, LinearScale);

defineComponent({
  name: 'LineChart',
});

import type { ChartData } from 'chart.js';

const props = defineProps<{
  chartData: ChartData<'line'>,
  chartOptions: Record<string, any>
}>();

</script>

<template>
  <Line v-if="chartData" :data="chartData" :options="chartOptions" />
</template>
