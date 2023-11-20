<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container">
      <router-link to="/" class="navbar-brand">Recomendador de Jogadores</router-link>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <router-link to="/players" class="nav-link">Jogadores</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/" class="nav-link">Minha Lista</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/players" class="nav-link">Logout</router-link>
          </li>
          <!-- Adicione mais itens de menu conforme necessário -->
        </ul>
      </div>
    </div>
  </nav>
</template>