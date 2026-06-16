<script lang="ts" setup>
import type { KumphouseColumn, KumphouseRouteReport } from '@kumphouse/core'

defineProps<{
  report: KumphouseRouteReport
  column: KumphouseColumn
  value: any
}>()
</script>

<template>
  <audit-result v-if="value" :value="{ score: value.score, displayValue: value.displayValue.replace(' appropriately sized tap targets', '') }" />
</template>
