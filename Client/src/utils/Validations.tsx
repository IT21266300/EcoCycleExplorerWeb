export class Validation {
  private static addressPattern: RegExp =
    /\b(?:\d{1,5}\s)?(?:House|Street|St|Avenue|Ave|Road|Rd|Boulevard|Blvd|Lane|Ln|Drive|Dr|Court|Ct|Country)\b/i;

  private static phoneNumberPattern: RegExp = new RegExp(
    /^(?:\+?\d{1,3})?[\s.-]?\(?\d{1,4}\)?[\s.-]?\d{1,4}[\s.-]?\d{1,4}[\s.-]?\d{1,9}$/,
  );

  private static emailPattern: RegExp = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
  );

  private static urlPattern: RegExp = new RegExp(/^(http|https):\/\/[^ "]+$/);

  private static datePattern: RegExp = new RegExp(
    /\b(?:\d{1,2}[\/\-.])?(?:\d{1,2}[\/\-.])?\d{2,4}\b|\b(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\b\s+\d{1,2},?\s+\d{2,4}/i,
  );

  private static moneyPattern: RegExp = new RegExp(
    /\b\d+(?:,\d{3})*(?:\.\d{1,2})?\s?(?:USD|LKR|\$|€|£|₹|¥)?\b/,
  );

  private static accountNumberPattern: RegExp = new RegExp(
    /\b(?:\d{4}[-\s]?){3,4}\d{4,6}\b/,
  );

  public static validateAddress(address: string): boolean {
    return Validation.addressPattern.test(address);
  }

  public static validatePhoneNumber(phoneNumber: string): boolean {
    return Validation.phoneNumberPattern.test(phoneNumber);
  }

  public static validateEmail(email: string): boolean {
    return Validation.emailPattern.test(email);
  }

  public static validateWebsite(website: string): boolean {
    return Validation.urlPattern.test(website);
  }

  public static validateDate(dateString: string): boolean {
    return Validation.datePattern.test(dateString);
  }

  public static validateMoney(moneyString: string): boolean {
    return Validation.moneyPattern.test(moneyString);
  }

  public static validateAccountNumber(accountString: string): boolean {
    return Validation.accountNumberPattern.test(accountString);
  }

  public static detectPersonalDetails(text: string): boolean {
    return (
      Validation.validateAddress(text) ||
      Validation.validatePhoneNumber(text) ||
      Validation.validateEmail(text)
      // Validation.validateWebsite(text) ||
      // Validation.validateDate(text) ||
      // Validation.validateMoney(text) ||
      // Validation.validateAccountNumber(text)
    );
  }
}
