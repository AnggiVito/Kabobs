<template>
  <q-page class="q-pa-md apply-now-page">
    <div class="apply-container q-mx-auto">
      <div class="apply-header text-center">
        <div class="header-content row items-center no-wrap">
          <q-img src="/images/LogoKabobs.png" alt="Kabobs Logo" class="header-logo q-mr-md" />
          <div class="header-title">{{ positionName }}</div>
        </div>
      </div>

      <div class="intro-message q-mt-lg">
        <p>
          Terima kasih atas minat Anda untuk bergabung dengan tim kami! Untuk lebih mengenal Anda,
          mohon lengkapi semua bagian formulir ini. Formulir ini membutuhkan waktu sekitar 10-20
          menit untuk diselesaikan.
        </p>
        <p class="q-mt-sm">
          Saat Anda mengirimkan formulir ini, informasi pribadi Anda seperti nama dan alamat email
          tidak akan secara otomatis dikumpulkan kecuali Anda memberikannya sendiri.
        </p>
        <p class="required-note q-mt-md">* Wajib diisi</p>
      </div>

      <q-form @submit="onSubmit" class="q-gutter-md apply-form" ref="applicationForm">
        <h2 class="form-section-title">Informasi Pribadi & Kontak</h2>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12 col-sm-6">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.firstName"
              @update:model-value="(val) => applyNowStore.setFormField('firstName', val as string)"
              label="Nama Depan *"
              lazy-rules
              :rules="[(val) => !!val || 'Nama Depan wajib diisi']"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.lastName"
              @update:model-value="(val) => applyNowStore.setFormField('lastName', val as string)"
              label="Nama Belakang *"
              lazy-rules
              :rules="[(val) => !!val || 'Nama Belakang wajib diisi']"
            />
          </div>
          <div class="col-xs-12">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.address"
              @update:model-value="(val) => applyNowStore.setFormField('address', val as string)"
              label="Alamat Lengkap *"
              type="textarea"
              rows="3"
              lazy-rules
              :rules="[(val) => !!val || 'Alamat Lengkap wajib diisi']"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.phoneNumber"
              @update:model-value="
                (val) => applyNowStore.setFormField('phoneNumber', val as string)
              "
              label="Nomor Telepon *"
              type="tel"
              :rules="[
                (val) => !!val || 'Nomor Telepon wajib diisi',

                (val) => /^\d+$/.test(val) || 'Hanya angka yang diizinkan',
              ]"
              inputmode="numeric" 
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.email"
              @update:model-value="(val) => applyNowStore.setFormField('email', val as string)"
              label="Email *"
              type="email"
              lazy-rules
              :rules="[
                (val) => !!val || 'Email wajib diisi',
                (val) => /.+@.+\..+/.test(val) || 'Format email tidak valid',
              ]"
            />
          </div>
          <div class="col-xs-12">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.linkedin"
              @update:model-value="
                (val) => applyNowStore.setFormField('linkedin', val as string | null)
              "
              label="URL Profil LinkedIn (Opsional)"
              type="url"
              :rules="[
                (val) =>
                  !val ||
                  /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/.test(val) ||
                  'URL LinkedIn tidak valid',
              ]"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              outlined
              :model-value="applyNowStore.getFormData.gender"
              @update:model-value="
                (val) => applyNowStore.setFormField('gender', val as string | null)
              "
              :options="genderOptions"
              label="Jenis Kelamin *"
              lazy-rules
              :rules="[(val) => !!val || 'Jenis Kelamin wajib diisi']"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              outlined
              :model-value="applyNowStore.getFormData.education"
              @update:model-value="
                (val) => applyNowStore.setFormField('education', val as string | null)
              "
              :options="educationOptions"
              label="Pendidikan Tertinggi *"
              lazy-rules
              :rules="[(val) => !!val || 'Pendidikan wajib diisi']"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.fatherName"
              @update:model-value="(val) => applyNowStore.setFormField('fatherName', val as string)"
              label="Nama Lengkap Ayah Kandung *"
              lazy-rules
              :rules="[(val) => !!val || 'Nama Ayah Kandung wajib diisi']"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.motherName"
              @update:model-value="(val) => applyNowStore.setFormField('motherName', val as string)"
              label="Nama Lengkap Ibu Kandung *"
              lazy-rules
              :rules="[(val) => !!val || 'Nama Ibu Kandung wajib diisi']"
            />
          </div>
          <div class="col-xs-12 col-sm-6">
            <q-select
              outlined
              :model-value="applyNowStore.getFormData.maritalStatus"
              @update:model-value="
                (val) => applyNowStore.setFormField('maritalStatus', val as string | null)
              "
              :options="maritalStatusOptions"
              label="Status Pernikahan *"
              lazy-rules
              :rules="[(val) => !!val || 'Status Pernikahan wajib diisi']"
            />
          </div>
        </div>
        <h2 class="form-section-title q-mt-xl">Pengalaman Kerja</h2>
        <div class="row q-col-gutter-md">
          <div class="col-xs-12">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.previousJob"
              @update:model-value="
                (val) => applyNowStore.setFormField('previousJob', val as string)
              "
              label="Pekerjaan Sebelumnya / Pemberi Kerja Terakhir (Min. 1) *"
              type="textarea"
              rows="2"
              hint="Contoh: Nama Perusahaan, Posisi, Tahun Kerja"
              lazy-rules
              :rules="[(val) => !!val || 'Informasi pekerjaan sebelumnya wajib diisi']"
            />
          </div>
          <div class="col-xs-12">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.whyKabobs"
              @update:model-value="(val) => applyNowStore.setFormField('whyKabobs', val as string)"
              label="Mengapa Anda ingin bergabung dengan Kabobs? *"
              type="textarea"
              rows="3"
              lazy-rules
              :rules="[(val) => !!val || 'Alasan bergabung dengan Kabobs wajib diisi']"
            />
          </div>
          <div class="col-xs-12">
            <q-input
              outlined
              :model-value="applyNowStore.getFormData.reasonForLeaving"
              @update:model-value="
                (val) => applyNowStore.setFormField('reasonForLeaving', val as string)
              "
              label="Alasan keluar dari pekerjaan sebelumnya *"
              type="textarea"
              rows="3"
              lazy-rules
              :rules="[(val) => !!val || 'Alasan keluar dari pekerjaan sebelumnya wajib diisi']"
            />
          </div>
          <div class="col-xs-12">
            <q-file
              outlined
              v-model="applyNowStore.formData.cvFile"
              @update:model-value="(newValue) => applyNowStore.setFormField('cvFile', newValue)"
              label="Unggah CV (Hanya PDF) *"
              @change="onFileChange"
              accept=".pdf"
              name="cvFile"
              max-files="1"
              :rules="[(val) => !!val || 'CV wajib diunggah']"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-xs-12">
            <q-file
              outlined
              v-model="applyNowStore.formData.ktpFile"
              @update:model-value="(newValue) => applyNowStore.setFormField('ktpFile', newValue)"
              label="Unggah KTP (JPG, PNG, PDF) *"
              accept=".jpg, .jpeg, .png, .pdf"
              name="ktpFile"
              max-files="1"
              :rules="[(val) => !!val || 'KTP wajib diunggah']"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-xs-12">
            <q-file
              outlined
              v-model="applyNowStore.formData.npwpFile"
              @update:model-value="(newValue) => applyNowStore.setFormField('npwpFile', newValue)"
              label="Unggah NPWP (JPG, PNG, PDF) *"
              accept=".jpg, .jpeg, .png, .pdf"
              max-files="1"
              :rules="[(val) => !!val || 'NPWP wajib diunggah']"
              name="npwpFile"
            >
              <template v-slot:append>
                <q-icon name="attach_file" />
              </template>
            </q-file>
          </div>
          <div class="col-xs-12">
            <q-input
              outlined
              :model-value="formattedSalary"
              @update:model-value="updateSalary"
              label="Ekspektasi Gaji (IDR) *"
              type="text"
              prefix="Rp"
              lazy-rules
              :rules="[
                (val) => !!val || 'Ekspektasi Gaji wajib diisi',
                (val) => parseFormattedNumber(val) > 0 || 'Gaji harus angka positif',
              ]"
              inputmode="numeric"
            />
          </div>
        </div>

        <div class="q-mt-xl flex justify-center">
          <q-btn
            label="Kirim Lamaran"
            type="submit"
            color="red-9"
            class="submit-btn"
            no-caps
            rounded
          />
        </div>
      </q-form>
    </div>
  </q-page>
  <FooterLayout />
</template>

<script setup lang="ts">
  import { ref, computed, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router';
  import { useQuasar, QForm } from 'quasar';
  import { useKarierStore } from 'src/stores/KarierStore';
  import FooterLayout from 'layouts/FooterLayout.vue';
  import { useApplyNowStore } from 'src/stores/ApplyNowStore';

  const $q = useQuasar();
  const route = useRoute();
  const karierStore = useKarierStore();
  const applyNowStore = useApplyNowStore();
  const router = useRouter();
  const positionId = computed(() => Number(route.params.positionId));
  const applicationForm = ref<QForm | null>(null);
  const positionName = ref('Memuat Posisi...');

  onMounted(async () => {
    if (positionId.value) {
      await karierStore.fetchKarierDetail(positionId.value);
      if (karierStore.selectedKarierDetail) {
        positionName.value = karierStore.selectedKarierDetail.namaposisi;
      } else {
        positionName.value = 'Posisi Tidak Ditemukan';
      }
    } else {
      positionName.value = 'Aplikasi Umum';
    }
    salaryValue.value = applyNowStore.getFormData.expectedSalary || null;
  });

  const salaryValue = ref<number | null>(null);

  const parseFormattedNumber = (val: string): number => {
    const cleanedValue = String(val || '').replace(/\D/g, '');
    return parseInt(cleanedValue, 10) || 0;
  };

  const formattedSalary = computed(() => {
    if (salaryValue.value === null || salaryValue.value === 0) return '';
    return new Intl.NumberFormat('id-ID').format(salaryValue.value);
  });

  const updateSalary = (value: string | number | null) => {
    const numericValue = parseFormattedNumber(String(value ?? ''));
    salaryValue.value = numericValue;
    applyNowStore.setFormField('expectedSalary', numericValue);
  };

  const genderOptions = ['Pria', 'Wanita', 'Lainnya'];
  const educationOptions = ['SMA/SMK', 'D3', 'S1', 'S2', 'S3'];
  const maritalStatusOptions = ['Lajang', 'Menikah', 'Cerai', 'Janda/Duda'];
  function onFileChange(file: never) {
    if (file) {
      applyNowStore.setFormField('cvFile', file);
    }
  }
  async function onSubmit() {
    const formIsValid = await applicationForm.value?.validate();

    if (!formIsValid) {
      $q.notify({
        type: 'negative',
        message: 'Mohon lengkapi semua data wajib.',
        caption: 'Periksa kembali formulir Anda.',
      });
      return;
    }

    const submitResult = await applyNowStore.submitApplication(positionId.value);

    if (submitResult.success) {
      $q.notify({
        type: 'positive',
        message: submitResult.message,
        caption: submitResult.caption || '',
      });
      applyNowStore.resetForm();
      await router.replace(`/Karier`);
    } else {
      $q.notify({
        type: 'negative',
        message: submitResult.message,
        caption: submitResult.caption || '',
      });
    }
  }
</script>

<style scoped>
  .apply-now-page {
    background-color: #f2f2f2;
    padding-bottom: 50px;
  }

  .apply-container {
    max-width: 900px;
    margin-top: 40px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    overflow: hidden;
  }

  .apply-header {
    background-color: #ffd400;
    color: #fff;
    padding: 20px;
    position: relative;
  }

  .header-content {
    max-width: 800px;
    margin: 0 auto;
    align-items: center;
    justify-content: flex-start;
  }

  .header-logo {
    width: 50px;
    height: auto;
    object-fit: contain;
  }

  .header-title {
    font-size: 28px;
    font-weight: 600;
    color: #cc2e29;
  }

  .intro-message {
    padding: 25px 40px;
    border-bottom: 1px solid #eee;
    color: #555;
    font-size: 15px;
  }

  .required-note {
    color: #cc2e29;
    font-size: 14px;
  }

  .apply-form {
    padding: 30px 40px;
  }

  .form-section-title {
    font-size: 22px;
    font-weight: 600;
    color: #333;
    margin-bottom: 20px;
    padding-bottom: 5px;
    border-bottom: 2px solid #ffd400;
    display: inline-block;
  }

  .q-input,
  .q-select,
  .q-file {
    margin-bottom: 10px;
  }

  .submit-btn {
    height: 50px;
    padding: 0 30px;
    font-size: 18px;
    font-weight: bold;
    background-color: #cc2e29 !important;
    color: #ffd400 !important;
  }

  .submit-btn:hover {
    background-color: #aa1e19 !important;
  }

  @media (max-width: 768px) {
    .apply-container {
      margin-top: 20px;
      box-shadow: none;
      border-radius: 0;
    }
    .apply-header {
      padding: 15px;
    }
    .header-logo {
      width: 40px;
    }
    .header-title {
      font-size: 22px;
    }
    .intro-message,
    .apply-form {
      padding: 20px 15px;
    }
    .form-section-title {
      font-size: 18px;
      margin-bottom: 15px;
    }
    .q-input,
    .q-select,
    .q-file {
      margin-bottom: 5px;
    }
    .submit-btn {
      width: 100%;
      font-size: 16px;
      height: 45px;
    }
  }
</style>
