<template>
  <module v-observe-visibility="{
    callback: setVisibility,
    intersection: {
      rootMargin: '0px 0px 20% 0px'
    }
  }" :class="{ visible }" class="patchlog">
    <template slot="header">
      <h3>{{ patchlog.name }}</h3>
      <time :datetime="patchlog.date">{{ overview ? moment (new Date(patchlog.date)).fromNow() : moment(new Date(patchlog.date)).format('MMMM Do YYYY') }}</time>
    </template>
    <template slot="body">
      <div class="image">
        <img v-if="(visible || seen) && patchlog.imgUrl" :src="patchlog.imgUrl" :alt="patchlog.name" onerror="this.style.display='none'">
        <div class="shade"/>
      </div>
      <div v-if="patchlog.additions">
        <h4>Additions</h4>
        <p v-for="(log, i) in patchlog.additions.split('\n')" v-if="log" :key="log + i">
          {{ log }}
        </p>
      </div>
      <div v-if="patchlog.changes">
        <h4>Changes</h4>
        <p v-for="(log, i) in patchlog.changes.split('\n')" v-if="log" :key="log + i">
          {{ log }}
        </p>
      </div>
      <div v-if="patchlog.fixes">
        <h4>Fixes</h4>
        <p v-for="(log, i) in patchlog.fixes.split('\n')" v-if="log" :key="log + i">
          {{ log }}
        </p>
      </div>
    </template>
    <template slot="footer">
      <a :href="patchlog.url" target="_blank">
        Full Patch Notes
        <img src="/img/ui/arrow-right.svg" class="ico-h-20" alt="View full patch notes">
      </a>
    </template>
  </module>
</template>



<script>
import Vue from 'vue'
import VueObserveVisibility from 'vue-observe-visibility'
import moment from 'moment'
import module from 'src/components/ui/module.vue'

export default {
  components: {
    module
  },

  props: ['patchlog', 'overview'],

  data () {
    return {
      visible: false,
      seen: false,
      itemName: this.$route.params.item
    }
  },

  beforeMount () {
    Vue.use(VueObserveVisibility)
  },

  methods: {
    moment,
    setVisibility (bool, entry) {
      const buffer = -99999

      if (bool || entry.boundingClientRect.top < entry.rootBounds.bottom + buffer || entry.boundingClientRect.bottom < entry.rootBounds.top + buffer) {
        this.visible = true
        this.seen = true
        this.$store.commit('addItemPatchlog', this.patchlog)
      } else {
        this.visible = false
        this.$store.commit('removeItemPatchlog', this.patchlog)
      }
    }
  }
}
</script>



<style lang="scss" scoped>
@import '~src/styles/partials/importer';

.module {
  position: relative;
  overflow: hidden;
  max-width: 650px;

  /deep/ .header {
    position: relative;
    z-index: 1;

    h3 {
      color: white !important;
      font-size: 1em !important;
      text-transform: none;
      letter-spacing: normal;
    }
  }
  /deep/ .body {
    overflow-y: auto;
    max-height: 275px;

    .image {
      position: absolute;
      left: 0;
      top: 0;
      opacity: 0.66;
      z-index: 0;
      width: 100%;
      margin-bottom: 40px;
      border-radius: 2px;

      img {
        width: 100%;
      }
      .shade {
        position: absolute;
        top: 1px; // 1px because the bottom may not cover the image on high res screens
        height: 100%;
        width: 100%;
        @include gradient-background(transparent, #3b424f);
      }
    }

    h3, h4, p {
      position: relative;
      z-index: 1;
    }
    h4 {
      font-size: 0.9em;
    }
    p {
      word-wrap: break-word;
      margin-left: 15px;
      margin-bottom: 20px;
    }
  }

  /deep/ .footer {
    position: relative;
    z-index: 1;
  }
}
</style>
