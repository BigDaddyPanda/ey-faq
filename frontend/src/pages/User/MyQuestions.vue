<template>
  <base-table :data="usersTable.data" :columns="usersTable.columns" thead-classes="text-primary"></base-table>
</template>
<script>
import { BaseTable } from "@/components";
export default {
  components: {
    BaseTable
  },
  data() {
    return {
      usersTable: {
        title: "Simple Table",
        columns: [
          { isLink: false, style:"width: 5%",className: "", name: "id" },
          { isLink: true, style:"width: 50%",className: "text-left", name: "subject" },
          { isLink: false, style:"width: 15%",className: "", name: "created" },
          { isLink: false, style:"width: 15%",className: "", name: "last_activity" },
          { isLink: false, style:"width: 15%",className: "", name: "status" }
        ],
        data: [
          {
            id: 1,
            subject: "Dakota Rice",
            created: new Date().toLocaleDateString(),
            status: "Done",
            last_activity: new Date().toLocaleDateString()
          },
          {
            id: 2,
            subject: "Minerva Hooper",
            created: new Date().toLocaleDateString(),
            status: "Done",
            last_activity: new Date().toLocaleDateString()
          },
          {
            id: 3,
            subject: "Sage Rodriguez",
            created: new Date().toLocaleDateString(),
            status: "Done",
            last_activity: new Date().toLocaleDateString()
          },
          {
            id: 4,
            subject: "Philip Chaney",
            created: new Date().toLocaleDateString(),
            status: "Done",
            last_activity: new Date().toLocaleDateString()
          },
          {
            id: 5,
            subject: "Doris Greene",
            created: new Date().toLocaleDateString(),
            status: "Done",
            last_activity: new Date().toLocaleDateString()
          },
          {
            id: 6,
            subject: "Mason Porter",
            created: new Date().toLocaleDateString(),
            status: "Done",
            last_activity: new Date().toLocaleDateString()
          },
          {
            id: 7,
            subject: "Jon Porter",
            created: new Date().toLocaleDateString(),
            status: "Done",
            last_activity: new Date().toLocaleDateString()
          }
        ]
      }
    };
  }
};
</script>
<style>
</style>
