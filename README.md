# Fertiliser Calculation Tutor

A browser-based training app based on the supplied fertiliser calculation teaching material.

## What students learn

The app teaches the calculation sequence rather than simply returning an answer:

1. Distinguish **kg fertiliser/ha** from **kg N/ha**
2. Convert fertiliser N% to a decimal proportion
3. Calculate:
   `fertiliser kg/ha = kg N/ha / N proportion`
4. Convert acres and hectares
5. Convert Units/acre to kg N/ha using the convention in the supplied teaching slides
6. Calculate fertiliser kg/ha
7. Calculate total fertiliser for the field
8. Calculate exact bag numbers
9. Round up to the number of bags that must be purchased

## Worked examples included

### Urea demonstration

30 kg N/ha with 46% N urea:

`30 / 0.46 = 65.2 kg/ha`

### Ammonium sulphate guided exercise

25 kg N/ha with 21% N:

`25 / 0.21 = 119.0 kg/ha`

### CAN example

27 Units/acre, CAN 27.5% N:

`27 × 2.471 = 66.7 kg N/ha`

`66.7 / 0.275 ≈ 242.5 kg CAN/ha`

### SUPER 18:6:12 full-field exercise

35 Units/acre, 18% N, 20 ha, 25 kg bags:

- kg N/ha = `35 × 2.471 = 86.49`
- fertiliser kg/ha = `86.49 / 0.18 ≈ 480.5`
- total fertiliser = `480.5 × 20 ≈ 9,610 kg`
- exact bags = `9,610 / 25 ≈ 384.4`
- bags to purchase = **385**

Small differences from the slide's rounded intermediate values are accepted.

## Important teaching convention

The supplied slides use:

`Units/acre × 2.471 = kg N/ha`

The app follows this convention exactly for the classroom exercises.

Because the word **"Unit"** can be used differently in real agricultural practice, students should confirm the meaning and units of an adviser’s recommendation before using this conversion for real fertiliser application.

## Practice generator

Once the guided lessons are completed, students can generate new questions using different:

- N recommendations
- fertiliser N percentages
- field areas
- bag sizes

The app checks every stage immediately as the student types.

## GitHub Pages

The app requires no server and no installation.

Upload:

- `index.html`
- `styles.css`
- `app.js`
- `README.md`

to a GitHub repository, then enable:

**Settings -> Pages -> Deploy from a branch -> main -> /(root)**

Students can then use it from any browser.
