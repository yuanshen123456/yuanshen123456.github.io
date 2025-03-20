<template>
    <main>
        <div class="logobox">
            <van-image width="100" height="100" :src="YLogo" />
        </div>
        <van-form @submit="onSubmit" class="frombox">
            <van-cell-group inset>
                <van-field v-model="username" name="用户名" label="用户名" placeholder="用户名"
                    :rules="[{ required: true, message: '请填写用户名' }]" />
                <van-field v-model="password" type="password" name="密码" label="密码" placeholder="密码"
                    :rules="[{ required: true, message: '请填写密码' }]" />
            </van-cell-group>
            <div style="margin: 16px;">
                <van-button round block type="primary" native-type="submit">
                    提交
                </van-button>
            </div>
        </van-form>

    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { Login } from '../../common/api';
import YLogo from '@/assets/images/logo.png';
const { push, replace } = useRouter();
const username = ref('');
const password = ref('');
const onSubmit = async (e: object) => {
    // console.log('submit!', e);
    try {
        const response = await Login({
            username: username.value,
            password: password.value
        });
        console.log('response', response);
        const res = response; // 解析响应体为JSON
        if (res.status === 200) {
            const data = (response as any).data;
            localStorage.setItem('token', data.token);
            localStorage.setItem('userId', data.userId);
            replace('/home');
        }
    } catch (err) {
        // console.error('Error during login:', err);
        // 这里可以添加具体的错误处理逻辑，如显示错误消息给用户
    }
};
</script>

<style scoped lang="scss">
.logobox {
    text-align: center;
}

main {
    width: 100vw;
    height: 100vh;
    background: #f5f5f5;
    padding-top: 100px;
}

.frombox {
    max-width: 500px;
    margin: 100px auto;
}
</style>