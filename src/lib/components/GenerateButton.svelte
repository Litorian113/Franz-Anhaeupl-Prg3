<script>
    import { createEventDispatcher } from 'svelte';

    const dispatch = createEventDispatcher();
</script>

<button class="btn" id="generate" on:click={() => dispatch('click')}>
    <svg height="24" width="24" fill="#FFFFFF" viewBox="0 0 24 24" data-name="Layer 1" id="Layer_1" class="sparkle">
        <path d="M10,21.236,6.755,14.745.264,11.5,6.755,8.255,10,1.764l3.245,6.491L19.736,11.5l-6.491,3.245ZM18,21l1.5,3L21,21l3-1.5L21,18l-1.5-3L18,18l-3,1.5ZM19.333,4.667,20.5,7l1.167-2.333L24,3.5,21.667,2.333,20.5,0,19.333,2.333,17,3.5Z"></path>
    </svg>

    <span class="text">Generate</span>
</button>

<style>
    /* From Uiverse.io by AlimurtuzaCodes */ 
.btn {
  border: none;
  width: 15em;
  height: 4em;
  border-radius: 3em;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  background: #c4191f;
  cursor: pointer;
  transition: all 450ms ease-in-out;
}

.sparkle {
  fill: #f5f5f0;
  transition: all 800ms ease;
}

.text {
  font-weight: 600;
  color: #f5f5f0;
  font-size: medium;
}

.btn:hover {
  background: linear-gradient(0deg,#E23626,#c4191f);
  box-shadow: inset 0px 1px 0px 0px rgba(255, 255, 255, 0.4),
  inset 0px -4px 0px 0px rgba(0, 0, 0, 0.2),
  0px 0px 0px 4px rgba(255, 255, 255, 0.2),
  0px 0px 180px 0px #c4191f;
  transform: translateY(-2px);
}
/* c4191f */
.btn:hover .text {
  color: #f5f5f0;
}

.btn:hover .sparkle {
  fill: #f5f5f0;
  transform: scale(1.2);
} 
</style>