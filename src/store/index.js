import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		notes: [],
		modal: {
			data: {
				title: '',
				content: '',
				controls: [],
				route: '',
			},
			modalOpen: false
		},
		noteIdForRemove: ''
	},
	mutations: {

		'SET_NOTES'(state, value) {
			state.notes = value
			localStorage.setItem('notes', JSON.stringify(value))
		},
		'CREATE_NOTE'(state, payload) {
			if (localStorage.getItem('notes'))
				localStorage.setItem('notes', JSON.stringify([ ...JSON.parse(localStorage.notes), {
					id: payload.id,
					title: payload.title,
					tasks: payload.tasks,
					type: payload.type,
					complete: payload.complete
				} ]))
			else
				localStorage.setItem('notes', JSON.stringify([ {
					id: payload.id,
					title: payload.title,
					tasks: payload.tasks,
					type: payload.type,
					complete: payload.complete
				} ]))
		},
		'REMOVE_NOTE'(state, payload) {
			state.notes = state.notes.filter(note => note.id != payload)
			localStorage.setItem('notes', JSON.stringify(state.notes))
			state.noteIdForRemove = ''
		},
		'MOVE_NOTE'(state, value) {
			state.notes = value
			localStorage.setItem('notes', JSON.stringify(state.notes))
		},
		'SET_MODAL'(state, value) {
			state.modal = value
		},
		'SET_REMOVE_ID'(state, value) {
			state.noteIdForRemove = value
		},
		'SAVE_NOTE'(state, payload) {
			state.notes = state.notes.map(note => {
				if (note.id == payload.id) {
					return { ...note, tasks: payload.tasks, title: payload.title, complete: payload.complete }
				} else return note
			})
			localStorage.setItem('notes', JSON.stringify(state.notes))
		}
	},

	actions: {

		init(store) {
			store.commit('SET_NOTES', JSON.parse(localStorage.getItem('notes') || ''))
		},
		createNote(store, payload) {
			store.commit('CREATE_NOTE', payload)
		},
		removeNote(store, payload) {
			store.commit('REMOVE_NOTE', payload)
		},
		saveNote(store, payload) {
			store.commit('SAVE_NOTE', payload)
		},
		moveNote(store, payload) {
			store.commit('MOVE_NOTE', payload)
		},
		setModal(store, payload) {
			store.commit('SET_MODAL', payload)
		},
		setNoteIdForRemove(store, payload) {
			store.commit('SET_REMOVE_ID', payload)
		}

	},
	getters: {

		getNotes: state => {
			return state.notes
		},
		getModal: state => {
			return state.modal
		},
		getNoteIdForRemove: state => {
			return state.noteIdForRemove
		}

	}
})