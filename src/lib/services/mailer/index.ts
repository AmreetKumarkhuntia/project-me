import type { SendGmailRequest } from "$generated/types";
import { logger } from "$services/logger";
import { createTransport } from "nodemailer";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

/**
 * & Sends an email using the Gmail SMTP server.
 * ? Set password here: https://myaccount.google.com/apppasswords for google
 * @param {string} receiverGmail - The email address of the receiver.
 * @param {string} senderGmail - The email address of the sender.
 * @param {string} senderPass - The password of the sender's Gmail account or app password.
 * @param {SendGmailRequest} emailContent - An object containing the subject and description of the email.
 * @returns {Promise<SMTPTransport.SentMessageInfo | null>} The result of the email send operation.
 */
export async function sendMail(
  service: string,
  receiverGmail: string,
  senderGmail: string,
  senderPass: string,
  emailContent: SendGmailRequest,
): Promise<SMTPTransport.SentMessageInfo | null> {
  let result: SMTPTransport.SentMessageInfo | null = null;

  const { email, subject, description } = emailContent;
  const tag = "sendMail";

  const transporter = createTransport({
    service,
    auth: {
      user: senderGmail,
      pass: senderPass,
    },
  });

  logger.logExternalApiRequest(tag, {
    receiverGmail,
    senderGmail,
    subject,
    description,
    service,
  });

  try {
    result = await transporter.sendMail({
      from: senderGmail,
      to: receiverGmail,
      subject: `${subject} | from: @${email}`,
      text: description,
    });
  } catch (error) {
    logger.logException(tag, String(error));
  }

  logger.logExternalApiResponse(tag, { result });

  return result;
}
