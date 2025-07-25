<script setup lang="ts">
/*import { ref, onMounted, computed } from 'vue';
import LineChart from '@/components/LineChart.vue';
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { useDataStore } from '@/stores/dataStore.ts';

const dataStore = useDataStore();
onMounted(async () => {
  await dataStore.fetchData();
});

const nutrientChartData = computed(() => ({
  labels: dataStore.labels,
  datasets: [
    {
      label: 'NA Levels',
      data: dataStore.naLevels,
      borderColor: 'rgba(75,192,192,1)',
      backgroundColor: 'rgba(75,192,192,0.2)',
      tension: 0.4
    },
    {
      label: 'pH Levels',
      data: dataStore.phLevels,
      borderColor: 'rgba(255,99,132,1)',
      backgroundColor: 'rgba(255,99,132,0.2)',
      tension: 0.4
    },
    {
      label: 'Phosphate Levels',
      data: dataStore.ammoniaLevels,
      borderColor: 'rgba(54,162,235,1)',
      backgroundColor: 'rgba(54,162,235,0.2)',
      tension: 0.4
    },
    {
      label: 'Ammonium Levels',
      data: dataStore.oxygenDemandLevels,
      borderColor: 'rgba(255,206,86,1)',
      backgroundColor: 'rgba(255,206,86,0.2)',
      tension: 0.4
    }
  ]
}));

const rainChartData = computed(() => ({
  labels: dataStore.rainlabels,
  datasets: [
    {
      label: 'Rain Levels',
      data: dataStore.rainLevels,
      borderColor: 'rgba(153,102,255,1)',
      backgroundColor: 'rgba(153,102,255,0.2)',
      tension: 0.4,
      borderDash: [5, 5]
    }
  ]
}));

const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'bottom',
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

const averageAmmonia = computed(() => calculateAverage(dataStore.ammoniaLevels));
const averageOxygen = computed(() => calculateAverage(dataStore.oxygenDemandLevels));
const averagePH = computed(() => calculateAverage(dataStore.phLevels));
const averageNutrient = computed(() => calculateAverage(dataStore.naLevels));
const averageRain = computed(() => calculateAverage(dataStore.rainLevels));

/*

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://your-url.supabase.co';
const supabaseKey = 'your-public-anon-key';
const supabase = createClient(supabaseUrl, supabaseKey);

const availableYears = ref<number[]>([]);
const selectedYear = ref(new Date().getFullYear());

// Ophalen van beschikbare jaren uit Supabase
async function fetchAvailableYears() {
  const { data, error } = await supabase
    .from('measurements')
    .select('year')
    .order('year', { ascending: false })
    .neq('year', null)
    .limit(10)
    .distinct();

  if (error) {
    console.error('Error fetching years:', error);
    return;
  }

  availableYears.value = data.map((row: any) => row.year);
}

// Data filteren op geselecteerd jaar en tot de huidige maand
function getFilteredChartData(year: number) {
  const currentMonth = new Date().getMonth(); // 0 = Jan, 4 = May

  const filteredIndexes = dataStore.labels
    .map((label: string, index: number) => {
      const [labelYear, labelMonth] = label.split('-').map(Number);
      return labelYear === year && labelMonth <= currentMonth + 1 ? index : -1;
    })
    .filter(index => index !== -1);

  const filterDataset = (dataArray: number[]) =>
    filteredIndexes.map(index => dataArray[index]);

  return {
    labels: filteredIndexes.map(index => dataStore.labels[index]),
    datasets: nutrientChartData.value.datasets.map(dataset => ({
      ...dataset,
      data: filterDataset(dataStore[dataset.label.replace(/ Levels/, '').toLowerCase() + 'Levels'])
    }))
  };
}

// Bijwerken op selectie
watch(selectedYear, (newYear) => {
  nutrientChartData.value = getFilteredChartData(newYear);
});
onMounted(fetchAvailableYears);
*/


import { ref, watch, onMounted } from 'vue';
import LineChart from '@/components/LineChart.vue';
import { Tabs, TabsTrigger, TabsContent, TabsList } from '@/components/ui/tabs'
import { Card, CardHeader, CardContent, CardTitle } from '@/components/ui/card'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu'
import { useDataStore } from '@/stores/dataStore.ts';

const dataStore = useDataStore();

const availableYears = ref<number[]>([]);
const selectedYear = ref(new Date().getFullYear());

// Data state
const nutrientChartData = ref();
const rainChartData = ref();

// Gemiddelden
const averageAmmonia = ref(0);
const averageOxygen = ref(0);
const averagePH = ref(0);
const averageNutrient = ref(0);
const averageRain = ref(0);

// Chart opties
const chartOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: false
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

// Helpers
function calculateAverage(data: number[]): number {
  if (!data.length) return 0;
  const sum = data.reduce((acc, val) => acc + val, 0);
  return parseFloat((sum / data.length).toFixed(2));
}

function getIndexesByYear(year: number): number[] {
  return dataStore.labels
    .map((label: string, index: number) => {
      const [y] = label.split('-');
      return parseInt(y) === year ? index : -1;
    })
    .filter(i => i !== -1 && i <= getCurrentMonthIndexIfCurrentYear(year));
}

function getCurrentMonthIndexIfCurrentYear(year: number): number {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-based
  if (year === currentYear) {
    const label = `${year}-${String(currentMonth + 1).padStart(2, '0')}`;
    const index = dataStore.labels.findIndex(l => l === label);
    return index !== -1 ? index : dataStore.labels.length - 1;
  }
  return dataStore.labels.length - 1;
}

function getRainIndexesByYear(year: number): number[] {
  return dataStore.rainlabels
    .map((label: string, index: number) => {
      const [y] = label.split('-');
      return parseInt(y) === year ? index : -1;
    })
    .filter(i => i !== -1 && i <= getCurrentRainMonthIndexIfCurrentYear(year));
}

function getCurrentRainMonthIndexIfCurrentYear(year: number): number {
  const currentYear = new Date().getFullYear();
  const currentMonth = new Date().getMonth(); // 0-based
  if (year === currentYear) {
    return dataStore.rainlabels.findIndex(label => label === `${year}-${String(currentMonth + 1).padStart(2, '0')}`);
  }
  return dataStore.rainlabels.length - 1;
}


function getFilteredData(indices: number[], arr: number[]): number[] {
  return indices.map(i => arr[i]);
}

function getFilteredChartData(year: number) {
  const nutrientIndices = getIndexesByYear(year);
  const rainIndices = getRainIndexesByYear(year);

  const labels = nutrientIndices.map(i => dataStore.labels[i]);
  const rainlabels = rainIndices.map(i => dataStore.rainlabels[i]);

  return {
    nutrient: {
      labels,
      datasets: [
        {
          label: 'NA Levels',
          data: getFilteredData(nutrientIndices, dataStore.naLevels),
          borderColor: 'rgba(75,192,192,1)',
          backgroundColor: 'rgba(75,192,192,0.2)',
          tension: 0.4
        },
        {
          label: 'pH Levels',
          data: getFilteredData(nutrientIndices, dataStore.phLevels),
          borderColor: 'rgba(255,206,86,1)',
          backgroundColor: 'rgba(255,206,86,0.2)',
          tension: 0.4
        },
        {
          label: 'Phosphate Levels',
          data: getFilteredData(nutrientIndices, dataStore.ammoniaLevels),
          borderColor: 'rgba(54,162,235,1)',
          backgroundColor: 'rgba(54,162,235,0.2)',
          tension: 0.4
        },
        {
          label: 'Ammonium Levels',
          data: getFilteredData(nutrientIndices, dataStore.oxygenDemandLevels),
          borderColor: 'rgba(3,206,86,1)',
          backgroundColor: 'rgba(3,206,86,0.2)',
          tension: 0.4
        }
      ]
    },
    rain: {
      labels: rainlabels,
      datasets: [
        {
          label: 'Rain Levels',
          data: getFilteredData(rainIndices, dataStore.rainLevels),
          borderColor: 'rgba(153,102,255,1)',
          backgroundColor: 'rgba(153,102,255,0.2)',
          tension: 0.4,
          borderDash: [5, 5]
        }
      ]
    },
    averages: {
      Phosphate: calculateAverage(getFilteredData(nutrientIndices, dataStore.ammoniaLevels)),
      Ammonium: calculateAverage(getFilteredData(nutrientIndices, dataStore.oxygenDemandLevels)),
      NA: calculateAverage(getFilteredData(nutrientIndices, dataStore.naLevels)),
      pH: calculateAverage(getFilteredData(nutrientIndices, dataStore.phLevels)),
      rain: calculateAverage(getFilteredData(rainIndices, dataStore.rainLevels))
    }
  };
}

// Initialiseren
onMounted(() => {
  // Extract unieke jaren uit labels
  const years = Array.from(new Set(dataStore.labels.map(label => parseInt(label.split('-')[0]))));
  years.push(2015);
  years.push(2016);
  years.push(2017);
  availableYears.value = years.sort((a, b) => a - b); // Sorteer aflopend

  selectedYear.value = availableYears.value[0]; // 👈 meest recente jaar kiezen

  const initial = getFilteredChartData(selectedYear.value);
  nutrientChartData.value = initial.nutrient;
  rainChartData.value = initial.rain;
  averageAmmonia.value = initial.averages.Phosphate;
  averageOxygen.value = initial.averages.Ammonium;
  averageNutrient.value = initial.averages.NA;
  averagePH.value = initial.averages.pH;
  averageRain.value = initial.averages.rain;
});

// Bijwerken bij jaarselectie
watch(selectedYear, (newYear) => {
  const { nutrient, rain, averages } = getFilteredChartData(newYear);
  nutrientChartData.value = nutrient;
  rainChartData.value = rain;
  averageAmmonia.value = averages.Phosphate;
  averageOxygen.value = averages.Ammonium;
  averageNutrient.value = averages.NA;
  averagePH.value = averages.pH;
  averageRain.value = averages.rain;
});

function onYearSelect(year: number) {
  selectedYear.value = year;

  const updatedData = getFilteredChartData(year);
  nutrientChartData.value = updatedData.nutrient;
  rainChartData.value = updatedData.rain;
}
</script>

<template>
  <div class="flex items-center flex-row h-full">
    <div class="flex flex-col sm:flex-row justify-center items-center w-5/6 h-full">
      <Tabs defaultValue="nutrient" class="w-full">
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
    <div class="w-1/6 h-full flex justify-around flex-col pl-2">
      <div class="w-full flex justify-center">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {{ selectedYear || "Select a year" }}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem v-for="year in availableYears" :key="year" @click="onYearSelect(year)">
              {{ year }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="flex flex-col justify-around h-full">
        <Card class="w-full">
          <CardHeader>
            <CardTitle> {{averageAmmonia}} </CardTitle>
          </CardHeader>
          <CardContent> Ammonia levels </CardContent>
        </Card>
        <Card class="w-full">
          <CardHeader>
            <CardTitle> {{averageOxygen}} </CardTitle>
          </CardHeader>
          <CardContent> Oxygen levels </CardContent>
        </Card>
        <Card class="w-full">
          <CardHeader>
            <CardTitle> {{averageNutrient}} </CardTitle>
          </CardHeader>
          <CardContent> Nutrient levels </CardContent>
        </Card>
        <Card class="w-full">
          <CardHeader>
            <CardTitle> {{averagePH}} </CardTitle>
          </CardHeader>
          <CardContent> PH levels </CardContent>
        </Card>
        <Card class="w-full">
          <CardHeader>
            <CardTitle> {{averageRain}} </CardTitle>
          </CardHeader>
          <CardContent> Rain levels </CardContent>
        </Card>
      </div>
    </div>
  </div>
</template>
