<template>
  <v-container class="md" fluid>
    <v-layout row wrap>
      <!-- Editor -->
      <v-flex xs12 :md6="preview" class="pa-3">
        <v-layout column>
          <v-card v-if="!outline" id="md-editor">
            <!-- Toolbar's style "transform: translateY(0)" will influence the z-index, so use "z-index: 1" on toolbar-->
            <v-toolbar style="z-index: 1" height="48px" flat>
              <toolbar
                :nativeEmoji="nativeEmoji"
                :emoji="emoji"
                :image="image"
                :color="color"
                @emoji="insertEmoji"
                />
            </v-toolbar>

            <v-divider />
            <template v-if="image">
              <image-status v-if="image" :files="files" @remove="removeFile" />
              <v-divider />
            </template>

            <v-textarea
              solo
              flat
              :hide-details="hideDetails"
              :hint="hint"
              auto-grow
              ref="textarea"
              :value="value"
              @input="val => $emit('input', val)"
              />
          </v-card>

          <div v-else id="md-editor">
            <div class="pa-2 outline" :style="{ borderColor: color, 'z-index': 1 }">
              <toolbar :nativeEmoji="nativeEmoji" :color="color" @emoji="insertEmoji" />
            </div>

            <image-status
              v-if="image"
              class="outline"
              :style="{ borderColor: color, borderTop: 'none' }"
              :files="files"
              @remove="removeFile"
              />

            <div class="outline" :style="{ borderColor: color, borderTop: 'none' }">
              <v-textarea
                solo
                flat
                :hide-details="hideDetails"
                :hint="hint"
                auto-grow
                ref="textarea"
                :value="value"
                @input="val => $emit('input', val)"
                />
            </div>
          </div>
        </v-layout>
      </v-flex>

      <!-- Preview -->
      <v-flex v-if="preview" v-show="compiled" xs12 :md6="preview" class="pa-3">
        <v-card v-if="!outline">
          <v-card-text v-if="mode === 'Rendered'" class="subheading text--primary markdown-text" v-html="compiled" />
          <v-card-text v-else-if="mode === 'Source'" class="subheading text--primary markdown-text">
            {{ compiled }}
          </v-card-text>
        </v-card>

        <div v-else :style="{ borderColor: color }" class="pa-3 outline">
          <div v-if="mode === 'Rendered'" class="subheading md" v-html="compiled" />
          <div v-else-if="mode === 'Source'" class="subheading">
            {{ compiled }}
          </div>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<style scoped>
/* Remove border-radius */
.v-textarea >>> .v-input__control > .v-input__slot {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}

.outline {
  border: 1.5px solid;
}
</style>

<script>
import Flow from '@flowjs/flow.js/dist/flow.min.js';
import render from '../util/render.js';
import Toolbar from './Toolbar.vue';
import ImageStatus from './FileStatus.vue';
import '../style.css';
import { setTimeout } from 'timers';

export default {
  components: {
    Toolbar,
    ImageStatus
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
    // Outline and icon default color
    color: {
      type: String,
      default: undefined
    },
    preview: {
      type: Boolean,
      default: true
    },
    nativeEmoji: {
      type: Boolean,
      default: false
    },
    // Enable emoji
    emoji: {
      type: Boolean,
      default: true
    },
    // Enable image upload
    image: {
      type: Boolean,
      default: true
    },
    hint: {
      type: String,
      default: ''
    },
    // target url of uploading files
    fileTarget: {
      type: String,
      default: '/'
    },
    fileFilter: {
      type: Function,
      default: file => {
        // Allow only image files
        return file.type.startsWith('image');
      }
    }
  },

  data() {
    return {
      // flow.js
      flow: undefined
    };
  },

  computed: {
    compiled() {
      return render(this.value);
    },
    hideDetails() {
      return !Boolean(this.hint);
    },
    files() {
      return this.flow && this.flow.files;
    }
  },

  mounted() {
    if (this.image) {
      this.flow = new Flow({
        target: this.fileTarget
      });
      this.flow.assignBrowse(document.getElementById('md-image'));
      this.flow.assignDrop(document.getElementById('md-editor'));

      this.flow.on('fileAdded', (file, event) => {
        this.$emit('fileAdded', file.file);
        // Use filter to allow specific files
        return this.fileFilter(file.file);
      });
      
      this.flow.on('error', message => {
        throw new Error(message);
      });
    }
  },

  methods: {
    // Provide a function to focus on the textarea
    focus() {
      this.$refs.textarea.focus();
    },

    // upload all images
    upload() {
      this.flow.upload();
    },

    // retry
    upload() {
      this.flow.retry();
    },

    removeFile(file) {
      this.flow.removeFile(file);
    },

    insertEmoji(emoji) {
      // Get the element of textarea
      const textarea = this.$refs.textarea.$refs['input'];

      const startPos = textarea.selectionStart;
      const endPos = textarea.selectionEnd;

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
