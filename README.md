# FavShield

FavShield is an open-source JavaScript tool that enhances the security and integrity of web pages by verifying the integrity of the entire page, including linked files such as favicons, stylesheets, and scripts.

## Motivations

In today's digital landscape, security and data privacy are of utmost importance. FavShield was created to address the following key motivations:

- **Enhanced Security**: By verifying the integrity of web pages, including favicons and linked files, FavShield adds an additional layer of security to web applications, helping to prevent unauthorized modifications and tampering.

- **Client-side Password Encryption**: FavShield can be used in conjunction with recommended client-side encryption libraries (such as [CryptoJS](https://github.com/crypto-js/crypto-js) or [Web Crypto API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)) to enable client-side encryption of passwords. This ensures that sensitive user information, such as passwords, is encrypted locally and never appears in clear text in the server's memory, mitigating the risk of data breaches.

- **User Trust and Confidence**: By providing a reliable method to verify the integrity of web pages, FavShield instills trust and confidence in users, assuring them that the page they are interacting with has not been compromised or tampered with.

- **Ease of Integration**: FavShield is designed to be easily integrated into existing web applications or frameworks, allowing developers to enhance the security of their projects with minimal effort and complexity.

We believe that by addressing these motivations, FavShield contributes to a safer and more secure web browsing experience for both developers and end-users.


## Key Features

- Calculates the hash of the entire web page content, including linked files, using the SHA-256 algorithm.
- Compares the calculated hash with a predefined hash to ensure the integrity of the page.
- Provides an extra layer of security by allowing users to verify that no modifications have been made to the page or its linked files.
- Works seamlessly with modern web browsers and supports secure HTTPS connections.
- Easy to integrate into existing web applications or frameworks.

## Why Favlet is a Suitable Tool

Favlet is a particularly suitable tool for this task for several reasons:

1. **Ease of Use**: As a user, you only need to copy the favlet to your bookmarks or favorites once. After that, you can quickly and easily use it with a single click whenever you visit a secured page. There is no need to download or install any additional applications.

2. **Browser Compatibility**: Favlets are supported by most modern web browsers, making them accessible to a wide range of users. It eliminates the need for users to install browser extensions or plugins, simplifying the adoption and usage process.

3. **No Dependencies**: Favlets rely on JavaScript, which is supported by default in web browsers. Therefore, users do not need to install any additional software or libraries to utilize the favlet functionality. It reduces the barriers to entry and ensures a seamless user experience.

4. **Portability**: Favlets are portable snippets of code that can be easily shared and distributed. Developers can provide the favlet code on an information page, making it accessible to users without requiring them to navigate complex installation procedures. It promotes easy adoption and usage across different platforms and devices.

By leveraging the power of favlets, FavShield enhances the security of web applications while maintaining user convenience and compatibility across various browsers.

Alternatively, you _may_ code your own webbrowser extension.

## Usage

### Warning

This project is intended as a proof of concept and should be treated as such. Any implementation in a production environment requires a thorough review by a security expert. FavShield is just one component in a comprehensive security chain, which effectiveness is only as strong as its weakest link.

It is important to note that FavShield alone cannot guarantee complete security for your applications. It is essential to consider other security measures, such as secure network communication, server-side validation, input sanitization, and regular security audits.

**The code provided is offered "as is" without any warranties. It can be freely used, but users assume all risks and liabilities associated with its use**. It is strongly recommended to test and assess the code thoroughly in your own environment before deploying it.

Always prioritize the security of your applications and consult with experts to ensure comprehensive protection against potential vulnerabilities.

### For Developers (Setting up FavShield)

1. Create the final version of the web page containing the form you want to secure:
   1. ensure that the relevant fields (e.g., submit button, password field) are locked using the `disabled` attribute,
   2. add the `data-js-secured="true"` html attribut to those same fields,
   3. include a link to the information page (step 3) within the page;
2. Use the FavShield hashing favlet to obtain the hash of the secured web page;
3. Create a favlet that verify the integrity of the page and enable the fieds if it's OK:
   1. grab the source code from the [original source file](https://github.com/taophp/FavShield/blob/main/src/check.js),
   2. paste the hash of your page at the relevant place (tips: line 2),
   3. minify your new source[^1];
4. Create an information page that provides the favlet link, along with the hash of the secured page and instructions on how to use it:
   1. copy and paste the minified code into the `href` attribute of an html `<a>` tag **using simple quotes** `'`,
   2. do not forget to prefix your code with the pseudo-protocol `javascript:`.

### For Users (Using FavShield)

1. Visit the information page provided by the developer.
2. Copy the favlet to your bookmarks or favorites.
3. Navigate to the secured web page that requires unlocking.
4. Use the favlet from your bookmarks to unlock the form and enable interaction.
   - Note: For future visits, only steps 3 and 4 are necessary.

Make sure to provide clear instructions and guidance on the information page to help users understand how to use the favlet effectively.

## Demo

This repository embed a demo page : clone this repository, start a web server in the `demo` directory (`php -S localhost:8080` for example) and open your browser on the index page, (http://localhost:8080 in our example).

Or you can visit [our online demo](https://favshield.pixyblue.com).

## Browsers compatibility

FavShield is tested and works with Chromium and Firefox. Indeed, there is a <em>really old</em> [bug affecting Firefox](https://bugzilla.mozilla.org/show_bug.cgi?id=866522) that prevents favlets execution with some CSP policies, so you should avoid those policies or Firefox to use FavShield.

## Contribution

Contributions to FavShield are welcome! Whether you want to add new features, improve existing functionality, or report issues, feel free to submit a pull request or open an issue.

## License

FavShield is released under the [MIT License](https://github.com/taophp/FavShield/blob/main/LICENSE), making it free and open-source for everyone to use and modify.

[^1]: Beware that some minifiers may alter quotes in a way that breaks the favlet. We avoid the use of simple quotes `'`, reserving it for the HTML `<a>` tag supporting the favlet URL, so we have to [escape some double quotes in our source code](https://github.com/taophp/FavShield/blob/main/src/check.js#L50). Some minifiers replace them with simple quotes, which makes sense, but breaks the ability to use the script as an URL within simple quotes. If your favlet does not work, check that first.