<template>
	<div>
		Loading...
	</div>
</template>

<script>
	import { mapState } from 'vuex'

	export default {
	    computed: {
	        ...mapState({
		        showIcon: state => state.loader.showPreloaderIcon
	        })
	    }
	}
</script>