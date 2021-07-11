<script>
  import Tailwind from './Tailwind.svelte'
  import Departures from './Departures.svelte'
  import Message from './Message.svelte'
  import Clock from './Clock.svelte'

  let error = undefined
  let stops = undefined
  let limit = undefined

  try {
    const queryString = window.location.search
    const urlParams = new URLSearchParams(queryString)
    let stopString = urlParams.get('stops')
    stopString = stopString || '33000037'
    stops = stopString.split(',')
    limit = urlParams.get('limit')
    limit = limit || 10
  } catch (e) {
    console.log(e)
  }
</script>

<Tailwind />

<div class="bg-black text-white h-screen w-screen overflow-hidden">
  <div class="grid grid-cols-frame grid-rows-frame h-full w-full">
    <div class="row-span-full col-start-1 col-end-2 bg-primary" />
    <div
      class="row-start-2 row-end-3 col-span-full bg-primary px-6 flex justify-start items-center"
    >
      <Clock />
    </div>
    <div
      class="col-start-2 col-end-3 row-start-1 row-end-2 overflow-hidden px-2 pb-2"
    >
      {#if stops && !error}
        <div
          class="bg-black flex flex-row h-full w-full space-x-2 overflow-hidden"
        >
          {#each stops as id}
            <Departures {id} {limit} />
          {/each}
        </div>
      {:else}
        <Message
          title="Etwas ist schief gelaufen!"
          text="Bitte prüfen Sie alle Parameter."
        />
      {/if}
    </div>
  </div>
</div>
