<template>
    <div id="app">

        <Modal @remove="confirmRemove" @closeModal="closeModal"/>

        <transition name="fade" mode="out-in">
            <router-view :key="$route.fullPath"></router-view>
        </transition>
    </div>
</template>

<script>

	import Modal from '@/components/Modal/Modal';

	export default {
		name: 'App',
		components: { Modal },
		computed: {
			removeId() {
				return this.$store.getters.getNoteIdForRemove
            }
        },
		methods: {
			closeModal() {
				this.$store.dispatch('setModal', {modalOpen: false})
			},
			confirmRemove() {
				this.$store.dispatch('removeNote', this.removeId)
				this.$store.dispatch('setModal', {modalOpen: false})
				this.$router.push('/')
			}
		}
	}
</script>

<style lang="scss">
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 300ms
    }

    .fade-enter,
    .fade-leave-to {
        opacity: 0
    }

    .trgroup-move {
        transition: all 10s;
    }

    .trgroup-leave-to {
        transform: translateX(-700px);
        opacity: 0;
    }

    .trgroup-leave-active {
        position: relative;
    }

    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        margin-top: 60px;
    }

    .container {
        width: 80%;
        max-width: 640px;
        margin: 0 auto;

        & > button {
            background-color: #009688;
            margin-bottom: 20px;
            margin-right: 20px;
            color: white;

            &:hover {
                background-color: #05c7b5;
            }
        }
    }
</style>
