<script setup lang="ts">
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import AppSidebar from '@/components/AppSidebar.vue';
import { RouterView } from 'vue-router';
</script>

<template>
  <SidebarProvider>
    <div class="flex h-screen w-screen max-h-screen overflow-hidden">
      <!-- Sidebar -->
      <AppSidebar />

      <!-- Main Content -->
      <main class="flex-1 p-4 h-screen overflow-auto" style="width: calc(100% - 16rem);">
        <SidebarTrigger class="absolute" />
        <slot />
        <RouterView />
      </main>
    </div>
  </SidebarProvider>
</template>

