<script setup>
import {useLayoutStore} from "@/stores/index.js";

const layout = useLayoutStore()
</script>

<template>
    <aside class="app-notifications"
           :class="{ 'show': layout.notificationsIsOpen}"
    >
        <div class="app-notifications__header">
            Bildirimler

            <button @click="layout.toggleNotifications()" class="app-notifications__close">
                <i class="fas fa-times"></i>
            </button>
        </div>

        <div class="app-notifications__body">
            <!--            <div class="app-notifications__item"-->
            <!--                 :class="{ 'unread': !notification.read_at }"-->
            <!--                 v-for="notification in notifications.data"-->
            <!--                 :key="notification.id"-->
            <!--                 @click="notifications.read(notification.id)"-->
            <!--            >-->
            <!--                <div class="app-notifications__item__title">-->
            <!--                    {{ notification.subject }}-->
            <!--                </div>-->
            <!--                <p class="app-notifications__item__content">-->
            <!--                    {{ notification.message }}-->
            <!--                </p>-->
            <!--                <span class="app-notifications__item__date">-->
            <!--                    {{ moment(notification.created_at).fromNow() }}-->
            <!--                </span>-->
            <!--            </div>-->

            <!--            <div class="app-notifications__empty"-->
            <!--                 v-if="!notifications.loading && !notifications.data.length">-->
            <!--                Bildirim Yok-->
            <!--            </div>-->
        </div>

        <div class="app-notifications__footer">
            <!--            <i class="fas fa-spinner fa-spin" v-if="notifications.loading"></i>-->
            <!--            <button class="btn btn-link btn-sm"-->
            <!--                    v-if="notifications.meta.current_page < notifications.meta.last_page && !notifications.loading"-->
            <!--                    @click="notifications.more()">-->
            <!--                Daha Fazla-->
            <!--            </button>-->
        </div>
    </aside>
</template>
