import validator from 'validator';

// validation logic
export const validateInputs = (type: string, inputText: string | string[]): boolean | string => {
  switch (type) {
    case 'string': {
      if (typeof inputText === 'string') {
        if (inputText.trim()) {
          const strings = /^[A-Za-z0-9'\-,(,),@,:,#./\s]+$/i;
          return inputText.match(strings) !== null;
        }
        return 'empty';
      }
      break;
    }

    case 'symbolWithOneAlphanumeric': {
      if (typeof inputText === 'string') {
        if (inputText.trim()) {
          const symbolWithOneAlphanumeric = /^[^%]*[a-zA-Z0-9][^\n]*$/;
          return symbolWithOneAlphanumeric.test(inputText);
        }
        return 'empty';
      }
      break;
    }

    case 'dotWithOneAlphanumeric': {
      if (typeof inputText === 'string') {
        if (inputText.trim()) {
          const dotWithOneAlphanumeric = /^(?![\s.])[a-zA-Z0-9. ]+$/;
          return dotWithOneAlphanumeric.test(inputText);
        }
        return 'empty';
      }
      break;
    }

    case 'symbolWithOneAlphabatics': {
      if (typeof inputText === 'string') {
        const symbolWithOneAlphabatics = /^(?=.*[a-zA-Z])[\S\s]+$/;
        return symbolWithOneAlphabatics.test(inputText);
      }
      return 'empty';
    }

    case 'alphabetics': {
      if (typeof inputText === 'string') {
        const alphabetics = /^[a-zA-Z\s]+$/i;
        return alphabetics.test(inputText);
      }
      return 'empty';
    }

    case 'Alphanumeric': {
      if (typeof inputText === 'string') {
        const Alphanumeric = /^[0-9a-zA-Z ]+$/i;
        return Alphanumeric.test(inputText);
      }
      return 'empty';
    }

    case 'spaces': {
      if (typeof inputText === 'string') {
        const Spaces = /^ *$/;
        return Spaces.test(inputText);
      }
      return 'empty';
    }

    case 'phoneNumberHyphon': {
      if (typeof inputText === 'string') {
        const numbers = /^[0-9 -]+$/i;
        return numbers.test(inputText);
      }
      return 'empty';
    }

    case 'emails': {
      if (Array.isArray(inputText) && inputText.length > 0) {
        const emails =
          /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const emailsArr = inputText.map((data) => emails.test(data));
        const allEqualEmails = (arr: boolean[]) => arr.every(Boolean);
        return allEqualEmails(emailsArr);
      }
      return 'empty';
    }

    case 'email': {
      if (typeof inputText === 'string') {
        const emails =
          /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,3})$/;
        return emails.test(inputText);
      }
      return 'empty';
    }

    case 'mobilenumber': {
      if (inputText.length > 0 && !Array.isArray(inputText)) {
        return validator.isMobilePhone(inputText);
      }
      return 'empty';
    }

    case 'mobilenumber': {
      if (inputText.length > 0 && !Array.isArray(inputText)) {
        const mobilenumber = /^\+?\d{10,15}$/;
        return mobilenumber.test(inputText);
      }
      return 'empty';
    }

    case 'mobilenumbers': {
      if (Array.isArray(inputText) && inputText.length > 0) {
        const mobilenumbers = /^\+?\d{10,15}$/;
        const newArr = inputText.map((data) => mobilenumbers.test(data));
        const allEqual = (arr: boolean[]) => arr.every(Boolean);
        return allEqual(newArr);
      }
      return 'empty';
    }

    case 'password': {
      if (typeof inputText === 'string') {
        if (inputText.length > 50) {
          return false;
        } else {
          return (
            /(?=.{8,50})/.test(inputText) &&
            /^(?=.*[~`!@#$%^&*()--+={}[\]|\\:;"'<>,.?/_₹]).*$/.test(inputText) &&
            /[a-z]/.test(inputText) &&
            /[0-9]/.test(inputText) &&
            /[A-Z]/.test(inputText) &&
            /^\S*$/.test(inputText)
          );
        }
      }
      return 'empty';
    }

    case 'required': {
      if (
        inputText &&
        (typeof inputText === 'string' ||
          typeof inputText === 'boolean' ||
          typeof inputText === 'number' ||
          typeof inputText === 'object')
      ) {
        return true;
      }
      return 'empty';
    }

    case 'consecsutivespace': {
      if (typeof inputText === 'string') {
        const strings = /\s{3,}/;
        return strings.test(inputText);
      }
      return 'empty';
    }

    case 'nameWithHyphenAndDot':
    case 'websiteurl':
    case 'websiteDomain':
    case 'url':
    case 'pincode':
    case 'onlynumber':
    case 'phoneformat':
    case 'decimaltwodigit':
    case 'decimalsingledigit': {
      if (typeof inputText === 'string') {
        const regexPattern = getRegex(type);
        if (!regexPattern) {
          return false;
        }
        return regexPattern.test(inputText);
      }
      return 'empty';
    }

    case 'amount': {
      if (typeof inputText === 'string') {
        const number = /^(?!0+(\.0+)?$)\d+(\.\d+)?$/i;
        return number.test(inputText);
      }
      return 'empty';
    }

    case 'subdomain': {
      if (typeof inputText === 'string') {
        const regex = /^[a-zA-Z0-9](?:[a-zA-Z0-9\-]{0,61}[a-zA-Z0-9])?$/;
        return regex.test(inputText);
      }
      return 'empty';
    }

    default:
      break;
  }
  return type;
};

export const getRegex = (type: string): RegExp | null => {
  switch (type) {
    case 'string': {
      return /^[A-Za-z0-9'\-,(,),@,:,#./\s]+$/i;
    }

    case 'symbolWithOneAlphanumeric': {
      return /^[^%]*[a-zA-Z0-9][^\n]*$/;
    }

    case 'dotWithOneAlphanumeric': {
      return /^(?![\s.])[a-zA-Z0-9. ]+$/;
    }

    case 'symbolWithOneAlphabatics': {
      return /^(?=.*[a-zA-Z])[\S\s]+$/;
    }

    case 'websiteurl': {
      return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[\w-]+([\\.]{1}[\w-]+)*\.[a-z]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
    }

    case 'websiteDomain': {
      return /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[\w-]+([\\.]{1}[\w-]+)*\.[a-z]{2,5}$/;
    }

    case 'alphabetics': {
      return /^[a-zA-Z\s]+$/i;
    }

    case 'Alphanumeric': {
      return /^[0-9a-zA-Z ]+$/i;
    }

    case 'spaces': {
      return /^ *$/;
    }

    case 'phoneNumberHyphon': {
      return /^[0-9 -]+$/i;
    }

    case 'emails': {
      return /^(([^<>()\]\\.,;:\s@"]+(\.[^<>()\]\\.,;:\s@"]+)*)|(".+"))@(([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3})|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    }

    case 'email': {
      return /^(?:[A-Za-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:|\\)*")@(?:(?:[a-zA-Z0-9](?:[a-zA-Z0-9-]*[a-zA-Z0-9])?\.)+[a-zA-Z]{2,3})$/;
    }

    case 'mobilenumber': {
      return /^\+?\d{10,15}$/;
    }

    case 'onlynumber': {
      return /^[0-9\s]+$/i;
    }

    case 'pincode': {
      return /^[A-Za-z0-9 ]{3,10}$/;
    }

    case 'decimal': {
      return /^\d+(\.\d{2})?$/;
    }

    case 'decimaltwodigit': {
      return /^\d+(\.\d{0,2})?$/;
    }

    case 'decimalsingledigit': {
      return /^\d+(\.\d{0,1})?$/;
    }

    case 'phoneformat': {
      return /^\+?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/;
    }

    case 'amount': {
      return /^(?!0+(\.0+)?$)\d+(\.\d+)?$/i;
    }

    case 'url': {
      return /^(https?:\/\/)?(localhost:\d+|[\w-]+(\.[\w-]+)+|[\d]{1,3}(\.[\d]{1,3}){3})(:\d+)?(\/[^\s]*)?$/i;
    }

    case 'nameWithHyphenAndDot': {
      return /^[a-zA-Z][a-zA-Z0-9\s().-]*$/i;
    }

    default:
      break;
  }
  return null;
};
