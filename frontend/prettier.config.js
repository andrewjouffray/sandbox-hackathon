module.exports = {
    // Set the print width (max number of characters per line)
    printWidth: 80,
  
    // Indentation settings
    tabWidth: 2, // Number of spaces per indentation level
    useTabs: false, // Indentation with spaces (set to `true` if you prefer tabs)
  
    // Whether or not to semicolon at the end of statements
    semi: true,
  
    // Whether to use single quotes (`'`) or double quotes (`"`) for strings
    singleQuote: true,
  
    // Use trailing commas where valid in ES5 (objects, arrays, etc.)
    trailingComma: 'es5', // options are "none", "es5", "all"
  
    // Whether to include spaces inside of curly braces
    bracketSpacing: true,
  
    // Enclose the jsx elements with parentheses (when multiline)
    jsxBracketSameLine: false,
  
    // Ternary operators: 'always' or 'avoid'
    arrowParens: 'always',
  
    // Sort import statements alphabetically
    importOrder: ['^[a-z]', '^[A-Z]', '^[.]/', '^[./]'],
  
    // End of line character handling
    endOfLine: 'lf', // or 'crlf' or 'auto'
  
    // Whether to format HTML, JSX, or Vue files
    htmlWhitespaceSensitivity: 'ignore', // or "css", or "strict"
  
    // This option is used to ignore formatting for files that are not of the types listed in `overrides`
    overrides: [
      {
        files: ['*.css', '*.scss', '*.less'],
        options: {
          singleQuote: false, // Use double quotes for CSS
        },
      },
      {
        files: ['*.json'],
        options: {
          printWidth: 120, // JSON files typically have longer lines, adjust print width for those
        },
      },
    ],
  };
  