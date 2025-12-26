<script setup lang="ts">
const year: number = new Date().getFullYear();
</script>

<template>
    <footer class="footer">
        <p class="paragraph">
            &copy; {{ year }} <strong>Catálogo de Filmes</strong>. Todos os direitos reservados.
        </p>
        <p class="paragraph">
            Desenvolvido por
            <span class="color-bold"> João Pedro Dala Dea Mello</span>
        </p>
        <div class="paragraph">
            <a href="https://github.com/joaopedro08-dev" target="blank" className="color-bold icon"><i
                    className="fa-brands fa-github"></i></a>
        </div>
    </footer>
</template>

<style scoped>
.footer {
    text-align: center;
    padding: 1.5rem;
    background-color: var(--netflix-black);
    color: var(--netflix-light-grey); 
    border-top: 1px solid var(--netflix-grey);
    font-size: 0.9rem;
}

.color-bold {
    color: var(--netflix-white);
    font-weight: 600;
}

.icon {
    font-size: 1.5rem;
    color: var(--netflix-white);
    margin-top: 10px;
    display: inline-block;
}

.icon:hover {
    color: var(--netflix-red);
}
</style>