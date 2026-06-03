const nodemailer = require("nodemailer");

// Create a reusable transporter using Gmail SMTP
// Make sure these are set in your .env file:
//   EMAIL_USER=your_gmail@gmail.com
//   EMAIL_PASS=your_gmail_app_password  (NOT your normal Gmail password — use an App Password)

if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
  console.warn("⚠️ Nodemailer Warning: EMAIL_USER or EMAIL_PASS environment variables are missing!");
}


const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});



/**
 * Sends an appointment confirmation email to the patient.
 *
 * @param {string} toEmail        - Patient's email address
 * @param {string} patientName    - Patient's full name
 * @param {string} doctorName     - Doctor's full name
 * @param {string} hospitalName   - Hospital name
 * @param {string} appointmentDate - ISO date string of the appointment
 * @param {number} tokenNumber    - Assigned queue token number
 */
async function sendAppointmentConfirmationEmail({
  toEmail,
  patientName,
  doctorName,
  hospitalName,
  appointmentDate,
  tokenNumber,
}) {
  // Format the date nicely, e.g. "25 May 2026, 10:30 AM"
  const formattedDate = new Date(appointmentDate).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const mailOptions = {
    from: `"OPD Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "✅ Your Appointment is Confirmed – OPD Manager",
    // Plain text fallback for email clients that don't render HTML
    text: `
Hello ${patientName},

Your appointment has been confirmed!

Details:
  Doctor      : ${doctorName}
  Hospital    : ${hospitalName}
  Date & Time : ${formattedDate}
  Token Number: #${tokenNumber}

Please arrive 10–15 minutes before your scheduled time and carry this token number with you.

If you need to cancel or reschedule, please contact the hospital reception.

Thank you,
OPD Manager Team
    `.trim(),

    // HTML version — nicely styled email
    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Confirmed</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header Banner -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;letter-spacing:-0.5px;">
                🏥 OPD Manager
              </h1>
              <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px;">
                Outpatient Department Management System
              </p>
            </td>
          </tr>

          <!-- Green Success Badge -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <div style="display:inline-block;background:#dcfce7;border:1px solid #86efac;border-radius:50px;padding:10px 24px;">
                <span style="color:#16a34a;font-size:15px;font-weight:700;">
                  ✅ Appointment Confirmed
                </span>
              </div>
              <h2 style="margin:20px 0 6px;color:#0f172a;font-size:22px;font-weight:700;">
                Hello, ${patientName}!
              </h2>
              <p style="margin:0;color:#64748b;font-size:15px;line-height:1.6;">
                Your appointment has been <strong>confirmed</strong> by the hospital staff.<br/>
                Please find the details below.
              </p>
            </td>
          </tr>

          <!-- Appointment Details Card -->
          <tr>
            <td style="padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">

                <!-- Token Number Hero -->
                <tr>
                  <td colspan="2"
                    style="background:linear-gradient(135deg,#eff6ff,#eef2ff);padding:20px;text-align:center;border-bottom:1px solid #e2e8f0;">
                    <p style="margin:0;color:#64748b;font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:1px;">
                      Your Queue Token
                    </p>
                    <p style="margin:6px 0 0;color:#2563eb;font-size:42px;font-weight:800;line-height:1;">
                      #${tokenNumber}
                    </p>
                    <p style="margin:4px 0 0;color:#6366f1;font-size:12px;">
                      Show this number at the reception
                    </p>
                  </td>
                </tr>

                <!-- Detail Rows -->
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;width:40%;">
                    👨‍⚕️ Doctor
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600;">
                    ${doctorName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;background:#fafafa;color:#64748b;font-size:13px;font-weight:600;">
                    🏥 Hospital
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;background:#fafafa;color:#0f172a;font-size:14px;font-weight:600;">
                    ${hospitalName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;color:#64748b;font-size:13px;font-weight:600;">
                    📅 Date &amp; Time
                  </td>
                  <td style="padding:14px 20px;color:#0f172a;font-size:14px;font-weight:600;">
                    ${formattedDate}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- Reminder Note -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#fffbeb;border:1px solid #fde68a;border-radius:8px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;color:#92400e;font-size:13px;line-height:1.6;">
                      ⏰ <strong>Reminder:</strong> Please arrive <strong>10–15 minutes early</strong>
                      and carry your <strong>token number (#${tokenNumber})</strong> with you.
                      Contact the hospital reception if you need to reschedule.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                This is an automated notification from <strong>OPD Manager</strong>.<br/>
                Please do not reply to this email.
              </p>
              <p style="margin:8px 0 0;color:#cbd5e1;font-size:11px;">
                © ${new Date().getFullYear()} OPD Manager. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `,
  };

  // Send the email and return result
  const info = await transporter.sendMail(mailOptions);
  console.log(`✅ Confirmation email sent to ${toEmail} — Message ID: ${info.messageId}`);
  return info;
}

/**
 * Sends an appointment rejection email to the patient.
 *
 * @param {string} toEmail        - Patient's email address
 * @param {string} patientName    - Patient's full name
 * @param {string} doctorName     - Doctor's full name
 * @param {string} hospitalName   - Hospital name
 * @param {string} appointmentDate - ISO date string of the appointment
 * @param {string} rejectMessage  - Reason for rejection
 */
async function sendAppointmentRejectionEmail({
  toEmail,
  patientName,
  doctorName,
  hospitalName,
  appointmentDate,
  rejectMessage,
}) {
  const formattedDate = new Date(appointmentDate).toLocaleString("en-IN", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  const mailOptions = {
    from: `"OPD Manager" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "❌ Appointment Update – OPD Manager",
    text: `
Hello ${patientName},

Unfortunately, your appointment request could not be confirmed.

Details:
  Doctor      : ${doctorName}
  Hospital    : ${hospitalName}
  Date & Time : ${formattedDate}
  Reason      : ${rejectMessage}

Please log in to the OPD Manager portal to book a new appointment at a different time.

Thank you,
OPD Manager Team
    `.trim(),

    html: `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8"/>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Appointment Update</title>
</head>
<body style="margin:0;padding:0;background-color:#f4f7fb;font-family:'Segoe UI',Arial,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f7fb;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
          style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 4px 20px rgba(0,0,0,0.08);">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#2563eb,#4f46e5);padding:36px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:26px;font-weight:700;">
                🏥 OPD Manager
              </h1>
              <p style="margin:8px 0 0;color:#bfdbfe;font-size:14px;">
                Outpatient Department Management System
              </p>
            </td>
          </tr>

          <!-- Red Badge -->
          <tr>
            <td style="padding:32px 40px 0;text-align:center;">
              <div style="display:inline-block;background:#fee2e2;border:1px solid #fca5a5;border-radius:50px;padding:10px 24px;">
                <span style="color:#dc2626;font-size:15px;font-weight:700;">
                  ❌ Appointment Not Confirmed
                </span>
              </div>
              <h2 style="margin:20px 0 6px;color:#0f172a;font-size:22px;font-weight:700;">
                Hello, ${patientName}
              </h2>
              <p style="margin:0;color:#64748b;font-size:15px;line-height:1.6;">
                We're sorry, your appointment request was <strong>not confirmed</strong>
                by the hospital staff. Please see the details below.
              </p>
            </td>
          </tr>

          <!-- Details Card -->
          <tr>
            <td style="padding:28px 40px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:10px;overflow:hidden;">
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;width:40%;">
                    👨‍⚕️ Doctor
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600;">
                    ${doctorName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;background:#fafafa;color:#64748b;font-size:13px;font-weight:600;">
                    🏥 Hospital
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;background:#fafafa;color:#0f172a;font-size:14px;font-weight:600;">
                    ${hospitalName}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:13px;font-weight:600;">
                    📅 Requested Date
                  </td>
                  <td style="padding:14px 20px;border-bottom:1px solid #e2e8f0;color:#0f172a;font-size:14px;font-weight:600;">
                    ${formattedDate}
                  </td>
                </tr>
                <tr>
                  <td style="padding:14px 20px;color:#64748b;font-size:13px;font-weight:600;">
                    📝 Reason
                  </td>
                  <td style="padding:14px 20px;color:#dc2626;font-size:14px;font-weight:600;">
                    ${rejectMessage}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- CTA Note -->
          <tr>
            <td style="padding:0 40px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0"
                style="background:#eff6ff;border:1px solid #bfdbfe;border-radius:8px;">
                <tr>
                  <td style="padding:14px 18px;">
                    <p style="margin:0;color:#1e40af;font-size:13px;line-height:1.6;">
                      💡 <strong>What to do next?</strong> Log in to the OPD Manager portal
                      and book a new appointment at a different date or time.
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f8fafc;border-top:1px solid #e2e8f0;padding:24px 40px;text-align:center;">
              <p style="margin:0;color:#94a3b8;font-size:12px;line-height:1.6;">
                This is an automated notification from <strong>OPD Manager</strong>.<br/>
                Please do not reply to this email.
              </p>
              <p style="margin:8px 0 0;color:#cbd5e1;font-size:11px;">
                © ${new Date().getFullYear()} OPD Manager. All rights reserved.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log(`📧 Rejection email sent to ${toEmail} — Message ID: ${info.messageId}`);
  return info;
}

module.exports = {
  sendAppointmentConfirmationEmail,
  sendAppointmentRejectionEmail,
};
