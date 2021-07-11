<script>
  export let title
  export let text
</script>

<div
  class="w-full h-full flex flex-col justify-center items-center p-8 text-center"
>
  <div class="max-w-md">
    <h1 class="text-4xl">{title}</h1>
    <p class="text-xl mt-8">
      {text}
    </p>
  </div>
</div>
