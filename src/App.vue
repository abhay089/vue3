<template>
  <v-app>
    <v-main>
      <Navbar @titlechange="titlechange" :dataFromParent="dataFromParent" />
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import Navbar from "@/components/Navbar.vue";

import { reactive } from "vue";
const titlechange = (value: string) => {
  dataFromParent.title = value;
};
const dataFromParent = reactive({
  title: "Your Dashboard(name Coming from Parent)",
});
</script>
