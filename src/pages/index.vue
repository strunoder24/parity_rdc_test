<template>
	<div class='container'>
		<h1 class='title'>
			Три взаимодействующих контролла
		</h1>
		<Control :title="'Контролл 1'"
		         :type="'first'"
		/>
		<Control :title="'Контролл 2'"
		         :type="'second'"
		/>
		<Control :title="'Контролл 3'"
		         :type="'third'"
		/>
	</div>
</template>

<script>
	import { mapState } from 'vuex'
	import Control from '~c/Control.vue'

    export default {
        computed: {
            ...mapState({
	            // value: state => state.testCounter.value
            })
        },

	    components: {
		    Control
	    }
    }
</script>

<style lang='sass' scoped>
	.container
		width: 340px


	.title
		margin-bottom: 50px
		font-weight: normal
		text-align: center
		margin-top: 0
</style>