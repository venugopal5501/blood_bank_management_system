<template>
  <div class="table-wrapper">
    <table class="stock-table">
      <thead>
        <tr>
          <th v-for="(header, index) in headers" :key="index">
            {{ header.label }}
          </th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
          <td v-for="(header, colIndex) in headers" :key="colIndex">

            <template  v-if="header.key === 'actions'">
              <slot class="actions" name="actions" :row="row"></slot>
            </template>

            <template v-else-if="header.key === 'DonationStatus'">
              <slot class="actions" name="DonationStatus" :row="row">
                {{ row[header.key] }}
              </slot>
            </template>

            <template v-else>
              {{ row[header.key] }}
            </template>

          </td>
        </tr>
      </tbody>

    </table>
  </div>
</template>

<script>
export default {
  name: "DataTable",
  props: {
    headers: {
      type: Array,
      required: true
    },
    rows: {
      type: Array,
      required: true
    }
  }
}
</script>