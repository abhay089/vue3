<template>
  <v-card>
    <v-toolbar color="primary">
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-toolbar-title>{{ dataFromParent.title }}</v-toolbar-title>

      <v-spacer></v-spacer>

      <button @click="$emit('titlechange', 'Change from parent to child')">
        Change title
      </button>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" align-tabs="title">
          <v-tab v-for="item in items" :key="item" :value="item">
            {{ item }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-window v-model="tab">
      <v-window-item value="UserForm">
        <v-card flat>
          <userForm />
        </v-card>
      </v-window-item>
      <v-window-item value="UserList">
        <v-card flat>
          <userList />
        </v-card>
      </v-window-item>
    </v-window>
  </v-card>
</template>
<script setup lang="ts">
import userForm from "@/components/userForm.vue";
import userList from "@/components/userList.vue";
import { emit } from "process";

import { ref, reactive, defineProps, toRefs } from "vue";

const props = defineProps({
  dataFromParent: {
    type: Object,
    required: true,
  },
});
const { dataFromParent } = toRefs(props);

const tab = ref(null);
const items = ref(["UserForm", "UserList"]);
</script>
