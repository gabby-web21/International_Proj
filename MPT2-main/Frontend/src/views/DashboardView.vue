<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import LineChart from '@/components/LineChart.vue';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { useDataStore } from '@/stores/dataStore.ts';

const dataStore = useDataStore();

onMounted(async () => {
  await dataStore.fetchData();
  await dataStore.fetchForecastData();
});

const nutrientChartData = computed(() => {
  const { labels, datasets } = filterLastYear(dataStore.forecastlabels, [
    dataStore.naForecast,
    dataStore.phForecast,
    dataStore.ammoniaForecast,
    dataStore.oxygenDemandForecast
  ]);

  return {
    labels,
    datasets: [
      {
        label: 'NA Levels',
        data: datasets[0],
        borderColor: 'rgba(75,192,192,1)',
        backgroundColor: 'rgba(75,192,192,0.2)',
        tension: 0.4
      },
      {
        label: 'pH Levels',
        data: datasets[1],
        borderColor: 'rgba(255,206,86,1)',
        backgroundColor: 'rgba(255,206,86,0.2)',
        tension: 0.4
      },
      {
        label: 'Phosphate Levels',
        data: datasets[2],
        borderColor: 'rgba(54,162,235,1)',
        backgroundColor: 'rgba(54,162,235,0.2)',
        tension: 0.4
      },
      {
        label: 'Ammonium Levels',
        data: datasets[3],
        borderColor: 'rgba(3,206,86,1)',
        backgroundColor: 'rgba(3,206,86,0.2)',
        tension: 0.4
      }
    ]
  };
});

const rainChartData = computed(() => {
  const { labels, datasets } = filterLastYear(dataStore.forecastrainlabels, [dataStore.rainForecast]);

  return {
    labels,
    datasets: [
      {
        label: 'Rain Levels',
        data: datasets[0],
        borderColor: 'rgba(153,102,255,1)',
        backgroundColor: 'rgba(153,102,255,0.2)',
        tension: 0.4,
        borderDash: [5, 5]
      }
    ]
  };
});
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false,
      text: 'Nutrient Levels'
    },
    tooltip: {
      mode: 'index',
      intersect: false,
    }
  },
  interaction: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'index',
    intersect: false
  },
  scales: {
    x: {
      grid: {
        drawOnChartArea: true,
        display: true
      }
    },
    y: {
      grid: {
        drawOnChartArea: true,
        display: true
      }
    }
  }
};

function calculateAverage(data: number[]): number {
  if (!data.length) return 0;
  const sum = data.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / data.length).toFixed(2));
}

function averageFiltered(data: number[], labels: string[]) {
  const { datasets } = filterLastYear(labels, [data]);
  return calculateAverage(datasets[0]);
}


const averageAmmonia = computed(() => averageFiltered(dataStore.ammoniaForecast, dataStore.forecastlabels));
const averageOxygen = computed(() => averageFiltered(dataStore.oxygenDemandForecast, dataStore.forecastlabels));
const averagePH = computed(() => averageFiltered(dataStore.phForecast, dataStore.forecastlabels));
const averageNutrient = computed(() => averageFiltered(dataStore.naForecast, dataStore.forecastlabels));
const averageRain = computed(() => averageFiltered(dataStore.rainForecast, dataStore.forecastrainlabels));

function filterLastYear(labels: string[], datasets: number[][]) {
  const twoYearsAgo = new Date();
  twoYearsAgo.setFullYear(twoYearsAgo.getFullYear() - 1); // Vanaf 2 jaar terug

  const resultLabels: string[] = [];
  const resultData: number[][] = datasets.map(() => []);

  labels.forEach((label, index) => {
    const date = new Date(label);
    if (date >= twoYearsAgo) {
      resultLabels.push(label);
      datasets.forEach((dataset, datasetIndex) => {
        resultData[datasetIndex].push(dataset[index]);
      });
    }
  });

  return { labels: resultLabels, datasets: resultData };
}
</script>

<template>
  <div class="flex justify-center p-2 flex-col items-center h-full ">
    <div class="w-full pb-2">
      <div class="flex justify-around">
        <Card class="w-1/6">
          <CardHeader>
            <CardTitle> {{averageAmmonia}} </CardTitle>
          </CardHeader>
          <CardContent> Phosphate Levels </CardContent>
        </Card>
        <Card class="w-1/6">
          <CardHeader>
            <CardTitle> {{averageOxygen}} </CardTitle>
          </CardHeader>
          <CardContent> Ammonium Levels </CardContent>
        </Card>
        <Card class="w-1/6">
          <CardHeader>
            <CardTitle> {{averageNutrient}} </CardTitle>
          </CardHeader>
          <CardContent> NA Levels </CardContent>
        </Card>
        <Card class="w-1/6">
          <CardHeader>
            <CardTitle> {{averagePH}} </CardTitle>
          </CardHeader>
          <CardContent> PH levels </CardContent>
        </Card>
        <Card class="w-1/6">
          <CardHeader>
            <CardTitle> {{averageRain}} </CardTitle>
          </CardHeader>
          <CardContent> Rain levels </CardContent>
        </Card>
      </div>
    </div>
    <div class="flex flex-col sm:flex-row justify-center items-center w-full h-full">
      <Tabs defaultValue="nutrient" class="w-full h-full">
        <TabsList class="w-full">
          <TabsTrigger value="nutrient" class="w-1/2 text-center">
            Nutrient Levels
          </TabsTrigger>
          <TabsTrigger value="rain" class="w-1/2 text-center">
            Rain Levels
          </TabsTrigger>
        </TabsList>
        <TabsContent value="nutrient" class="w-full">
          <div class="w-full flex flex-col">
            <h1 class="text-2xl font-bold pb-2 text-center">Nutrient Levels</h1>
            <div class="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex justify-center">
              <LineChart :chart-data="nutrientChartData" :chart-options="chartOptions" class="w-full h-full" />
            </div>
          </div>
        </TabsContent>
        <TabsContent value="rain" class="w-full">
          <div class="w-full flex flex-col">
            <h1 class="text-2xl font-bold pb-2 text-center">Rain Levels</h1>
            <div class="w-full h-[50vh] sm:h-[60vh] md:h-[70vh] flex justify-center">
              <LineChart :chart-data="rainChartData" :chart-options="chartOptions" class="w-full h-full" />
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  </div>
</template>
