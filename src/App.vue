<template>
	<Layout>
		<Preloader v-if='onLoad' />
		<router-view v-else />
	</Layout>
</template>

<script>
    import Layout from '~/layouts/default.vue'
    import Preloader from '~c/ScriptPreloader.vue'

    import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
	            onLoad: state => state.loader.loadInProgress
            })
        },

        components: {
            Layout,
            Preloader
        }
    }
</script>