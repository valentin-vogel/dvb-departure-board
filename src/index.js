import { useState, useEffect } from 'preact/hooks'
import Router from 'preact-router'
import './style'
import { monitor, findStop } from 'dvbjs'

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
                    <div class="bg-secondary py-1 px-2 font-bold flex-grow-0 w-28 text-right">
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
                        <div class="bg-secondary py-1 px-2 flex-grow-0 w-28 text-right">
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
    <div class="relative block h-screen overflow-hidden">
        <div class="grid grid-flow-col bg-black border-l-8 border-primary h-full">
            {children}
        </div>
        <div class="absolute left-0 bottom-0 right-0 flex flex-row justify-between items-center h-12 px-6 bg-primary">
            <div class="flex flex-row items-center">
                <svg
                    aria-hidden="true"
                    focusable="false"
                    role="img"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    class="h-6 w-6"
                >
                    <path
                        fill="currentColor"
                        d="M256 8C119 8 8 119 8 256s111 248 248 248 248-111 248-248S393 8 256 8zm0 448c-110.5 0-200-89.5-200-200S145.5 56 256 56s200 89.5 200 200-89.5 200-200 200zm61.8-104.4l-84.9-61.7c-3.1-2.3-4.9-5.9-4.9-9.7V116c0-6.6 5.4-12 12-12h32c6.6 0 12 5.4 12 12v141.7l66.8 48.6c5.4 3.9 6.5 11.4 2.6 16.8L334.6 349c-3.9 5.3-11.4 6.5-16.8 2.6z"
                        class=""
                    ></path>
                </svg>
                <span class="ml-2 font-semibold text-2xl">
                    <CurrentTime />
                </span>
            </div>
            <div class="">
                <img
                    class="h-12"
                    src="https://www.dvb.de/-/media/images/defaults/dvb-logo.jpg"
                />
            </div>
        </div>
    </div>
)

const Board = ({ ...props }) => (
    <BoardLayout>
        {props.stop1 && props.title1 ? (
            <Departures stop={props.stop1} title={props.title1} />
        ) : null}
        {props.stop2 && props.title2 ? (
            <Departures stop={props.stop2} title={props.title2} />
        ) : null}
        {props.stop3 && props.title3 ? (
            <Departures stop={props.stop3} title={props.title3} />
        ) : null}
    </BoardLayout>
)

const Home = () => (
    <div class="relative flex h-screen justify-center items-center bg-primary">
        <div class="mx-auto p-4 sm:p-8">
            <h1 class="block text-xl sm:text-4xl lg:text-6xl xl:text-7xl">
                Etwas ist schiefgelaufen.
                <br /> Bitte prüfen Sie ihre Konfiguration!
            </h1>
            <a
                href="/config"
                class="flex items-center text-lg mt-8 sm:text-2xl lg:mt-16"
            >
                <span class="">Jetzt einrichten</span>
            </a>
        </div>
    </div>
)

const Config = ({ ...props }) => {
    const [searchItems, setSearchItems] = useState([])
    const [configItems, setConfigItems] = useState([])
    const [configUrl, setConfigUrl] = useState('')

    useEffect(() => {
        let url = ''
        configItems.map((item) => {
            url = url + '/' + item.name + '/' + item.id
        })
        setConfigUrl(url)
    }, [configItems])

    const inputChanged = (e) => {
        findStop(e.target.value)
            .then((searchItems) => {
                setSearchItems(searchItems)
            })
            .catch(console.error)
    }

    return (
        <div class="relative flex min-h-screen bg-primary">
            <div class="max-w-5xl mx-auto px-2 w-full">
                <div class="px-4 py-12">
                    <h1 class="text-4xl text-center">DVB | Abfahrtsmonitor</h1>
                </div>
                <div class="grid md:grid-cols-2 gap-4">
                    <div class="relative flex flex-col min-w-0 bg-clip-border border border-gray-light rounded bg-white">
                        <div class="p-4 bg-gray-light">
                            Suche eine Haltestelle
                        </div>
                        <div class="p-4">
                            <input
                                type="text"
                                class="block w-full p-2 text-base font-normal bg-clip-padding border border-gray-dark appearance-none rounded"
                                id="search"
                                aria-describedby="searchHelp"
                                onInput={inputChanged}
                            />
                            <div
                                id="searchHelp"
                                class="text-sm mt-1 text-gray-dark"
                            >
                                z.B. Postplatz
                            </div>
                        </div>
                        <ul class="flex flex-col">
                            {searchItems.map((item) => (
                                <li class="relative flex flex-row justify-between items-center px-4 py-3 border-t border-gray-light">
                                    {item.id} - {item.name} - {item.city}
                                    <button
                                        class="px-2 py-1 bg-gray-dark text-white rounded"
                                        onClick={() => {
                                            setConfigItems([
                                                ...configItems,
                                                item,
                                            ])
                                        }}
                                    >
                                        +
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div class="relative flex flex-col self-start min-w-0 rounded bg-white">
                        <div class="p-4 bg-gray-light rounded-t">
                            Konfiguration
                        </div>
                        <ul class="flex flex-col">
                            {configItems.map((item) => (
                                <li class="relative block px-4 py-3 border-t border-gray-light">
                                    {item.id} - {item.name} - {item.city}
                                </li>
                            ))}
                        </ul>
                        <a
                            class="px-4 py-3 bg-black text-white rounded-b"
                            href={configUrl}
                        >
                            Abfahrtsmonitor anschauen
                        </a>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default function App() {
    return (
        <Router>
            <Home path="/" />
            <Config path="/config" />
            <Board path="/:title1/:stop1/:title2?/:stop2?/:title3?/:stop3?" />
        </Router>
    )
}
