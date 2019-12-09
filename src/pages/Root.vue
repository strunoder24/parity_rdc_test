<template>
	<div style='display: flex;'>
		<button @click="() => {this.$store.commit('minus1')}">-</button>
		<div>{{ value }}</div>
		<button @click="() => {this.$store.commit('plus1')}">+</button>

		<router-link :to="{name: 'fat'}">
			going fat
		</router-link>
	</div>
</template>

<script>
	import { mapState } from 'vuex'

    export default {
        computed: {
            ...mapState({
	            value: state => state.testCounter.value
            })
        }
    }
</script>