<template>
	<div>
		hey
	</div>
</template>

<script>
    import fill from 'lodash/fill'

    export default {
        computed: {
            array(){
                return fill([1, 2, 3], 'x ')
            }
        }
    }
</script>