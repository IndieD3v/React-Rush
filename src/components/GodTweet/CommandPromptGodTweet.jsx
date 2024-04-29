import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ScrollArea } from "@/components/ui/scroll-area"

import { useEffect, useState } from "react"

export default function CommandPrompt({ setCommandChanges }) {
    let [inputCommand, setInputCommand] = useState('')
    let [commandHistory, setCommandHistory] = useState([])

    let [commandHint, setCommandHint] = useState([]);
    let [showHint, setShowHint] = useState(false);
    let [showMainCommand, setShowMainCommand] = useState(false);

    let [command_change_styles, set_command_change_styles] = useState({
        "move": {
            "translate": "translate(0px,0px)"
        },
        "rotate": "rotate(0deg)",
        "color": "red",
    })


    let commandsList = {
        "/select": {
            "profile-pic": "#url",
            "username": "#text",
            "description": "#text",
            "likes": "#text",
            "background-img": "#url",
        },
        "/move": {
            "to": "eg: 90,50",
        },
        "/rotate": {
            'to': "#90"
        },
        "/color": {
            'to': "#red, #00000"
        }

    };


    useEffect(() => {
        setCommandChanges(command_change_styles)
    }, [command_change_styles])


    let handleSubmit = (event) => {
        event.preventDefault();
        setInputCommand('')


        console.log(inputCommand)
        setCommandHistory([...commandHistory, inputCommand])
    }

    // console.log(commandHistory)

    useEffect(() => {
        let commandSystem = () => {
            // Parse the input command
            const [command, value] = inputCommand.split("=");
            const [prefix, property] = command.split(":");

            if (inputCommand.startsWith('/') && prefix) {
                setShowHint(true)

                if (prefix.includes('/')) {
                    // Display all available commands

                    setShowMainCommand(true)
                    setCommandHint(Object.keys(commandsList));
                    // console.log(Object.keys(commandsList))

                    if (inputCommand.includes(':')) {
                        if (commandsList[prefix]) {
                            // Display properties for the specific command

                            console.log(command, value)
                            console.log(prefix, property)

                            setShowMainCommand(false)
                            setCommandHint(Object.entries(commandsList[prefix]));

                            if (commandsList[prefix][property]) {
                                console.log(`Executing command: ${command} with value: ${value}`);

                                if (command.includes('move')) {
                                    const [firstValue, secondValue] = value.split(',').map(Number);

                                    // let command_change = `translate-x-[${firstValue}px] translate-y-[${secondValue}px]`;
                                    let command_change_css = `translate(${firstValue}px, ${secondValue}px)`;

                                    set_command_change_styles(prevStyles => ({
                                        ...prevStyles,
                                        "move": {
                                            "translate": `${command_change_css}`
                                        }
                                    }));
                                }
                                if (command.includes('rotate')) {
                                    console.log(`${command} with value: ${value} degrees`);

                                    set_command_change_styles(prevStyles => ({
                                        ...prevStyles,
                                        "rotate": `rotate(${value}deg)`
                                    }));
                                }
                                if (command.includes('color')) {
                                    console.log(`${command} with value: ${value} degrees`);

                                    set_command_change_styles(prevStyles => ({
                                        ...prevStyles,
                                        "color": `${value}`
                                    }));
                                }
                            } else {
                                console.log("Invalid property");
                            }
                        }
                        else {
                            // Invalid command
                            setCommandHint([]);
                            console.log("Invalid command");
                        }
                    }
                }
                else {
                    // Invalid command
                    setCommandHint([]);
                    console.log("Invalid command");
                }
            } else {
                setShowHint(false);
            }
        };

        commandSystem()
    }, [inputCommand])



    return (
        <>
            <div className="flex flex-col w-full max-w-lg items-start space-y-3 absolute bottom-32">
                {showHint && (
                    <ScrollArea className="w-[85%] h-[120px] text-sm rounded-sm border border-gray-300/50 bg-gray-100 ">
                        {showMainCommand ? (
                            commandHint.map((command) => (
                                <div className="flex flex-col" key={command}>
                                    <div className="flex w-full px-2 py-2.5 flex-row justify-between hover:bg-gray-200/70 rounded-sm cursor-pointer" onClick={() => setInputCommand(`${command}:`)}>
                                        <p className="italic">{`${command}`}</p>
                                    </div>
                                </div>
                            ))

                        ) : (
                            commandHint.map(([property, value]) => (
                                <div className="flex flex-col" key={property}>
                                    <div className="flex w-full px-2 py-2.5 flex-row justify-between hover:bg-gray-200/70 rounded-sm cursor-pointer" onClick={() => setInputCommand(`${inputCommand}${property}=`)}>
                                        <p className="italic">{`:${property}`}</p>
                                        <p className="opacity-50">{value}</p>
                                    </div>
                                </div>
                            ))
                        )}
                    </ScrollArea>
                )}

                <form className="flex h-12 w-full max-w-lg items-center space-x-3 " onSubmit={handleSubmit}>
                    <Input type="text" placeholder="/enter command" value={inputCommand} onChange={(e) => setInputCommand(e.target.value)} />
                    <Button variant="default" type="submit">Run</Button>
                </form>
            </div>
        </>
    )
}

