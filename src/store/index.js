import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stockInventory: [],
  },

  mutations: {
    SET_STOCK(state, stock) {
      state.stockInventory = stock;
    },
  },
  actions: {
    async loadStock({ commit }) {
      const res = await api.get("/stockInventory");
      commit("SET_STOCK", res.data);
    },
    async updateStockCount({ state }, { itemType, change }) {
      const item = state.stockInventory.find(
        (s) => s.itemType.toLowerCase() == itemType.toLowerCase(),
      );

      if (!item) {
        return;
      }

      const newQuantity = item.quantity + change;
      await api.patch(`/stockInventory/${item.id}`, {
        quantity: newQuantity,
      });
    },
  },
});
