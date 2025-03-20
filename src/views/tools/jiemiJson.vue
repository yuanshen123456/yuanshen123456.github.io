<template>
    <main>
        <div class="title">AES加密/解密</div>
        <div class="src-arg-rlt">
            <div class="form">
                <div class="srcbox">
                    <textarea name="src" v-model="areaTxtLeft" spellcheck="false" placeholder="请输入需要加密或解密的内容"
                        class="form-control"></textarea>
                    <div class="charset-dock">
                        <div class="charset-box">
                            <select name="srcType" class="form-control">
                                <option value="utf8">UTF-8</option>
                                <option value="gbk">GB2312/GBK</option>
                                <option value="unicode">UTF-16_LE</option>
                                <option value="base64">Base64</option>
                                <option value="hex">Hex</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div class="info form-inline">
                    <div class="args">
                        <select name="mode" v-model="aesplatCheck" class="form-control">
                            <option value="icxzjzasfrh6gjau">分析平台</option>
                            <option value="zx3jjz2dyfh6gjau">品牌后台</option>
                            <option value="zxkb5z2dyfh6asdu">运营后台</option>
                            <option value="mer674751fh6fcer">商户端小程序</option>
                            <option value="jnd674751fh6fkgu">用户端h5</option>
                        </select>
                        <!-- <select name="mode" onchange="mode_onchange(this, {});" class="form-control">
                            <option value="ecb" data-request="">ECB</option>
                            <option value="cbc" data-request="iv">CBC</option>
                            <option value="ctr" data-request="iv">CTR</option>
                            <option value="ofb" data-request="iv,bs">OFB</option>
                            <option value="cfb" data-request="iv,bs">CFB</option>
                        </select>
                        <select name="padding" class="form-control">
                            <option value="pkcs7">PKCS7</option>
                            <option value="zero">Zero</option>
                            <option value="iso10126">ISO10126</option>
                            <option value="ansix923">Ansix923</option>
                            <option value="none">None</option>
                        </select>
                        <select name="keySize" title="密钥长度"
                            onchange="keysize_onchange(this, { bytes: parseInt( this.value )  })" class="form-control">
                            <option value="16">128bits</option>
                            <option value="24">192bits</option>
                            <option value="32">256bits</option>
                        </select> -->

                        <input autocomplete="off" v-model="aesKey" name="key" id="key" placeholder="KEY/密码" size="9"
                            maxlength="16" spellcheck="false" class="form-control">
                        <input autocomplete="off" name="IV" id="iv" spellcheck="false" placeholder="IV/向量"
                            maxlength="16" size="9" style="display:none" class="form-control">
                        <input type="number" name="blockSize" step="8" max="128" min="8" size="8" maxlength="3"
                            placeholder="Block Size(bits)" style="display:none" title="Block Size" class="form-control">
                    </div>
                    <div class="right">
                        <input type="button" value="加密" @click="crypt_onclick(true);" class="btn btn-success">
                        <input type="button" value="解密" @click="crypt_onclick(false);" class="btn btn-warning">
                    </div>
                    <div class="c"></div>
                </div>
                <div class="outbox auto-height" style="height: 488.812px;">
                    <div class="charset-dock">
                        <div class="charset-box">
                            <select name="outType" class="form-control">
                                <option value="smart">Auto-detect</option>
                                <option value="utf8">UTF-8</option>
                                <option value="utf16">UTF-16 LE</option>
                                <option value="gbk">GB2312/GBK</option>
                                <option value="base32">BASE32</option>
                                <option value="base64">BASE64</option>
                                <option value="hex-16">HEX/BASE16</option>
                                <option value="hex-ascii">HEX+AscII</option>
                                <option value="array">Array</option>
                            </select>
                        </div>
                    </div>
                    <textarea id="output" :value="formattedJson" spellcheck="false" placeholder="加密或解密的内容将在此显示"
                        class="form-control"></textarea>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import CryptoJS from "crypto-js";
const areaTxtLeft = ref('');
const areaTxtRight: any = ref('');
const formattedJson = ref('');
const aesKey = ref('');
const aesplatCheck = ref('icxzjzasfrh6gjau');

onMounted(() => {
    nextTick(() => {

    })
})

const formatJson = (text: string) => {
    try {
        const parsedJson = JSON.parse(text);
        formattedJson.value = JSON.stringify(parsedJson, null, 2); // 使用 2 个空格缩进
        return formattedJson.value;
    } catch (error) {
        console.error('Invalid JSON:', error);
        formattedJson.value = text; // 若解析失败，保留原始字符串
        return formattedJson.value;
    }
}
const crypt_onclick = (type: boolean) => {
    console.log('aesplatCheck', aesplatCheck.value);
    if (type) {
        areaTxtRight.value = encrypt(areaTxtLeft.value, aesKey.value ? aesKey.value : aesplatCheck.value, '');
    } else {
        areaTxtRight.value = formatJson(decrypt(areaTxtLeft.value, aesKey.value ? aesKey.value : aesplatCheck.value, ''));
        // console.log('areaTxtRight.value', areaTxtRight.value);
    }
}
// 加密
const encrypt = (plaintext: string, key: string, iv: string) => {
    const keys = CryptoJS.enc.Utf8.parse(key);
    const encrypted = CryptoJS.AES.encrypt(plaintext, keys, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return encrypted;
}
// 解密
const decrypt = (ciphertext: string, key: string, iv: string) => {
    const keys = CryptoJS.enc.Utf8.parse(key);
    const decrypted = CryptoJS.AES.decrypt(ciphertext, keys, {
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7
    });
    return decrypted.toString(CryptoJS.enc.Utf8);;
}


</script>

<style lang="scss" scoped>
.src-arg-rlt .form {
    text-align: left;
    box-sizing: border-box;
    padding: 0 20px
}

.src-arg-rlt h1 {
    margin-left: 20px
}

.src-arg-rlt #txtIntro,
.src-arg-rlt content {
    margin-left: 20px;
    display: block
}

.src-arg-rlt #txtIntro.collapse,
.src-arg-rlt content.collapse {
    overflow: hidden
}

.src-arg-rlt .collapse-arrow {
    position: absolute;
    left: 50%;
    margin-left: 8px
}

.src-arg-rlt .charset-box {
    border: 1px solid;
    background-color: #fff;
    border: 1px solid;
    z-index: 0;
    position: absolute
}

.src-arg-rlt .charset-box .form-control {
    border-style: none;
    box-shadow: none;
    width: auto
}

.src-arg-rlt .srcbox {
    border: 1px solid #4cae4c;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 4px 4px 4px 0;
    position: relative
}

.src-arg-rlt .srcbox textarea {
    width: 100%;
    box-sizing: border-box;
    min-height: 150px
}

.src-arg-rlt .srcbox .charset-dock {
    position: absolute;
    bottom: 0;
    left: -1px;
    height: 0
}

.src-arg-rlt .srcbox .charset-box {
    border-color: #4cae4c;
    border-top-style: none;
    border-radius: 0 0 4px 4px;
    left: 0
}

.src-arg-rlt .file-and-text-content {
    display: flex;
    flex-direction: column;
    height: 100%
}

.src-arg-rlt .file-and-text-content>div+div {
    margin-top: 10px
}

.src-arg-rlt .file-and-text-content .text-content {
    flex: auto
}

.src-arg-rlt .file-and-text-content .file-content {
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 1em 0;
    position: relative;
    width: 100%
}

.src-arg-rlt .file-and-text-content .file-content input {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    bottom: 0;
    background-color: #f00;
    opacity: 0
}

.src-arg-rlt .file-and-text-content .file-content .text {
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px
}

.src-arg-rlt .file-and-text-content .file-content .icon {
    font-size: 24px;
    width: 36px;
    color: #daa520
}

.src-arg-rlt .outbox {
    margin-top: 15px;
    border: 1px solid #ebbe0e;
    padding: 5px;
    box-sizing: border-box;
    border-radius: 4px 0 4px 4px;
    margin-top: 5px;
    position: relative
}

.src-arg-rlt .outbox textarea {
    width: 100%;
    box-sizing: border-box
}

.src-arg-rlt .outbox .charset-dock {
    position: absolute;
    top: 0;
    right: -1px
}

.src-arg-rlt .outbox .charset-box {
    border-color: #ebbe0e;
    border-bottom-style: none;
    border-radius: 4px 4px 0 0;
    right: 0;
    bottom: 0
}

.src-arg-rlt .info {
    display: flex;
    flex-direction: column;
    padding: 0 135px;
    margin: 10px 0;
    width: 100%;
    align-items: baseline;
    align-content: center
}

.src-arg-rlt .right .btn+.btn {
    margin-left: 10px
}

.src-arg-rlt .args {
    flex: auto;
    display: flex;
    flex-direction: column;
    width: 100%
}

.src-arg-rlt .args>* {
    width: 100%
}

.src-arg-rlt .args>*+* {
    margin: 10px 0 0 0
}

.src-arg-rlt .option {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: baseline;
    align-content: center
}

.src-arg-rlt .progress-cnt {
    width: 320px;
    border: 1px solid #ccc;
    background-color: #fff8dc;
    box-shadow: gold 0 0 5px;
    position: fixed;
    left: 50%;
    top: 50%;
    margin: -64px 0 0 -160px;
    padding: 5px
}

.src-arg-rlt .progress-cnt progress {
    width: 90%;
    margin: 0 auto;
    height: 24px;
    display: block
}

.src-arg-rlt .progress-cnt .text {
    display: flex
}

.src-arg-rlt .progress-cnt .text>div {
    width: 50%;
    text-align: center
}

.src-arg-rlt .progress-cnt .btns {
    text-align: center
}

.src-arg-rlt #speedCnt {
    display: none
}

.src-arg-rlt .tips {
    position: absolute;
    border: 1px solid #ff9c00;
    background-color: #fff8dc
}

.src-arg-rlt .tips textarea {
    overflow: hidden;
    margin: 5px;
    box-sizing: content-box;
    line-height: 1.2em
}

.src-arg-rlt .x-nav-tab {
    margin-bottom: 10px
}

.src-arg-rlt .asymmetric-from .key-and-content {
    display: flex;
    flex-direction: column;
    height: 100%
}

.src-arg-rlt .asymmetric-from .key-panel {
    height: 150px;
    position: relative;
    margin-bottom: 10px
}

.src-arg-rlt .asymmetric-from .key-panel .keyInfo {
    position: absolute;
    right: 0;
    bottom: 0
}

.src-arg-rlt .asymmetric-from .key-panel textarea {
    min-height: 80px;
    height: 100%
}

.src-arg-rlt .asymmetric-from .content {
    flex: auto
}

@media(min-width: 901px) and (max-width:1200px) {
    .src-arg-rlt .args {
        flex-direction: row;
        flex-wrap: wrap;
        flex: unset;
        align-items: baseline
    }

    .src-arg-rlt .args>* {
        width: unset
    }

    .src-arg-rlt .args>*+* {
        margin: 0 0 0 10px
    }

    .src-arg-rlt .right {
        display: flex
    }

    .src-arg-rlt .info {
        width: 100%;
        flex-direction: row
    }

    .src-arg-rlt .asymmetric-from .key-panel {
        height: 100px
    }
}

@media(max-width: 900px) {
    .src-arg-rlt .navbar {
        margin-bottom: 0
    }

    .src-arg-rlt #mac h1 {
        margin: 5px 0
    }

    .src-arg-rlt #mac content {
        margin-left: 0
    }

    .src-arg-rlt #mac .form {
        padding-left: 0;
        padding-right: 0
    }

    .src-arg-rlt .x-nav-tab {
        padding-left: 5px
    }

    .src-arg-rlt .collapse-arrow {
        position: unset;
        left: unset;
        margin-left: unset
    }

    .src-arg-rlt .info {
        padding: 30px 20px
    }

    .src-arg-rlt .args,
    .src-arg-rlt .right {
        width: 100%
    }

    .src-arg-rlt .args>.form-control,
    .src-arg-rlt .args select.form-control {
        margin: 10px 0
    }

    .src-arg-rlt .args .input-group {
        margin: 10px 0;
        width: 100%
    }

    .src-arg-rlt .option-name {
        display: inline-block;
        margin-bottom: 5px
    }

    .src-arg-rlt .option-item {
        display: inline-block;
        margin-left: 1em
    }

    .src-arg-rlt .right {
        text-align: center;
        margin: 10px 0
    }

    .src-arg-rlt .extend-fun {
        display: none
    }
}

@media(min-width: 1201px) {
    .src-arg-rlt .form {
        display: flex;
        flex-direction: row;
        width: 100%
    }

    .src-arg-rlt .info {
        flex-basis: 200px;
        margin: 0;
        padding: 50px 20px 50px 20px
    }

    .src-arg-rlt .args {
        flex: unset
    }

    .src-arg-rlt .args>.form-control {
        margin: 10px 0
    }

    .src-arg-rlt .args .input-group {
        margin: 10px 0;
        width: 100%
    }

    .src-arg-rlt .right {
        display: flex;
        flex-direction: column;
        margin: 0 auto
    }

    .src-arg-rlt .right .btn {
        min-width: 100px;
        margin: 10px 0 0 0
    }

    .src-arg-rlt .right .btn+.btn {
        margin-left: 0
    }

    .src-arg-rlt .srcbox {
        flex: 1 0 0;
        border-radius: 4px 0 4px 4px
    }

    .src-arg-rlt .srcbox .charset-box {
        border-radius: 0 4px 4px 0;
        border-style: solid solid solid none
    }

    .src-arg-rlt .srcbox .charset-dock {
        right: 0;
        top: -1px;
        left: auto;
        bottom: auto
    }

    .src-arg-rlt .srcbox textarea {
        height: 100%
    }

    .src-arg-rlt .auto-height {
        min-height: 535px
    }

    .src-arg-rlt .outbox {
        flex: 1 0 0;
        border-radius: 4px 4px 4px 0;
        margin: 0
    }

    .src-arg-rlt .outbox .charset-dock {
        right: auto;
        top: auto;
        left: 0;
        bottom: -1px
    }

    .src-arg-rlt .outbox .charset-box {
        border-radius: 4px 0 0 4px;
        border-style: solid none solid solid
    }

    .src-arg-rlt .args .option-item {
        display: block;
        margin-left: 1em
    }
}

.form-control {
    display: block;
    width: 100%;
    height: 34px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.428571429;
    color: #555;
    vertical-align: middle;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    -webkit-transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s;
    transition: border-color ease-in-out .15s, box-shadow ease-in-out .15s
}

.auto-height #output {
    height: 100%;
    min-height: 150px
}
</style>