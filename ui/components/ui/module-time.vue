<template>
  <div class="module-time">
    <div class="interactive" @click="toggle">
      <span>Last {{ days }} days</span>
      <img src="/img/ui/dropdown.svg" class="ico-h-20" alt="Dropdown">
    </div>
    <div :class="{ active }" class="dropdown">
      <div class="body">
        <span :class="{ active: days === 7 }" @click="fn(7); toggle()">Last 7 days</span>
        <span :class="{ active: days === 30 }" @click="fn(30); toggle()">Last 30 days</span>
        <span :class="{ active: days === 90 }" @click="fn(90); toggle()">Last 90 days</span>
      </div>
    </div>
  </div>
</template>



<script>
export default {
  props: ['days', 'fn'],

  data () {
    return {
      active: false
    }
  },

  methods: {
    toggle () {
      this.active = !this.active
    }
  }
}
</script>



<style lang="scss" scoped>
@import '~src/styles/partials/importer';

.module-time {
  position: relative;
  z-index: 2;
  font-size: 1.1em;
  color: white;
}
.interactive {
  padding: 6px 10px;
}
.dropdown {
  position: absolute;
  top: 0;
  padding: 5px 0;
  background: $color-bg;
  @include ease(0.15s);
  @include shade-1;

  .body {
    display: flex;
    flex-direction: column;

    span {
      cursor: pointer;
      padding: 10px 15px;
      @include ease(0.15s);
    }
    span:hover {
      background: rgba(0,0,0,0.15);
    }
    span:not(.active) {
      color: $color-font-body;
    }
  }
  &:not(.active) {
    pointer-events: none;
    opacity: 0;
    transform: translateY(-5px);
    transform-origin: top;
    @include ease(0.15s);
  }
}
</style>
