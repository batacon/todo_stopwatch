<template>
  <Nuxt />
</template>

<style lang="postcss">
html,
body {
  height: 100%;
  min-width: 320px;
  font-size: 14px;

  @media (min-width: 768px) {
    font-size: 16px;
  }
}

ul {
  list-style: none;
  padding: 0;
}

button {
  background: transparent;
  border: none;
  color: #000;
  cursor: pointer;
  font-weight: bold;
  margin: 0;
  padding: 0;
}

input {
  margin: 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 3px;
  font-weight: bold;
}

input[type='checkbox'] {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
}
</style>
