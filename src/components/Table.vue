<template>
    <div class="table-wrapper">
      <table class="stock-table">
        <thead>
          <tr>
            <th v-for = "(header, index) in headers" :key="index">
                {{ header }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(row, rowIndex) in rows" :key="rowIndex">
            <td v-for="(header, colIndex) in headers" :key="colIndex">
             {{ row[header] }}
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
        row: {
            type: Array,
            required: true
        }
    }
}
</script>