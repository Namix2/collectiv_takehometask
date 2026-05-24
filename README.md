# Oli Jones - Collctiv Take Home Task (Front End Developer Role)

## Requirements

- `Node.js`
- `npm`

You can confirm both are installed with:

```powershell
node -v
npm -v
```

## Install Dependencies

From the project root, run:

```powershell
npm install
```

## Run Locally

Start the development server with:

```powershell
npm run dev
```

Vite will print a local URL in the terminal, usually:

```text
http://localhost:5173/
```

Open that URL in your browser.


# My Review

I built the project using React, TypeScript, Tailwind CSS and Vite.

I chose Vite because it is lightweight, fast to run locally, and well suited to a small client-side project like this. I initially started with vanilla CSS, but fairly quickly realised it was slowing me down, so I moved over to Tailwind. That gave me more speed when building and adjusting the UI, especially while iterating across smaller interface states.

For the app structure, I split the flow into separate routed pages to simulate the movement from the homepage into the product side of the application. I am not 100% sure I interpreted every part of the routing specification exactly as intended, but my focus was to create a working end-to-end user flow.

The in-progress form state is kept local to the homepage. I also added a modal-based validation and error handling flow to prevent incomplete submissions. Once the required conditions are met, the user can continue and the submitted pot data is stored in localStorage.

I chose localStorage because it matched the requirement for the app to run entirely client-side, and it is the browser-based persistence approach I am most familiar with. The pot page then reads the saved data back using the pot ID from the route.

One thing I noticed during development was that the homepage started to become overloaded. It became harder to navigate and reason about, so I broke it down into smaller components. That made the code easier to manage, test mentally, and iterate on.

If you trace back through the Git commits, you will see that my initial priority was to hit the core requirements first: working code, validation, state handling, client-side persistence, routing, and the cross-domain simulation. I treated it as an MVP first, then worked back into the UI and interaction details afterwards.

## Use of AI

Full disclosure: I used AI across a few areas of development as an efficiency tool.

I used it mainly to speed up areas where I was concerned about delays, help validate direction, and support faster iteration. I still made the implementation decisions myself and reviewed the output as I went.

## Shortfalls

There are definitely areas I would improve with more time.

I over-engineered some parts of the UI and animation work, which took time away from polishing other areas. I also spent a bit of time finding my coding rhythm at the start of the task.

The final version is not a perfect duplicate of the Figma file. I am aware of a few visual issues, including the spacing between some homepage sections, the misplaced bar on the pot page, and the footer, which is lackluster.

Overall, I am happy that the core flow works, but I can also see where I would tighten things up with another pass.

## Personal Note

Thank you for the opportunity to complete this take-home task. It was genuinely interesting, and I have not had a take-home task quite like this before.

You may notice some irregular commit times. I am currently mid-move, so the timestamps are a little chaotic. Thankfully, this is not my normal working pattern - just a temporary blend of boxes, deadlines, and strese.

Although I am proud of what I have built, I do recognise there are areas that could be improved. This was submitted close to the final deadline, so I have done my best to balance working functionality, honest reflection, and polish.

Thank you again for the oppotunity, and for your consideration. 

Oli

