<template>
    <div class="bottom-tab">
        <slot></slot>
    </div>
</template>
<script>
export default {
    name: 'TabBar'
}
</script>
<style scoped>
.bottom-tab{
    height: 49px;
    background-color:#f6f6f6;
    box-shadow:0 -3px 2px rgba(0,0,0,.08);
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
}
</style>