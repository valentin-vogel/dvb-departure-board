<script>
  import { onMount } from 'svelte'

  let date = undefined
  const newDate = async () => {
    const d = new Date()
    date = new Intl.DateTimeFormat('de', {
      hour: 'numeric',
      minute: 'numeric',
    }).format(d)
  }

  onMount(() => {
    newDate()
    const interval = setInterval(newDate, 5000) // every 5 seconds

    return () => {
      clearInterval(interval)
    }
  })
</script>

<span class="text-4xl text-black">
  {date}
</span>
