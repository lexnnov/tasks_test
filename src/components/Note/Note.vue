<template>
    <div :class="[readonly ? 'note readOnly' : 'note']">
        <div class="note-title" v-if="note.type == 'group'">
            <input  placeholder="GROUP TITLE" :disabled="readonly" v-model="note.title"
                   type="text"/>
        </div>

        <div class="note-content">
            <draggable :move="note.type == 'group' ? ()=> {return true} : ()=> {return false}"
                       v-model="note.tasks"
                       :options="note.type == 'group' ? {group:'people'} : {group:'people1'}"
                       @start="drag=true"
                       @end="drag=false"
                       @change="moved"
            >
                <transition-group name="fade">
                    <task
                            v-for="task in note.tasks"
                            :key="task.id"
                            :readonly="readonly"
                            :task="task"
                            :needRemoveBtn="note.type == 'group' ? true : false"
                            @removeTask="removeTask"
                    />
                </transition-group>
            </draggable>

        </div>

        <div class="note-footer">
            <btn
                    v-for="control in controls"
                    :key="control"
                    :color="control == 'REMOVE' ? 'c51111' : ''"
                    :title="control"
                    :onClick="
                    control == 'EDIT' ? editNote :
                    control == 'VIEW' ? viewNote :
                    control == 'REMOVE' ? removeNote :
                    control == 'SAVE' ? saveNote :
                    control == 'ADD TASK' ? addTask :
                    createNote
            "/>
        </div>

    </div>
</template>

<script>
    import Btn from '@/components/Btn/Btn';
    import Task from '@/components/Note/Task/Task';
    import draggable from 'vuedraggable'


    export default {
        name: 'Note',
        components: {Btn, Task, draggable},
        props: {
            note: {
                type: Object,
                required: true
            },
            readonly: {
                type: Boolean,
                required: true
            },
            view: {
                type: Boolean
            },
            controls: {
                type: Array,
                required: true
            }
        },
        computed: {
            // Отображать на главной только 3 задачи
            taskFilter: function () {
                if (this.readonly && !this.view)
                    return this.note.tasks.slice(0, 3)
                else
                    return this.note.tasks
            }
        },

        methods: {

            // Работа с заметкой
            editNote() {
                this.$emit('editNote', this.note)
            },
            viewNote() {
                this.$emit('viewNote', this.note)
            },
            createNote() {
                this.$emit('createNote', this.note.type)
            },
            saveNote() {
                this.$emit('saveNote', this.note.id)
            },
            removeNote() {
                this.$emit('removeNote', this.note.id)
            },

            // Работа с задачами
            addTask() {
                this.$emit('addTask', this.note.id)
            },
            removeTask(task) {
                this.$emit('removeTask', task)
            },

            moved() {
                this.$emit('movedTask')
            }
        }
    }
</script>

<style lang="scss" scoped>

    .readOnly input[type=text] {
        border: none;
    }

    input[type=text] {
        transition: all 0.30s ease-in-out;
        outline: none;
        padding: 3px 0px 3px 3px;
        margin: 5px 1px 3px 20px;
        border: none;
        background-color: transparent;
        border-bottom: 1px solid white;
        color: white;

        &:focus {
            padding: 3px 0px 3px 3px;
            border-bottom: 1px solid #006d63;
        }

        &::placeholder {
            color: #d5d5d5;
        }
    }


    .note {
        display: flex;
        flex-direction: column;
        width: 100%;
        /*min-height: 200px;*/
        height: auto;
        background-color: white;
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
        /*transition: all 0.3s cubic-bezier(.25, .8, .25, 1);*/
        border-radius: 2px;

        &-title {
            display: flex;
            align-items: center;
            flex: 0 0 auto;
            height: 50px;
            background-color: #009688;
            border-radius: 2px 2px 0 0;

            p {
                text-align: left;
                color: white;
                padding-left: 20px;
            }
        }

        &-content {
            flex: 1 0 auto;
            padding: 20px;
            transition: all 2s;
        }

        &-footer {
            flex: 0 0 auto;
            border-top: 1px solid #DBDBDB;
            display: flex;
            flex-wrap: wrap;
            justify-content: flex-end;
            color: #009688;
        }

        &_empty {
            display: flex;
            align-items: center;
            justify-content: center;
        }
    }

    .task:last-child {
        margin-bottom: 0;
    }

</style>