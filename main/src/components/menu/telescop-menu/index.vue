<template>
  <div class="telescope-menu">
    <div :class="{ nav: true, expand: expand }">
      <div class="btn" @click="expandOperation">
        <div class="btn-item"></div>
        <div class="btn-item"></div>
        <div class="btn-item"></div>
      </div>
      <div class="icon">
        <div class="icon-img" @click="headSculptureClick">
          <img alt="头像" :src="image || mmJpg" />
        </div>
        <div class="icon-con">
          <p>{{ motto || '春光无限，与君共知' }}</p>
          <h2>{{ nickname || '小太阳' }}</h2>
        </div>
      </div>

      <div class="line"></div>

      <template v-for="(item, index) in menu">
        <div :key="index">
          <div class="title">
            <p>{{ item.title }}</p>
          </div>
          <div :class="{ menu: true, serve: item.darkColor }">
            <template v-for="(link, linkIndex) in item.groups">
              <div
                :key="linkIndex"
                :class="{ item: true, active: currentPath === link.toPath }"
                @click="goPages(link.toName, link.toPath)"
              >
                <div class="light"></div>
                <div class="licon"><i :class="['iconfont', link.prefixIcon]"></i></div>
                <div class="con">{{ link.title }}</div>
                <!-- <div class="ricon"><i :class="[link.suffixIcon, 'iconfont']"></i></div> -->
              </div>
            </template>
          </div>
          <div v-if="index < menu.length - 1" class="line"></div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import mmJpg from '@/components/menu/telescop-menu/mm.jpg'
export default {
  name: 'TelescopeMenu',
  props: {
    menu: [],
    motto: String,
    nickname: String,
    image: String,
  },
  data() {
    return {
      mmJpg,
      expand: true,
      currentPath: '',
    }
  },
  mounted() {
    this.currentPath = this.$route.path
  },
  methods: {
    expandOperation() {
      this.expand = !this.expand
    },
    goPages(name, path) {
      this.currentPath = path
      this.$router.push({ name })
    },
    // 头像点击
    headSculptureClick() {
      this.$emit('headSculpture')
    },
  },
}
</script>

<style lang="less" scoped>
.telescope-menu {
  .expand {
    .icon {
      width: 250px !important;

      .icon-con {
        display: block !important;
      }
    }

    .line {
      width: 230px !important;
    }

    .con {
      width: 160px !important;
      opacity: 1 !important;
    }

    .ricon {
      width: 60px !important;
      opacity: 1 !important;
    }

    .serve,
    .menu {
      width: 230px !important;
    }

    .title {
      width: 230px !important;
      p {
        font-size: 16px !important;
      }
    }

    width: 280px !important;
  }

  .nav {
    color: #fff;
    width: 110px;
    height: calc(100vh);
    background: rgba(30, 36, 51, 0.8);
    // border-top-right-radius: 20px;
    // border-bottom-right-radius: 20px;
    overflow: hidden;
    transition: 0.5s;

    .btn {
      cursor: pointer;
      width: 60px;
      height: 10px;
      display: flex;
      justify-content: space-around;
      margin-left: 25px;
      margin-top: 25px;

      .btn-item {
        width: 10px;
        height: 10px;
        border-radius: 50%;

        &:nth-child(1) {
          background: #eb5a56;
        }

        &:nth-child(2) {
          background: #f8bc33;
        }

        &:nth-child(3) {
          background: #62cb44;
        }
      }
    }

    .icon {
      height: 60px;
      margin-left: 25px;
      margin-top: 20px;
      display: flex;

      .icon-img {
        cursor: pointer;
        width: 60px;
        height: 60px;
        box-sizing: border-box;
        border-radius: 50%;
        border: 4px solid rgba(255, 255, 255, 0.3);
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
          border-radius: 50%;
          object-fit: cover;
        }
      }

      .icon-con {
        display: none;
        height: 60px;
        margin-left: 25px;

        p {
          padding-top: 5px;
          margin: 0px;
        }

        h2 {
          font-weight: 400;
          margin: 0px;
        }
      }
    }

    .line {
      width: 60px;
      height: 1px;
      background: rgba(245, 253, 255, 0.5);
      margin: 20px 25px;
      transition: 0.5s;
    }

    .title {
      width: 60px;
      margin-left: 25px;
      margin-bottom: 16px;
      height: 24px;
      p {
        font-size: 14px;
        margin: 0px;
      }
    }

    .menu,
    .serve {
      width: 60px;
      margin-left: 25px;
      transition: 0.5s;

      .item {
        display: flex;
        position: relative;
        transition: 0.5s;
        border-radius: 6px;
        margin-top: 2px;
        cursor: pointer;

        &:hover {
          background: rgba(255, 255, 255, 0.1);

          .light {
            opacity: 1;
          }
        }

        .light {
          width: 6px;
          height: 50px;
          background: #eb5a56;
          position: absolute;
          left: -25px;
          transition: 0.5s;
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
          opacity: 0;
        }

        .licon {
          width: 60px;
          height: 50px;
          display: flex;
          justify-content: center;
          align-items: center;

          .iconfont {
            font-size: 22px;
          }
        }

        .con {
          width: 0px;
          height: 50px;
          display: flex;
          // justify-content: center;
          align-items: center;
          transition: 0.5s;
          overflow: hidden;
          position: relative;
          right: -25px;
          opacity: 0;
          word-break: keep-all;
        }

        .ricon {
          width: 0px;
          height: 50px;
          transition: 0.5s;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: hidden;
          opacity: 0;

          .iconfont {
            font-size: 22px;
            color: #62cb44;
          }
        }
      }
    }

    .active {
      background: rgba(255, 255, 255, 0.1);
    }

    .serve {
      background: rgba(0, 0, 0, 0.7);
      border-radius: 6px;
      overflow: hidden;
      transition: 0.5s;
    }
  }
}
</style>
