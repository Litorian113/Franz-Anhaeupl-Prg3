<script>
    import Card from '$lib/components/Card.svelte';
    import { data as animals } from '../../data/animalData.js';
  </script>
  
  <div class="card-grid">
    {#each animals as animal}
      <Card animal={animal} />
    {/each}
  </div>
  
  <style>
    .card-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
      justify-items: center;
    }
  </style>
  