<template>
    <nav class="navbar navbar-expand-sm navbar-dark bg-dark" style="background-color: #e3f2fd;">
  <a class="navbar-brand" href="#">MONSTER SLAYER</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/home">Home</router-link>
      </li>
      <li class="nav-item">
        <router-link class="nav-link" to="/game-history">Game History</router-link>
      </li>
   
    </ul>
  </div>
</nav>
</template>

<script setup lang="ts">

</script>