<template>
  <div>
    <base-table :data="usersTable.data" :columns="usersTable.columns" thead-classes="text-primary"></base-table>
  </div>
</template>
<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      same: "eza",
      usersTable: {
        title: "Simple Table",
        columns: [
          { isLink: false, style: "width: 5%", className: "", name: "id" },
          {
            isLink: true,
            style: "width: 50%",
            className: "text-left",
            name: "subject"
          },
          {
            isLink: false,
            style: "width: 15%",
            className: "",
            name: "created"
          },
          {
            isLink: false,
            style: "width: 15%",
            className: "",
            name: "last_activity"
          },
          { isLink: false, style: "width: 15%", className: "", name: "status" }
        ],
        data: [
          {
            id: 1,
            subject: "Dakota Rice",
            created: "11/11/1111",
            status: "Done",
            last_activity: "11/11/1111"
          }
        ]
      }
    };
  }
};
</script>
<style>
</style>
