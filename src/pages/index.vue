<template>
	<div class='container'>
		<h1 class='title'>
			Три взаимодействующих контролла
		</h1>
		<Control :title="'Контролл 1'"
		         :helperFunction="'summaryHelper'"
		         :helperFunctionName="'Сумма'"
		         :type="'first'"
		/>
		<Control :title="'Контролл 2'"
		         :helperFunction="'constantHelper'"
		         :helperFunctionName="'Константа'"
		         :type="'second'"
		/>
		<Control :title="'Контролл 3'"
		         :type="'third'"
		/>
	</div>
</template>

<script>
	import Control from '~c/Control'

    export default {
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