// import nodemailer from "nodemailer";
// import dotenv from "dotenv";
// import { generateOtpEmailHtml } from "@/templates/email/auth/otp.template.js";
// import { generateWelcomeEmailHtml } from "@/templates/email/auth/welcome.template.js";
// import { generateArticleSubmissionHtml } from "@/templates/email/article/submission.template.js";
// import { generateArticleVerificationHtml } from "@/templates/email/article/verification.template.js";
// import { generateArticleVerificationCodeHtml } from "@/templates/email/article/verification-code.template.js";
// import { generateAuthorAssignmentHtml } from "@/templates/email/article/assignment.template.js";
// import { generateArticleApprovalHtml } from "@/templates/email/article/approval.template.js";
// import { generateArticleCorrectionHtml } from "@/templates/email/article/correction.template.js";
// import { generateEditorInvitationHtml } from "@/templates/email/editor/invitation.template.js";
// import { generateEditorTaskAssignedHtml } from "@/templates/email/editor/task-assigned.template.js";
// import { generateCoAuthorNotificationHtml } from "@/templates/email/article/coauthor-notification.template.js";
// import { generateArticlePublishedHtml } from "@/templates/email/article/published.template.js";
// import { generateEditorApprovalNotificationHtml } from "@/templates/email/admin/editor-approval.template.js";

// dotenv.config();

// interface EmailOptions {
//   to: string;
//   subject: string;
//   html: string;
// }

// const transporter = nodemailer.createTransport({
//   host: process.env.SMTP_HOST || "smtp.gmail.com",
//   port: parseInt(process.env.SMTP_PORT || "587"),
//   secure: process.env.SMTP_SECURE === "false" || false, 
//   auth: {
//     user: process.env.EMAIL_USER, 
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Main sendEmail function
// export async function sendEmail(options: EmailOptions) {
//   try {
//     if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
//       throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env file");
//     }
//     console.log(`process.env.EMAIL_USER:${process.env.EMAIL_USER}`)
//     console.log(`process.env.EMAIL_PASS:${process.env.EMAIL_PASS}`)
//     console.log(`process.env.SMTP_FROM:${process.env.SMTP_FROM}`)

//     console.log("user and password exist SMTP")
//     await transporter.sendMail({
//       from: process.env.SMTP_FROM || `"Law Nation" <${process.env.EMAIL_USER}>`,
//       to: options.to,
//       subject: options.subject,
//       html: options.html,
//     });
//     console.log(`Email sent successfully to ${options.to}`);
//   } catch (error) {
//     console.error("Email send error:", error);
//     throw error;
//   }
// }

// // --- AUTH EMAILS ---

// export async function sendOtpEmail(userEmail: string, otp: string) {
//   const { subject, html } = generateOtpEmailHtml({ otp });
//   console.log("generated otp email")
//   return sendEmail({ to: userEmail, subject, html });
// }



// export async function sendAuthNotification(userEmail: string, userName: string) {
//   const { subject, html } = generateWelcomeEmailHtml({
//     userName,
//     frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
//   });
//   return sendEmail({ to: userEmail, subject, html });
// }

// // --- ARTICLE EMAILS ---

// export async function sendArticleSubmissionConfirmation(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
//   const { subject, html } = generateArticleSubmissionHtml({
//     authorName,
//     articleTitle,
//     articleId
//   });
//   return sendEmail({ to: authorEmail, subject, html });
// }

// export async function sendCoAuthorNotification(coAuthorEmail: string, coAuthorName: string, primaryAuthorName: string, articleTitle: string, articleId: string) {
//   const { subject, html } = generateCoAuthorNotificationHtml({
//     coAuthorName,
//     primaryAuthorName,
//     articleTitle,
//     articleId
//   });
//   return sendEmail({ to: coAuthorEmail, subject, html });
// }

// export async function sendAuthorAssignmentNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
//   const { subject, html } = generateAuthorAssignmentHtml({
//     authorName,
//     articleTitle,
//     articleId
//   });
//   return sendEmail({ to: authorEmail, subject, html });
// }

// export async function sendEditorAssignmentNotification(editorEmail: string, editorName: string, articleTitle: string, authorName: string, category: string, articleId: string) {
//   const { subject, html } = generateEditorTaskAssignedHtml({
//     editorName,
//     articleTitle,
//     authorName,
//     category,
//     articleId
//   });
//   return sendEmail({ to: editorEmail, subject, html });
// }

// export async function sendArticleApprovalNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
//   const { subject, html } = generateArticleApprovalHtml({
//     authorName,
//     articleTitle,
//     articleId
//   });
//   return sendEmail({ to: authorEmail, subject, html });
// }

// export async function sendArticleCorrectionNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string, editorComments?: string) {
//   const { subject, html } = generateArticleCorrectionHtml({
//     authorName,
//     articleTitle,
//     articleId,
//     ...(editorComments && { editorComments })
//   });
//   return sendEmail({ to: authorEmail, subject, html });
// }

// // --- EMAIL VERIFICATION FOR ARTICLE SUBMISSION ---
// export async function sendArticleVerificationEmail(
//   authorEmail: string,
//   authorName: string,
//   token: string
// ) {
//   const { subject, html } = generateArticleVerificationHtml({
//     authorName,
//     token,
//     backendUrl: process.env.BACKEND_URL || 'http://localhost:4000'
//   });
//   return sendEmail({ to: authorEmail, subject, html });
// }

// // --- EMAIL VERIFICATION WITH CODE FOR ARTICLE SUBMISSION ---
// export async function sendArticleVerificationCodeEmail(
//   authorEmail: string,
//   authorName: string,
//   code: string
// ) {
//   const { subject, html } = generateArticleVerificationCodeHtml({
//     authorName,
//     code
//   });
//   return sendEmail({ to: authorEmail, subject, html });
// }

// // --- EDITOR INVITATION EMAIL ---
// export async function sendEditorInvitationEmail(
//   editorEmail: string,
//   editorName: string,
//   token: string
// ) {
//   const { subject, html } = generateEditorInvitationHtml({
//     editorName,
//     token,
//     frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
//   });
//   return sendEmail({ to: editorEmail, subject, html });
// }

// /**
//  * Send notification to admin when editor approves article
//  */
// export async function sendEditorApprovalNotificationToAdmin(
//   adminEmail: string,
//   adminName: string,
//   articleTitle: string,
//   editorName: string,
//   articleId: string
// ) {
//   const { subject, html } = generateEditorApprovalNotificationHtml({
//     adminName,
//     articleTitle,
//     editorName,
//     articleId
//   });

//   await sendEmail({
//     to: adminEmail,
//     subject,
//     html,
//   });
// }

// /**
//  * Send notification to uploader when article is published (with link to change history)
//  */
// export async function sendArticlePublishedNotification(
//   uploaderEmail: string,
//   uploaderName: string,
//   articleTitle: string,
//   articleId: string,
//   diffSummary?: string
// ) {
//   const { subject, html } = generateArticlePublishedHtml({
//     authorName: uploaderName,
//     articleTitle,
//     articleId,
//     ...(diffSummary && { diffSummary })
//   });

//   await sendEmail({
//     to: uploaderEmail,
//     subject,
//     html,
//   });
// }



import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { generateOtpEmailHtml } from "@/templates/email/auth/otp.template.js";
import { generateWelcomeEmailHtml } from "@/templates/email/auth/welcome.template.js";
import { generateArticleSubmissionHtml } from "@/templates/email/article/submission.template.js";
import { generateArticleVerificationHtml } from "@/templates/email/article/verification.template.js";
import { generateArticleVerificationCodeHtml } from "@/templates/email/article/verification-code.template.js";
import { generateAuthorAssignmentHtml } from "@/templates/email/article/assignment.template.js";
import { generateArticleApprovalHtml } from "@/templates/email/article/approval.template.js";
import { generateArticleCorrectionHtml } from "@/templates/email/article/correction.template.js";
import { generateEditorInvitationHtml } from "@/templates/email/editor/invitation.template.js";
import { generateEditorTaskAssignedHtml } from "@/templates/email/editor/task-assigned.template.js";
import { generateCoAuthorNotificationHtml } from "@/templates/email/article/coauthor-notification.template.js";
import { generateArticlePublishedHtml } from "@/templates/email/article/published.template.js";
import { generateEditorApprovalNotificationHtml } from "@/templates/email/admin/editor-approval.template.js";

dotenv.config();

interface EmailOptions {
  to: string;
  subject: string;
  html: string;
}

// Log configuration for debugging
console.log("📧 Email Configuration:");
console.log("SMTP_HOST:", process.env.SMTP_HOST || "smtp.gmail.com");
console.log("SMTP_PORT:", process.env.SMTP_PORT || "587");
console.log("SMTP_SECURE:", process.env.SMTP_SECURE);
console.log("EMAIL_USER:", process.env.EMAIL_USER?.replace(/^(.*)@/, "***@"));
console.log("SMTP_FROM:", process.env.SMTP_FROM);

// FIXED: Correct secure logic
const secureOption = process.env.SMTP_SECURE === "true";
console.log("Using secure mode:", secureOption);

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "smtp.gmail.com",
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: secureOption, // FIXED: Only true if string is "true"
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
  // Add these options for better reliability
  requireTLS: true, // Force TLS for port 587
  tls: {
    rejectUnauthorized: false, // Helps with certificate issues
  },
  // Connection settings
  connectionTimeout: 10000,
  socketTimeout: 10000,
  // Debug
  debug: process.env.NODE_ENV !== 'production',
  logger: process.env.NODE_ENV !== 'production',
});

// Test connection on startup
// transporter.verify(function (error, success) {
//   if (error) {
//     console.error("❌ SMTP Connection Error:", error.message);
//     console.error("Error code:", error.code);
    
//     if (error.code === 'EAUTH') {
//       console.error("\n🔑 AUTHENTICATION FAILED!");
//       console.error("Please verify:");
//       console.error("1. Email: aman.workk786@gmail.com (note: double 'k' in 'workk')");
//       console.error("2. App password is correct (16 characters)");
//       console.error("3. 2FA is enabled on Google account");
//       console.error("4. Try generating NEW app password at: https://myaccount.google.com/apppasswords");
//     }
//   } else {
//     console.log("✅ SMTP Server is ready to take our messages");
//   }
// });

// Main sendEmail function
export async function sendEmail(options: EmailOptions) {
  try {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      throw new Error("Missing EMAIL_USER or EMAIL_PASS in .env file");
    }
    
    console.log(`📧 Sending email to: ${options.to}`);
    console.log(`From: ${process.env.SMTP_FROM || process.env.EMAIL_USER}`);
    console.log(`Subject: ${options.subject}`);
    
    const mailOptions = {
      from: process.env.SMTP_FROM?.replace(/"/g, '') || `"Law Nation" <${process.env.EMAIL_USER}>`,
      to: options.to,
      subject: options.subject,
      html: options.html,
      // Add text alternative for compatibility
      text: options.html.replace(/<[^>]*>/g, ''),
    };

    console.log("Attempting to send mail...");
    const info = await transporter.sendMail(mailOptions);
    
    console.log(`✅ Email sent successfully to ${options.to}`);
    console.log(`Message ID: ${info.messageId}`);
    console.log(`Response: ${info.response}`);
    
    return info;
  } catch (error: any) {
    console.error("❌ Email send error details:");
    console.error("Error:", error.message);
    console.error("Error code:", error.code);
    console.error("Command:", error.command);
    console.error("Response:", error.response);
    
    // Specific error handling
    if (error.code === 'EAUTH') {
      console.error("\n🔑 AUTHENTICATION FAILED!");
      console.error("Solutions:");
      console.error("1. Generate NEW app password: https://myaccount.google.com/apppasswords");
      console.error("2. Use OAuth2 instead of password");
      console.error("3. Try different SMTP service (Elastic Email, SendGrid)");
    }
    
    if (error.code === 'ECONNECTION' || error.code === 'ETIMEDOUT') {
      console.error("\n🌐 CONNECTION FAILED!");
      console.error("Try these alternatives:");
      console.error("1. Switch to port 465 with secure: true");
      console.error("2. Use a different SMTP service");
      console.error("3. Check firewall/network settings on Render");
    }
    
    throw error;
  }
}

// --- AUTH EMAILS ---

export async function sendOtpEmail(userEmail: string, otp: string) {
  const { subject, html } = generateOtpEmailHtml({ otp });
  console.log("📧 Generating OTP email for:", userEmail);
  return sendEmail({ to: userEmail, subject, html });
}

export async function sendAuthNotification(userEmail: string, userName: string) {
  const { subject, html } = generateWelcomeEmailHtml({
    userName,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  });
  console.log("📧 Sending welcome email to:", userEmail);
  return sendEmail({ to: userEmail, subject, html });
}

// --- ARTICLE EMAILS ---

export async function sendArticleSubmissionConfirmation(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateArticleSubmissionHtml({
    authorName,
    articleTitle,
    articleId
  });
  console.log("📧 Sending submission confirmation to:", authorEmail);
  return sendEmail({ to: authorEmail, subject, html });
}

export async function sendCoAuthorNotification(coAuthorEmail: string, coAuthorName: string, primaryAuthorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateCoAuthorNotificationHtml({
    coAuthorName,
    primaryAuthorName,
    articleTitle,
    articleId
  });
  console.log("📧 Sending co-author notification to:", coAuthorEmail);
  return sendEmail({ to: coAuthorEmail, subject, html });
}

export async function sendAuthorAssignmentNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateAuthorAssignmentHtml({
    authorName,
    articleTitle,
    articleId
  });
  console.log("📧 Sending author assignment notification to:", authorEmail);
  return sendEmail({ to: authorEmail, subject, html });
}

export async function sendEditorAssignmentNotification(editorEmail: string, editorName: string, articleTitle: string, authorName: string, category: string, articleId: string) {
  const { subject, html } = generateEditorTaskAssignedHtml({
    editorName,
    articleTitle,
    authorName,
    category,
    articleId
  });
  console.log("📧 Sending editor assignment to:", editorEmail);
  return sendEmail({ to: editorEmail, subject, html });
}

export async function sendArticleApprovalNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string) {
  const { subject, html } = generateArticleApprovalHtml({
    authorName,
    articleTitle,
    articleId
  });
  console.log("📧 Sending article approval to:", authorEmail);
  return sendEmail({ to: authorEmail, subject, html });
}

export async function sendArticleCorrectionNotification(authorEmail: string, authorName: string, articleTitle: string, articleId: string, editorComments?: string) {
  const { subject, html } = generateArticleCorrectionHtml({
    authorName,
    articleTitle,
    articleId,
    ...(editorComments && { editorComments })
  });
  console.log("📧 Sending article correction to:", authorEmail);
  return sendEmail({ to: authorEmail, subject, html });
}

// --- EMAIL VERIFICATION FOR ARTICLE SUBMISSION ---
export async function sendArticleVerificationEmail(
  authorEmail: string,
  authorName: string,
  token: string
) {
  const { subject, html } = generateArticleVerificationHtml({
    authorName,
    token,
    backendUrl: process.env.BACKEND_URL || 'http://localhost:4000'
  });
  console.log("📧 Sending article verification to:", authorEmail);
  return sendEmail({ to: authorEmail, subject, html });
}

// --- EMAIL VERIFICATION WITH CODE FOR ARTICLE SUBMISSION ---
export async function sendArticleVerificationCodeEmail(
  authorEmail: string,
  authorName: string,
  code: string
) {
  const { subject, html } = generateArticleVerificationCodeHtml({
    authorName,
    code
  });
  console.log("📧 Sending verification code to:", authorEmail);
  return sendEmail({ to: authorEmail, subject, html });
}

// --- EDITOR INVITATION EMAIL ---
export async function sendEditorInvitationEmail(
  editorEmail: string,
  editorName: string,
  token: string
) {
  const { subject, html } = generateEditorInvitationHtml({
    editorName,
    token,
    frontendUrl: process.env.FRONTEND_URL || 'http://localhost:3000'
  });
  console.log("📧 Sending editor invitation to:", editorEmail);
  return sendEmail({ to: editorEmail, subject, html });
}

/**
 * Send notification to admin when editor approves article
 */
export async function sendEditorApprovalNotificationToAdmin(
  adminEmail: string,
  adminName: string,
  articleTitle: string,
  editorName: string,
  articleId: string
) {
  const { subject, html } = generateEditorApprovalNotificationHtml({
    adminName,
    articleTitle,
    editorName,
    articleId
  });

  console.log("📧 Sending editor approval notification to admin:", adminEmail);
  await sendEmail({
    to: adminEmail,
    subject,
    html,
  });
}

/**
 * Send notification to uploader when article is published (with link to change history)
 */
export async function sendArticlePublishedNotification(
  uploaderEmail: string,
  uploaderName: string,
  articleTitle: string,
  articleId: string,
  diffSummary?: string
) {
  const { subject, html } = generateArticlePublishedHtml({
    authorName: uploaderName,
    articleTitle,
    articleId,
    ...(diffSummary && { diffSummary })
  });

  console.log("📧 Sending article published notification to:", uploaderEmail);
  await sendEmail({
    to: uploaderEmail,
    subject,
    html,
  });
}

// ============================================================================
// DEBUG TEST FUNCTION ONLY
// ============================================================================

/**
 * Test email configuration endpoint
 * Add this route to your server: app.get('/api/email-test', emailTestHandler)
 */
export async function emailTestHandler(req: any, res: any) {
  try {
    console.log("=== Email Configuration Test ===");
    
    // Check environment variables
    const envCheck = {
      EMAIL_USER: process.env.EMAIL_USER ? "✅ Set" : "❌ Missing",
      EMAIL_PASS: process.env.EMAIL_PASS ? "✅ Set" : "❌ Missing",
      SMTP_HOST: process.env.SMTP_HOST || "smtp.gmail.com (default)",
      SMTP_PORT: process.env.SMTP_PORT || "587 (default)",
      SMTP_SECURE: process.env.SMTP_SECURE || "false (default)",
      SMTP_FROM: process.env.SMTP_FROM || "Not set",
    };
    
    console.log("Environment check:", envCheck);
    
    // Test connection
    await transporter.verify();
    console.log("✅ SMTP connection verified");
    
    // Send test email
    const testEmail = process.env.EMAIL_USER || "test@example.com";
    const testInfo = await transporter.sendMail({
      from: process.env.SMTP_FROM || process.env.EMAIL_USER,
      to: testEmail,
      subject: 'Test Email from Render Deployment',
      text: 'This is a test email sent from your Render deployment.',
      html: `
        <h1>Test Email</h1>
        <p>This email was sent from your Render deployment.</p>
        <p><strong>Time:</strong> ${new Date().toISOString()}</p>
        <p><strong>Environment:</strong> ${process.env.NODE_ENV || 'development'}</p>
      `,
    });
    
    console.log("✅ Test email sent successfully");
    console.log("Message ID:", testInfo.messageId);
    
    res.json({
      success: true,
      message: "Email configuration is working correctly",
      testEmailSentTo: testEmail,
      messageId: testInfo.messageId,
      environment: envCheck,
    });
    
  } catch (error: any) {
    console.error("❌ Email test failed:", error.message);
    console.error("Error code:", error.code);
    console.error("Error response:", error.response);
    
    res.status(500).json({
      success: false,
      error: error.message,
      code: error.code,
      response: error.response,
      suggestions: [
        "Check if EMAIL_USER and EMAIL_PASS are correct",
        "For Gmail, use App Password (16 characters) not regular password",
        "Enable 2-factor authentication on Google account",
        "Try different SMTP service like Elastic Email or SendGrid",
      ],
    });
  }
}