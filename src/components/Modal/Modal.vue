<template>
    <transition name="fade">
        <div class="modal" v-if="modalData.modalOpen">
            <div class="modal-wrapper">
                <div class="modal-header">
                    <p>
                        {{modalData.data.title}}
                    </p>
                </div>
                <div class="modal-content">
                    {{modalData.data.content}}
                </div>
                <div class="modal-footer">
                    <btn
                        v-for="control in modalData.data.controls"
                        :key="control"
                        :title="control"
                        :onClick="
                            control == 'CANCEL' ? cancel :
                            control == 'REMOVE' ? remove : ok "
                    />

                </div>
            </div>
        </div>
    </transition>
</template>

<script>
	import Btn from '@/components/Btn/Btn';

	export default {

		name: 'Dialog',
		components: { Btn },

		computed: {
			modalData() {
				return this.$store.getters.getModal
			}
		},
		methods: {
			cancel() {
				this.$emit('closeModal')
			},
			ok() {
				if (this.modalData.data.route)
					this.$router.push(this.modalData.data.route)

				this.$emit('closeModal')
			},
			remove() {
				this.$emit('remove')
			}
		}
	}
</script>

<style lang="scss" scoped>

    .modal {
        width: 100%;
        height: 100%;
        background-color: #0000008c;
        display: flex;
        align-items: center;
        justify-content: center;
        position: fixed;
        top: 0;
        left: 0;
        z-index: 1;

        &-wrapper {
            background-color: #ffffff;
            width: 500px;
            display: flex;
            flex-direction: column;
        }

        &-header {
            height: 50px;
            background-color: #009688;
            flex: 0 0 auto;
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
        }

        &-footer {
            flex: 0 0 auto;
            border-top: 1px solid #DBDBDB;
            display: flex;
            justify-content: flex-end;
            color: #009688;
        }

    }


</style>