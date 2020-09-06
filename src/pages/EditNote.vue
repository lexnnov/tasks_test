<template>
    <div class="container">

        <btn :onClick="goHome" title="BACK TO NOTES"/>

        <note
                :note="note"
                :readonly="false"
                :controls="setWrapControl()"
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
                },
                noteCopies: [{
                    title: '',
                    tasks: []
                }, {
                    title: '',
                    tasks: []
                }],

            }
        },
        mounted() {
            this.$store.dispatch('init');
            this.note = this.$store.getters.getNotes.find(el => el.id == this.$route.params.id)
            this.noteCopies[0] = {...this.note}
        },

        methods: {
            goHome() {
                this.$store.dispatch('setModal', {
                    modalOpen: true, data: {
                        title: 'BACK TO HOME?',
                        content: 'Changes will not be saved',
                        route: '/',
                        controls: ['CANCEL', 'OK']
                    }
                })
            },

            setWrapControl() {
                return this.note.type == 'group' ? ['REMOVE', 'ADD TASK', 'SAVE'] : ['REMOVE', 'SAVE']
            },

            saveNote() {
                this.$store.dispatch('saveNote', {id: this.note.id, tasks: this.note.tasks, title: this.note.title, complete:this.note.tasks.every(el=>el.state)});
                this.$store.dispatch('setCanUndo', false)
                this.$store.dispatch('setCanRedo', false)
                this.$router.push('/')
            },
            removeNote(removeTask) {
                this.$store.dispatch('setModal', {
                    modalOpen: true,
                    data: {
                        title: 'REMOVE THE NOTE?',
                        content: 'Are you sure you want to delete the note?',
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

        }
    }
</script>

<style scoped>

</style>