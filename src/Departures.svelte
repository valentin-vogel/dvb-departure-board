<script>
  import Message from './Message.svelte'
  import { onMount } from 'svelte'
  import {
    parseDate,
    parseMode,
    parsePlatform,
    dateDifference,
  } from './helpers'
  export let id
  export let limit

  let data = {}

  const request = async () => {
    const now = new Date()
    const res = await fetch(
      `https://webapi.vvo-online.de/dm?format=json&stopid=${id}&time=${now.toISOString()}&isarrival=0&limit=${limit}&shorttermchanges=1&mentzonly=0`
    )
    const resJson = await res.json()

    let results = []
    results = resJson.Departures.map((d) => {
      const arrivalTime = parseDate(d.RealTime ? d.RealTime : d.ScheduledTime)
      const scheduledTime = parseDate(d.ScheduledTime)
      return {
        arrivalTime,
        scheduledTime,
        id: d.Id,
        line: d.LineName,
        direction: d.Direction,
        platform: parsePlatform(d.Platform),
        arrivalTimeRelative: dateDifference(now, arrivalTime),
        scheduledTimeRelative: dateDifference(now, scheduledTime),
        delayTime: dateDifference(scheduledTime, arrivalTime),
        state: d.State ? d.State : 'Unknown',
        mode: parseMode(d.Mot),
      }
    })

    data.name = resJson.Name
    data.departures = results
  }

  onMount(() => {
    request() // first request
    const interval = setInterval(request, 30000) // request every 30 seconds

    return () => {
      clearInterval(interval)
    }
  })
</script>

<div class="flex-1 w-1/2" data-id={`stop-${id}`}>
  {#if data && data.name}
    <div class="">
      <div class="py-8 px-2 relative flex items-center">
        <svg
          class="h-14 w-14 text-primary"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 40 40"
        >
          <g id="map-stop">
            <g>
              <path
                fill="currentColor"
                d="M20,40c11,0,20-9,20-20C40,9,31,0,20,0C9,0,0,9,0,20C0,31,9,40,20,40"
              />
              <path
                fill="#000000"
                d="M20,36c8.8,0,16-7.2,16-16c0-8.8-7.2-16-16-16C11.2,4,4,11.2,4,20C4,28.8,11.2,36,20,36"
              />
            </g>
            <polygon
              fill="currentColor"
              points="12.4,29 16.4,29 16.4,21.2 23.6,21.2 23.6,29 27.6,29 27.6,11 23.6,11 23.6,17.9 16.4,17.9 16.4,11,12.4,11 "
            />
          </g>
        </svg>
        <span class="ml-2 text-6xl">{data.name}</span>
      </div>

      <div class="flex flex-col w-full h-full whitespace-nowrap">
        <div class="flex flex-row h-12 text-xl font-bold">
          <div
            class="w-16 flex-shrink-0 flex-grow-0 p-2 bg-black border-2 border-black align-middle text-left"
          />
          <div
            class="w-24 flex-shrink-0 flex-grow-0 p-2 bg-black border-2 border-black align-middle text-left"
          >
            Linie
          </div>
          <div
            class="flex-grow p-2 bg-black border-2 border-black align-middle text-left"
          >
            Richtung
          </div>
          <div
            class="w-24 flex-shrink-0 flex-grow-0 p-2 bg-black border-2 border-black align-middle text-right"
          >
            in Min
          </div>
        </div>
        {#each data.departures as { id, line, direction, arrivalTimeRelative, mode }}
          <div
            class="flex flex-row h-16 text-4xl text-primary-light"
            data-id={id}
          >
            <div
              class="w-16 flex-shrink-0 flex-grow-0 p-2 bg-secondary border-2 border-black align-middle text-left"
            >
              <img class="h-full w-full" src={mode.iconUrl} alt={mode.name} />
            </div>
            <div
              class="w-24 flex-shrink-0 flex-grow-0 p-2 bg-secondary border-2 border-black align-middle text-left"
            >
              {line}
            </div>
            <div
              class="flex-grow p-2 bg-secondary border-2 border-black align-middle text-left overflow-hidden overflow-ellipsis"
            >
              {direction}
            </div>
            <div
              class="w-24 flex-shrink-0 flex-grow-0 p-2 bg-secondary border-2 border-black align-middle text-right"
            >
              {arrivalTimeRelative}
            </div>
          </div>
        {:else}
          <div class="table-row">
            <div class="table-cell">No departures available</div>
          </div>
        {/each}
      </div>
    </div>
  {:else}
    <Message
      title="Etwas ist schief gelaufen!"
      text="Die angeforderte Haltestelle {id} existiert nicht."
    />
  {/if}
</div>
