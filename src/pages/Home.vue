<template>
    <div class="container">

        <btn :onClick="addNote" title="ADD TASK"/>
        <btn :onClick="setCompletenessFilter" :title="setFilterBtnTitle()"/>

        <my-input :value.sync="search"/>

        <div class="notes" v-if="notes.length">
            <div  v-for="note in notes" :key="note.id">
                <note
                    :note="note"
                    :readonly="true"
                    :view="false"
                    :controls="['REMOVE', 'VIEW', 'EDIT']"
                    @removeNote="removeNote"
                    @editNote="editNote"
                    @viewNote="viewNote"
                    @movedTask="movedTask"
                />
            </div>
        </div>

        <div v-else>NO NOTES</div>
    </div>
</template>

<script>
    import Note from '@/components/Note/Note'
    import Btn from '@/components/Btn/Btn'
    import MyInput from "../components/MyInput/MyInput";

    export default {
        name: 'Home',
        components: { MyInput, Btn, Note, },
        data() {
            return {
                search: '',
                complete: '',
                completeCounter: 0
            }
        },

        mounted() {
            this.$store.dispatch('init');
        },
        computed: {
            notes() {
                return this.$store.getters.getNotes.filter(el=> {
                    return el.title.toLowerCase().indexOf(this.search.toLowerCase()) + 1
                }).filter(el=> {
                    if(this.completeCounter == 0)
                        return el
                    else
                        return el.complete == this.complete
                })
            }
        },
        methods: {

            editNote(note) {
                this.$router.push({name: 'edit', path: `edit/${note.id}`, params: note});
            },
            viewNote(note) {
                this.$router.push({name: 'view', path: `view/${note.id}`, params: note});
            },
            addNote() {
                this.$router.push('/create')
            },
            removeNote(removeTask) {
                this.$store.dispatch('setNoteIdForRemove', removeTask)
                this.$store.dispatch('setModal', {
                    modalOpen: true,
                    data: {
                        title: 'REMOVE THE TASK?',
                        content: 'Are you sure you want to delete the task?',
                        controls: ['CANCEL', 'REMOVE']
                    }
                })
            },
            movedTask() {
                this.$store.dispatch('moveNote', this.notes)
            },

            setFilterBtnTitle() {
                return this.completeCounter == 1 ? 'COMPLETED' : this.completeCounter == 2 ? 'UNCOMPLETED' : 'ALL'
            },
            setCompletenessFilter() {
                this.complete = !this.complete
                this.completeCounter ++
                if(this.completeCounter == 3) {
                    this.completeCounter = 0
                }
            },
        }
    }
</script>

<style lang="scss">

    .note, .myInput {
        margin-bottom: 20px;
    }

</style>