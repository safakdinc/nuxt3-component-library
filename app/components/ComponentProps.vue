<template>
  <div class="overflow-auto">
    <table>
      <thead>
        <tr>
          <th v-for="title in page[props.name].head">{{ title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="prop in page[props.name].props" :key="prop.name">
          <td>
            <code>{{ prop.name }}</code>
          </td>
          <td v-if="prop.type">
            <div class="py-[4px] px-[8px] rounded-md w-fit" style="background-color: rgb(37, 37, 37)">{{ prop.type }}</div>
          </td>
          <td v-if="prop.default">
            <code>{{ prop.default }}</code>
          </td>
          <td class="min-w-[260px]">{{ prop.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
const props = defineProps({
  name: {
    type: String,
    default: 'propsList'
  }
});

const { path } = useRoute();
const { data: page } = await useAsyncData(`content-${path}`, () => queryContent(path).findOne());
</script>

<style lang="scss" scoped>
table {
  margin-top: 12px;
  text-indent: 0;
  border-color: inherit;
  border-collapse: collapse;
  & th {
    display: table-cell;
    padding: 8px 16px 8px 16px;
    border: 1px solid rgb(255 255 255/0.3);
    vertical-align: inherit;
    text-align: start;
    font-weight: bold;
    unicode-bidi: isolate;
  }
  & tr:nth-child(even) {
    background-color: var(--background-fade);
  }

  & td {
    padding: 8px 16px 8px 16px;
    width: fit-content;
    border: 1px solid rgb(255 255 255/0.3);
  }
}
</style>
