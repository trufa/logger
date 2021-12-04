<script lang="ts">
	import { Router, Link, Route } from "svelte-routing";
	import Home from "./routes/Home.svelte";
	import Add from "./routes/Add.svelte";
	import Entry from "./routes/Entry.svelte";
	import Backup from './routes/Backup.svelte';
	export let url = "";

</script>
<Router url="{url}">
	<nav>
		<Link noroute><h1>Logger</h1></Link>
		<Link to="backup">Backup</Link>
	</nav>
	<div>
		<Route path="add" component="{Add}" />
		<Route path="entry/:id" let:params>
			<Entry id="{params.id}" />
		</Route>
		<Route path="backup" component="{Backup}" />
		<Route path="/" component="{Home}" />
	</div>
</Router>

<style>
	nav {
		display: flex;
        justify-content: space-between;
		align-items: center;
	}
</style>