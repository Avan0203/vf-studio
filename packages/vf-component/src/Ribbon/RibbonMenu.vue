<template>
    <nav class="ribbon-menu">
        <div class="ribbon-header">
            <div class="ribbon-header-wrap">
                <div v-for="({ label, name }) in labelOptions" :key="name" @click="() => tabClick(name)"
                    class="ribbon-tab-item" :class="{
                        'ribbon-tab-item-active': name === currentName
                    }">
                    {{ label }}
                </div>
            </div>
        </div>
        <div class="ribbon-content">
            <div v-for="(component, index) in defaults" :key="index" class="ribbon-content-pane" :style="{
                display: component.props.name === currentName ? 'block' : 'none'
            }">
                <div class="ribbon-content-component-wrap">
                    <component :is="component"></component>
                </div>
            </div>
        </div>
    </nav>
</template>

<script lang="ts" setup>

const currentName = defineModel();

defineOptions({
    type: 'RibbonMenu',
});

const emit = defineEmits(['tab-click']);

const slots = defineSlots();
const defaults = slots.default?.();


defaults.forEach((slot: any) => {
    if (slot.type.type !== 'RibbonTab') {
        throw new Error('tabs必须是tab')
    }
})
const labelOptions = defaults.map((slot: any) => {
    return {
        label: slot.props.label,
        name: slot.props.name
    }
})

const tabClick = (name: string) => {
    currentName.value = name;
    emit('tab-click', name);
}

</script>


<style lang="scss">
@use './ribbon.scss'
</style>