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
        d="M12 20V10"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M18 20V4"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
    />
    <path
        d="M6 20V16"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
