<script lang="ts" setup>
defineProps<{
  selected?: boolean
}>()
</script>

<template>
  <button
    class="space-x-2 focus:outline-none focus:ring-1 ring-offset-purple-400 ring-white ring-opacity-60 flex flex-col text-xs lg:px-2 lg:flex-row lg:py-1 lg:text-sm items-center justify-between w-full leading-5 transition font-medium text-purple-700 rounded-lg cursor-pointer"
    :class="[
      selected
        ? 'bg-purple-900 text-white shadow'
        : 'dark:text-purple-100 dark:hover:bg-white/12 dark:hover:text-white text-purple-900/70 hover:bg-purple-200',
    ]"
  >
    <slot />
  </button>
</template>
