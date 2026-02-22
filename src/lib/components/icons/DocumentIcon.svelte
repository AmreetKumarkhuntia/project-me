<script>
  let {
    size = 24,
    class: className = "",
    color: color = "currentColor",
  } = $props();
</script>

<svg
  width={size}
  height={size}
  viewBox="0 0 16 16"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
>
  <path
    d="M13 2H3C2.44772 2 2 2.44772 2 3V13C2 13.5523 2.44772 14 3 14H13C13.5523 14 14 13.5523 14 13V3C14 2.44772 13.5523 2 13 2Z"
    stroke={color}
    stroke-width="1.5"
  />
  <path
    d="M5 6H11M5 9H11"
    stroke={color}
    stroke-width="1.5"
    stroke-linecap="round"
  />
</svg>
