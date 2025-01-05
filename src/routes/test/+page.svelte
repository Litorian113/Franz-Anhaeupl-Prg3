<script>
    import Memoriecard from '$lib/components/Memoriecard.svelte';

const sampleAnimal = {
  id: 1,
  name_german: 'Elefant',
  max_weight: 6000,
  max_age: 70,
  top_speed: 25,
  max_length: 400,
  deaths: 2,
  intelligence: 9,
  group: 'A'
};
  </script>
  
  <main>
    <h1>Memorie Card Test</h1>
    <div class="grid">
        <Memoriecard animal={sampleAnimal}></Memoriecard>
    </div>
  </main>
  
  <style>
    .grid {
      display: flex;
      justify-content: center;
      margin-top: 20px;
    }
  </style>
  