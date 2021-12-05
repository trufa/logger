<script>
  import localforage from "localforage";
  import { onDestroy, onMount } from "svelte";
  import Easymde from "easymde";
  import Switch from "../components/Switch.svelte";
  import { easyMDEInstance } from "../stores";
  export let id;
  let easyMDE;
  let title;
  let checked;
  onDestroy(() => {
    easyMDE.toTextArea();
    easyMDE = null;
  });
  easyMDEInstance.subscribe((value) => {
    console.log(value);
  });
  const togglePreview = () => {
    easyMDE.togglePreview();
  };
  $: checked, easyMDE && togglePreview();
  onMount(async () => {
    const data = await localforage.getItem(id);
    title = data.title;
    easyMDE = new Easymde({
      autoDownloadFontAwesome: false,
      hideIcons: ["preview"],
    });
    easyMDE.value(data.content);
    togglePreview();
  });
  const handleSave = async () => {
    console.log("saving", id);
    await localforage.setItem(id, {
      title,
      content: easyMDE.value(),
    });
  };
</script>

<h1 class="red">{title}</h1>

<textarea />
<div>
  <Switch bind:checked />
</div>
{#if checked}
  <button on:click={handleSave} class="save-button">Save</button>
{/if}
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
