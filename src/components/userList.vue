<template>
  <v-card-title>
    <h2>Users</h2>
    <v-spacer></v-spacer>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
    ></v-text-field>
  </v-card-title>
  <v-data-table
    v-model:page="page"
    :headers="headers"
    items-per-page="5"
    :items="filteredItems"
    class="elevation-1"
    @update:options="options = $event"
  >
    <template v-slot:item="{ item }">
      <tr>
        <td>{{ item.columns.name }}</td>
        <td>{{ item.columns.username }}</td>
        <td>{{ item.columns.email }}</td>
        <td>{{ item.columns.addressStr }}</td>
        <td>{{ item.columns.phone }}</td>
        <td>{{ item.columns.companyStr }}</td>
        <td>{{ item.columns.website }}</td>
      </tr>
    </template>
    <template v-slot:bottom>
      <div class="text-center pt-2">
        <v-pagination v-model="page" :length="options.pageCount"></v-pagination>
      </div>
    </template>
  </v-data-table>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useStore } from "vuex";
import { VDataTable } from "vuetify/labs/VDataTable";
import { ref } from "vue";
interface Address {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: {
    lat: string;
    lng: string;
  };
}

interface Company {
  name: string;
  catchPhrase: string;
  bs: string;
}

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: Address;
  phone: string;
  website: string;
  company: Company;
  addressStr: string;
  companyStr: string;
}

const store = useStore();
store.dispatch("fetchUsers");
const items = computed<User[]>(() => {
  return store.state.data;
});

const search = ref("");
const page = ref(1);
const itemsPerPage = ref(5);

const options = ref({
  pageCount: 1,
});

const headers = ref([
  { title: "Name", key: "name" },
  { title: "username", key: "username" },
  { title: "Email", key: "email" },
  { title: "Address", key: "addressStr" },
  { title: "Phone", key: "phone" },
  { title: "Company", key: "companyStr" },
  { title: "Website", key: "website" },
]);

const filteredItems = computed(() => {
  return items.value.filter((item) => {
    return Object.values(item).some(
      (val) =>
        typeof val === "string" &&
        val.toLowerCase().includes(search.value.toLowerCase())
    );
  });
});
</script>
