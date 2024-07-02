<script setup lang="ts">
// 定义导航数据
import { onMounted } from 'vue';

const navList = [
  { name: '网站首页', link: '' },
  { name: '组织机构', link: '' },
  { name: '制度流程', link: '' },
  { name: '党建文化', link: '' },
  { name: '质量管理', link: '' },
  { name: '市场开拓', link: '' },
  { name: '工艺管理', link: '' },
  { name: '导航民机', link: '' },
  { name: '导航风采', link: '' },
];

// 页面加载完成后执行
onMounted(() => {
  const list: HTMLElement = document.getElementById('list')!;

  list.addEventListener('mouseover', () => {
    list.style.animationPlayState = 'paused';
  });
  list.addEventListener('mouseout', () => {
    list.style.animationPlayState = 'running';
  });
});
</script>

<template>
  <header class="shadow">
    <div class="px-4 py-2 sm:px-6 lg:px-8 bg-green-300">
      <!--      艺术字-->
      <h1 class="text-3xl font-bold text-white text-center">导航系统部</h1>
      <!--      右下角-->
      <div class="flex justify-end gap-2">
        <span class="px-4 bg-white text-green-300 rounded-lg">值班情况</span>
        <span class="px-4 bg-white text-green-300 rounded-lg">领导</span>
        <span class="px-4 bg-white text-green-300 rounded-lg">主管</span>
        <span class="px-4 bg-white text-green-300 rounded-lg">值班表</span>
      </div>
    </div>
    <div class="mt-4">
      <nav class="bg-red-300">
        <ul class="flex list-none">
          <li class="flex-1 px-4 py-2" v-for="(item, index) in navList" :key="index">{{ item.name }}</li>
        </ul>
      </nav>
    </div>
  </header>
  <main>
    <div class="flex items-stretch gap-4">
      <div class="flex-1">
        <div class="flex justify-between items-center">
          <div class="text-xl">通知公告:</div>
          <div class="text-xs mx-2">更多</div>
        </div>
        <div class="scrolling-list">
          <ul id="list">
            <li>Item 1</li>
            <li>Item 2</li>
            <li>Item 3</li>
            <li>Item 4</li>
            <li>Item 5</li>
          </ul>
        </div>
      </div>
      <div class="flex-1">2</div>
      <div class="flex-1">3</div>
    </div>
  </main>
</template>

<style scoped>
.scrolling-list {
  overflow: hidden;
  white-space: nowrap;
  height: 100px;
  border-top: aqua 1px solid;
}

#list {
  animation: scrolling 10s linear infinite;
}

@keyframes scrolling {
  0% {
    transform: translateY(100%);
  }
  100% {
    transform: translateY(-100%);
  }
}
</style>
