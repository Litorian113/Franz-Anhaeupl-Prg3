<script>
  import Card from '$lib/components/Card.svelte';
  import { onMount } from 'svelte';

  let animals = [];

  // Karten aus MongoDB abrufen
  async function fetchCards() {
      try {
          const response = await fetch('/api/cards');
          const data = await response.json();
          animals = data;
      } catch (error) {
          console.error('Fehler beim Laden der Karten:', error);
      }
  }

  // Abruf der Karten beim Mounten der Seite
  onMount(() => {
      fetchCards();
  });
</script>

<div class="card-grid">
  {#each animals as animal (animal._id)}
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
