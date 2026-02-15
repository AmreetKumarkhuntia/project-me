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
        d="M12 22S4 18 4 12V5L12 2L20 5V12C20 18 12 22 12 22Z"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
