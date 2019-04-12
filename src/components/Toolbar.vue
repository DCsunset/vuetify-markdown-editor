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

    <picker
      v-show="emojiPicker"
      title="Pick an emoji..."
      :pickerStyles="{ position: 'absolute', 'z-index': 1 }"
      @select="select"
      />
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue';
import { VToolbar, VBtn, VIcon, VHover } from 'vuetify/lib';

export default {
  props: {
    height: {
      type: String,
      default: '42px'
    }
  },
  components: {
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
