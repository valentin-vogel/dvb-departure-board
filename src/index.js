import { useState, useEffect } from 'preact/hooks'
import Router from 'preact-router'
import './style'
import { monitor, findStop } from 'dvbjs'
import baseroute from '../baseroute'

const CurrentTime = () => {
    const [time, setTime] = useState('')

    useEffect(() => {
        const update = () => {
            setTime(
                new Intl.DateTimeFormat('de-DE', {
                    hour: 'numeric',
                    minute: 'numeric',
                    hour12: false,
                }).format(Date.now())
            )
        }
        update()
        const timer = setInterval(() => {
            update()
        }, 30000)

        return () => {
            clearInterval(timer)
        }
    }, [setTime, time])

    return time
}

const Departures = ({ stop, title }) => {
    const [departures, setDepartures] = useState([])

    useEffect(() => {
        const update = () => {
            monitor(stop).then((departures) => {
                setDepartures(departures)
                console.log(departures)
            })
        }
        update()
        const timer = setInterval(() => {
            update()
        }, 30000)

        return () => {
            clearInterval(timer)
        }
    }, [setDepartures, stop])

    return (
        <div class="text-white">
            <div class="p-4 relative flex items-center">
                <svg
                    class="h-16 w-16 text-primary"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 40 40"
                >
                    <g id="map-stop">
                        <g>
                            <path
                                fill="currentColor"
                                d="M20,40c11,0,20-9,20-20C40,9,31,0,20,0C9,0,0,9,0,20C0,31,9,40,20,40"
                            />
                            <path
                                fill="#000000"
                                d="M20,36c8.8,0,16-7.2,16-16c0-8.8-7.2-16-16-16C11.2,4,4,11.2,4,20C4,28.8,11.2,36,20,36"
                            />
                        </g>
                        <polygon
                            fill="currentColor"
                            points="12.4,29 16.4,29 16.4,21.2 23.6,21.2 23.6,29 27.6,29 27.6,11 23.6,11 23.6,17.9 16.4,17.9 16.4,11,12.4,11 "
                        />
                    </g>
                </svg>
                <h2 class="ml-4 text-5xl">{title}</h2>
            </div>

            <div class="flex flex-col space-y-1 px-2">
                <div class="flex flex-row items-center space-x-1 text-xl">
                    <div class="bg-secondary py-1 px-2 font-bold flex-grow-0 w-16">
                        Typ
                    </div>
                    <div class="bg-secondary py-1 px-2 font-bold flex-grow-0 w-16 text-right">
                        Linie
                    </div>
                    <div class="bg-secondary py-1 px-2 font-bold flex-grow">
                        Richtung
                    </div>
                    <div class="bg-secondary py-1 px-2 font-bold flex-grow-0 w-20 text-right">
                        in Min
                    </div>
                </div>

                {departures.map((departure) => (
                    <div
                        key={`${departure.id}${departure.scheduledTime}`}
                        class="flex flex-row space-x-1 text-3xl"
                    >
                        <div class="bg-secondary py-1 px-2 flex-grow-0 w-16">
                            {departure.mode && (
                                <img
                                    src={departure.mode.iconUrl}
                                    alt={departure.mode.name}
                                />
                            )}
                        </div>
                        <div class="bg-secondary py-1 px-2 flex-grow-0 w-16 text-right">
                            {departure.line}
                        </div>
                        <div class="bg-secondary py-1 px-2 flex-grow">
                            {departure.direction}
                        </div>
                        <div class="bg-secondary py-1 px-2 flex-grow-0 w-20 text-right">
                            {departure.arrivalTimeRelative}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

const BoardLayout = ({ children }) => (
    <div class="flex flex-col h-screen">
        <div class="flex-grow bg-black border-l-8 border-primary">
            {children}
        </div>
        <div class="flex flex-row justify-between items-center h-20 px-6 bg-primary">
            <div class="flex flex-row items-center">
                <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="h-8 w-8"
                >
                    <path
                        fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                        class=""
                    ></path>
                </svg>
                <span class="ml-2 font-bold text-2xl">
                    <CurrentTime />
                </span>
            </div>
            <div class="">
                <img
                    class="h-20"
                    src="https://www.dvb.de/-/media/images/defaults/dvb-logo.jpg"
                />
            </div>
        </div>
    </div>
)

const Board = ({ stop, title }) => (
    <BoardLayout>
        <Departures stop={stop} title={title} />
    </BoardLayout>
)

const Home = () => {
    const [stopItems, setStopItems] = useState([])

    const inputChanged = (e) => {
        findStop(e.target.value)
            .then((stopItems) => {
                setStopItems(stopItems)
            })
            .catch(console.error)
    }
    return (
        <div class="flex items-center justify-center h-screen">
            <div class="block max-w-2xl shadow border border-gray-light">
                <div class="p-6">
                    <h1 class="text-xl">VVO | Departure Board</h1>
                </div>
                <div class="p-6 border-t border-gray-light">
                    <p>
                        This departure board application is based on Preact and
                        the WebAPI of VVO / DVB.
                    </p>
                    <p class="mt-1">
                        Github:{' '}
                        <a
                            class="text-primary"
                            href="https://github.com/valentin-vogel/dvb-departure-board"
                        >
                            https://github.com/valentin-vogel/dvb-departure-board
                        </a>
                    </p>
                </div>
                <div class="p-6 border-t border-gray-light">
                    <span class="block font-medium">Departure Board:</span>
                    <span class="block">
                        Example for 1 Stop:{' '}
                        <a
                            href={`${baseroute}/departures?title=Postplatz&stop=33000037`}
                            class="text-primary"
                        >
                            /departures?title=Postplatz&stop=33000037
                        </a>
                    </span>
                </div>
                <div class="p-6 border-t border-gray-light">
                    <span class="block mb-1 font-medium">Stop search:</span>
                    <input
                        type="text"
                        name="search"
                        placeholder="Type a stop name (example: Postplatz)"
                        class="block w-full py-2 px-3 text-base border border-gray-light"
                        onInput={inputChanged}
                    />
                    <div class="flex flex-col">
                        {stopItems.map((item) => (
                            <a
                                class="relative block py-2 px-4 no-underline border border-gray-light"
                                key={item.id}
                                href={`${baseroute}/departures?title=${item.name}&stop=${item.id}`}
                            >
                                {item.id} - {item.name} - {item.city}
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <Router>
            <Home path={`${baseroute}/`} />
            <Board path={`${baseroute}/departures`} />
        </Router>
    )
}
