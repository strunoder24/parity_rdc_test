<template>
	<div class='default-layout'>
		<h4 class='sign'>Выполнил: Кондик Виктор</h4>
		<slot></slot>
	</div>
</template>

<script>
    export default {

    }
</script>

<style lang='sass' scoped>
	.default-layout
		display: flex
		align-items: center
		justify-content: center
		width: 100%
		height: 100%

	.sign
		position: absolute
		top: 10px
		left: 50px
</style>