<script setup>
import {ref, watch} from "vue";

const props = defineProps({
    modalOpen: Boolean,
    title: String,
    closeModal: Function,
    onClose: Function,
    customClass: {
        type: String,
        default: ''
    },
    staticBackdrop: {
        type: Boolean,
        default: true
    },
    overflowY: {
        type: Boolean,
        default: true,
    }
});

const modalOpened = ref(false);
const contentOpened = ref(false);
const modalCloseAnimation = ref(false);
const crModal = ref(null);


const clickOutSide = () => {
    if (!props.staticBackdrop) props.closeModal();
}

const emits = defineEmits(['onClose', 'onOpen'])

watch(() => props.modalOpen, (val) => {
    if (val) {
        emits('onOpen', true);
        modalOpened.value = true;
        setTimeout(() => {
            contentOpened.value = true;
        }, 300);
    } else {
        emits('onClose', true);
        contentOpened.value = false;
        modalCloseAnimation.value = true;
        setTimeout(() => {
            modalCloseAnimation.value = false;
            modalOpened.value = false;
        }, 300);
    }
});

</script>

<template>
    <div class="custom-modal" :class="customClass + (modalOpened ? ' custom-modal--opened' : '')">
        <div class="custom-modal__bg" @click="clickOutSide"></div>
        <div class="custom-modal__content"
             ref="crModal"
             :class="{
            'custom-modal__content--opened': contentOpened,
            'custom-modal__content--closed': modalCloseAnimation,
             'of-y-auto': overflowY}">
            <div class="custom-modal__content__title">
                {{ title }}
                <div class="custom-modal__content__close" @click="closeModal">
                    <i class="fas fa-times"></i>
                </div>
            </div>
            <div class="custom-modal__content__body">
                <slot/>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
.custom-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 1030;
    display: none;
    opacity: 0;

    &__bg {
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    &--opened {
        display: block;
        animation: fadeIn .3s;
        opacity: 1;
    }

    &.modal-lg {
        .custom-modal__content {
            width: 50rem;
        }
    }

    &__content {
        background-color: white;
        width: 30rem;
        max-width: 100%;
        position: absolute;
        top: 0;
        right: 0;
        opacity: 0;
        height: 100dvh;
        box-shadow: 0 0 10px rgba(black, .5);

        &::-webkit-scrollbar {
            width: 5px;
        }

        &::-webkit-scrollbar-thumb {
            background-color: rgba(black, .5);
        }

        &.of-y-auto {
            overflow-y: auto;
        }

        &--opened {
            animation: fadeInLeft .3s;
            opacity: 1;
        }

        &--closed {
            animation: fadeOutLeft .3s;
        }

        &__close {
            position: absolute;
            top: 1rem;
            right: 1rem;
            cursor: pointer;
            z-index: 10;

            &:hover {
                color: red;
            }
        }
        
        &__title {
            font-size: 1.2rem;
            font-weight: 600;
            position: sticky;
            top: 0;
            background-color: white;
            padding: 1rem 1rem .5rem;
            box-shadow: 0 0 10px rgba(black, .2);
            z-index: 9999;

            &::after {
                content: '';
                position: absolute;
                bottom: 0;
                left: 0;
                width: 100%;
                height: 1px;
                background-color: rgba(black, .3);
            }
        }

        &__body {
            padding: 1rem;
        }
    }
}

@keyframes fadeInLeft {
    from {
        transform: translate(100%, 0);
        opacity: 0;
    }
    to {
        transform: translate(0, 0);
        opacity: 1;
    }
}

@keyframes fadeOutLeft {
    from {
        transform: translate(0, 0);
        opacity: 1;
    }
    to {
        transform: translate(100%, 0);
        opacity: 0;
    }
}


@keyframes fadeIn {
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
}

@keyframes fadeOut {
    from {
        opacity: 1;
    }
    to {
        opacity: 0;
    }
}
</style>
