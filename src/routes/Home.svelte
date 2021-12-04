<script>
  import { Link } from "svelte-routing";
  import localforage from "localforage";
  import { onMount } from "svelte";
  import { parse } from "marked";
  import Fuse from "fuse.js";
  import { DateTime } from "luxon";
  let openContent = null;
  let entries = [];
  let foundIds = [];
  let searchString = "";
  onMount(async () => {
    await localforage.iterate((x) => {
      console.log("adding", x);
      entries.push(x);
    });
    entries = entries;
    console.log(entries);
  });
  const handleShowHide = (i) => {
    console.log(i);
    openContent = openContent === i ? null : i;
  };
  const options = {
    includeScore: false,
    keys: ["title", "content"],
  };

  const search = (val) => {
    searchString = val;
    const fuse = new Fuse(entries, options);
    foundIds = fuse.search(val).map((fr) => fr.item.id);
    console.log(foundIds);
  };
</script>

<Link to="add">Add +</Link>

<h1>Entries:</h1>
<input on:input={(e) => search(e.target.value)} placeholder="Find" />
{#if entries.length === 0}
  <div>No entries</div>
{:else}
  {#each entries as entry, i}
    {#if foundIds.includes(entry.id) || searchString === ""}
      <div class="entry">
        <div class="title-container">
          <Link to={`/entry/${entry.id}`}><h2>{entry.title}</h2></Link>
          <div>
            {DateTime.fromMillis(entry.date).toLocaleString(
              DateTime.DATETIME_FULL
            )}
          </div>
          <div on:click={() => handleShowHide(i)}>
            &nbsp;{openContent === i ? "▲" : "▼"}
          </div>
        </div>

        <div class:is-open={openContent === i} class="content">
          {@html parse(entry.content)}
        </div>
      </div>
    {/if}
  {/each}
{/if}

<style>
  .content {
    height: 400px;
    overflow: scroll;
    margin-bottom: 20px;
    display: none;
  }
  .is-open {
    display: block;
  }
  .title-container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .title-container > div {
    margin-left: 10px;
  }
</style>
