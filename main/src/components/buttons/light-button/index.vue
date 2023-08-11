<template>
  <div class="cus-light-button">
    <slot name="default"></slot>
  </div>
</template>

<script>
export default {
  name: 'LightButton',
  data() {
    return {}
  },
}
</script>
<style scoped lang="css">
.cus-light-button {
  cursor: pointer;
  position: relative;
  box-sizing: border-box;
  border-radius: 4px;
  color: #ddd;
  background-color: rgba(0, 0, 0, 0.4);
  box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.6);
  padding: 8px 14px;
  letter-spacing: 3px;
  display: inline-block;
  height: 36px;
  line-height: 20px;
}
</style>
