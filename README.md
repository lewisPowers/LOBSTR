# ___LOBSTR ASSETS___

## ___Frontend CSV generator using Javascript___

### Allows users to quickly generate a spreadsheet of all assets & respective data

- Get all your assets complied into a CSV-readable format
 
- Data extracted includes: 
   - Asset name
   - Token symbol
   - Amount of tokens
   - Value of tokens
   - Domain name 
   - Issuer address
 
- Compatible with any spreadsheet software
 
- Compatible on all browsers

- Data is extracted on the client side - no worries about third party interference or needless HTTP requests

- Generate a new, updated spreadsheet as often as you want

- Helpful Tip: Save your .CSV file as a .XSLX file to preserve your spreadsheet formatting.
 
- Extra features:
  - Displays the counts of your total trustlines and 'uncharted' assets on the browser window
  - Displays the total balance of all your assets
  - Asset filter: filter and get count of all of your assets that match your search text

## ___What you need___

- Desktop or laptop computer with:
  - Your preferred Web Browser
  - Your preferred Text Editor: Notepad, TextEdit, VSCode, Atom, Sublime Text, etc.
  - Note: Not all text editors will work. For instance, TextEdit is not a good option
  - Your preferred Spreadsheet Software: Excel, Numbers, etc.

## ___Directions___

##### Note: click any image to get an enlarged version in a new tab!

- Log in to your lobstr account and navigate to your assets page; 
  - Open dev tools (right click on your browser window, click 'inspect')
  - Click on 'console' tab
  
  <img height="250" alt="Screen Shot 2022-08-13 at 8 32 34 PM" src="https://user-images.githubusercontent.com/52840741/184521315-353de06f-3da6-4b5d-a531-1c0996f9f50a.png"> <img height="250" alt="Screen Shot X" src="https://user-images.githubusercontent.com/52840741/184521597-05d370e6-22d7-4651-9543-08c014795149.png"> <img height="250" alt="Screen Shot 2022-08-13 at 8 33 26 PM" src="https://user-images.githubusercontent.com/52840741/184521339-ba6cbecc-c4c5-4cc9-b155-40966e243673.png">

- Go to github.com/lewisPowers/LOBSTR (you're here!), click on lobstr.js file & click copy icon 

  <img height="260" alt="Screen Shot 2022-08-13 at 8 39 03 PM" src="https://user-images.githubusercontent.com/52840741/184521482-8f0ab5aa-bf3e-41b1-99ef-973fe591f876.png"> <img height="260" alt="Screen Shot 2022-08-13 at 3 33 45 PM" src="https://user-images.githubusercontent.com/52840741/184521384-1a3a5f38-1d34-48bf-a88e-9b9a37691382.png">
 
- Some browsers may not show a copy icon. In that case, instead click 'Raw' then select all and copy from there

  <img height="260" alt="raw-circled" src="https://user-images.githubusercontent.com/52840741/184756465-05041b43-0ebb-4808-a310-8092d9a11a17.png"> <img height="260" alt="Screen Shot 2022-08-15 at 4 52 15 PM" src="https://user-images.githubusercontent.com/52840741/184756476-1c661d9f-c501-4b97-9925-b56e97acb2af.png">
 
- Click back to your assets page;
  - Paste code from lobstr.js file (that we copied in the previous step) into console
  - Press 'enter' or 'return' to run the code
  
  
  <img width="300" alt="Screen Shot 2022-08-13 at 8 26 05 PM" src="https://user-images.githubusercontent.com/52840741/184521395-375bf03a-76c0-4d54-b230-d29b46f1af10.png">

- Copy the string that is generated in the console

  <img width="500" alt="Screen Shot 2022-08-13 at 8 26 45 PM" src="https://user-images.githubusercontent.com/52840741/184521404-df45cf0c-e6fc-4cbc-ab8c-4ba0d77b7349.png">
  
  
- In Firefox, right click on message and click 'Copy Object'
  
  <img width="500" alt="Screen Shot 2022-08-14 at 1 59 55 PM" src="https://user-images.githubusercontent.com/52840741/184554773-9cc5ae27-77c4-4a11-8ef1-cadc14ef8924.png">
  
- If you're using Safari and not seeing the output, this screenshot and link may be helpful:

<img width="500" alt="Screen Shot 2022-09-16 at 4 53 31 PM" src="https://user-images.githubusercontent.com/52840741/190834887-a03dbd9c-43c3-4320-8139-f2be80d734d5.png">

[Safari console log solution](https://stackoverflow.com/questions/12015540/console-log-doesnt-work-in-safari-6-0-web-inspector)  
  
- Notice the new information displayed on the webpage?

  <img width="237" alt="Screen Shot 2022-08-13 at 8 51 03 PM" src="https://user-images.githubusercontent.com/52840741/184521689-14b3de55-4a6a-4941-b0e2-6c7e743a7a2f.png">

- Paste text string into any text editor.
  - Text editors: Notepad, TextEdit, VSCode, Atom, Sublime Text, etc.
    - Notepad comes preinstalled on Windows
    - TextEdit comes preinstalled on Mac (you'll need an extra step: see next line)
      - Open TextEdit, then at top menu click TextEdit > Preferences
      - Under 'Format' toggle from 'Rich text' over to 'Plain text'
  - Save file as .csv file
  - Open your new .csv file in any spreadsheet software
  
  <img height="180" alt="Screen Shot 2022-08-13 at 8 28 43 PM" src="https://user-images.githubusercontent.com/52840741/184521421-d72c5890-27c2-49c1-b62e-4eea59c0272a.png"> <img height="180" alt="Screen Shot 2022-08-13 at 9 12 30 PM" src="https://user-images.githubusercontent.com/52840741/184522185-a4e0e736-dfab-47fa-9e40-10f60d04f95d.png">

  <img width="650" alt="Screen Shot 2022-08-13 at 8 30 05 PM" src="https://user-images.githubusercontent.com/52840741/184521424-47635c18-f2d5-430b-a0c9-86c0d3dd5272.png">

  <img width="650" alt="Screen Shot 2022-08-13 at 8 31 10 PM" src="https://user-images.githubusercontent.com/52840741/184521436-60ed045e-6512-4573-91ad-2de7dac5fc03.png">
  
### Repeat this process as often as you'd like to make a snapshot of your assets & respective info, anytime!

  - #### Want a list of ONLY your filtered assets?

  - #### Just type 'csv()' into the console and press Enter!

### [Watch Video Tutorial](https://youtu.be/EVYUjsRSu9U "Watch tutorial")

### [Cheatsheet & FAQ](https://docs.google.com/document/d/1mYQdCSH4qxHTqy9oGd49UH2HLA0PU5u4HPtqDZnJKqQ/edit?usp=sharing "Get the cheatsheet")
 
Is this program helpful for you? 

Is there additional features you'd like to see? 

Would you like to collaborate and help make this better? 

Please feel free to let me know! Telegram: @Aquarian_Diver

### ___Donations___

#### xlmlp*lobstr.co

#### Thank you for your support!

# Changelog

  - 23 Aug '22: Filter system added; element styles edited; call function w/ 'csv()'
  - 24 Aug '22: Removed currency symbol from 'currency_amount' rows; added symbol to 'currency_amount' column title
  - 16 Sep '22: Bug in total balance fixed; extra info for Safari users 
