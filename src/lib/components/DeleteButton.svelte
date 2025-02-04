<script>
    import { createEventDispatcher } from 'svelte';
    const dispatch = createEventDispatcher();
</script>

<button on:click={() => dispatch('click')}>
    delete card
</button>

<style>
    button {

  --bg: #c4191f;
  --text-color: #fff;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  width: 150px;
  border: none;
  background: var(--bg);
  color: var(--text-color);
  padding: 1em;
  /* text-transform: uppercase; */
  transition: 0.2s;
  border-radius: 5px;
  opacity: 0.8;
  letter-spacing: 1px;
  box-shadow: #c0392b 0px 7px 2px, #000 0px 8px 5px;
}
button:hover {
  opacity: 1;
}

button:active {
  top: 4px;
  box-shadow: #c0392b 0px 3px 2px,#000 0px 3px 5px;
}
</style>