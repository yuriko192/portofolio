<script>
	import '../app.scss';
	import { ModeWatcher } from "mode-watcher";
	/** @type {{children?: import('svelte').Snippet}} */
	let { children } = $props();

</script>

<ModeWatcher />
{@render children?.()}

<style></style>
