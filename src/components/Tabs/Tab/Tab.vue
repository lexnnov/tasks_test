<template>
    <div v-show="isActive"><slot></slot></div>
</template>

<script>
    export default {
        name: 'Tab',
        props: {
            name: { required: true },
            selected: { default: false}
        },

        data() {
            return {
                isActive: false
            }
        },


        computed: {

            href() {
                return '#' + this.name.toLowerCase().replace(/ /g, '-');
            }
        },

        mounted() {

            this.isActive = this.selected;

        }
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