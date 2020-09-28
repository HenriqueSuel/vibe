<template>
  <transition name="fade" mode="out-in">
    <div class="container" :class="getToast.type" v-if="getToast">
      <FontAwesomeIcon
        v-if="getToast.type === 'info'"
        class="icon"
        :icon="faInfo"
      />
      <FontAwesomeIcon
        v-if="getToast.type === 'error'"
        class="icon"
        :icon="faExclamation"
      />
      <FontAwesomeIcon
        v-if="getToast.type === 'sucess'"
        class="icon"
        :icon="faCheck"
      />
      <div>
        <strong>{{ getToast.title }}</strong>
        <p>{{ getToast.description }}</p>
      </div>
    </div>
  </transition>
</template>

<script>
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { mapGetters } from 'vuex';

import {
  faTimes,
  faInfo,
  faExclamation,
  faCheck,
} from '@fortawesome/free-solid-svg-icons';

export default {
  name: 'Toast',
  components: {
    FontAwesomeIcon,
  },
  data() {
    return {
      faTimes,
      faInfo,
      faExclamation,
      faCheck,
    };
  },
  computed: {
    ...mapGetters('GlobalStore', ['getToast']),
  },
};
</script>

<style scoped lang="scss">
.info {
  background: #ebf8ff;
  color: #3172b7;
}
.sucess {
  background: #e6fffa;
  color: #2e656a;
}
.error {
  background: #fddede;
  color: #c53036;
}

.container {
  width: 350px;
  position: absolute;
  right: 0;
  margin: 16px;
  padding: 16px 30px 16px 16px;
  border-radius: 10px;
  box-shadow: 2px 2px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  & + div {
    margin-top: 8px;
  }

  .icon {
    margin: 4px 12px 0 0;
  }
}

div {
  flex: 1;

  p {
    margin-top: 4px;
    font-size: 14px;
    opacity: 0.8;
    line-height: 20px;
  }
}
</style>
