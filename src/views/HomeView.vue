<script setup lang="ts">
import { onMounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { Logout } from '@/common/api';
import headImg from "@/assets/images/head.png";
const router = useRouter();
const { push, replace, } = useRouter();

const userId = localStorage.getItem('userId');

const gotoole = (type: string) => {
  switch (type) {
    case 'jiemiJson':
      // window.open('/jiemiJson', '_blank'); // 打开新窗口并跳转到/jiemiJson
      push('/jiemiJson');
      break;
    case 'qrcode':
      window.open(router.resolve('/qrcode').href, '_blank');
      // window.open('/qrcode', '_blank'); // 打开新窗口并跳转到/qrcode
      break;
  }
}
const logoutFuc = () => {
  Logout({ userId }).then((res: any) => {
    console.log('res', res);
    if (res.status == 200) {
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      replace('/');
    }
  });
};
</script>

<template>

  <div class="header">
    <div class="name">
      {{ userId }}
      <img class="img" :src="headImg" alt="">
      <ul class="op_box">
        <li class="op_item" @click="logoutFuc">退出登录</li>
      </ul>
    </div>
  </div>
  <main>
    <div class="card_box">
      <div class="title">工具</div>
      <div class="item-box">
        <div class="item" @click="gotoole('jiemiJson')">
          <van-icon name="gift" />
          <div class="name">解密</div>
        </div>
        <div class="item" @click="gotoole('qrcode')">
          <van-icon name="qr" />
          <div class="name">二维码</div>
        </div>
      </div>
    </div>
  </main>
</template>
<style scoped lang="scss">
main {
  width: 100%;
  height: 100%;
  padding: 20px;
  display: flex;
  flex-wrap: wrap;
}

.header {
  width: 100%;
  background-color: #999999;
  padding: 10px;
  display: flex;
  justify-content: flex-end;

  .name {
    display: flex;
    align-items: center;
    font-size: 16px;
    position: relative;

    .img {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      margin-left: 10px;
    }

    &.name:hover {
      .op_box {
        display: block;
      }
    }
  }

  .op_box {
    position: absolute;
    bottom: -40px;
    right: 0;
    background: #f4f4f4;
    padding: 10px 20px;
    display: none;
  }
}

.card_box {
  background-color: #00ffff;
  border-radius: 10px;
  padding: 20px;
  min-width: 180px;
  min-height: 120px;

  .title {
    font-size: 18px;
    font-weight: 600;
    color: #333333;
    border-bottom: 2px solid #999999;
  }

  .item-box {
    padding: 20px 0;
    display: flex;
    flex-wrap: wrap;

    .item {
      min-width: 120px;
      margin-right: 10px;
      display: flex;
      align-items: center;
      background-color: #e9e514;
      border-radius: 2px;
      box-shadow: inset;
      cursor: pointer;

      .name {
        margin-left: 4px;
      }
    }
  }

}
</style>