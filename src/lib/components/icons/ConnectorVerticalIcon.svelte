<script>
  let {
    size = 24,
    height = 40,
    class: className = "",
    color: color = "currentColor",
  } = $props();
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  width={size}
  {height}
  viewBox="0 0 24 40"
  fill="none"
  stroke={color}
  stroke-width="2"
  class={className}
>
  <line x1="12" y1="0" x2="12" y2="40" stroke-dasharray="4 4" />
  <polyline points="6 34 12 40 18 34" />
</svg>
