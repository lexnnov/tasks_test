<template>
    <div class="container">

        <btn :onClick="goHome" title="BACK TO TASKS"/>

        <note
            :note="note"
            :controls="['REMOVE']"
            :readonly="true"
            :view="true"
            @removeNote="removeNote"
        />
    </div>

</template>

<script>
	import Btn from '@/components/Btn/Btn';
	import Note from '@/components/Note/Note';

	export default {
		name: 'ViewNote',
		components: { Note, Btn },
		data() {
			return {
				note: {
					title: '',
					tasks: [],
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
			removeNote(removeTask) {
				this.$store.dispatch('setModal', {
					modalOpen: true,
					data: {
						title: 'REMOVE THE TASK?',
						content: 'Are you sure you want to delete the task?',
						controls: [ 'CANCEL', 'REMOVE' ]
					}
				})
				this.$store.dispatch('setNoteIdForRemove', removeTask)
			}
		}
	}
</script>

<style scoped>

</style>