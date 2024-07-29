export const formatIndianCurrency = (number) => {
  // Convert the number to a string
  let numStr = number.toString();
  
  // Split the number into integer and decimal parts (if any)
  let [integerPart, decimalPart] = numStr.split('.');
  
  // Reverse the integer part for easier processing
  let reversedIntegerPart = integerPart.split('').reverse().join('');
  
  // Insert commas
  let parts = [];
  for (let i = 0; i < reversedIntegerPart.length; i++) {
      if (i === 3) {
          parts.push(',');
      } else if ((i - 3) % 2 === 0 && i > 3) {
          parts.push(',');
      }
      parts.push(reversedIntegerPart[i]);
  }
  
  // Reverse back and join the integer part
  let formattedIntegerPart = parts.reverse().join('');
  
  // Concatenate integer and decimal parts
  if (decimalPart) {
      return `${formattedIntegerPart}.${decimalPart}`;
  } else {
      return formattedIntegerPart;
  }
}