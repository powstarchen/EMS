<template>
  <div class="container">
    <h2>🌡️ 实时温度监控</h2>
    <p>当前时间：{{ data?.time }}</p>
    <p>当前温度：{{ data?.temperature }} °C</p>

    <div v-if="!connected" class="status">🔴 WebSocket 未连接</div>
    <div v-else class="status">🟢 WebSocket 已连接</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const data = ref(null);
const connected = ref(false);

// 1. 获取初始数据 (HTTP API)
const loadInitialData = async () => {
  try {
    const res = await axios.get("https://nodered.powstar.top/api/data");
    data.value = res.data;
  } catch (err) {
    console.error("加载初始数据失败:", err);
  }
};

// 2. 建立 WebSocket 连接
const connectWebSocket = () => {
  const socket = new WebSocket("wss://nodered.powstar.top/ws/data");

  socket.onopen = () => {
    console.log("WebSocket 已连接");
    connected.value = true;
  };

  socket.onmessage = (event) => {
    console.log("收到数据:", event.data);
    try {
      data.value = JSON.parse(event.data);
    } catch {
      data.value = event.data;
    }
  };

  socket.onerror = (err) => {
    console.error("WebSocket 错误:", err);
  };

  socket.onclose = () => {
    console.log("WebSocket 已关闭");
    connected.value = false;
    // 可选：自动重连
    setTimeout(connectWebSocket, 3000);
  };
};

onMounted(() => {
  loadInitialData();
  connectWebSocket();
});
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
  padding: 20px;
}
.status {
  margin-top: 10px;
  font-weight: bold;
}
</style>