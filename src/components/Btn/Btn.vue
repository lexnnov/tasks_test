<template>
    <button :disabled="!dis" :style="style" @click="onClick"> {{ title }}</button>
</template>

<script>
	export default {
		name: 'Button',
		props: {
			onClick: {
				type: Function,
				required: true
			},
			title: {
				type: String,
				required: true
			},
			color: {
				type: String
			},
			dis: {
				type: Boolean,
				default: true
			}
		},
		computed: {
			style() {
				return `color: #${ this.color }`;
			}
		},
	}
</script>

<style lang="scss">

    button {
        background: none;
        color: inherit;
        border: none;
        font: inherit;
        cursor: pointer;
        outline: inherit;
        padding: 12px 20px;
        font-size: 14px;

        &:hover {
            background-color: #e3e3e3;
        }
    }

    button:disabled {
        color: gray;
        cursor: not-allowed;

        &:hover {
            background-color: transparent;
        }
    }


</style>