<template>
  <ConnectLayoutAuth>
    <ConnectLayoutSidebar :items="getBaseSidebarItems()">
      <div class="flex-1 w-full">
        <slot />
      </div>
    </ConnectLayoutSidebar>
  </ConnectLayoutAuth>
</template>
