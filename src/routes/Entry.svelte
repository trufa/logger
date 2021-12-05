<script>
  import localforage from "localforage";
  import { onDestroy, onMount } from "svelte";
  import { DateTime } from "luxon";
  import Easymde from "easymde";
  import Switch from "../components/Switch.svelte";
  export let id;
  let easyMDE;
  let title;
  let history = [];
  let checked;
  onDestroy(() => {
    easyMDE.toTextArea();
    easyMDE = null;
  });
  const togglePreview = () => {
    easyMDE.togglePreview();
  };
  $: checked, easyMDE && togglePreview();
  onMount(async () => {
    const data = await localforage.getItem(id);
    debugger
    title = data.title;
    easyMDE = new Easymde({
      autoDownloadFontAwesome: false,
      hideIcons: ["preview"],
    });
    easyMDE.value(data.content);
    togglePreview();
    console.log(data.history);
    history = data.history ?? []
  });
  const handleSave = async () => {
    const item = await localforage.getItem(id)
    const historic = {
      id: item.id,
      title: item.title,
      content: item.content,
      date: item.date,
    }
    const h = item.history ? item.history.concat(historic) : [historic]
    await localforage.setItem(id, {
      id: id,
      title,
      content: easyMDE.value(),
      date: Date.now(),
      history: h,
    });
    history = h;
  };
  const loadHistory = (entry) => {
    easyMDE.value(entry.content);
  }
</script>

<h1 class="red">{title}</h1>

<textarea />
<div>
  <Switch bind:checked />
</div>
{#if checked}
  <button on:click={handleSave} class="save-button">Save</button>
{/if}
<h3>Historic:</h3>
{#each history as entry}
  <div>
    {DateTime.fromMillis(entry.date).toLocaleString(
          DateTime.DATETIME_FULL
    )} <button on:click={() => loadHistory(entry)}>Load</button>
  </div>
{/each}
{#if !checked}
  <style>
    .editor-toolbar {
      display: none;
    }
  </style>
{/if}

<style>
  .save-button {
    margin-top: 10px;
  }
</style>
