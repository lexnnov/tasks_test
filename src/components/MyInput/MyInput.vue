<template>
    <input v-model="val" class="myInput" aria-placeholder="asdasdasd" @keyup="$emit('update:value', val)"/>
</template>

<script>
    export default {
        name: "MyInput",
        props: {
            value: {
                type: String
            }
        },
        data: function () {
            return {
                val: this.value
            }
        }

    }
</script>

<style lang="scss" scoped>
    input {
        font-size: 18px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 100%;
        border: none;
        border-bottom: 1px solid #757575;
        box-sizing: border-box;
    }

    input:focus {
        outline: none;
    }
</style>