<template>
    <div class="container">

        <btn :onClick="goHome" title="BACK TO TASKS"/>

        <note
            :note="note"
            :readonly="false"
            :controls="setNoteControl()"
            @saveNote="saveNote"
            @removeNote="removeNote"
            @removeTask="removeTask"
            @addTask="addTask"
        />

    </div>

</template>

<script>
    import Btn from '@/components/Btn/Btn';
    import Note from '@/components/Note/Note';
    import {generateId} from '@/helpers';

    export default {
        name: 'EditNote',
        components: {Note, Btn},
        data() {
            return {
                note: {
                    title: '',
                    tasks: []
                }
            }
        },
        mounted() {
            this.$store.dispatch('init');
            this.note = this.$store.getters.getNotes.find(el => el.id == this.$route.params.id)
        },

        methods: {
            goHome() {
                this.$router.push('/')
            },
            saveNote() {
                this.$store.dispatch('saveNote', {
                    id: this.note.id,
                    tasks: this.note.tasks,
                    title: this.note.type === 'group' ? this.note.title : this.note.tasks[0].title,
                    complete:this.note.tasks.every(el=>el.state)
                });
                this.$router.push('/')
            },
            removeNote(removeTask) {
                this.$store.dispatch('setModal', {
                    modalOpen: true,
                    data: {
                        title: 'REMOVE THE TASK?',
                        content: 'Are you sure you want to delete the task?',
                        controls: ['CANCEL', 'REMOVE']
                    }
                })
                this.$store.dispatch('setNoteIdForRemove', removeTask)
            },
            addTask() {
                const id = generateId()
                this.note.tasks = [...this.note.tasks, {title: '', id: id, state: false}]
            },
            removeTask(removeTask) {
                this.note.tasks = this.note.tasks.filter(task => task.id != removeTask.id)
            },

            setNoteControl() {
                return this.note.type === 'group' ? ['REMOVE', 'ADD TASK', 'SAVE'] : ['REMOVE', 'SAVE']
            },

        }
    }
</script>

<style scoped>

</style>