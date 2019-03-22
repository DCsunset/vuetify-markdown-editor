<template>
	<v-container fluid>
		<v-layout row fill-height wrap>
			<v-flex xs12 md6 fill-height class="pa-3">
				<v-layout column fill-height>
					<v-toolbar height="42px">
					</v-toolbar>
					<v-textarea
						solo
						hide-details
						auto-grow
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

<style>
code
{
	font-weight: initial;
	background: #1d1f21;
	color: white;
	font-size: 95%;
	display: inline-block;
	padding: 1px 5px 1px 5px;
	margin: 2px;
	margin-bottom: 12px;
}
code:before,
code:after
{
	content: initial;
}

/* Change h1, h2... styles to make markdown format better */
h1
{
	font-size: 1.8em;
	margin: 0.3em 0;
	//border-bottom: 1px solid #eaecef;
}

h2
{
	margin: 0.25em 0;
}

h3
{
	margin: 0.12em 0;
}

p
{
	margin-bottom: 12px;
}
</style>

<style scoped>
.markdown-text
{
  word-wrap: break-word;
}
</style>

<script>
import marked from '../util/marked.js';
import { VContainer, VLayout, VFlex, VCard, VCardText, VToolbar, VTextarea } from 'vuetify/lib';
// Styles
import 'vuetify/src/stylus/app.styl';

export default {
  components: {
    VContainer,
    VLayout,
    VFlex,
    VCard,
    VCardText,
    VToolbar,
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
	}
};
</script>
