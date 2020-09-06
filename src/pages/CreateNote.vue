<template>
    <div class="container">

        <btn :onClick="goHome" title="BACK TO NOTES"/>
        <tabs>

            <tab name="TASK" :selected="true">
                <note
                    :note="task"
                    :readonly="false"
                    :controls="['CREATE']"
                    @createNote="createNote"
                />
            </tab>
            <tab name="GROUP OF TASKS">
                <note
                    :note="grouptask"
                    :readonly="false"
                    :controls="['ADD TASK', 'CREATE']"
                    @removeTask="removeTask"
                    @addTask="addTask"
                    @createNote="createNote"
                />
            </tab>
        </tabs>
    </div>

</template>

<script>
    import Btn from '@/components/Btn/Btn'
    import Note from '@/components/Note/Note'
    import {generateId} from '@/helpers'
    import Tabs from "../components/Tabs/Tabs";
    import Tab from "../components/Tabs/Tab/Tab";

    export default {
        name: 'CreateNote',
        components: {  Tab, Tabs, Note, Btn},
        data: function () {
            return {
                task: {
                    title: '',
                    tasks: [{id:generateId(), title:'', state: false}],
                    type:'task'
                },
                grouptask: {
                    title: '',
                    tasks: [{id:generateId(), title:'', state: false}],
                    type:'group'
                }

            }
        },
        methods: {
            createNote(type) {
                console.log(type)
                // Проверка на наличие title и хотя бы одной задачи
                // if (this.note.title && this.note.tasks.length) {
                    this.$store.dispatch('createNote', {
                        id: generateId(),
                        title: type == 'group' ? this.grouptask.title : this.task.tasks[0].title,
                        tasks: type == 'group' ? this.grouptask.tasks : this.task.tasks,
                        type: type,
                        complete: false
                    })
                    this.$router.push('/')
                // } else {
                //     this.$store.dispatch('setModal', {
                //         modalOpen: true,
                //         data: {
                //             title: 'All fields must be filled',
                //             content: 'To create a note, you need to fill in the title and add a task',
                //             route: '',
                //             controls: ['OK']
                //         }
                //     })
                // }
            },
            addTask() {
                this.grouptask.tasks = [...this.grouptask.tasks, {title: '', id: generateId(), state: false}]
            },
            removeTask(removeTask) {
                this.grouptask.tasks = this.grouptask.tasks.filter(task => task.id !== removeTask.id)
                this.$store.dispatch('setNoteIdForRemove', removeTask.id)
            },
            goHome() {
                this.$router.push('/')
            }
        }
    }
</script>

<style scoped>

</style>