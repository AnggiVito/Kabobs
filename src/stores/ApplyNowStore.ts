import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';
import { AxiosError } from 'axios';

export interface ApplicationFormData {
    firstName: string;
    lastName: string;
    address: string;
    phoneNumber: string;
    email: string;
    linkedin: string | null;
    gender: string | null;
    education: string | null;
    fatherName: string;
    motherName: string;
    maritalStatus: string | null;
    previousJob: string;
    whyKabobs: string;
    reasonForLeaving: string;
    cvFile: FileList | null;
    ktpFile: FileList | null;
    npwpFile: FileList | null;
    expectedSalary: number | null;
    [key: string]: string | number | boolean | FileList | null | undefined;
}

interface ApplyNowState {
    formData: ApplicationFormData;
    isLoading: boolean;
    error: string | null;
}

const initialFormData: ApplicationFormData = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNumber: '',
    email: '',
    linkedin: null,
    gender: null,
    education: null,
    fatherName: '',
    motherName: '',
    maritalStatus: null,
    previousJob: '',
    whyKabobs: '',
    reasonForLeaving: '',
    cvFile: null,
    ktpFile: null,
    npwpFile: null,
    expectedSalary: null,
};

export const useApplyNowStore = defineStore('applyNow', {
    state: (): ApplyNowState => ({
        formData: { ...initialFormData },
        isLoading: false,
        error: null,
    }),

    getters: {
        getFormData: (state) => state.formData,
        getIsLoading: (state) => state.isLoading,
        getError: (state) => state.error,
    },

    actions: {
        setFormField<T extends keyof ApplicationFormData>(field: T, value: ApplicationFormData[T]) {
            this.formData[field] = value;
        },

        resetForm() {
            this.formData = { ...initialFormData };
            this.error = null;
        },

        async submitApplication(positionId: number | null) {
            this.isLoading = true;
            this.error = null;

            const dataToSend = new FormData();
            const { formData } = this;

            if (formData.firstName) dataToSend.append('firstName', formData.firstName);
            if (formData.lastName) dataToSend.append('lastName', formData.lastName);
            if (formData.address) dataToSend.append('address', formData.address);
            if (formData.phoneNumber) dataToSend.append('phoneNumber', formData.phoneNumber);
            if (formData.email) dataToSend.append('email', formData.email);
            if (formData.linkedin) dataToSend.append('linkedin', formData.linkedin);
            if (formData.gender) dataToSend.append('gender', formData.gender);
            if (formData.education) dataToSend.append('education', formData.education);
            if (formData.fatherName) dataToSend.append('fatherName', formData.fatherName);
            if (formData.motherName) dataToSend.append('motherName', formData.motherName);
            if (formData.maritalStatus) dataToSend.append('maritalStatus', formData.maritalStatus);
            if (formData.previousJob) dataToSend.append('previousJob', formData.previousJob);
            if (formData.whyKabobs) dataToSend.append('whyKabobs', formData.whyKabobs);
            if (formData.reasonForLeaving) dataToSend.append('reasonForLeaving', formData.reasonForLeaving);
            if (formData.expectedSalary) dataToSend.append('expectedSalary', String(formData.expectedSalary));

            const cvFile = formData.cvFile?.[0];
            if (cvFile) {
                dataToSend.append('cvFile', cvFile);
            }

            const ktpFile = formData.ktpFile?.[0];
            if (ktpFile) {
                dataToSend.append('ktpFile', ktpFile);
            }

            const npwpFile = formData.npwpFile?.[0];
            if (npwpFile) {
                dataToSend.append('npwpFile', npwpFile);
            }
            
            if (positionId) {
                dataToSend.append('positionId', String(positionId));
            }

            for (const pair of dataToSend.entries()) {
                console.log(pair[0] + ':', pair[1]);
            }

            try {
                const response = await baseApi.post('submissions', dataToSend, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });

                return { success: true, message: response.data.message || 'Lamaran berhasil dikirim!', caption: '' };

            } catch (error: unknown) {
                let errorMessage = 'Gagal mengirim lamaran. Mohon coba lagi.';
                let errorCaption = '';

                if (error instanceof AxiosError && error.response?.data) {
                    const errorData = error.response.data;
                    errorMessage = errorData.message || 'Validasi data lamaran gagal.';

                    if (errorData.errors && Array.isArray(errorData.errors.errors)) {
                        errorCaption = errorData.errors.errors
                        .map((e: { message: string }) => e.message)
                        .join(' ');
                    } else if (Array.isArray(errorData.errors)) {
                        errorCaption = errorData.errors
                        .map((e: { message: string }) => e.message)
                        .join(' ');
                    }
                } else if (error instanceof Error) {
                    errorMessage = error.message;
                }

                this.error = errorMessage;
                console.error('Error submitting application:', error);
                return { success: false, message: errorMessage, caption: errorCaption };

            } finally {
                this.isLoading = false;
            }
        },
    },
});