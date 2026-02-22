<script lang="ts">
  export let width: number = 24;
  export let height: number = 40;
  export let color: string = "currentColor";
  export let className: string = "";
</script>

<svg
  {width}
  {height}
  viewBox="0 0 {width} {height}"
  fill="none"
  xmlns="http://www.w3.org/2000/svg"
  class={className}
>
  <line x1="12" y1="0" x2="12" y2="36" stroke={color} stroke-dasharray="2 4" />
  <path d="M8 32 L12 36 L16 32" stroke={color} fill="none" />
</svg>
