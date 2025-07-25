<script setup lang="ts">
import { ref } from 'vue';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from '@/components/ui/dropdown-menu';
import { useDataStore } from '@/stores/dataStore.ts';

const dataStore = useDataStore();
function setAlert(item: string, symbol: string, value: number) {
  dataStore.addAlert({ item, symbol, value });
}

const symbols = [
  { name: 'lt', value: '<' },
  { name: 'lte', value: '<=' },
  { name: 'eq', value: '=' },
  { name: 'gte', value: '>=' },
  { name: 'gt', value: '>' }
];

const items = [
  { name: 'PH', value: 'PH' },
  { name: 'Natrium', value: 'NA' },
  { name: 'Phosphate', value: 'PO4' },
  { name: 'Ammonium', value: 'NH4' }
];


const selectedSymbol = ref(symbols[0].value);
const selectedItem = ref(items[0].value);

function onSymbolSelect(symbol: any) {
  selectedSymbol.value = symbol.value;
}

function onItemSelect(item: any) {
  selectedItem.value = item.value;
}

function setNewAlert() {
  const alertValue = (document.getElementById('alert') as HTMLInputElement).value;
  if (alertValue) {
    setAlert(selectedItem.value, selectedSymbol.value, parseFloat(alertValue));
  }
}
</script>

<template>
  <h1 class="font-bold pb-5">New alert</h1>
  <div class="flex flex-col justify-between h-full pb-10">
    <div class="flex flex-row justify-between">
      <div class="flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {{ selectedItem }}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem v-for="item in items" :key="item.name" @click="onItemSelect(item)">
              {{ item.value }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="flex flex-col">
        <DropdownMenu>
          <DropdownMenuTrigger>
            {{ selectedSymbol }}
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem v-for="symbol in symbols" :key="symbol.name" @click="onSymbolSelect(symbol)">
              {{ symbol.value }}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div class="flex flex-col">
        <input type="number" id="alert" placeholder="0.0" class="bg-transparent">
      </div>
    </div>
    <div>
      <Button @click="setNewAlert()">Set new alert</Button>
    </div>
  </div>
</template>
