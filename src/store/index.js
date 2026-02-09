import Vue from "vue";
import Vuex from "vuex";
import api from "@/services/api";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    stockInventory: [],
    totalBlood: 0,
  },

  mutations: {
    SET_STOCK(state, stock) {
      state.stockInventory = stock;
    },

    UPDATE_STOCK_COUNT(state, { itemType, change }) {
      const item = state.stockInventory.find((s) => s.itemType === itemType);

      if (item) {
        item.quantity += change;
      }
    },
  },
  actions: {
    async loadStock({ commit }) {
      const res = await api.get("/stockInventory");
      commit("SET_STOCK", res.data);
    },
    async updateStockCount({ state, commit }, { itemType, change }) {
      const item = state.stockInventory.find((s) => s.itemType === itemType);

      if (!item) {
        return;
      }

      const newQuantity = item.quantity + change;

      await api.patch(`/stockInventory/${item.id}`, {
        quantity: newQuantity,
      });

      commit("UPDATE_STOCK_COUNT", { itemType, change });
    },
  },
  // getters: {
  //     totalBloodCount(state) {
  //       return state.stockInventory
  //         .filter(item => item.inventoryType === 'blood')
  //         .reduce((sum, item) => sum + item.quantity, 0);
  //     }
  //   }
});
