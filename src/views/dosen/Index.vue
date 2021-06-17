<template>
  <v-data-table
    :headers="headers"
    :items="dosen"
    class="elevation-1"
    :loading="loading"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Data Dosen</v-toolbar-title>
        <v-divider class="mx-4" inset vertical></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on, attrs }">
            <v-btn color="primary" dark class="mb-2" v-bind="attrs" v-on="on">
              Tambah Data Dosen
            </v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="dosenItem.nama"
                      label="Nama Dosen"
                    ></v-text-field>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-text-field
                      v-model="dosenItem.nip_niy"
                      label="NIP/NIY"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="close">
                Batal
              </v-btn>
              <v-btn color="blue darken-1" text @click="store">
                Simpan
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5"
              >Anda yakin untuk menghapus data?</v-card-title
            >
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete"
                >Batal</v-btn
              >
              <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                >Simpan</v-btn
              >
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon small class="mr-2" @click="editItem(item)">
        mdi-pencil
      </v-icon>
      <v-icon small @click="deleteItem(item)">
        mdi-delete
      </v-icon>
    </template>
    <template v-slot:no-data>
      <v-btn color="primary" @click="initialize">
        Reset
      </v-btn>
    </template>
  </v-data-table>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    loading: true,
    dialog: false,
    dialogDelete: false,
    headers: [
      { text: "Nama", value: "nama" },
      { text: "NIP/NIY", value: "nip_niy" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    dosen: [
      {
        id: null,
        nama: null,
        nip_niy: null,
      },
    ],
    editedIndex: -1,
    dosenItem: {
      id: "",
      nama: "",
      nip_niy: "",
    },

    defaultItem: {
      id: "",
      nama: "",
      nip_niy: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    this.initialize();
  },

  methods: {
    initialize() {
      axios
        .get("http://127.0.0.1:8000/api/dosen")
        .then((response) => {
          this.dosen = response.data.data;
          this.loading = false;
        })
        .catch((e) => {
          console.log(e);
        });
    },

    store() {
      if (this.editedIndex > -1) {
        axios.put(
          `http://127.0.0.1:8000/api/dosen/${this.dosenItem.id}`,
          this.dosenItem
        );
        Object.assign(this.dosen[this.editedIndex], this.dosenItem);
      } else {
        axios.post(`http://127.0.0.1:8000/api/dosen`, this.dosenItem);
        this.dosen.push(this.dosenItem);
      }
      this.close();
    },

    editItem(item) {
      this.editedIndex = this.dosen.indexOf(item);
      this.dosenItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.dosen.indexOf(item);
      this.dosenItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      axios
        .delete(`http://127.0.0.1:8000/api/dosen/${this.dosenItem.id}`)
        .then(() => {
          this.dosen.splice(this.editedIndex, 1);
          this.closeDelete();
        })
        .catch((e) => {
          console.log(e);
        });
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.dosenItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.dosenItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        Object.assign(this.dosen[this.editedIndex], this.dosenItem);
      } else {
        this.dosen.push(this.dosenItem);
      }
      this.close();
    },
  },
};
</script>
