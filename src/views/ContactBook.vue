<template>
  <div class="page row">

    <!-- search -->
    <div class="col-md-10">
      <InputSearch v-model="searchText" />
    </div>

    <div class="mt-3 col-md-6">
      <h4>
        Danh bạ
        <i class="fas fa-address-book"></i>
      </h4>

      <!-- hiển thị tất cả contact muốn xem -->
      <ContactList
        v-if="filteredContactsCount > 0"
        :contacts="filteredContacts"
        v-model:activeIndex="activeIndex"
      />
      <p v-else>Không có liên hệ nào.</p>

      <!-- các nut chức năng -->
      <div class="mt-3 row justify-content-around align-items-center">

        <button class="btn btn-sm btn-primary" @click="refreshList()">
          <i class="fa-solid fa-magnifying-glass"></i> Làm mới
        </button>

        <router-link :to="{ name: 'contact.add'}">
          <button class="btn btn-sm btn-success" @click="goToAddContact">
            <i class="fas fa-plus"></i> Thêm mới
          </button>
        </router-link>

        <button class="btn btn-sm btn-danger" @click="removeAllContacts">
          <i class="fas fa-trash-can"></i> Xóa tất cả
        </button>

      </div>

    </div>

    <!-- Thông tin 1 contact -->
    <div class="mt-3 col-md-6">
      <div v-if="activeContact">
        <h4>
          Chi tiết Liên hệ
          <i class="fas fa-address-card"></i>
        </h4>
        <ContactCard :contact="activeContact" />
        <router-link
          :to="{
            name: 'contact.edit',
            params: { id: activeContact._id },
          }"
        >
          <span class="mt-2 badge badge-warning">
            <i class="fas fa-edit"></i> Hiệu chỉnh</span
          >
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import ContactCard from "@/components/ContactCard.vue";
import InputSearch from "@/components/InputSearch.vue";
import ContactList from "@/components/ContactList.vue";
import ContactService from "@/services/contact.service";
export default {
  components: {
    ContactCard,
    InputSearch,
    ContactList,
  },

  data() {
    return {
      contacts: [],
      activeIndex: -1,
      searchText: "",
    };
  },

  watch: {
    // Giám sát các thay đổi của biến searchText.
    // Bỏ chọn phần tử đang được chọn trong danh sách.
    searchText() {
      this.activeIndex = -1;
    },
  },

  computed: {
    // Chuyển các đối tượng contact thành chuỗi để tiện cho tìm kiếm.
    // object -> string
    contactStrings() {
      return this.contacts.map((contact) => {
        const { name, email, address, phone } = contact;
        return [name, email, address, phone].join("");
      });
    },

    // Trả về các contact có chứa thông tin cần hiển thị
    filteredContacts() {
      if (!this.searchText) return this.contacts;
      return this.contacts.filter((_contact, index) =>
      this.contactStrings[index].includes(this.searchText)
      );
    },

    // Hiển thị chi tiết 1 contact
    activeContact() {
      if (this.activeIndex < 0) return null;
      return this.filteredContacts[this.activeIndex];
    },

    // Đếm số contact sẽ hiện
    filteredContactsCount() {
      return this.filteredContacts.length;
    },
  },

  methods: {
    // Lấy dữ liệu tất cả contact
    async retrieveContacts() {
      try {
        this.contacts = await ContactService.getAll();
      } catch (error) {
        console.log(error);
      }
    },

    // reset activeIndex vè ban đàu 
    // -> không hiển thị 1 contact
    refreshList() {
      this.retrieveContacts();
      this.activeIndex = -1;
    },

    // Gửi tín hiệu xóa tất cả contact 
    async removeAllContacts() {
      if (confirm("Bạn muốn xóa tất cả Liên hệ?")) {
        try {
          await ContactService.deleteAll();
          this.refreshList();
        } catch (error) {
          console.log(error);
        }
      }
    },

    // Khai báo đưởng link của RouterLink
    goToAddContact() {
      this.$router.push({ name: "contact.add" });
    },
  },

  mounted() {
    this.refreshList();
  },
};
</script>

<style scoped>
.page {
  text-align: left;
  max-width: 750px;
}
</style>
