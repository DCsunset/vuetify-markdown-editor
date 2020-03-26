<template>
	<v-tooltip v-model="show" top>
		<template v-slot:activator="{}">
			<v-hover v-slot:default="{ hover }">
				<!-- Pass all props and events to child -->
				<v-icon size="21px" @click="showTooltip" v-bind="$attrs" :title="title" :style="css" :class="{ unhover: !hover }">
					<!-- Pass default slots to v-icon -->
					<slot name="default" />
				</v-icon>
			</v-hover>
		</template>
		<template v-slot:default>
			<!-- Pass tooltip slots to v-tooltip -->
			<slot name="tooltip" />
		</template>
	</v-tooltip>
</template>

<script lang="ts">
import { Vue, Component, Prop, Emit } from 'vue-property-decorator';

@Component
class ClickableIcon extends Vue {
	@Prop(Object) readonly css: any;
	@Prop(String) readonly title!: string;
	@Prop({ default: 800 }) readonly tooltipTimeout!: number;

	show = false;
	timeout: number | null = null;

	@Emit('click')
	showTooltip() {
		this.show = true;
		if (this.timeout) {
			clearTimeout(this.timeout);
		}
		this.timeout = setTimeout(() => {
			this.show = false;
			this.timeout = null;
		}, this.tooltipTimeout);
	}
};

export default ClickableIcon;
</script>

<style scoped>
.unhover {
	opacity: 0.3;
}
</style>
