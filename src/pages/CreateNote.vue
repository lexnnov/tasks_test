<template>
    <div class="container">

        <btn :onClick="goHome" title="BACK TO TASKS"/>
        <btn :onClick="changeNoteType" :title="setBtnTitle()"/>

        <note
            :note="note"
            :readonly="false"
            :controls="setNoteControls()"
            @removeTask="removeTask"
            @addTask="addTask"
            @createNote="createNote"
        />

    </div>

</template>

<script>
    import Btn from '@/components/Btn/Btn'
    import Note from '@/components/Note/Note'
    import {generateId} from '@/helpers'

    export default {
        name: 'CreateNote',
        components: { Note, Btn},
        data: function () {
            return {
                note: {
                    title: '',
                    tasks: [{id: generateId(), title: '', state: false}],
                    type: 'task',
                },
                checked: false

            }
        },
        methods: {
            createNote() {
                // Проверка на наличие title и хотя бы одной задачи
                if ((this.note.type == 'group' ? this.note.title : this.note.tasks[0].title) && this.note.tasks.length) {
                    this.$store.dispatch('createNote', {
                        id: generateId(),
                        title: this.note.type == 'group' ? this.note.title : this.note.tasks[0].title,
                        tasks: this.note.tasks,
                        type: this.note.type,
                        complete: this.note.tasks.every(el => el.state)
                    })
                    this.$router.push('/')
                } else {
                    this.$store.dispatch('setModal', {
                        modalOpen: true,
                        data: {
                            title: 'All fields must be filled',
                            content: 'To create a task, you need to fill in the title and add a task',
                            route: '',
                            controls: ['OK']
                        }
                    })
                }
            },
            addTask() {
                this.note.tasks = [...this.note.tasks, {title: '', id: generateId(), state: false}]
            },
            removeTask(removeTask) {
                this.note.tasks = this.note.tasks.filter(task => task.id !== removeTask.id)
                this.$store.dispatch('setNoteIdForRemove', removeTask.id)
            },
            goHome() {
                this.$router.push('/')
            },
            changeNoteType() {
                this.checked = !this.checked
                this.checked ? this.note.type = 'group' : this.note.type = 'task'
            },

            setNoteControls() {
                return this.note.type === 'group' ? ['ADD TASK', 'CREATE'] : ['CREATE']
            },
            setBtnTitle() {
                return this.note.type === 'group' ? 'GROUP' : 'TASK'
            }
        }
    }
</script>

<style scoped>

</style>