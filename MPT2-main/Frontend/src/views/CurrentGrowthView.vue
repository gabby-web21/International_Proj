<script setup lang="ts">
import { ref } from 'vue';
import LineChart from '@/components/LineChart.vue';
import mockData from '@/assets/data.json';

const lineChartData = ref({
  labels: mockData.labels,
  datasets: [
    {
      label: 'Ammonia Levels',
      data: mockData.ammoniaLevels,
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      tension: 0.4
    },
    {
      label: 'Oxygen Demand Levels',
      data: mockData.oxygenDemandLevels,
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,0.2)',
      tension: 0.4
    },
    {
      label: 'Nutrient Levels',
      data: mockData.nutrientLevels,
      borderColor: 'rgba(54,162,235,1)',
      backgroundColor: 'rgba(54,162,235,0.2)',
      tension: 0.4
    },
    {
      label: 'pH Levels',
      data: mockData.phLevels,
      borderColor: 'rgba(255,206,86,1)',
      backgroundColor: 'rgba(255,206,86,0.2)',
      tension: 0.4
    },
    {
      label: 'Rain Levels',
      data: mockData.rainLevels,
      borderColor: 'rgba(153,102,255,1)',
      backgroundColor: 'rgba(153,102,255,0.2)',
      tension: 0.4
    }
  ]
});

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false, // Zorgt ervoor dat de grafiek flexibeler schaalt
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Water Nutrient Levels'
    }
  },
};
</script>

<template>
  <div class="p-4 flex flex-col items-center">
    <h1 class="text-2xl font-bold mb-4 text-center">Water Nutrient Level Tracker</h1>
    <div class="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex justify-center">
      <LineChart :chart-data="lineChartData" :chart-options="chartOptions" class="w-full h-full" />
    </div>
  </div>
</template>
