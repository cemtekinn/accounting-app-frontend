<script setup>
import {ref, defineEmits, watch} from 'vue';

const props = defineProps({
    image: {
        type: [String, File],
        default: ''
    },
    showLabel: {
        type: Boolean,
        default: true
    },
    name: {
        type: String,
        default: 'image'
    },
    imgClassNames: {
        type: String,
        default: ''
    }
});

const emit = defineEmits(['update:image']);

const imagePreview = ref(typeof props.image === 'string' ? props.image : '');
const imageInput = ref(null);
const imageFile = ref(props.image instanceof File ? props.image : null);

watch(() => props.image, (newImage) => {
    if (typeof newImage === 'string') {
        imagePreview.value = newImage;
    } else if (newImage instanceof File) {
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
        };
        reader.readAsDataURL(newImage);
    }
});

const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
        if (!['image/jpeg', 'image/png', 'image/jpg'].includes(file.type)) {
            alert('Görsel alanı şu türde bir dosya olmalıdır: jpeg, png, jpg.');
            return;
        }

        imageFile.value = file;
        const reader = new FileReader();
        reader.onload = (e) => {
            imagePreview.value = e.target.result;
            emit('update:image', e.target.result);
        };
        reader.readAsDataURL(file);
    }
};

const triggerFileInput = () => {
    imageInput.value.click();
};
</script>

<template>
    <div class="file-upload-container">
        <label for="image" class="form-label" v-if="showLabel" :style="imagePreview ? 'display: none;' : ''">Görsel</label>
        <input :name="name" type="file" ref="imageInput" class="form-control mb-3" @change="handleFileChange" accept="image/*"
               :style="imagePreview ? 'display: none;' : ''"/>
        <div v-if="imagePreview" class="image-preview-container" @click="triggerFileInput">
            <img :src="imagePreview" alt="Görsel Önizleme" :class="`img-fluid rounded ${imgClassNames}`"/>
            <div class="overlay">
                <span>Yüklemek için tıklayın</span>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.image-preview-container {
    position: relative;
    display: inline-block;
    cursor: pointer;

    img {
        width: 100%;
        border-radius: 5px;
    }

    .overlay {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: rgba(0, 0, 0, 0.6);
        color: #fff;
        font-size: 1rem;
        border-radius: 5px;
        opacity: 0;
        transition: opacity 0.3s ease;
    }

    &:hover .overlay {
        opacity: 1;
    }
}
</style>
