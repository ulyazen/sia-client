<template>
  <v-navigation-drawer v-model="drawer" app class="grey lighten-4">
    <v-sheet dark color="primary" class="pa-5">
      <div>Sistem Informasi Akademik</div>
    </v-sheet>

    <v-divider></v-divider>

    <v-list>
      <v-list-item
        v-for="[icon, text, address] in links"
        :key="icon"
        :to="{
          name: address,
        }"
        link
      >
        <v-list-item-icon>
          <v-icon>{{ icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ text }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
  </v-navigation-drawer>
</template>
<script>
export default {
  data: () => ({
    drawer: null,
    links: [
      ["mdi-account-tie", "Mahasiswa", "mahasiswa.index"],
      ["mdi-account-group", "Dosen", "dosen.index"],
      ["mdi-city", "Fakultas", "fakultas.index"],
      ["mdi-home-city", "Program Studi", "prodi.index"],
      ["mdi-clipboard-text", "Matakuliah", "matakuliah.index"],
      ["mdi-clipboard-check", "Matakuliah Aktif", "matakuliah_aktif.index"],
      ["mdi-clipboard-account", "Krs", "krs.index"],
      ["mdi-clipboard-list", "Khs", "khs.index"],
      ["mdi-clipboard-text-search", "Transkrip", "transkrip.index"],
    ],
  }),
};
</script>
