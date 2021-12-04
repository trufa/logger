<script>
  import { onMount } from 'svelte';
  import localforage from 'localforage';
  let entries = []
  let downloader;
  let restoreContentJSON = ""
  onMount(async () => {
    await localforage.iterate((x) => {
      console.log("adding", x);
      entries.push(x);
    })
    entries = entries
  })
  const createAndDownload = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(entries));
    const dlAnchorElem = downloader;
    dlAnchorElem.setAttribute("href", dataStr);
    dlAnchorElem.setAttribute("download", "backup.json");
  }

  const restoreContent = () => {
    for(const entry of JSON.parse(restoreContentJSON)) {
      console.log("here");
      localforage.setItem(entry.id, entry);
    }
  }
</script>
<main>
    <h1>
        Backup
    </h1>
    <a href="{'#'}" on:click={createAndDownload} bind:this={downloader}>Download</a>
    <h3>Restore from JSON</h3>
    <div class="red">Make sure to restore proper JSON or your data may be lost</div>
    <div>
        <textarea bind:value={restoreContentJSON} />
    </div>
    <button on:click={restoreContent}>Restore</button>
</main>
<style>
    .red {
        color:red;
    }
</style>