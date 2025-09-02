# Social Discovery Group's MarTech SDVentures Test Task

## How to Run

1. Create `.env` file alongside `.env.example`.
2. Add values for `PORT` and `API_ENDPOINT`.

### With Docker

Run:

```bash
docker build -f Dockerfile -t martech-test .
docker run -p 3000:3000 martech-test:latest
```

- if you used `PORT` different from `3000`, then change `-p 3000:3000` to match your value.

### Without Docker

- install `pnpm`
- run `pnpm install`
- run `pnpm run build`
- run `pnpm run start`

## Notes & Issues

- Encountered an issue with gulp corrupting font files: https://github.com/gulpjs/gulp/issues/2797
- In figma design `%` values are used for `letter-spacing`. Since `%` is not supported by browsers, pixel values were used instead (approximated to the design).
- A `375px` breakpoint was added for iPhone SE design to make the app more responsive. This can be easily adjusted in `_variables.scss`.
- Decided to use `<picture />` instead of `<img />` with `srcset` and `sizes` for more control over which logo to display (mobile vs desktop). Using `<img />` with `srcset` can sometimes load the desktop logo on small devices due to high device pixel ratios.

## To Improve

- Optimize SVGs sizes.
- Add labels for inputs elements for better accessibility.
- Error handling can be more explicit
