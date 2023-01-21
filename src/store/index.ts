import { createStore } from "vuex";

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

export default createStore({
  state: {
    data: [],
  },
  mutations: {
    fetchUsers(state, data) {
      state.data = data;
    },
  },
  actions: {
    fetchUsers(context) {
      fetch("https://jsonplaceholder.typicode.com/users")
        .then(function (response) {
          return response.json();
        })
        .then(function (data: User[]) {
          return data.map((item: User) => {
            const { city, zipcode, street, suite } = item.address;
            item.addressStr = `${street} ${suite} ${city} ${zipcode}`;

            const { name, catchPhrase, bs } = item.company;
            item.companyStr = `${name} ${catchPhrase} ${bs}`;

            return item;
          });
        })
        .then(function (data) {
          context.commit("fetchUsers", data);
        });
    },
  },
  getters: {
    data: (state) => state.data,
  },
});
