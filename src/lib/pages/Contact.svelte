<script lang="ts">
  import { sendContactMail } from "$client/mailer";
  import { openInANewWindow } from "$client/navigation";
  import { contactLinks } from "$configuration";
  import { setFlyer } from "$stores/site";

  import {
    Button,
    Header,
    InputField,
    LazyLoader,
    Avatar,
    type LazyLoaderProps,
  } from "vergins";

  const constantAvatarLazyLoaderDelay = 700;
  const linkSize = "42px";
  const smallerLinkSize = "28px";

  let email: string = "";
  let subject: string = "";
  let emailBody: string = "";

  function getAvatarLazyLoaderWithDelay(index: number): LazyLoaderProps {
    return {
      inTransition: {
        transitionType: "fly",
        transition: {
          delay: index * 700 + constantAvatarLazyLoaderDelay,
          duration: 800,
          x: 0,
          y: 200,
          opacity: 0,
        },
      },
      outTransition: {
        transitionType: "fly",
        transition: {
          delay: 200,
          duration: 800,
          x: 0,
          y: 200,
          opacity: 0,
        },
      },
    };
  }

  async function onSubmit() {
    if (email !== "" && subject !== "" && emailBody !== "") {
      const result = await sendContactMail(email, subject, emailBody);
      if (result.status.toLowerCase() === "success") {
        setFlyer({
          showFlyer: true,
          body: "Successfully sent your contact mail",
          flyerType: "success",
        });
      } else {
        setFlyer({
          showFlyer: true,
          body: `${result.status} \n ${result.error !== null ? result.error : ""}`,
          flyerType: "alert",
        });
      }
    } else {
      setFlyer({
        showFlyer: true,
        body: "Either of email, subject or email body is not set.",
        flyerType: "warning",
      });
    }
  }
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<!-- svelte-ignore a11y_click_events_have_key_events -->
<div class="contact">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>CONTACT ME</LazyLoader>
  </Header>

  <Header hLevel={3}>
    <LazyLoader maxCount={1}>QUICK LINKS</LazyLoader>
  </Header>

  <div class="contact-links display-flex">
    {#each contactLinks as contactLink, index}
      <LazyLoader
        lazyLoaderProps={getAvatarLazyLoaderWithDelay(index)}
        maxCount={1}
      >
        <div
          class="contact-link display-flex display-align-col display-flex-center"
          on:click={() => {
            openInANewWindow(contactLink.link);
          }}
        >
          <Avatar dataType={"svg"} smallSize={smallerLinkSize} size={linkSize}>
            {@html contactLink.imgSrc}
          </Avatar>
          <div class="contact-link-text">{contactLink.title}</div>
        </div>
      </LazyLoader>
    {/each}
  </div>

  <Header hLevel={3}>
    <LazyLoader maxCount={1}>CONTACT FORM</LazyLoader>
  </Header>

  <Header hLevel={5}>
    <LazyLoader maxCount={1}>Email</LazyLoader>
  </Header>
  <div class="contact-input-field">
    <InputField bind:value={email} placeholder={"email"} />
  </div>
  <Header hLevel={5}>
    <LazyLoader maxCount={1}>Subject</LazyLoader>
  </Header>
  <div class="contact-input-field">
    <InputField bind:value={subject} placeholder={"subject"} />
  </div>
  <Header hLevel={5}>
    <LazyLoader maxCount={1}>Email Body</LazyLoader>
  </Header>
  <div class="contact-input-field-body">
    <InputField
      type="textarea"
      bind:value={emailBody}
      placeholder={"Enter your body text here"}
    />
  </div>

  <div class="contact-submit-button">
    <Button onClick={onSubmit} size={"fill"} type={"outlined"}>Submit</Button>
  </div>
</div>

<style lang="scss">
  .contact {
    min-height: var(--page-height);
    width: var(--page-width);
    padding: var(--page-padding);
  }

  .contact-input-field {
    margin: 3% 0;
    height: 60px;
  }

  .contact-input-field-body {
    margin: 3% 0;
    height: 270px;

    --input-label-top: 10%;
  }

  .contact-submit-button {
    height: 42px;
  }

  .contact-links {
    justify-content: space-evenly;
    align-items: center;
    flex-wrap: wrap;
  }

  .contact-link-text {
    text-align: center;
    margin: 6px;
  }

  .contact-link {
    margin: 20px;
  }
</style>
