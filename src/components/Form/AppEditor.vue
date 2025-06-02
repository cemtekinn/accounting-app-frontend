<script setup>
const model = defineModel()

import Editor from '@tinymce/tinymce-vue'
import {tinyMCEInit} from "@dash/services/helper.js";
</script>

<template>
    <div class="mb-3">
        <Editor
            tinymce-script-src="/tinymce/tinymce.min.js"
            v-model="model"
            :init="tinyMCEInit"
        />
    </div>
</template>

<style scoped lang="scss">

</style>
