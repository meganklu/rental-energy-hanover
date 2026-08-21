# AI Use

Generative AI was used to build this website. This file documents the prompts used. All prompts were used with the Claude Opus 5 model. Also see [AGENTS.md](../AGENTS.md) for the general context and instructions provided.

## Documentation Creation
### 2026-08-05 Website Documentation Templates
I would like to make a website to provide information to student renters in Hanover, New Hampshire about how to make improvements to their residential rental for better energy usage and efficiency. This project is working with Sustainable Hanover. The Sustainable Hanover website already provides some information about weatherizing and home improvements, but I would like to provide a more interactive learning experience and cater toward students who have not lived in their own rental before. Before beginning actual website development, I would like to first work on necessary planning documents, including agents.md and design.md. What additional documents should I add to make the project specifications and goals as clear as possible? Please suggest these documents then create a template for me to complete.

### 2026-08-18 Style Guide
Please help me fill out the DESIGN.md file using similar design features and styling as the existing Sustainable Hanover website.

## Website Build

### 2026-08-19 Initial Build
Using the documentation guidelines, begin website development. Ask me for clarification before making design decisions. Start by implementing the home page, doll house section, and a couple of the improvements. I will provide feedback before moving to the rest of the site.

### 2026-08-19 Navigation Bar and Home Page Edits
First, add the edits to the documentation (doc folder files, DESIGN.md, etc.). Then, implement the changes on the website. These are edits for elements viewed on the home page. I have additional edits for other pages before moving to the remaining features.

Navigation bar:
- Make the logo a house icon. This icon should also be included as the icon for the browser tab
- Change the name of the site from "Rental Energy Hanover" to "Energy for Student Renters"
- Arrange the website title text and the house icon to be a logo
- Remove the "Set your situation" button from the navigation bar. I would like for this button to be a floating action button at the bottom right corner. Change the button text to "Personalize your recommendations."
- Change "The house" to "Home" 
- Change "What you can change" to "Improvements"
- Remove the "Learn" tab and put these links on the "Improvements" page
- The "You have viewed X of 10 spots." bar should not be visible until scrolling to the part of the screen that has the house. When on this section, the bar can be sticky on the top.

Hero section:
- "Welcome to your Home*" instead of "Welcome Home"
- This should look like a classic welcome door mat made out of coir. To achieve this, I would like to center all of the text. The background will be tan colored. Do not add texture or other styling to this yet. Put a black border around the headline text. In the bottom right corner (within the black border) will be the "*Rental home" note. No period after the note.
- The description text and call to action button will be centered and below the mat. 

Doll house section:
- "Click a room to open it. Click each highlighted spot to see what you can do about it."
- Remove the green background behind the house
- Have the entry and porch box as tall and in line with the living room and kitchen (one story)
- Change the icon for thermostat to be a thermometer
- Change the water heater icon to be a water droplet
- After moving to the next feature, the "start here" tab should be removed and some indicator on the spot should be added 
- Instead of a flag icon for the already visited, slightly dim the button (lower the opacity)
- There should be some indication that a certain feature is selected and the little window below is showing for that item. 
- Once all spots have been viewed, remove the next button. There should be only two buttons ("See the full steps" and "Close")
- Instead of "See the full steps", change the button text to "Learn more"
- When clicking on a room, some have different background colors (white or green)
- The preview window that opens for each spot should have the full specs featured on the main page (permission, reversibility, price, time, impact). The text for the reversibility should be consistent (not "Nothing to undo" and "Comes off at move-out").

Set your situation:
- The section with the heading "Tell us about your rental" should be removed since there is the floating action button.
- This button should open up a pop up window where the form can be completed. 
- The questions asked in this form should be the same as on the "Improvements" page. Keep the four questions for both forms. They shouldn't be separate forms. The "Personalize your recommendations" will also be a floating action button on the "Improvements" page/throughout the website and the settings set here persist throughout.

Footer:
- Make the reduce motion a toggle switch. 

### 2026-08-19 Clarification and Additional Navigation and Home Page Edits
Based on those edits, I have additional clarifications and changes. Follow the same pattern of documenting then implementing. 

Hero section:
- Only the text within the black box is part of the door mat. Make the the tan rectangle just outside of the black border. Adjust the shape of the rectangle to be taller so the dimensions are more similar to that of a door mat. 
- "Welcome" should be larger and on its own line. The text "to your Home" fits underneath this.
- The background (behind the welcome mat) will be a solid color. 

Doll house section:
- Make the progress bar just a green bar with rounded corners. When hovering over this bar, a note of "You have viewed X of 10 spots." appears. Scale this bar appropriately and have it float at the top of the screen with some margin from the top.
- Make the colors of the buttons for each spot more consistent with the style guide. 
- The next spot to look at gets a label that says "Next" like the "Start here" label. 
- Add a hover effect for the buttons to make it a more tactile experience (change the size of the button when hovering). This kind of effect should be there for all buttons.
- Instead of "Next spot: Window," just have "Next: Window."
- For the pages about things that are not upgrades (e.g., reading the bill), have a label (similar to the type of pill label for "No permission needed") that says "Renter basics." 
- The rooms still have different color backgrounds (white and light green). Make a consistent choice that matches the style guidelines.
- Change the bill icon to a dollar sign.

Personalize your recommendations:
- The "Personalize your recommendation" button should have a better hover effect so that it doesn't make the text completely disappear.
- The button for submitting the form should be further from the tab. 
- All of the radio buttons should be the same size.
- Instead of providing context with each option (e.g., forced air), this will be an underlined word where you can hover and see the glossary info. 

### 2026-08-19 Navigation Bar and Home Page Edits
Navigation bar:
- Make the house icon have the same height as the text ("Energy for Student Renters" and "In partnership...")
- Make the text and icon the same color

Hero section:
- "Welcome" is too large and goes outside the width of the door mat. 
- Make the tan rectangle the same aspect ratio of the outline but a little larger. 
- The entire welcome door mat can be larger
- Make the background of the hero section light green.

Doll house section:
- Just make all of the rooms have the same color background (not split by floors)
- Make the progress bar span the width of the section

### 2026-08-19 Navigation Bar and Hero Section Edits
Navigation bar:
- Make the house icon have the same height as the text ("Energy for Student Renters" and "In partnership..."). Consider the padding of the house icon and the text when adjusting this. There should not be a large margin in between the text and icon. 

Hero section:
- Make the tan rectangle have a 4:3 aspect ratio (rectangle that has door mat dimensions)
- The entire hero section can take up more of the width of the window

### 2026-08-20 Navigation and Home Page Edits
Navigation bar:
- The house icon is still too large. The bottom to the top of the house should be the same height as the text. Adjust the width of the house accordingly

Hero section:
- The text of the door mat should fill the black border, but not go outside/overflow. Otherwise, the layout of the text (centered and two lines) looks good
- Let's try making the background grey instead of green. Try a bluestone like ground behind the door mat

Doll house section:
- Put the instructions ("Click a room...") in a callout window that you can hover over a help question mark to view. Put the question mark next to the "Tour a rental..." heading

### 2026-08-20 Navigation Bar, Home Page, and Article Pages Edits
First, add the edits to the documentation (doc folder files, DESIGN.md, etc.). Then, implement the changes on the website. These are edits for elements viewed on the home page. I have additional edits for other pages before moving to the remaining features.

Navigation bar:
- The house icon is still too large. Consider the padding and line height of the text. The actual text should be the same height as the house

Hero section:
- The door mat text should be even larger to take up the majority of the door mat rectangle (within the black border).
- To make the door mat look more realistic, add a shadow. Try adding coir/coconut texture 

Doll house section:
- The instructions that can be viewed when hovering are behind the house and cannot be read.

Article pages (e.g., Use a space heater safely)
- For the pill features (e.g., "Comes off at move-out", "Renter basics"), choose a consistent style in terms of colors, outlines, etc. Match the style guide. 
- For the impact rating (low, medium, high), change the icon to match the amount of impact. 
- Change the number of dollar signs depending on how high impact the change is. 
- Each article should have an svg image depicting the improvement. 
- Use the full width of the screen, not just the left side
- For the full width desktop view, put the svg depiction to the right of the text. For smaller width screens, put it below the headings and above the "What you need" section
- Make the "Why this works" a story bar that has the heading on the left side (large) and body text on the right
- "Savings" should also be a story bar with the heading on the right and body text on the left
- These story bars should have a parallax/interactive scrolling animation
- Information about where to purchase should be placed in the "What you need" information

### 2026-08-20 Navigation Bar, Home Page, Article Pages, and Improvement Page Edits
Today is 08/20/2026

Navigation bar:
- Decrease the space between the house logo and the text. These should be right next to each other
- When clicking home on the navigation bar, it immediately scrolls to the doll house section. Go back to the top of the page instead

Hero section:
- Remove the texture
- Add lines to the bluestone background like how bluestone tiles would be arranged. These lines should be subtle
- To show that this is a welcome door mat, add shoes to the bottom left corner. These should be simple laced gym shoes that are a green in the color palette 

Doll house section:
- When personalizing recommendations, certain improvements should not be shown in the house. Only show the relevant recommendations in the house. Also edit the list shown underneath the house ("Everything in this house" section) based on what recommendations are relevant
- After clicking an article from the house section, there should be a button on the article page near the breadcrumbs to go back to the doll house section

Article pages:
- Why are there multiple dollar signs next to the impact rating? The multiple dollar signs is for the price (more dollar signs -> more expensive improvement)
- The image should only be to the right of the title and ratings. If there is a safety note, this should take up the full width of the screen and be below this
- Give the story bars a different background color. Make the two story bars touching each other. Make the header text of the story bar larger. This may mean making the story bar larger/taller

Improvements page:
- There does not need to be a filter here. The only filter is the "Personalize your recommendations" floating action button.
- Remove the description right below that says "Every improvement..." Avoid using these unnecessary descriptions that over explain.
- Put the learn section articles at the top of the page in a section with a different colored background. Remove the "Learn" and "Short explainers..." Make the title "Rental basics"
- Remove the text that says "Start here" and "Enabler" on the renter basics articles
- Put the renter basics in a line that can be horizontal scrolled like a carousal that focuses on one element at a time, but the other elements can be seen in the background
- Put the icon used in the doll house to the left of the improvement article title
- Instead of having "No permission needed" above, include the full specs (permission, reversibility, price, etc.) in the same format as the cards when clicking on the doll house tour
- The learn page has not actually be removed. It has only been removed from the navigation bar. Please delete the page and edit the breadcrumbs of renter basics articles accordingly 
- Make an option to sort the improvements by a certain criteria like price, time, etc.
- The "showing all X improvements" should say "showing X of Y improvements" depending on how many get filtered out

### 2026-08-20 Navigation Bar and Home Page Edits
Navigation bar:
- The icon is too far from the text. I want the house icon directly next to the "Energy for Student Renters" text. Consider the padding/margins around both objects when putting these directly next to each other

Hero section:
- Instead of a brick like grid, I would like the bluestone tiles to be asymmetric with different sized and shaped tiles. These tiles should also be a proportional size to the door mat, so they should be larger
- The shoes should be a birds eye view. The two shoes should be parallel to each other. The shoes should also be proportional to the door mat (larger than they are currrently)
- I like the dark green for the shoes instead of the light green. Maybe make the dark green with black and white details (e.g., black border and white shoelaces)

Doll house section:
- The maximum length of the progress bar should be when it is 100% complete. If it goes above this (e.g., 6 of 3 recommendations viewed if the user viewed articles then personalized recommendations), it should not go beyond this maximum width
- Have a reset icon button to the right of the progress bar. Adjust the progress bar to fit this in. This button should move with the bar (sticky on the screen). The reset button will make all of the spots unviewed and bring back the "Start here" spot label in the house

### 2026-08-21 Home Page, Article Pages, Improvements Page Edits

Home page:
- I would like the pattern of the bluestone to be all rectangles of different sizes
- Please make the shoes larger to be proportional to the door mat size
- Add a white color toe part in the front of the shoe like Converse. Also, shoe the hole for the foot at the back of the shoe
- The restart icon has the head of the arrow in the wrong direction/a weird place

Article pages:
- Only show the "Go back to the house" button when the article page was accessed from the house if there is a simple way to do this. If adding this would require significant code, just keep the button at all times
- For the price symbol, show only the number of dollar signs corresponding to the price range instead of one larger $ then smaller dollar signs corresponding to the price. For example, if the price was in the under $25 range, have one $. If it is in the next price range, have $$, not just some of the dollar signs in a different color
- Increase vertical spacing between sections, especially separating the story bars out so the animation can be seen
- Have the story bars background span the width of the window. The text can stay where it is
- Animate the svg icon. These animations should loop To maintain accessibility standards, let's make another floating action on the top right of the screen that has the reduce motion toggle and a pause button when relevant (any screen where there is an animation). Because of this change, the pause buttons on the renter basic learn pages can be removed
- Make the renter basics pages a similar format to the improvement pages. I have additional specific changes for the renter basics pages, but I will add these later

Improvements page:
- Have the main heading "Improvements" at the top of the page. Below that is the section "Rental basics". Lastly, there are the cards for all the improvement lists 
- Have the rental basics section background span the full width of the screen
- Make the bottom of the rental basics spection background an arrow (triangle point coming together) pointing toward the improvements list

### 2026-08-21 Edits and Continue Page Build

Hero section:
- Have the bluestone tiles in an ashlar pattern where there are some rectangles, some squares, and various sizes. These fit together nicely and there are no areas where the line is missing
- When scrolling down from the hero section, add an animation where the shoes take foot steps across the welcome mat
- The shoes are a bit off in terms of shape. Take inspiration from this icon: https://www.flaticon.com/free-icon/sneakers_181998. Make the white toe part of the shoe have a less rounded end toward the laces and be slightly smaller

Doll house section:
- When specific user preferences are set, the "start here" article goes away sometimes. Have the next most appropriate article to start with labeled in these cases
- Make the "Everything in this house" a drop down that can be opened by the user but is hidden by default

Article pages:
- For all instances of the pill label for "Comes off at move-out" or the other versions of this characterstic, remove the background of pill label instead of having a dark green color
- Have the appropriate number of dollar signs for the price range shown on the characteristics of the improvement in the smaller summary card versions (e.g., on the Improvements page) in addition to the full article
- The reduce motion toggle and pause button are too light and difficult to see/read
- The reduce motion FAB should not block the navigation bar or the progress bar/restart button for the doll house section
- The number of dollar signs for free improvements can be one instead of no symbol there

Improvements page:
- Center the "Improvements" heading and make this text larger

Renter basics section:
- I've accidentally used a mixed of "Rental basics" and "Renter basics". Switch it all to "Renter basics".
- The "Renter basics" label does not need to be shown on the Improvements page because it is already under the section label
- When using the "Renter basics" pill label, make the color the color of the section background (light green)

Footer:
- I would like to add a link/button to view the source code. This will lead to the GitHub repo at https://github.com/meganklu/rental-energy-hanover
- Put the Sustainable Hanover website link on a new line like the email
- Make the Sustainable Hanover logo larger
- The Sustainable Hanover logo should also work as a button to get to the Sustainable Hanover website

I will continue editing these pages, but begin to make the pages for the website. Before moving on to building the other parts of the website, make sure that the general styling choices are consolidated when possible and consistent. Also, commit changes as usual.

Additional pages:
- I think there should be a renter basics page on understanding heating/HVAC systems. For this, I would like to use information from this article: https://www.hgtv.com/how-to/home-improvement/types-of-hvac-systems. I would also like to use the animations, visualizations, etc. that I created for this website: https://meganklu.github.io/heat-pumps-hanover/benefits.html (full repo: https://github.com/meganklu/heat-pumps-hanover). 

As always, add to documentation before implementing. Also, please update README for the status of the project

### 2026-08-21 Bugs and Minor Edits

Footer:
- Remove the reduce motion toggle from the footer since it is now a FAB
- Put the links for "Accessibility statement" and source code closer together (regular line spacing)

Home page:
- Have the shoes walk forward in a natural walking motion/stride
- Make the tiles larger for the bluestone pattern. The shape/design of the pattern looks good otherwise
- After selecting the spot labeled start here, start here moves around instead of becoming a next label
- Put all of the articles, including the understanding heating systems one, into the house
- The width of the help question mark (hover over to get instructions about the doll house) is too narrow

Improvements page:
- The carousel for renter basics does not work as intended
- Only the drafts article is shown, even when clicking a different renter basics article
- The animation for the cards when hovering is not there for the renter basics articles

Navigation bar:
- Separate the rights page and programs page. These should be separate links on the top bar

### 2026-08-21 Finish Adding Content and Minor 

Disclaimers:
- Make the disclaimer cards (legal, safety, etc.) consistent in color and design.