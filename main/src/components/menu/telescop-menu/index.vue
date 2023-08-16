<template>
  <div class="telescope-menu">
    <div :class="{ nav: true, expand: expand }">
      <div class="btn" @click="expandOperation">
        <div class="btn-item"></div>
        <div class="btn-item"></div>
        <div class="btn-item"></div>
      </div>
      <div class="icon">
        <div class="icon-img">
          <img alt="头像" :src="mmJpg" />
        </div>
        <div class="icon-con">
          <p>早上好呀！</p>
          <h2>shuo2c</h2>
        </div>
      </div>

      <div class="line"></div>

      <div class="title">
        <p>常用数据</p>
      </div>
      <div class="menu">
        <div class="item">
          <div class="light"></div>
          <div class="licon">
            <i class="el-icon-paperclip iconfont"></i>
          </div>
          <div class="con">Vue</div>
          <div class="ricon"></div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon">
            <i class="el-icon-service iconfont"></i>
          </div>
          <div class="con">React</div>
          <div class="ricon">
            <i class="el-icon-edit iconfont"></i>
          </div>
        </div>
        <div class="item">
          <div class="light"></div>
          <div class="licon">
            <i class="el-icon-user iconfont"></i>
          </div>
          <div class="con">Payouts</div>
          <div class="ricon"></div>
        </div>
      </div>

      <div class="line"></div>
      <div class="title">
        <p>Sever 6</p>
      </div>
      <div class="serve">
        <div class="item">
          <div class="light"></div>
          <div class="licon">
            <i class="el-icon-user iconfont"></i>
          </div>
          <div class="con">Payouts</div>
          <div class="ricon"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import mmJpg from '@/components/menu/telescop-menu/mm.jpg'
export default {
  name: 'TelescopeMenu',
  data() {
    return {
      mmJpg,
      expand: true,
    }
  },
  mounted() {
    console.log(this.mmJpg)
  },
  methods: {
    expandOperation() {
      this.expand = !this.expand
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
      margin-bottom: 20px;

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
          justify-content: center;
          align-items: center;
          transition: 0.5s;
          overflow: hidden;
          position: relative;
          left: -20px;
          opacity: 0;
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

    .serve {
      background: rgba(0, 0, 0, 0.7);
      border-radius: 10px;
      overflow: hidden;
      transition: 0.5s;
    }
  }
}</style>
