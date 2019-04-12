<template>
	<v-container fluid>
		<v-layout row fill-height wrap>
			<v-flex xs12 md6 fill-height class="pa-3">
				<v-layout column fill-height>
          <toolbar
            height="42px"
            @emoji="insertEmoji"
            />
					<v-textarea
						solo
						hide-details
						auto-grow
            ref="textarea"
						height="100%"
						:value="value"
						@input="val => $emit('input', val)" />
				</v-layout>
			</v-flex>
			<v-flex xs12 md6 fill-height class="pa-3">
				<v-card>
					<v-card-text v-if="compiled && mode === 'Rendered'" class="subheading markdown-text" v-html="compiled" />
					<v-card-text v-else-if="compiled && mode === 'Source'" class="subheading">
            {{ compiled }}
					</v-card-text>
				</v-card>
			</v-flex>
		</v-layout>
	</v-container>
</template>

<script>
import marked from '../util/marked.js';
import { VContainer, VLayout, VFlex, VCard, VCardText, VTextarea } from 'vuetify/lib';
// Styles
import 'vuetify/src/stylus/app.styl';
import '../style.css';
import Toolbar from './Toolbar.vue';

export default {
  components: {
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
