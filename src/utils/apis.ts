const apiKey = import.meta.env.VITE_BREVO_API_KEY;

export async function sendEmail(formData: {
  name?: string;
  contact?: string;
  subject?: string;
  message?: string;
}) {
  const response = await fetch("https://api.brevo.com/v3/smtp/email", {
    method: "POST",
    headers: {
      accept: "application/json",
      "api-key": apiKey, // replace with your actual Brevo API key
      "content-type": "application/json",
    },
    body: JSON.stringify({
      sender: {
        name: "Abir Portfolio",
        email: "abdox.ethos@gmail.com",
      },
      to: [
        {
          email: "abir71.hosen@gmail.com",
          name: "Abir Hosen",
        },
      ],
      subject: formData.subject + ' - from - '+ formData?.name,
      htmlContent: `
        <!doctype html>
        <html lang="en">
        <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width,initial-scale=1" />
        <meta name="x-apple-disable-message-reformatting" />
        <title>New Message</title>
        <style>
            /* General resets */
            body, table, td, a { -webkit-text-size-adjust: 100%; -ms-text-size-adjust: 100%; }
            table { border-collapse: collapse !important; }
            body { margin: 0 !important; padding: 0 !important; width: 100% !important; font-family: 'Inter', system-ui, -apple-system, 'Segoe UI', Roboto, 'Helvetica Neue', Arial; background-color: #f4f6f8; color: #1f2937; }
            img { border: 0; line-height: 100%; outline: none; text-decoration: none; max-width: 100%; height: auto; display: block; }

            /* Container */
            .email-wrap { width: 100%; max-width: 680px; margin: 28px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 8px 24px rgba(20, 23, 28, 0.08); overflow: hidden; }

            /* Header */
            .header { padding: 28px; background: linear-gradient(90deg, #2563eb 0%, #7c3aed 100%); color: #fff; text-align: left; }
            .brand { font-weight: 700; font-size: 18px; letter-spacing: 0.2px; }
            .pre { font-size: 13px; opacity: 0.95; margin-top: 6px; }

            /* Body */
            .body { padding: 28px; }
            .intro { font-size: 16px; margin-bottom: 16px; color: #0f172a; }
            .card { background: #fbfdff; border: 1px solid #eef2ff; border-radius: 10px; padding: 16px; margin-bottom: 16px; }
            .row { display: flex; gap: 16px; align-items: flex-start; margin-bottom: 12px; }
            .label { width: 110px; font-weight: 600; color: #374151; font-size: 14px; }
            .value { flex: 1; font-size: 14px; color: #0f172a; white-space: pre-wrap; }

            /* Message box style */
            .message-box { background: #fff; border-radius: 8px; border: 1px solid #e6eef8; padding: 12px; font-size: 14px; color: #0f172a; line-height: 1.5; }

            /* Footer */
            .footer { padding: 18px 28px; font-size: 13px; color: #6b7280; background: #f8fafc; text-align: center; }

            /* Responsive */
            @media (max-width: 520px) {
            .label { width: 90px; font-size: 13px; }
            .header, .body { padding: 18px; }
            .email-wrap { margin: 16px; }
            }
        </style>
        </head>
        <body>
        <!-- preview text for some email clients -->
        <div style="display:none;max-height:0;overflow:hidden;">You have a new contact message</div>

        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f6f8;">
            <tr>
            <td align="center">
                <div class="email-wrap" role="article" aria-roledescription="email">
                <!-- Header -->
                <div class="header">
                    <div style="display:flex;align-items:center;gap:12px">
                    <div class="brand">${'Abir Portfolio'}</div>
                    <div style="flex:1"></div>
                    <div style="font-size:13px;opacity:0.95">New contact message</div>
                    </div>
                    <div class="pre">Someone reached out via your contact form — details below.</div>
                </div>

                <!-- Body -->
                <div class="body">
                    <div class="intro">Hi there,</div>

                    <div class="card">
                    <div class="row">
                        <div class="label">Name</div>
                        <div class="value">${formData.name}</div>
                    </div>

                    <div class="row">
                        <div class="label">Email</div>
                        <div class="value"><a href="mailto:${formData.contact}" style="color:#2563eb; text-decoration:none;">${formData.contact}</a></div>
                    </div>

                    <div class="row">
                        <div class="label">Subject</div>
                        <div class="value">${formData.subject}</div>
                    </div>

                    <div style="margin-top:8px;">
                        <div style="font-weight:600; color:#374151; font-size:13px; margin-bottom:6px;">Message</div>
                        <div class="message-box">${formData.message}</div>
                    </div>
                    </div>

                    <!-- Optional actions -->
                    <!-- <div style="text-align:left; margin-top:8px;">  -->
                    <!-- <a href="mailto:{{email}}?subject=Re:%20{{subject}}" style="display:inline-block;padding:10px 14px;border-radius:8px;text-decoration:none;font-weight:600;border:1px solid #e6eef8;background:#fff;">Reply</a> -->
                    <!-- <span style="margin-left:12px;color:#6b7280;font-size:13px;">Or copy the message to your CRM.</span> -->
                    <!-- </div> -->
                </div>

                <!-- Footer -->
                <div class="footer">
                    This message was sent from ${'Abir Portfolio'} • <span style="color:#9ca3af">Do not share user data publicly.</span>
                    <div style="margin-top:6px;">&copy; <span id="year"></span> ${'Abir Portfolio'}. All rights reserved.</div>
                </div>
                </div>
            </td>
            </tr>
        </table>

        <script>
            // For previewing in browser — dynamic year only for browser preview (email clients ignore script)
            try { document.getElementById('year').textContent = new Date().getFullYear(); } catch(e){}
        </script>
        </body>
        </html>

        `,
    }),
  });

  if (!response.ok) {
    const error = await response.text();
    console.log("Email send failed.", error);
    return { status: false, message: "Email failed to send!", data: error };
  }
  const data = await response.json();
  console.log("Email sent successfully:", data);
  return { status: true, message: "Email successfully send!", data };
}
