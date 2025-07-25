<template>
  <div class="p-8 rounded-2xl shadow-lg mx-auto">
    <h1 class="text-3xl font-bold mb-6">About this Dashboard</h1>

    <p class="mb-6">
      Welcome to the Water Hyacinth Monitoring Dashboard for Hartbeespoort Dam. This dashboard is a specialized tool designed exclusively for environmental monitoring teams, dam management authorities, and related technical stakeholders.
    </p>

    <p class="mb-6">
      This dashboard is designed to support real-time awareness and informed decision-making by visualizing how nutrient levels and weather conditions affect water hyacinth growth patterns in the dam.
    </p>

    <div class="border-l-4 pl-4 mb-6">
      <h2 class="text-2xl font-semibold">What This Dashboard Shows</h2>
    </div>

    <ul class="space-y-4">
      <li>
        <h3 class="font-semibold">Monthly Nutrient Averages</h3>
        <p>
          Nutrient and rain data is presented using aggregated monthly averages, offering a clean and digestible way to observe long-term trends without overwhelming users with raw daily data.
        </p>
      </li>

      <li>
        <h3 class="font-semibold">Hyacinth Growth Forecasting</h3>
        <p>
          Powered by machine learning models, this dashboard estimates the likelihood of hyacinth proliferation based on historic nutrient levels, rainfall trends, and other contributing environmental factors.
        </p>
      </li>

      <li>
        <h3 class="font-semibold">Alert System</h3>
        <p>
          Threshold-based logic is built into the dashboard to simulate how alerts would appear when nutrient levels exceed concern levels. Users can manually input nitrogen thresholds, allowing the system to visually demonstrate how it would respond to potential hyacinth bloom conditions in a real-world deployment.
        </p>
      </li>

      <li>
        <h3 class="font-semibold">Growth Trend Visualizations</h3>
        <p>
          Interactive charts and indicators illustrate bloom potential over time, offering at-a-glance clarity for ongoing monitoring.
        </p>
      </li>
    </ul>

    <div class="mt-10 border-t pt-6">
      <h2 class="text-xl font-semibold mb-2">Reminder</h2>
      <p>
        This dashboard is not intended for public viewing or engagement. It is a professional-grade tool built specifically for those tasked with managing and maintaining Hartbeespoort Dam. Its design focuses on clarity, accuracy, and technical relevance for practical environmental monitoring.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// No script logic required for this static content
</script>

