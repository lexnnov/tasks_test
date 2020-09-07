<template>
    <div :class="[readonly ? 'task readOnly' : 'task']">
        <div class="checkbox">
            <input
                class="custom-checkbox"
                type="checkbox"
                v-model="task.state"
                :id="task.id"
                :disabled="readonly"
                @click="change"
            >
            <label :for="task.id">

                <div class="blockTask" v-if="readonly"></div>

                <input
                    v-if="!this.view"
                    placeholder="Enter the text of the task"
                    :disabled="readonly"
                    :class="task.title ? { inactive: complete } : ''"
                    v-model="task.title"
                >

                <div v-else :class="{ inactive: complete }"> {{task.title}} </div>

            </label>

        </div>

        <some-icon v-if="!readonly && needRemoveBtn" @click="remove" class="removeTask"/>
    </div>
</template>

<script>
    import SomeIcon from '@/assets/remove.svg'

    export default {
        name: 'Task',
        components: {SomeIcon},

        props: {
            readonly: {
                type: Boolean,
            },
            task: {
                type: Object,
            },
            setTask: {
                type: Function
            },
            needRemoveBtn: {
                type: Boolean
            },
            removeTask: {
                type: Function
            },
            view: {
                type: Boolean
            },
        },
        data: function () {
            return {
                complete: this.task.state
            }
        },

        methods: {
            change() {
                this.complete = !this.complete
            },
            remove() {
                this.$emit('removeTask', this.task)
            }

        }
    }
</script>

<style lang="scss" scoped>

    .blockTask {
        position: absolute;
        width: 100%;
        height: 100%;
        opacity: 0;
    }
    .task {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        width: 100%;
    }

    .readOnly input {
        border: none;
    }

    .removeTask {
        cursor: pointer;

        &:hover {
            path {
                fill: #c33838 !important
            }
        }
    }

    input {
        font-size: 18px;
        padding: 10px 10px 10px 5px;
        display: block;
        width: 100%;
        border: none;
        box-sizing: border-box;
        background-color: white;
    }

    input::placeholder {
        color: #b6b6b6 !important;
    }

    .readOnly .custom-checkbox:checked + label::before {
        border-color: #b5b5b5;
    }

    .checkbox {
        width: 100%;
        position: relative;
    }

    .custom-checkbox {
        position: absolute;
        z-index: -1;
        opacity: 0;
        width: 100%;
    }

    .custom-checkbox + label {
        display: inline-flex;
        align-items: center;
        user-select: none;
        width: 100%;
    }

    .custom-checkbox + label::before {
        content: '';
        display: inline-block;
        width: 1em;
        height: 1em;
        flex-shrink: 0;
        flex-grow: 0;
        border: 1px solid #adb5bd;
        border-radius: 0.25em;
        margin-right: 0.5em;
        background-repeat: no-repeat;
        background-position: center center;
        background-size: 50% 50%;
    }

    .custom-checkbox:focus:not(:checked) + label::before {
        border-color: #80bdff;
    }

    .custom-checkbox:checked + label::before {
        border-color: #009688;
        background-color: #009688;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
    }

    .custom-checkbox:disabled + label::before {
        background-color: #e9ecef;
    }

    .inactive {
        text-decoration: line-through;
        input {
            user-select: none;

        }
    }

    .content {
        padding: 20px;
    }


</style>