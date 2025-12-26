<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import getMovies from "../service/getMovies";
import getSearchById from '../service/getSearchById';
import deleteMovie from '../service/deleteMovie';
import CardMovie from '../components/CardMovie.vue';
import ModalMovie from '../components/ModalMovie.vue';
import ModalEditMovie from '../components/ModalEditMovie.vue';
import ModalConfirmDelete from '../components/ModalDeleteMovie.vue';
import SearchBar from '../components/SearchBar.vue';

const films = ref<any[]>([]);
const loading = ref(true);
const selectedGenre = ref('Todos');
const sortBy = ref('default');

const isModalOpen = ref(false);
const isEditModalOpen = ref(false);
const isConfirmDeleteOpen = ref(false);

const selectedMovie = ref<any>(null);
const modalLoading = ref(false);
const isDeleting = ref(false);

const searchQuery = ref('');

const allGenres = computed(() => {
  const genres = new Set(['Todos']);
  films.value.forEach(movie => {
    if (movie.gender) {
      movie.gender.forEach((g: string) => genres.add(g));
    }
  });
  return Array.from(genres);
});

const filteredFilms = computed(() => {
  let list = [...films.value];

  if (searchQuery.value.trim() !== '') {
    const query = searchQuery.value.toLowerCase();
    list = list.filter(m =>
      m.name.toLowerCase().includes(query) ||
      m.director.toLowerCase().includes(query)
    );
  }

  if (selectedGenre.value !== 'Todos') {
    list = list.filter(m => m.gender?.includes(selectedGenre.value));
  }

  if (sortBy.value === 'high-rating') {
    list.sort((a, b) => b.notes - a.notes);
  } else if (sortBy.value === 'low-rating') {
    list.sort((a, b) => a.notes - b.notes);
  }

  return list;
});

const getFilms = async () => {
  try {
    loading.value = true;
    const data = await getMovies();
    films.value = data;
  } catch (error) {
    console.error("Falha ao carregar lista");
  } finally {
    loading.value = false;
  }
};

const openModal = async (id: string) => {
  try {
    isModalOpen.value = true;
    modalLoading.value = true;
    const data = await getSearchById(id);
    selectedMovie.value = data;
  } catch (error) {
    console.error("Erro ao buscar filme por ID");
    closeAllModals();
  } finally {
    modalLoading.value = false;
  }
};

const handleEdit = (movie: any) => {
  selectedMovie.value = movie;
  isEditModalOpen.value = true;
};

const confirmDeletion = async () => {
  if (!selectedMovie.value) return;
  try {
    isDeleting.value = true;
    const id = selectedMovie.value._id || selectedMovie.value.id;
    await deleteMovie(id);
    alert("Filme removido com sucesso!");
    closeAllModals();
    await getFilms();
  } catch (err) {
    alert("Erro ao excluir o filme.");
  } finally {
    isDeleting.value = false;
  }
};

const closeAllModals = () => {
  isModalOpen.value = false;
  isEditModalOpen.value = false;
  isConfirmDeleteOpen.value = false;
  selectedMovie.value = null;
};

onMounted(getFilms);
</script>

<template>
  <main class="main-container">

    <header class="controls-section">
      <div class="top-bar">
        <h2 class="row-title">Pesquisar</h2>
        <SearchBar v-model="searchQuery" />
      </div>
      <div class="filter-group">
        <button v-for="genre in allGenres" :key="genre" :class="{ active: selectedGenre === genre }"
          @click="selectedGenre = genre">
          {{ genre }}
        </button>
      </div>

      <div class="sort-group">
        <button :class="{ active: sortBy === 'high-rating' }" @click="sortBy = 'high-rating'">
          Mais Curtidos ⭐
        </button>
        <button :class="{ active: sortBy === 'low-rating' }" @click="sortBy = 'low-rating'">
          Menos Curtidos
        </button>
        <button v-if="sortBy !== 'default'" class="btn-reset" @click="sortBy = 'default'">
          ✖ Limpar Filtros
        </button>
      </div>
    </header>

    <section class="row">
      <h2 class="row-title">
        {{ selectedGenre === 'Todos' ? 'Todos os filmes' : selectedGenre }}
        <span class="count-tag" v-if="filteredFilms.length">({{ filteredFilms.length }})</span>
      </h2>

      <div class="carousel-container">
        <div v-if="loading" class="status-msg">Carregando catálogo...</div>

        <div v-else class="films-grid">
          <CardMovie v-for="movie in filteredFilms" :key="movie._id" :film="movie" @click="openModal(movie._id)"
            @edit="handleEdit" />

          <p v-if="filteredFilms.length === 0" class="status-msg">
            Nenhum filme encontrado para os filtros selecionados.
          </p>
        </div>
      </div>
    </section>

    <ModalMovie :isOpen="isModalOpen" :movie="selectedMovie" :loading="modalLoading" @close="closeAllModals" />

    <ModalEditMovie :isOpen="isEditModalOpen" :movie="selectedMovie" @close="closeAllModals" @updated="getFilms"
      @openDelete="isConfirmDeleteOpen = true" />

    <ModalConfirmDelete :isOpen="isConfirmDeleteOpen" :movieName="selectedMovie?.name || ''" :loading="isDeleting"
      @close="isConfirmDeleteOpen = false" @confirm="confirmDeletion" />
  </main>
</template>

<style scoped>
.main-container {
  padding: 1.5rem;
}

.top-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1rem;
}

.row-title {
  color: var(--netflix-white);
  font-size: 1.4rem;
  margin-bottom: 1rem;
}

.controls-section {
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.filter-group,
.sort-group {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.controls-section button {
  background: #2a2a2a;
  color: var(--netflix-white);
  border: 1px solid var(--netflix-grey);
  padding: 6px 16px;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.85rem;
  transition: 0.3s;
}

.controls-section button:hover {
  background: #3a3a3a;
}

.controls-section button.active {
  background: #e50914;
  border-color: #e50914;
  font-weight: bold;
}

.btn-reset {
  background: transparent !important;
  border: none !important;
  color: #888 !important;
}

.count-tag {
  font-size: 0.9rem;
  color: #666;
  margin-left: 10px;
}

.carousel-container {
  width: 100%;
  overflow-x: auto;
  overflow-y: hidden;
  padding: 10px 0 30px 0;
  scroll-behavior: smooth;
  scroll-snap-type: x mandatory;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;
}

.carousel-container::-webkit-scrollbar {
  display: none;
}

.films-grid {
  display: flex;
  gap: 12px;
  padding-left: 4%;
}

:deep(.film-card) {
  flex: 0 0 200px;
  scroll-snap-align: start;
}

.status-msg {
  color: #888;
  padding: 2rem;
  width: 100%;
  text-align: center;
}
</style>