<template>
  <div>
    <v-toolbar :height="height">
      <v-hover>
        <!-- Must use click.stop to prevent v-click-outside event -->
        <v-icon
          slot-scope="{ hover }"
          :color="hover || emojiPicker ? 'blue' : ''"
          @click.stop="emojiPicker = !emojiPicker"
          >
          insert_emoticon
        </v-icon>
      </v-hover>
    </v-toolbar>

    <no-ssr>
      <picker
        v-show="emojiPicker"
        v-click-outside="() => this.emojiPicker = false"
        title="Pick an emoji..."
        :pickerStyles="{ position: 'absolute', 'z-index': 1 }"
        @select="select"
        />
    </no-ssr>
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue';
import { VToolbar, VBtn, VIcon, VHover } from 'vuetify/lib';
// The picker is not ssr
import NoSSR from 'vue-no-ssr';
// v-click-outside
import vClickOutside from 'v-click-outside';

export default {
  props: {
    height: {
      type: String,
      default: '42px'
    }
  },
  components: {
    'no-ssr': NoSSR,
    VHover,
    VToolbar,
    VIcon,
    VBtn,
    Picker
  },
  directives: {
    clickOutside: vClickOutside.directive
  },
  data()
  {
    return {
      emojiPicker: false
    };
  },

  methods: {
    select(emoji)
    {
      this.$emit('emoji', emoji);
      // Close
      this.emojiPicker = false;
    }
  }
};
</script>
