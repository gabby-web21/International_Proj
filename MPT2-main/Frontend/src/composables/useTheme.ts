import { ref, watch } from 'vue'

export function useTheme() {
  const theme = ref(localStorage.getItem('theme') || 'system')

  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
    updateTheme()
  })

  function updateTheme() {
    const isDark =
      theme.value === 'dark' ||
      (theme.value === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)

    document.documentElement.classList.toggle('dark', isDark)
  }

  function setTheme(newTheme: 'light' | 'dark' | 'system') {
    theme.value = newTheme
  }

  // Initial theme update
  updateTheme()

  // Listen for system theme changes
  window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', updateTheme)

  return { theme, setTheme }
}
