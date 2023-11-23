export function isValidTimeFormat(timeString:string) {
    // Regular expression for the "HH:mm:ss" format
    var timeFormat = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
  
    // Test the input string against the regular expression
    return timeFormat.test(timeString);
  }