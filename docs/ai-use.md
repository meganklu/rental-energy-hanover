# AI Use

Generative AI was used to build this website. This file documents the prompts used. All prompts were used with the Claude Opus 5 model. Also see [AGENTS.md](../AGENTS.md) for the general context and instructions provided.

## Documentation Creation
### 2026-08-05 Website Documentation Templates
I would like to make a website to provide information to student renters in Hanover, New Hampshire about how to make improvements to their residential rental for better energy usage and efficiency. This project is working with Sustainable Hanover. The Sustainable Hanover website already provides some information about weatherizing and home improvements, but I would like to provide a more interactive learning experience and cater toward students who have not lived in their own rental before. Before beginning actual website development, I would like to first work on necessary planning documents, including agents.md and design.md. What additional documents should I add to make the project specifications and goals as clear as possible? Please suggest these documents then create a template for me to complete.

### 2026-08-18 Style Guide
Please help me fill out the DESIGN.md file using similar design features and styling as the existing Sustainable Hanover website.

> Note: Additional prompts were used to generate some of the content on the documentation pages. These were used before this document was created and were not recorded. The initial creation was largely written without generative AI, particularly finding sources and defining website features and content. However, these documents have be modified significantly by generative AI during the website build process as the AI agents are instructed to document changes before implementation.

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

### 2026-08-24 Adding Content and Images

Images:
- Instead of the animations on the article pages, I would like to have a real picture. Some of the animations are a bit unclear or too simplified
- Keep animations that are essential for understanding the website content, such as the heat pump diagram
- Find free images on https://unsplash.com/ and https://www.pexels.com/. Do not generate new images. Select images based on relevance to the topic and aesthetics (in line with the style and design of the website)
- Credit all images appropriately
- Add images to the other sections on the website where it could help break up dense text and provide additional information

Improvement page:
- The carousal for the renter basics articles should focus on one article at a time by making this one larger and in the center. See the cards under "Why this is especially relevant here" on https://meganklu.github.io/heat-pumps-hanover/split-incentives.html for some reference. I would like to be able to see more of the card in the background than this one though. This change will make the next and previous buttons actually do something

Set your situation:
- Have a button to reset to default on the selections made on this menu
- Reformat this window (can increase width/size of the window) so the whole thing can be seen on most computers without scrolling

Disclaimers:
- Make the disclaimer cards (legal, safety, etc.) consistent in color and design

About page:
- Explain the split incentives problem as the why for the project (first section of the page). Use the design from the heat pumps website https://meganklu.github.io/heat-pumps-hanover/split-incentives.html. In this design, the screen is split and half and the user can hover over either side to expand it. The background continues as it moves down to more information about how the problem can be approached/additional reasons for the website. It ends with an arrow of the two sides coming together. Sections are still distinct using various approaches (cards/backgrounds, page spacing, layout, etc.)
- Cite AI usage for the website on this page

Other questions:
- How is the where to get it page accessed? I cannot find a link anywhere on the website
- Are there any other parts of the website that are difficult to access or now obsolete? If you find this, ask me whether these should be deleted, linked to, or adapted.

Clean up the code and styling. Then, complete the remaining improvements pages. Lastly, go through the Sustainable Hanover website. Adapt information from here (with citations) to improvement articles, about page, etc.

### 2026-08-24 Fixing Interactivity

Home page:
- Make the shoes look more like they are walking forward in steps rather than sliding for the animation. This means resizing them appropriately for each step
- What is some improvement that can be added as a spot in the bathroom? Are there any improvements in the sources/information documents that has not been added that could be relevant here?
- The width of the help pop-up for instructions about how to use the house still does not look as expected. It should be wider

Improvements page:
- The opening animation for the hero section of the improvements page should be a front door of a house opening. Improvements is on the door. As the user scrolls, the door opens and reveals the "Renter basics" section

About page:
- The moving split halves effect is not working. When hovering over one side, that color should expand
- Change the colors to match the style theme of this website

Change other parts/sections/cards of the website to use the interactive features that have already been created, such as the story bars on the article pages and the carousel for the renter basics. Avoid long stretches of text/paragraphs that are the same style and overwhelming. Add animations and interactivity where it would enhance the website goals of creating a visually interesting and useful way to learn about these improvements.


### 2026-08-25 Interactivity and Animations

Article pages:
- The story bars should have more animation. When scrolling, they should briefly stick to the top of the screen and stack on top of each other until the screen is full. After, the user can scroll past and get to the contents below.
- Why does "Hang thermal curtains" have $$$ and $25 to $75 when "Use a space heater..." has the same price range but $$?

Improvements page:
- The screen should be held at the door until it is fully opened to the renters basics section. The opening goes with the scrolling. Once it is fully opened, the light green will expand gradually out to fill the screen to show the rest of the section as it is now
- Make the "Improvements" heading look like it is signage/decoration on the door
- Please match the design of this door with the windows, rectangle details, and trim: https://www.wayfair.com/home-improvement/pdp/mmi-door-quarter-fan-lite-4-panel-clear-glass-fiberglass-painted-prehung-entry-door-vron3362.html. Also match the colors for the most part, but use a green that is part of the style guide

Home page:
- The same kind of hold on the hero section should happen on the home page so that the animation of the shoes can be seen while scrolling. Because the screen is stuck here while scrolling, the full animation can be viewed and the shoes can be shown walking forward (to the top of the door mat) rather than to the right side

Renter basics articles:
- Make these articles follow the layout of the improvement articles. There should be breadcrumb links to show how to get there and the same format.
- When clicking back on the breadcrumb link, it should bring you back to the appropriate section on the improvements page. For example, it should go back to the renters basic section for a renter basics article and the card list for the improvement articles

About page:
- Make the sliding between colors smoother like it is on the heat pumps website

### 2026-08-25 Revisions and To Do List Feature

Home page:
- Still start with the shoes at the bottom right corner of the mat before they start walking forward for the animation

Story bars:
- Have the story bars initially separated out so that they have to come together and stack
- Make the animation of the text on the story bar while scrolling more noticable
- Story bar sections should take up the height of the screen

Improvements page:
- The article "Before you sign" should be formatted like the other renter basics articles
- Make the window light blue and the door handle brown
- Add a more decorative trim around the outside of the door
- Incorpearte the carousel used for the renters basics articles elsewhere (e.g., section where there are multiple cards that you could scroll through)

Glossary:
- For terms defined in the glossary, have an underline and hover effect to show the definiton (plus a way to go and learn more/see the rest of the glossary entry) like the help question mark hovers for the "Set your situation" window

For all of the animations being added, figure out how reduced motion still works. For example, don't pin to a certain part of the screen during a scroll when an animation tied to the scroll is turned off.

Let's add a feature where a user can add an improvement to their to do list. This will be like a shopping cart/purchasing an item. They can then click on their to do list to get a full compiled/custom version of what they need to purchase, ask their landlord about, and complete. This is a list that they would be able to print, export, or share (e.g., to their roommates). Please follow typical user interface and user experience interaction principles for purchasing to make this feature easy to use.

### 2026-08-25 Edits and Potential Doll House Design Change

Home page:
- I meant bottom left for the start area of the shoes

Improvements page:
- The new door trim is blocking the label about scrolling to open the door
- Make all of the improvement article cards a consistent size/height with the add to list button at the same position for each card (bottom)

List feature:
- Make a button to add all recommendations (given the user's specific situation) to the list 
- Reformat the box that shows up when the list is empty. It is awkwardly on the left side currently
- The article "Seal your door with a sweep" has the "Add to my list" button within the permission callout. Fix this and check if this error has occured anywhere else too
- Include a button to add to the list from the doll house section (in the small preview/card version of the improvement page)

Glossary:
- When hovering over a glossary term, it is difficult to click the link to see the full entry without making the glossary callout disappear

Programs page:
- Have the carousel take up the width of the page
- Reformat the cards so that the carousel does not go beyond the height of the page. This might mean adding a "Show more" button
- Add a way to sort through/filter these programs

I think it could be cool to have the items in the house layed out like an actual doll house with furniture/features that a user could tap on. They could be guided to the item by color or arrows. This would make the clicking to expand certain rooms more relevant. I'm not sure how this would look or if it would be usable and helpful. Please try out a version of this in a new branch after completing the other edits I've described. 

### 2026-08-25 Doll House

Use color for the doll house. Take inspiration from a Calico Critters toy house for the interior furniture. Make the entry/porch the height of the first floor only like it was before. Make the drawings more realistic and easy to understand what they are. Also, position them in a logical way that matches typical house layouts.

### 2026-08-25 Doll House Objects

Redistribute the objects in the doll house so that they are more evenly distributed between the rooms. Only move to areas that are logical. For example, the radiator can move to the bathroom. 

### 2026-08-25 Doll House Objects Size

Scale the size of the objects in the doll house appropriately. Also check that the labels are not blocked at all. Check that the proportions and design look correct when clicked on a specific room.

### 2026-08-25 Claude Design Attempt

I tried to use Claude Design to visually edit the website. This is the initial prompt I gave with the code base attatched:

> I am currently refining the design elements of this website. Please show me the site so I can make comments on specific elements.

I was unable to connect the codebase and edit in the way I wanted to using Claude Design, so I went back to writing descriptions of the changes I wanted to make.

### 2026-08-26 Design Edits and To Do List Feature

To do list:
- Add checkboxes to the other sections of the to do list (shopping list and ask your landlord)
- Draft an example email for the user to send to their landlord based on the improvements they've added to their list. Can this email be generated based on what they add?

Improvements page:
- When on reduced motion, the door does not open so don't include the label that says "Keep scrolling to open the door"
- Remove "Where to get this stuff" from this page now that it is linked on all the individual improvement articles that have items to purchase and in the to do list

Doll house section:
- Change "Rim joist and attic hatch" to something that is easier to interpret and recognize in the design but is still relevent to checking for drafts
- Some of the labels are beneath the icons so the arrow for "Next" is harder to see
- For the selected element, add a glowing effect instead of the green border

Improvement articles:
- When there is nothing to purchase, remove this "Nothing to buy for this one. When something does need buying, Where to get it has the addresses and the bus routes."
- When there is something to purchase edit the where to get it paragraph to just a link to the where to get it page

About page:
- Make the cards under "So this site starts on your side of the line" easier to read by adding a solid color or blur background
- Use a picture of Hanover, New Hampshire such as the aerial picture from the Hanover town website https://www.hanovernh.org/

General design choices:
- I'm not sure that I like the current design of the story bars. I like having more animation and having them stick to the screen for a moment, but I don't like the current color background and how they are each the full height of the screen. I like when multiple story bars overall take up the full height, but not each individual one. For the story bars that are by themselves, see if there is another design element that would be more appropriate for that section
- Break apart sections with different color backgrounds, spacing, and other design elements. For example, separate out the "Programs to look at" carousel with a different background. This will make the page look less text dense
- Experiment with different creative ways to present the text. For example, the list under the "If your apartment is too cold" could be shown like the list for "Ways to close the gap" on the split incentives page of the heat pumps website https://meganklu.github.io/heat-pumps-hanover/split-incentives.html
- Add more interactive web animation elements including, but not limited to:
    - Real-time microinteractions
        - Magnetic hover states
        - Morphing SVG icons
        - Live data ripples
    -  Scroll-driven and narrative motion
        - Multi-level parallax
        - Horizontal layout switches
        - Scroll reveals and masking
    - Structural transitions and environments
        - Creative page transitions (such as those seen in this article: https://qodeinteractive.com/magazine/examples-of-creative-page-transitions/#lama-lama)
- There are also some design elements for inspiration in the heat pumps website: https://meganklu.github.io/heat-pumps-hanover/index.html
- Here is additional visual storytelling inspiration
- Check for consistency in vector designs. Match the vectors, including the door on the improvements page hero section, to the design style of the doll house section
- Check for consistency with the style guide colors
- Check for cards and other sections taking up the appropriate margins and width. For example, the text in the safety card in the article "Use a space heater safely" does not take up the full width of the card
- All of the pages accessible from the nav bar should have a more interesting and interactive hero section, like the home page hero section and improvements page hero section

Put major design changes in a new branch

### 2026-08-26 Design Edits

Home page:
- Remove the green outline around the spot that is up next. Just keep the animated arrow
- The hover effects are glitching and not smooth
- Make the items glow white instead of green
- Make sure that the next arrow can be seen. For example, when the next arrow is on the space heater, it is below and gets cut off by the boundary of the room
- The basement stairs look out of place because of how small they are
- The basement, when in room view, has all the components pushed together and overlapping
- When the items are not available for the user's situation, keep them in the house just as static images instead of buttons
- When the screen is resized and the spots become buttons instead of a doll house image, make the rooms look like the initial design in the main branch. In other words, remove the floor from the rooms

Improvement articles:
- For the story bars, don't let the first story bar color background (darker green) be shown below the second story bar

Your rights page:
- Have the thermometer starting lower and start increasing as you scroll. Use a similar scroll effect and hold as the Home and Improvements pages

Programs page:
- Make the papers shuffle/flip through as you scroll. Again, use a scroll effect and hold

Your list page:
- Add an animation of list items getting checked off as you scroll

About page:
- Make the hero section something that matches the aesthetic and design of the other pages. Put the split part lower on the screen

General design choices:
- The pages have a mix of widths and alignment. Make this more consistent 
- Continue working on adding more interactive web animation elements and different section designs/layouts
- Fix the flashcard flip on some of the renter basics articles. This should be centered and the flip should be animated. The user should be able to flip back to the front. Read as text should only be shown on reduced motion settings. Text layout and styling should be more visually interesting 

The website seems to be slower (e.g., pages are taking longer to load). Why is this? Is there ways to fix this?

### 2026-08-26 Page Transitions and Animations

Doll house section:
- The hover animation for hotspots is still glitching. Earlier version of this were smoother

Renters basics articles:
- Please remove the animations from "Find your drafts" and use the image instead

General design choices:
- The page transitions are causing the website to move slower, especially when clicking the link to go back to the home page. Remove them please
- Please use the full width of the page for every section. This is not the case for the lists, paragraphs, cards, etc. These are too narrow and look inconsistent with the other page content. Some of the images are also aligned left when they should be centered because they are by themselves (no text on the side). 

### 2026-08-26 Animations Again and Page Navigation

The width of items looks better now. 

Doll house section:
- The hover animation is still having problems. When I hover over some of the elements, it shakes/glitches. Sometimes it moves in and out multiple times. Please make these animations smoother. This might mean that the item translates from its original position less if that is causing the glitching appearance

Navigation:
- I am having issues navigating between pages. Either pages are taking significant amounts of time to load or the links are not working. Either way, I would like to fix this. I am experiencing particular issues navigating to the home and my list pages from another page

Increase spacing between sections and paragraphs on all pages.

### 2026-08-26 Page Access and Spacing

I still am unable to access the home page from other pages via the nav bar button on logo.

Home page:
- Remove the light green background for selected spot labels
- The hover animation glitching is still occuring when hovering over the actual object rather than the label

Increase spacing before story bars and between every section. Use different backgrounds, cards, and other divisions to denote different sections.

### 2026-08-26 Interactive Feature Bugs

Doll house section:
- The doll house is not showing only the relevant improvements as buttons. For example, "shower head" can still be clicked on even when the bathroom says "Nothing here for your situation". These items should be visible but they should not act as buttons (i.e., they should be like the other decorations in the doll house like the plants)
- The hover effect is still having some glitching animations depending on how fast the cursor is and the position on the spot the mouse (e.g., coming from a different direction, on the label vs. on the object). I think this is due to the magnetic hover effect. Remove magnetic hover from all components
- Make the mirror in the bathroombigger and directly over the sink 
- Move the space heater to the other side of the bedroom in the empty space on the left side
- Move the outlet slightly left to not overlap with the plant
- Put the radiator on the other side of the sink in the bathroom

About page:
- On reduced motion, the split incentives divided section should not slide back and forth
- Is there a way to make the triangle/arrow part of the color divided section slide too with the rest of the background?

Articles:
- Within an article, add a way to go to the next one after reading (near the bottom after finished reading). For example, access the next article in the renters basics section