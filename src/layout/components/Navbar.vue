<template>
  <div class="navbar">
    <hamburger
      id="hamburger-container"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggleClick="toggleSideBar"
    />
    <breadcrumb id="breadcrumb-container" class="breadcrumb-container" v-if="!settingsStore.topNav" />
    <top-nav id="topmenu-container" class="topmenu-container" v-if="settingsStore.topNav" />

    <div class="right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <header-search id="header-search" class="right-menu-item" />

        <el-tooltip :content="$t('navbar.doc')" effect="dark" placement="bottom">
          <ruo-yi-doc id="ruoyi-doc" class="right-menu-item hover-effect" />
        </el-tooltip>

        <screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip :content="$t('navbar.layoutSize')" effect="dark" placement="bottom">
          <size-select id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>

        <el-dropdown 
          trigger="click" 
          class="right-menu-item hover-effect international" 
          @command="handleSetLanguage"
        >
          <div class="language-icon">
            <svg-icon icon-class="language" />
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item 
                :disabled="language === 'zh-cn'" 
                command="zh-cn"
                class="language-item"
              >
                <span class="language-text">简体中文</span>
              </el-dropdown-item>
              <el-dropdown-item 
                :disabled="language === 'en'" 
                command="en"
                class="language-item"
              >
                <span class="language-text">English</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </template>
      <div class="avatar-container">
        <el-dropdown @command="handleCommand" class="right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            <img :src="userStore.avatar" class="user-avatar" />
            <el-icon><caret-bottom /></el-icon>
          </div>
          <template #dropdown>
            <el-dropdown-menu>
              <router-link to="/user/profile">
                <el-dropdown-item>{{ $t('navbar.profile') }}</el-dropdown-item>
              </router-link>
              <el-dropdown-item command="setLayout" v-if="settingsStore.showSettings">
                <span>{{ $t('navbar.layoutSettings') }}</span>
              </el-dropdown-item>
              <el-dropdown-item divided command="logout">
                <span>{{ $t('navbar.logout') }}</span>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus';
import { useI18n } from 'vue-i18n';
import Breadcrumb from '@/components/Breadcrumb';
import TopNav from '@/components/TopNav';
import Hamburger from '@/components/Hamburger';
import Screenfull from '@/components/Screenfull';
import SizeSelect from '@/components/SizeSelect';
import HeaderSearch from '@/components/HeaderSearch';
import RuoYiGit from '@/components/RuoYi/Git';
import RuoYiDoc from '@/components/RuoYi/Doc';
import useAppStore from '@/store/modules/app';
import useUserStore from '@/store/modules/user';
import useSettingsStore from '@/store/modules/settings';

const { t, locale } = useI18n();
const appStore = useAppStore();
const userStore = useUserStore();
const settingsStore = useSettingsStore();

const language = computed(() => locale.value);

function toggleSideBar() {
  appStore.toggleSideBar();
}

function handleCommand(command) {
  switch (command) {
    case 'setLayout':
      setLayout();
      break;
    case 'logout':
      logout();
      break;
    default:
      break;
  }
}

function logout() {
  ElMessageBox.confirm(t('navbar.logoutConfirm'), t('navbar.tips'), {
    confirmButtonText: t('navbar.confirm'),
    cancelButtonText: t('navbar.cancel'),
    type: 'warning',
  })
    .then(() => {
      userStore.logOut().then(() => {
        location.href = '/index';
      });
    })
    .catch(() => {});
}

const emits = defineEmits(['setLayout']);
function setLayout() {
  emits('setLayout');
}

// 语言切换处理函数
const handleSetLanguage = (lang) => {
  locale.value = lang;
  // 可选：持久化语言设置
  localStorage.setItem('language', lang);
};
</script>

<style lang="scss" scoped>
.navbar {
  height: 50px;
  overflow: hidden;
  position: relative;
  background: #fff;
  box-shadow: 0 1px 4px rgba(0, 21, 41, 0.08);

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    height: 100%;
    line-height: 50px;
    display: flex;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      height: 100%;
      font-size: 18px;
      color: #5a5e66;
      vertical-align: text-bottom;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 40px;

      .avatar-wrapper {
        margin-top: 5px;
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        i {
          cursor: pointer;
          position: absolute;
          right: -20px;
          top: 25px;
          font-size: 12px;
        }
      }
    }

    .international {
      display: flex;
      align-items: center;
      padding: 0 12px;
      cursor: pointer;
      
      .language-icon {
        font-size: 18px;
        color: #5a5e66;
        vertical-align: middle;
      }
    }
  }
}

:deep(.language-item) {
  padding: 8px 16px;
  
  .language-text {
    font-size: 14px;
    color: #606266;
  }

  &:hover {
    background-color: #f5f7fa;
  }

  &.is-disabled {
    color: #bbb;
    cursor: not-allowed;
    background-color: #fff;
    
    .language-text {
      color: #bbb;
    }
  }
}

:deep(.el-dropdown-menu) {
  padding: 4px 0;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
}
</style>
