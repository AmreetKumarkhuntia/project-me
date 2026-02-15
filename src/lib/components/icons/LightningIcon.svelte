<script lang="ts">
    export let size = 24;
    export let color = "currentColor";
    export let strokeWidth = 2;
</script>

<svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...$$restProps}
>
    <path
        d="M13 2L3 14H12L11 22L21 10H12L13 2Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
