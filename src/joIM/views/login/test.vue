<template>
<div>
	{{opts |json}}
	{{opts.field | opts.filter.call(null)}}
</div>
</template>
<script>

	export default {
		props:['opts'],
		ready(){
			console.log(this)
		}
	}
</script>