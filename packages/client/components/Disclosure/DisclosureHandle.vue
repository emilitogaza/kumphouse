<script setup>
</script>

<template>
  <Disclosure v-slot="{ open }" default-open>
    <DisclosureButton
      class="flex items-center transition justify-between w-full px-2 py-1 my-1 text-sm font-medium text-left border-2 border-purple-900/30 text-purple-900/70 hover:text-purple-700 hover:bg-purple-200 dark:border-none dark:bg-purple-900/30 dark:text-purple-100 dark:hover:bg-purple-900/50 dark:hover:text-purple-50 rounded-lg focus:outline-none focus-visible:ring focus-visible:ring-purple-500/75"
    >
      <slot name="label" />
      <UIcon
        name="i-carbon-chevron-up"
        :class="open ? 'transform rotate-180' : ''"
        class="w-5 h-5 color-current transition"
      />
    </DisclosureButton>
    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-out"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <DisclosurePanel class="bg-purple-50 dark:bg-transparent">
        <slot />
      </DisclosurePanel>
    </transition>
  </Disclosure>
</template>
