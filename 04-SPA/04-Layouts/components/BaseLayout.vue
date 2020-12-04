<template>
  <div class="wrap">
    <header>
      <slot name="header" />
    </header>

    <main>
      <slot />
    </main>

    <footer>
      <slot name="footer" />
    </footer>
  </div>
</template>

<script>
export default {
  name: 'BaseLayout',
};
</script>

<style scoped>
.wrap {
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
  justify-content: space-between;
}
main {
  height: 100%;
}
</style>
