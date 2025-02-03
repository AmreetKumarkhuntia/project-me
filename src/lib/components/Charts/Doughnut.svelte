<script lang="ts">
  import {
    Chart,
    registerables,
    type ChartConfiguration,
    type TooltipItem,
  } from "chart.js";
  import { onMount } from "svelte";

  export let labels: string[] = ["Red", "Blue", "Yellow"];
  export let datasetLabel: string = "example dataset";
  export let datasetData: number[] = [300, 50, 100];
  export let backgroundColor: string[] = [
    "rgb(255, 99, 132)",
    "rgb(54, 162, 235)",
    "rgb(255, 205, 86)",
  ];
  export let tooltipCallback: (
    tooltipItem: TooltipItem<"doughnut">,
    dataSetForCallBack: number[]
  ) => string = (tooltipItem, dataSetForCallBack) => {
    const datasetIndex = tooltipItem.dataIndex;
    const value = dataSetForCallBack[datasetIndex];
    return `Value: ${value}`;
  };

  let canvas: HTMLCanvasElement | null = null;

  onMount(() => {
    Chart.register(...registerables);
    Chart.defaults.font.family = "'Roboto', serif";
    Chart.defaults.color = "#ffffffb2";

    if (canvas) {
      const data = {
        labels,
        datasets: [
          {
            label: datasetLabel,
            data: datasetData,
            backgroundColor,
            borderColor: "none",
            hoverOffset: 12,
          },
        ],
      };

      const options: ChartConfiguration<"doughnut">["options"] = {
        plugins: {
          legend: {
            position: "right",
            labels: {
              font: {
                size: 14,
              },
            },
          },
          tooltip: {
            callbacks: {
              label: (e) => tooltipCallback(e, datasetData),
            },
            titleFont: {
              size: 14,
            },
            bodyFont: {
              size: 12,
            },
            footerFont: {
              size: 10,
            },
          },
        },
      };

      new Chart(canvas, {
        type: "doughnut",
        data,
        options,
      });
    }
  });
</script>

<canvas bind:this={canvas} class="doughnut-chart"></canvas>
