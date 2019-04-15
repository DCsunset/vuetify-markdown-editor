<template>
  <v-layout row wrap>
    <v-flex xs12 :md6="preview" class="pa-3">
      <v-layout column>
        <v-card v-if="!outline">
          <v-toolbar flat>
            <toolbar :color="iconColor" @emoji="insertEmoji" />
          </v-toolbar>
          <v-textarea
            solo
            flat
            hide-details
            auto-grow
            ref="textarea"
            :value="value"
            @input="val => $emit('input', val)"
            />
        </v-card>

        <template v-else>
          <div class="pa-2 outline" :style="{ borderColor: outlineColor }">
            <toolbar :color="iconColor" @emoji="insertEmoji" />
          </div>
          <div class="outline" :style="{ borderColor: outlineColor, borderTop: 'none' }">
            <v-textarea
              solo
              flat
              hide-details
              auto-grow
              ref="textarea"
              :value="value"
              @input="val => $emit('input', val)"
              />
          </div>
        </template>
      </v-layout>
    </v-flex>

    <v-flex v-if="preview" xs12 :md6="preview" class="pa-3">
      <v-card v-if="!outline">
        <v-card-text v-if="compiled && mode === 'Rendered'" class="subheading markdown-text" v-html="compiled" />
        <v-card-text v-else-if="compiled && mode === 'Source'" class="subheading">
          {{ compiled }}
        </v-card-text>
      </v-card>

      <div v-else :style="{ borderColor: outlineColor }" class="pa-3 outline">
        <div v-if="compiled && mode === 'Rendered'" class="subheading markdown-text" v-html="compiled" />
        <div v-else-if="compiled && mode === 'Source'" class="subheading">
          {{ compiled }}
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<style scoped>
/* Remove border-radius */
.v-textarea >>> .v-input__control > .v-input__slot
{
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.outline
{
  border: 1.5px solid;
}
</style>

<script>
import marked from '../util/marked.js';
import { VContainer, VToolbar, VLayout, VFlex, VCard, VCardText, VTextarea } from 'vuetify/lib';
// Styles
import Toolbar from './Toolbar.vue';

import '../style.css';

export default {
  components: {
    VToolbar,
    VContainer,
    VLayout,
    VFlex,
    VCard,
    VCardText,
    Toolbar,
    VTextarea
  },
  props: {
    value: {
      type: String,
      default: ''
    },
    mode: {
      type: String,
      default: 'Rendered'
    },
    outline: {
      type: Boolean,
      default: false
    },
    // Outline color
    outlineColor: {
      type: String,
      default: 'rgba(0, 0, 0, 0.54)'
    },
    iconColor: {
      type: String,
      default: undefined
    },
    preview: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    compiled()
    {
      return marked(this.value);
    }
  },

  methods: {
    insertEmoji(emoji)
    {
      // Get the element of textarea
      const textarea = this.$refs.textarea.$refs['input'];
      //console.log(textarea);

      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;

      //console.log(textarea.selectionStart, textarea.selectionEnd);

      // Insert to the selection area
      this.$emit('input', textarea.value.substring(0, startPos) + emoji.native + textarea.value.substring(endPos));

      // Focus
      textarea.focus();

      // Update cursor after the data updated
      this.$nextTick(() => {
        textarea.selectionEnd = startPos + emoji.native.length;
        //console.log(textarea.selectionStart, textarea.selectionEnd);
      });
    }
  }
};
</script>
