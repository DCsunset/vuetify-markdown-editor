<template>
  <div>
    <v-toolbar :height="height">
      <v-hover>
        <v-icon
          slot-scope="{ hover }"
          :color="hover || emojiPicker ? 'blue' : ''"
          @click="emojiPicker = !emojiPicker"
          >
          insert_emoticon
        </v-icon>
      </v-hover>
    </v-toolbar>

    <no-ssr>
      <picker
        v-show="emojiPicker"
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
