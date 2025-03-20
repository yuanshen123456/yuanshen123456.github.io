<template>
    <main>
        <div class="title">二维码解析</div>
        <div class="qr_box">
            <div class="operation_box" v-if="visibleType == 1" @drop.prevent="onDrop" @dragover.prevent>
                <label for="fileInput">
                    <div class="btn">上传图片解码</div>
                </label>
                <!-- 隐藏的文件输入元素 -->
                <input id="fileInput" type="file" :accept="file.accept" :multiple="file.multiple" ref="fileInput"
                    @change="onFileChange" style="display: none;" />
                <!-- 显示所选文件名（仅作示例） -->
                <p style="margin-top: 10px;" v-if="selectedFiles.length > 0">
                    已选择文件:
                <ul>
                    <li v-for="(file, index) in selectedFiles" :key="index">{{ file.name }}</li>
                </ul>
                </p>
                <div class="tips">
                    点击上传图片解码或将图片拖到这里，支持：jpg、png、gif等格式，支持拖拽上传
                    <span>支持截图解码</span>
                </div>
            </div>
            <div class="interpretation_box" v-else>
                <div class="left">
                    <div class="result_box">
                        <div class="r_txt_box" v-if="qrCodeUrl">
                            <div class="copybtn" @click="copyText(qrCodeUrl)">复制</div>
                            <textarea class="r_txt" :value="qrCodeUrl"></textarea>
                        </div>
                        <div class="loadding" v-else>
                            {{ qrResultText }}
                            <div class="r_btn" v-if="qrResultText == '二维码识别失败'">返回</div>
                        </div>

                    </div>
                </div>
                <div class="right">
                    <div class="r_img_box">
                        <div class="r_img">
                            <img class="img" :src="resultImg" alt="">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue';
import { BrowserMultiFormatReader } from '@zxing/browser';
import qrcodeDecode from 'qrcode-decoder'; // 修改此处导入语句
import { showToast } from 'vant';

const resultImg = ref('');
const qrCodeUrl = ref('');
const visibleType = ref(1);
const qrResultText = ref('正在解码...');

const selectedFiles = ref<File[]>([]);

const file = {
    multiple: false,
    accept: 'image/*',
};
onMounted(() => {
    console.log('qrcode');
    document.addEventListener('keydown', handleKeyDown);
})
onBeforeUnmount(() => {
    document.removeEventListener('keydown', handleKeyDown);
})

const onFileChange = (event: any) => {
    // 获取FileList对象
    const files = event.target.files;

    // 清空已有文件列表
    selectedFiles.value = [];

    // 将新选择的文件添加到数据模型中
    if (files) {
        Array.from(files as unknown as File[]).forEach((file) => {
            selectedFiles.value.push(file);
        });
    }
    visibleType.value = 2;
    // 处理选择的文件
    processSelectedFiles1(selectedFiles.value);
};


async function processSelectedFiles1(files: any) {
    console.log('files1111', files);
    if (files.length === 0) {
        visibleType.value = 1;
        return showToast('请选择文件');
    }

    const fileReader = new FileReader();
    fileReader.onload = async (event: any) => {
        console.log('event', event);
        const imageData = new Image();
        imageData.src = event.target.result;
        resultImg.value = event.target.result;
        // 确保图片加载完成后再进行识别
        await new Promise((resolve) => imageData.onload = resolve);
        // console.log('图片数据:', imageData);
        try {
            const result: any = await attemptZxingRecognition(imageData);
            if (result) {
                qrCodeUrl.value = result.text;
                console.log('ZXing识别结果:', result.text);
                return;
            }
            // 如果ZXing识别失败，尝试使用qrcode-decoder识别
            const decodedData = await attemptQrcodeDecoderRecognition(imageData);
            if (decodedData) {
                qrCodeUrl.value = decodedData.data;
                console.log('qrcode-decoder识别结果:', decodedData);
            }
        } catch (error) {
            console.error('二维码识别失败:', error);
            qrResultText.value = '二维码识别失败';
        }
    };
    fileReader.readAsDataURL(files[0]);
}

const attemptZxingRecognition = async (imageData: any) => {
    const reader = new BrowserMultiFormatReader();
    try {
        const result = await reader.decodeFromImageElement(imageData);
        return result;
    } catch (error) {
        console.warn('ZXing识别失败，尝试使用qrcode-decoder:', error);
        qrResultText.value = '二维码识别失败,使用qrcode-decoder重新识别';
        return null;
    }
};

const attemptQrcodeDecoderRecognition = async (imageData: any) => {
    try {
        // 初始化
        const qr = new qrcodeDecode()
        const decodedData = await qr.decodeFromImage(imageData);
        return decodedData;
    } catch (error) {
        console.warn('qrcode-decoder识别失败:', error);
        qrResultText.value = '二维码识别失败';
        return null;
    }
};

async function processSelectedFiles(files: any) {
    if (files.length === 0) return;
    const reader = new BrowserMultiFormatReader();
    try {
        const fileReader = new FileReader();
        fileReader.onload = async (event: any) => {
            console.log('event', event);
            const image = new Image();
            image.src = event.target.result;

            // 确保图片加载完成后再进行识别
            await new Promise((resolve) => image.onload = resolve);

            await reader.decodeFromImageElement(image)
                .then((result: any) => {
                    if (result) {
                        qrCodeUrl.value = result.text;
                        console.log('识别结果:', result.text);
                    }
                })
                .catch((error) => {
                    console.log('二维码识别失败:', error); // 这里将捕获并处理异步识别错误
                });
        };
        fileReader.readAsDataURL(files[0]);
    } catch (error) {
        console.error('文件读取或加载失败:', error); // 这里捕获文件读取或加载等同步错误
    }
}

async function copyText(text: string) {
    try {
        await navigator.clipboard.writeText(text);
        showToast('已成功复制到剪贴板!');
    } catch (error) {
        console.error('复制到剪贴板失败:', error);
        showToast('复制到剪贴板失败，请手动复制或使用浏览器支持的复制功能');
    }
}

// 拖拽上传
async function onDrop(event: any) {
    event.preventDefault();
    const files = event.dataTransfer.files;
    if (files.length > 0) {
        const files = event.dataTransfer.files as FileList;
        const validFiles = Array.from(files).filter(file => {
            const acceptedTypes = ['image/jpeg', 'image/png', 'image/gif'];
            return acceptedTypes.includes(file.type);
        });

        if (validFiles.length > 0) {
            // 清空已有文件列表
            selectedFiles.value = [];
            // 将新选择的文件添加到数据模型中
            if (files) {
                Array.from(files as unknown as File[]).forEach((file) => {
                    selectedFiles.value.push(file);
                });
            }
            visibleType.value = 2;
            // 处理选择的文件
            processSelectedFiles1(selectedFiles.value);
        } else {
            // 显示错误提示，所有拖入的文件都不是允许的图片格式
            showToast('只能拖拽上传 JPG、PNG、GIF 格式的图片。');
        }
    }
}

// 截图上传
async function handlePasteClick() {
    navigator.clipboard.read().then(data => {
        console.log('data', data);
        const imageItems = data.filter(item => item.types.includes('image/png') || item.types.includes('image/jpeg'));
        console.log('imageItems', imageItems);
        if (imageItems.length > 0) {
            imageItems.forEach(async (item, index) => {
                const blob = await item.getType('image/png') || await item.getType('image/jpeg');
                console.log('blob', blob);
                if (blob) {
                    // 将 Blob 转换为 File 对象
                    const file = new File([blob], `screenshot-${index + 1}.png`, { type: blob.type });
                    console.log('file', file);
                    // 清空已有文件列表
                    selectedFiles.value = [file];
                    console.log('selectedFiles', selectedFiles.value);
                    visibleType.value = 2;
                    // 处理选择的文件
                    processSelectedFiles1(selectedFiles.value);
                }
            });
        } else {
            // 显示错误提示，剪贴板中没有图片
            showToast('剪贴板中没有图片。请先截图并复制图片到剪贴板后再试。');
        }
    }).catch(error => {
        console.error('Failed to read clipboard:', error);
        showToast('无法读取剪贴板，请确保浏览器支持并允许访问剪贴板。');
    });
}

// 获取键盘ctrl+v
async function handleKeyDown(event: KeyboardEvent) {
    if (event.ctrlKey && event.key === 'v') {
        event.preventDefault(); // 阻止默认粘贴行为
        handlePasteClick();
    }
}
</script>

<style lang="scss" scoped>
.qr_box {
    padding: 20px;
    background-color: #f3f3f3;

    .operation_box {
        // display: none;
        text-align: center;
        padding-top: 60px;

        .btn {
            color: #ffffff;
            font-size: 20px;
            font-weight: bold;
            background-color: #008000;
            padding: 30px 20px;
            text-align: center;
            border-radius: 10px;
            cursor: pointer;
        }

        .tips {
            color: #999999;
            margin-top: 20px;
            font-size: 16px;

            span {
                color: #7deb7d;
            }
        }
    }
}

.interpretation_box {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    .left {
        width: 62%;
        border: 5px dotted #d4d4d4;
        margin-right: 3%;
        background-color: #ffffff;
        padding: 20px;
        min-height: 300px;

        .r_btn {
            // flex-shrink: 0;
            padding: 10px;
            font-size: 16px;
            background-color: #09bd71;
            color: #ffffff;
            border-radius: 4px;
            cursor: pointer;
            text-align: center;
            // flex: 1;
            width: 100%;
        }

        .r_txt_box {
            display: flex;
            justify-content: flex-start;
            align-items: flex-start;

            .copybtn {
                flex-shrink: 0;
                padding: 0 10px;
                font-size: 16px;
                background-color: #09bd71;
                color: #ffffff;
                border-radius: 4px;
                cursor: pointer;
                margin-right: 10px;

            }

            .r_txt {
                width: 100%;
                outline: 0;
                height: 160px;
                min-height: 160px;
                resize: none;
                font-size: 16px;
                padding: 0 10px;
                border: 0px solid #f2f2f2;
                background-color: #fcfcfc;
            }
        }

        .loadding {
            font-size: 20px;
            font-weight: bold;
            text-align: center;
            min-height: 250px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            justify-content: center;
        }
    }

    .right {
        width: 35%;
        border: 5px dotted #d4d4d4;
        background-color: #ffffff;
        padding: 20px;
        min-height: 300px;

        .r_img_box {
            text-align: center;

            .r_img {
                .img {
                    max-width: 250px;
                    max-height: 250px;
                    display: inline-block;
                    margin: auto;
                    vertical-align: middle;
                }
            }
        }
    }
}
</style>