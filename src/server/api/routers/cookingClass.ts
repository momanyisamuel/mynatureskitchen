import { publicProcedure, createTRPCRouter } from "../trpc";
import { z } from "zod";
import sgMail from "@sendgrid/mail"
import { env } from "@/env.mjs";
sgMail.setApiKey(env.SEND_GRID_KEY);

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const cookingClassRouter = createTRPCRouter({
  getClasses: publicProcedure.query(async ({ ctx }) => {
    const cookingClasses = await ctx.prisma.cookingClass.findMany();
    return cookingClasses;
  }),
  getEvents: publicProcedure.query(async ({ ctx }) => {
    const events = await ctx.prisma.event.findMany();
    return events;
  }),
  getAvailability: publicProcedure.query(async ({ ctx }) => {

    const availableClasses = await ctx.prisma.availability.findMany({
      include: { class: true },
    });

    const formattedData = availableClasses.map((availability) => ({
      date: availability.date,
      title: availability.class.title,
      description: availability.class.description,
    }));

    return formattedData;
  }),
  sendMail: publicProcedure.input(z.object({ email: z.string().email() })).mutation(async ({ input }) => {
    const { email } = input

    const defaultText = `
                          Dear ${email}

                          Thank you for subscribing to our newsletter! We're thrilled to have you join our community.

                          You'll now receive regular updates about our latest products, promotions, and news. We promise to only send you relevant and valuable information that you'll love.

                          If you have any questions or feedback, please don't hesitate to contact us at [Email Address]. We're always here to help.

                          Thanks again for subscribing, and we look forward to staying in touch!

                          Best regards,
                          My Natures Kitchen
                        `
    const defaultHtml = `
                          <!DOCTYPE html>
                          <html>
                            <head>
                              <meta charset="UTF-8">
                              <title>Thank you for subscribing to our newsletter!</title>
                            </head>
                            <body>
                              <h1>Thank you for subscribing to our newsletter!</h1>
                              <p>Dear ${email},</p>
                              <p>Thank you for subscribing to our newsletter! We're thrilled to have you join our community.</p>
                              <p>You'll now receive regular updates about our latest products, promotions, and news. We promise to only send you relevant and valuable information that you'll love.</p>
                              <p>If you have any questions or feedback, please don't hesitate to contact us at [Email Address]. We're always here to help.</p>
                              <p>Thanks again for subscribing, and we look forward to staying in touch!</p>
                              <p>Best regards,</p>
                              <p>My Natures Kitchen</p>
                            </body>
                          </html>
                        `

    const msg = {
      to: `${email}`,
      from: env.SEND_GRID_EMAIL_SENDER,
      subject: 'Welcome to My natures Kitchen',
      text: `${defaultText}`,
      html: `${defaultHtml}`,
    };

    await sgMail.send(msg).then(() => {
      console.log("Sent mail")
    }).catch((error) => {
      console.error(error)
    })
    
    return { success: true }
  }),
  checkClassesStatus: publicProcedure.query(async () => {
    await sleep(1000);
    return true;
  }),
});
