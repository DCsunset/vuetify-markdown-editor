<template>
  <div>
    <v-hover>
      <!-- Must use click.stop to prevent v-click-outside event -->
      <v-icon
        slot-scope="{ hover }"
        :color="hover || emojiPicker ? 'blue' : color"
        title="Emoji"
        @click.stop="emojiPicker = !emojiPicker"
        >
        insert_emoticon
      </v-icon>
    </v-hover>

    <Picker
      v-show="emojiPicker" v-click-outside="() => this.emojiPicker = false"
      title="Pick an emoji..."
      emoji="smiley"
      :native="nativeEmoji"
      :pickerStyles="{ position: 'absolute' }"
      @select="select"
      />
  </div>
</template>

<script>
import { Picker } from 'emoji-mart-vue-fast';
// v-click-outside
import vClickOutside from 'v-click-outside';

// CSS
import 'emoji-mart-vue-fast/css/emoji-mart.css';

export default {
  props: {
    // Icon color
    color: {
      type: String,
      default: undefined
    },
    nativeEmoji: {
      type: Boolean,
      default: false
    }
  },
  components: {
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
