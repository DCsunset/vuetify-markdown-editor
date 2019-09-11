<template>
	<v-row v-if="files && files.length" class="mx-0">
		<v-chip
			v-for="(file, i) in files"
			:key="i"
			label
			close
			@click:close="$emit('remove', file)"
			class="ma-2"
			>
			<div>
				<div>{{ file.name }}</div>
				<v-progress-linear
					v-if="file.isUploading() || file.isComplete()"
					class="mb-1"
					:value="file.progress()*100"
					/>
			</div>
		</v-chip>
	</v-row>
</template>

<script>
export default {
	props: {
		files: undefined
	}
};
</script>