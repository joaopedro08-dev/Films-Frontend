<script setup lang="ts">
defineProps<{
    film: {
        _id: string;
        name: string;
        img: string;
        year: number;
        notes: number;
        gender: string[];
        director: string;
    }
}>();
</script>

<template>
    <div class="film-card">
        <button class="btn-edit-floating" @click.stop="$emit('edit', film)">
            <i class="fa-solid fa-pen"></i>
        </button>

        <img :src="film.img" :alt="film.name" />

        <div class="card-info">
            <h3 class="film-name">{{ film.name }}</h3>

            <div class="film-details">
                <span class="film-year">{{ film.year }}</span>
                <span class="film-notes">⭐ {{ film.notes }}/10</span>
            </div>

            <p class="film-genres">
                {{ film.gender.join(' • ') }}
            </p>

            <p class="film-director">Dir: {{ film.director }}</p>
        </div>
    </div>
</template>

<style scoped>
.film-card {
    position: relative;
    border-radius: 4px;
    overflow: hidden;
    cursor: pointer;
    transition: transform var(--transition-fast);
    background-color: var(--netflix-dark-grey);
    flex: 0 0 200px;
    scroll-snap-align: start;
}

.btn-edit-floating {
    position: absolute;
    top: 10px;
    right: 10px;
    z-index: 20;
    background-color: var(--netflix-black);
    color: var(--netflix-white);
    border: none;
    width: 35px;
    height: 35px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: all 0.3s ease;
}

.film-card:hover .btn-edit-floating {
    opacity: 1;
}

.btn-edit-floating:hover {
    background-color: var(--netflix-red);
    transform: scale(1.1);
}

.btn-edit-floating i {
    font-size: 0.9rem;
}

.film-card:hover {
    transform: scale(1.05);
    z-index: 10;
}

.film-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
}

.film-notes {
    color: var(--netflix-green);
    font-weight: bold;
    font-size: 0.85rem;
}

.film-genres {
    font-size: 0.75rem;
    color: var(--netflix-light-grey);
    margin-top: 8px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.film-director {
    font-size: 0.7rem;
    color: var(--netflix-light-grey);
    font-style: italic;
}

.film-card img {
    width: 100%;
    aspect-ratio: 2/3;
    object-fit: cover;
    display: block;
}

.card-info {
    padding: 10px;
    background: linear-gradient(to top, var(--netflix-grey), transparent);
}

.film-name {
    font-size: 0.9rem;
    color: var(--netflix-white);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

.film-year {
    font-size: 0.8rem;
    color: var(--netflix-light-grey);
}
</style>