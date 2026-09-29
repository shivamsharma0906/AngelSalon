import { siteConfig } from '../data/site';

export interface WhatsAppLinkParams {
  phone?: string;
  message: string;
}

/**
 * Standardizes a phone number for WhatsApp:
 * Removes any '+', spaces, dashes, or parentheses.
 * If 10 digits (e.g. 07303312054 or 7303312054), formats with Indian country code 91.
 */
export function cleanWhatsAppNumber(phone?: string): string {
  if (!phone) {
    return siteConfig.contact.whatsappNumber; // '917303312054'
  }
  // Strip all non-numeric characters
  let cleaned = phone.replace(/\D/g, '');

  // Strip leading 0 if 11 digits (e.g. 07303312054 -> 7303312054)
  if (cleaned.length === 11 && cleaned.startsWith('0')) {
    cleaned = cleaned.substring(1);
  }

  // Prepend country code 91 if standard 10-digit Indian number
  if (cleaned.length === 10) {
    cleaned = `91${cleaned}`;
  }

  return cleaned;
}

/**
 * Builds standard WhatsApp link adhering strictly to:
 * https://wa.me/<number-with-country-code-no-plus>?text=<encodeURIComponent(message)>
 * Do NOT use intent:// links as they fail on iOS and desktop browsers.
 */
export function buildWhatsAppLink({ phone, message }: WhatsAppLinkParams): string {
  const targetNumber = cleanWhatsAppNumber(phone);
  const encodedMessage = encodeURIComponent(message.trim());
  return `https://wa.me/${targetNumber}?text=${encodedMessage}`;
}

/**
 * Contextual WhatsApp link builder for specific Salon Service bookings
 */
export function buildServiceBookingLink(serviceName: string, branchName: string = "Ghatkopar East"): string {
  const message = `Hi Angels Salon & Academy! I would like to book an appointment for "${serviceName}" at your ${branchName} branch. Please share available time slots.`;
  return buildWhatsAppLink({ message });
}

/**
 * Contextual WhatsApp link builder for Academy Course inquiries
 */
export function buildCourseEnquiryLink(courseName: string): string {
  const message = `Hello Angels Academy team! I am interested in enrolling in the "${courseName}". Could you please share the upcoming batch schedule, syllabus details, and admission process?`;
  return buildWhatsAppLink({ message });
}

/**
 * Contextual WhatsApp link builder for direct branch visits
 */
export function buildBranchVisitLink(branchName: string): string {
  const message = `Hi Angels Salon, I would like to schedule a visit/consultation at your ${branchName} branch. What are your available hours today?`;
  return buildWhatsAppLink({ message });
}

/**
 * Full inquiry form WhatsApp message generator
 */
export function buildFormInquiryLink(data: {
  name: string;
  phone: string;
  branch: string;
  serviceOrCourse: string;
  preferredDate?: string;
  preferredTime?: string;
  notes?: string;
}): string {
  const lines = [
    `✨ *New Appointment & Inquiry Request - Angels Salon & Academy*`,
    ``,
    `👤 *Name:* ${data.name.trim()}`,
    `📞 *Phone:* ${data.phone.trim()}`,
    `📍 *Branch:* ${data.branch}`,
    `✂️ *Service / Course:* ${data.serviceOrCourse}`,
  ];

  if (data.preferredDate) {
    lines.push(`📅 *Preferred Date:* ${data.preferredDate}`);
  }
  if (data.preferredTime) {
    lines.push(`🕒 *Preferred Time:* ${data.preferredTime}`);
  }
  if (data.notes && data.notes.trim()) {
    lines.push(`📝 *Message:* ${data.notes.trim()}`);
  }

  lines.push(``);
  lines.push(`Please confirm availability. Thank you!`);

  return buildWhatsAppLink({ message: lines.join('\n') });
}

/**
 * Contextual WhatsApp link builder for Retail Product orders and inquiries
 */
export function buildProductOrderLink(productName: string, price: string): string {
  const message = `Hi Angels Salon & Academy! I would like to purchase / inquire about "${productName}" (${price}). Could you please confirm if this product is in stock at your Ghatkopar East salon?`;
  return buildWhatsAppLink({ message });
}
