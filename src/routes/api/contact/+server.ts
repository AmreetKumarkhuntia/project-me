import type { RequestEvent } from "@sveltejs/kit";
import type SMTPTransport from "nodemailer/lib/smtp-transport";

import type { APIResponse } from "$generated/types/APISchema.ts";
import { APIResponseHandler } from "$server/apiSchema";
import { logger } from "$services/logger";
import { receiverGmail, senderGmail, senderGmailPass } from "$server/config";
import { decodeSendGmailRequest } from "$generated/types";
import { sendMail } from "$services/mailer";

export async function POST({ url, request }: RequestEvent) {
  let response: APIResponse;
  let sendEmailResult: SMTPTransport.SentMessageInfo | null = null;

  const tag = "POST /api/contact";
  const params = Object.fromEntries(url.searchParams.entries());

  try {
    const body = await request.json();
    const emailRequest = decodeSendGmailRequest(body);
    logger.logServerRequest(tag, { emailRequest, params, request });

    if (emailRequest !== null) {
      sendEmailResult = await sendMail(
        "Gmail",
        receiverGmail,
        senderGmail,
        senderGmailPass,
        emailRequest
      );
      if (sendEmailResult !== null) {
        response = APIResponseHandler.successResponse(
          "success",
          sendEmailResult
        );
      } else {
        response = APIResponseHandler.badRequestResponse(
          "Something Went Wrong !!!. Unable To Send Mail."
        );
      }
    } else {
      response = APIResponseHandler.badRequestResponse("Decode Failure");
    }
  } catch (err) {
    logger.logException(tag, String(err));
    response = APIResponseHandler.badRequestResponse(String(err));
  }

  logger.logServerResponse(tag, {
    status: response.status,
    code: response.code,
    message: response.message,
  });
  return APIResponseHandler.toResponse(response);
}
