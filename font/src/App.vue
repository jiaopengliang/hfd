<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style>
html,
body {
  height: 100%;
}
body {
  margin: 0;
}
#app {
  height: 100%;
  font-family: "Microsoft YaHei", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
*.unselectable {
   -moz-user-select: -moz-none;
   -khtml-user-select: none;
   -webkit-user-select: none;
   -ms-user-select: none;
   user-select: none;
}

/**pace-theme-minimal.css:start**/
.pace {
  -webkit-pointer-events: none;
  pointer-events: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  user-select: none;
}

.pace-inactive {
  display: none;
}

.pace .pace-progress {
  background: #eb7a55;
  position: fixed;
  z-index: 2000;
  top: 0;
  right: 100%;
  width: 100%;
  height: 2px;
}
/**pace-theme-minimal.css:end**/
</style>
