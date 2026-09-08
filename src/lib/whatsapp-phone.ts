const DEFAULT_COUNTRY = "58"

/** E.164 digits only. Venezuela: 0412… → 58412… */
export function normalizeWhatsAppPhone(raw: string, country = DEFAULT_COUNTRY): string {
  let digits = raw.replace(/\D/g, "")
  if (digits.startsWith("00")) digits = digits.slice(2)

  if (digits.startsWith(country) && digits.length >= country.length + 10) {
    const rest = digits.slice(country.length)
    return rest.startsWith("0") ? country + rest.slice(1) : digits
  }

  if (digits.startsWith("0") && digits.length >= 10) {
    return country + digits.slice(1)
  }

  if (digits.length === 10 && digits.startsWith("4")) {
    return country + digits
  }

  return digits
}

export function whatsappChatUrl(phone: string, text: string) {
  const params = new URLSearchParams({
    phone: normalizeWhatsAppPhone(phone),
    text,
    type: "phone_number",
    app_absent: "0",
  })
  return `https://api.whatsapp.com/send/?${params.toString()}`
}
