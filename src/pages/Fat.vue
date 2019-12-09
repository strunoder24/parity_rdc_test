<template>
	<div>
		{{ array }}
		{{ second }}
	</div>
</template>

<script>
	import fill from 'lodash/fill'
	import clone from 'lodash/cloneDeep'

    export default {
	    computed: {
	        array(){
	            return fill([1, 2, 3], 'x ')
	        },

		    second(){
	            return clone({ass: 'eaten'})
		    }
	    }
    }
</script>