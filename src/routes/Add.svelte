<script>
  import Easymde from "easymde"
  import { onDestroy, onMount } from 'svelte';
  import localforage from "localforage"
  import { v4 as uuidv4 } from 'uuid';
  import { navigate } from 'svelte-routing';
  let title;
  let easyMDE;
  onDestroy(() => {
    easyMDE.toTextArea();
    easyMDE = null;
  });
  onMount(async () => {
    easyMDE = new Easymde();
  });
  const handleSave = async () => {
    const id = uuidv4();
    await localforage.setItem(id, {
      id: id,
      title,
      content: easyMDE.value(),
      date: Date.now(),
    })
    navigate(`/entry/${id}`)
  }
</script>
<main>
    <h1>
        Add log
    </h1>

    <input placeholder="Title" bind:value={title}/>
    <textarea />
    <button on:click={handleSave}>Save</button>
</main>
