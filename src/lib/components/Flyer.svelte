<script lang="ts">
  import { decodeFlyerType } from "$models/flyer";
  import { siteStore } from "$stores/site";
  import { Flyer, type FlyerProps, type FlyerType } from "vergins";

  let showAlertFlyer: boolean = false;
  let showSummaryFlyer: boolean = false;
  let showSuccessFlyer: boolean = false;
  let showWarningFlyer: boolean = false;

  let flyerBody: string = "";
  let flyerType: FlyerType = "summary";

  // Define all flyerProps as the one you provided earlier
  let flyerPropsSummary: FlyerProps = {
    position: "bottom-right",
    flyerType: "summary",
    title: null,
    duration: 3000,
    flyerLeftImage: null,
    inTransition: null,
    outTransition: null,
  };

  let flyerPropsSuccess: FlyerProps = {
    position: "bottom-right",
    flyerType: "success",
    title: "Success",
    duration: 3000,
    flyerLeftImage: null,
    inTransition: null,
    outTransition: null,
  };

  let flyerPropsAlert: FlyerProps = {
    position: "bottom-right",
    flyerType: "alert",
    title: "Failure",
    duration: 3000,
    flyerLeftImage: null,
    inTransition: null,
    outTransition: null,
  };

  let flyerPropsWarning: FlyerProps = {
    position: "bottom-right",
    flyerType: "warning",
    title: "Failure",
    duration: 3000,
    flyerLeftImage: null,
    inTransition: null,
    outTransition: null,
  };

  $: onFlyerChanged(), $siteStore.flyerProperties;

  function onFlyerChanged() {
    const flyerProperties = $siteStore.flyerProperties;

    if (flyerProperties !== null) {
      if (flyerProperties.showFlyer) {
        flyerBody = flyerProperties.body;
        flyerType = decodeFlyerType(flyerProperties.flyerType ?? "");
        switch (flyerType) {
          case "alert": {
            showAlertFlyer = true;
            break;
          }
          case "warning": {
            showWarningFlyer = true;
            break;
          }
          case "success": {
            showSuccessFlyer = true;
            break;
          }
          case "custom":
          case "summary":
          default:
            showSummaryFlyer = true;
        }
      }
    }
  }
</script>

<Flyer bind:isVisible={showAlertFlyer} flyerProps={flyerPropsAlert}>
  {@html flyerBody}
</Flyer>
<Flyer bind:isVisible={showSuccessFlyer} flyerProps={flyerPropsSuccess}>
  {@html flyerBody}
</Flyer>
<Flyer bind:isVisible={showWarningFlyer} flyerProps={flyerPropsWarning}>
  {@html flyerBody}
</Flyer>
<Flyer bind:isVisible={showSummaryFlyer} flyerProps={flyerPropsSummary}>
  {@html flyerBody}
</Flyer>
