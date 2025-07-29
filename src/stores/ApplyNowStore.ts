import { defineStore } from 'pinia';
import { baseApi } from 'boot/axios';
import { AxiosError } from 'axios';

export interface ApplicationFormData {
    firstName: string;
    lastName: string;
    fullAddress: string;
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
    fullAddress: '',
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

            for (const key in this.formData) {
                if (Object.prototype.hasOwnProperty.call(this.formData, key)) {
                    const value = this.formData[key as keyof ApplicationFormData];
                    
                    if (key === 'cvFile') {
                        if (value instanceof FileList && value.length > 0 && value[0]) {
                            dataToSend.append(key, value[0]);
                        }
                    } else if (value !== null && value !== undefined) {
                        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
                            dataToSend.append(key, String(value));
                        }
                    }
                }
            }

            if (positionId) {
                dataToSend.append('positionId', String(positionId));
            }

            try {
                const response = await baseApi.post('/api/applications', dataToSend, { 
                    headers: {
                        'Content-Type': 'multipart/form-data' 
                    }
                });
                
                return { success: true, message: response.data.message || 'Lamaran berhasil dikirim!', caption: '' };

            } catch (error: unknown) {
                let errorMessage = 'Gagal mengirim lamaran. Mohon coba lagi.';
                let errorCaption = '';

                if (error instanceof AxiosError) {
                    errorMessage = error.response?.data?.message || errorMessage;
                    if (error.response?.data?.errors) {
                        errorCaption = Object.values(error.response.data.errors).flat().join(', ');
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