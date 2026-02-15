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
        d="M18 10H19C21.2091 10 23 11.7909 23 14C23 16.2091 21.2091 18 19 18H6C3.79086 18 2 16.2091 2 14C2 11.7909 3.79086 10 6 10C6 9.99264 6.00074 9.98529 6.00222 9.97795C6.08298 5.61795 9.61398 2.08381 13.9786 2.00067C14.0494 2 14.1205 2 14.1917 2C17.6322 2 20.5368 4.31686 21.654 7.42259"
        stroke={color}
        stroke-width={strokeWidth}
        stroke-linecap="round"
        stroke-linejoin="round"
    />
</svg>
