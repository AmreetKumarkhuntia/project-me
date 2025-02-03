<script lang="ts">
  import { sendContactMail } from "$client/mailer";
  import { setFlyer } from "$stores/projects";
  import { Button, Header, InputField, LazyLoader } from "vergins";

  let email: string = "";
  let subject: string = "";
  let emailBody: string = "";

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

<div class="contact">
  <Header hLevel={1}>
    <LazyLoader maxCount={1}>CONTACT ME</LazyLoader>
  </Header>

  <Header hLevel={3}>
    <LazyLoader maxCount={1}>QUICK LINKS</LazyLoader>
  </Header>

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
</style>
