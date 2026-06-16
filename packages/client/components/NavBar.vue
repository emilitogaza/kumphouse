<script setup lang="ts">
import { basePath, isDark, isOffline, isRescanSiteRequestRunning, isStatic, rescanSite, scanMeta, toggleDark, website } from '../logic'
import { useHumanDuration } from '../logic/formatting'

const timeRemaining = computed(() => {
  return useHumanDuration(scanMeta.value.monitor.timeRemaining)
})

const version = __KUMPHOUSE_VERSION__

const favIcon = computed(() => {
  if (!scanMeta.value?.favicon)
    return '/favicon.ico'
  else if (scanMeta.value?.favicon?.startsWith('http'))
    return scanMeta.value?.favicon

  return website + (scanMeta.value?.favicon)
})
</script>

<template>
  <nav class="bg-white dark:bg-transparent font-light border-b border-main flex items-center gap-4 children:my-auto px-3 md:px-6 py-2 ">
    <a class="text-md font-medium font-mono items-center hidden md:flex cursor-pointer" style="color: #3F177F" href="https://kumpan.se" target="_blank">
      <img :src="basePath && basePath !== '/' ? `${basePath}assets/logo-light.svg` : 'assets/logo-light.svg'" height="24" width="24" class="w-[24px] h-[24px] mr-2 hidden dark:block" alt="Kumphouse logo">
      <img :src="basePath && basePath !== '/' ? `${basePath}assets/logo-dark.svg` : 'assets/logo-dark.svg'" height="24" width="24" class="w-[24px] h-[24px] mr-2 block dark:hidden" alt="Kumphouse logo">
      <div class="flex flex-col">
        <span class="dark:text-[#D0CEFB]">Kumphouse</span>
        <span class="text-xs text-gray-500 dark:text-gray-400 font-normal">v{{ version }} · by Kumpan</span>
      </div>
    </a>
    <div class="flex w-full justify-between items-center text-xs md:ml-5 md:mr-10">
      <div class="flex items-center">
        <div v-if="website && !website.includes('localhost')" class="mr-5 hidden xl:block">
          <stat-item
            label="Website"
            size="sm"
          >
            <template #value>
              <img alt="" :src="favIcon" width="16" height="16" class="mr-1 inline-block">
              <span>{{ website.replace('https://', '').replace('http://', '').replace('www.', '') }}</span>
            </template>
          </stat-item>
        </div>
        <div v-if="isOffline" class="mr-5 hidden md:block">
          <warning-chip>
            {{ isStatic ? 'Static' : 'Offline' }} Mode
          </warning-chip>
        </div>
        <div v-if="scanMeta" class="mr-5 hidden md:block">
          <div class="uppercase opacity-55">
            Total Score
          </div>
          <div class="flex items-center">
            <metric-guage v-if="scanMeta?.score" :score="scanMeta.score" :stripped="true" class="font-medium text-sm" />
            <loading-spinner v-else class="h-[24px]" />
          </div>
        </div>
      </div>
      <div v-if="scanMeta?.monitor?.allTargets > 0" class="flex grow justify-around md:mr-5">
        <search-box class="grow mr-3 md:mr-5" />
        <UDropdownMenu
          :items="[[{
            label: 'Rescan Site',
            description: 'Crawl the site again and generate fresh new reports.',
            icon: 'i-mdi-magnify-scan',
            disabled: isRescanSiteRequestRunning || isStatic || isOffline,
            onSelect: () => rescanSite(),
          }]]" :content="{ placement: 'bottom' }"
        >
          <UButton
            icon="i-heroicons-ellipsis-vertical"
            size="sm"
            color="gray"
            variant="ghost"
            :loading="isRescanSiteRequestRunning"
          />
        </UDropdownMenu>
      </div>
      <div v-if="!isOffline && scanMeta?.monitor" class="hidden xl:flex">
        <div class="mr-6">
          <stat-item
            label="Worker Progress"
            :value="`${scanMeta.monitor.donePercStr}% (${scanMeta.monitor.doneTargets}/${scanMeta.monitor.allTargets})`"
            size="sm"
          />
        </div>
        <div class="mr-6 hidden xl:block">
          <stat-item
            label="Time Remaining"
            :value="scanMeta.monitor.status === 'completed' ? '-' : timeRemaining"
            size="sm"
          />
        </div>
        <div class="mr-6 hidden xl:block">
          <stat-item
            label="CPU"
            :value="scanMeta.monitor.status === 'completed' ? '-' : scanMeta.monitor.cpuUsage"
            size="sm"
          />
        </div>
      </div>
    </div>
    <div class="hidden md:flex-auto" />
    <btn-icon
      class="icon-btn text-lg"
      href="https://github.com/harlan-zw/unlighthouse"
      target="_blank"
    >
      <UIcon name="i-carbon-logo-github" />
    </btn-icon>
    <btn-icon class="text-lg cursor-pointer" title="Toggle Dark Mode" @click="toggleDark()">
      <UIcon v-if="isDark" name="i-carbon-moon" />
      <UIcon v-else name="i-carbon-sun" />
    </btn-icon>
  </nav>
</template>
