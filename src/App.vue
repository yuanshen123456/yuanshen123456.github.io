<script setup lang="ts">
import { ref, reactive, toRefs, watch, computed, onMounted, nextTick } from 'vue';
import { useRouter, useRoute, RouterLink, RouterView } from 'vue-router';
const { push, replace } = useRouter();
import { GetUserInfo } from '@/common/api';
onMounted(() => {
  nextTick(() => {

  });
});
// console.log('window.href', window.location.pathname);
const token = localStorage.getItem('token');
const userId = localStorage.getItem('userId');
if (userId) {
  GetUserInfo(userId).then(res => {
    console.log(res)
  })
} else {
  push('/');
}
if (token && window.location.pathname === '/') {
  push('/home');
}
</script>

<template>
  <RouterView />
</template>

<style scoped></style>
