![Screenshot](https://github.com/valentin-vogel/dvb-departure-board/blob/master/screenshot.png)

# DVB Departure Board

This is a departure application for Dresden's public transport (VVO/DVB). Search for stops and get departure times. I build this application for digital signage.

## Usage

A production build you will find [here](https://dvb-departure-board.vercel.app/?stops=33000037,33000004&limit=11).

| Parameter | Description                         | Default   |
| --------- | ----------------------------------- | --------- |
| stops     | A comma separated list of stop ids. | undefined |
| limit     | The max value of departure times.   | 10        |

## Setup

```
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
npm run build:legacy

# Format code
npm run format
```

## Contribution

If you find a bug please create an issue. To contribute, please create a PR.

## License

This project is licensed under [MIT](LICENSE).
