<script setup lang="ts">
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import ThemeToggle from "@/components/ThemeToggle.vue";
import { useRouter } from "vue-router";

const router = useRouter();

const items = [
  { title: "Dashboard", path: "/"},
  { title: "History", path: "/history"},
  { title: "Alerts", path: "/alerts"},
  { title: "About", path: "/about"},

];
</script>

<template>
  <Sidebar>
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Application</SidebarGroupLabel>
        <SidebarGroupContent>
          <SidebarMenu>
            <SidebarMenuItem v-for="item in items" :key="item.title">
              <SidebarMenuButton asChild>
                <a @click.prevent="router.push(item.path)">
                  {{ item.title }}
                </a>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarGroup>
      <div class="mt-auto p-4">
        <ThemeToggle />
      </div>
    </SidebarContent>
  </Sidebar>
</template>
