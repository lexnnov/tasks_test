<template>
    <div>
        <div class="tabs">
            <ul>
                <li v-for="(tab,index) in tabs" :key="index" :class="{ 'is-active': tab.isActive }">
                    <a href="javascript:void(0)" @click="selectTab(tab)">{{ tab.name }}</a>
                </li>
            </ul>
        </div>

        <div class="tabs-details">
            <slot></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'Tabs',

        data() {
            return {
                tabs: []
            }
        },
        created() {
            this.tabs = this.$children;
        },
        methods: {
            selectTab(selectedTab) {
                this.tabs.forEach(tab => {
                    tab.isActive = (tab.name == selectedTab.name);
                });
            }
        }
    }
</script>

<style lang="scss">
    .tabs {

        user-select: none;

        align-items: stretch;

        display: flex;
        font-size: 1rem;

        justify-content: space-between;
        overflow: hidden;
        overflow-x: auto;
        white-space: nowrap;

        ul {
            list-style: none;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            border-bottom: 1px solid #dbdbdb;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-flex: 1;
            -ms-flex-positive: 1;
            flex-grow: 1;
            -ms-flex-negative: 0;
            flex-shrink: 0;
            -webkit-box-pack: start;
            -ms-flex-pack: start;
            justify-content: flex-start;
        }

         li.is-active a {
            border-bottom-color: #00d1b2;
            color: #00d1b2;
        }

        a {

            align-items: center;
            border-bottom: 1px solid #dbdbdb;
            color: #4a4a4a;
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            text-decoration: none;

            justify-content: center;
            margin-bottom: -1px;
            padding: .5em 1em;
            vertical-align: top;
        }
    }

</style>