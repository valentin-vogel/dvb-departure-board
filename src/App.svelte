<script>
  import Tailwind from './Tailwind.svelte'
  import Departures from './Departures.svelte'

  let error = undefined
  let stops = undefined

  try {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    const stopString = urlParams.get('stops')
    stops = stopString.split(',')
  } catch (e) {
    console.log(e)
  }
</script>

<Tailwind />

<div class="bg-black text-white h-screen overflow-hidden">
  {#if stops && !error}
    <div class="flex flex-row">
      {#each stops as id}
        <Departures {id} />
      {/each}
    </div>
  {:else}
    <div class="">
      <p>Error</p>
    </div>
  {/if}
</div>
