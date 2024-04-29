import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import { ScrollArea } from "@/components/ui/scroll-area"

import { Children, useEffect, useState } from "react"

export default function CommandPrompt({ setCommandChanges, winCondition, children }) {
    let [inputCommand, setInputCommand] = useState('')
    let [isInputTyping, setIsInputTyping] = useState(false)

    let [commandHistory, setCommandHistory] = useState([])

    let [commandHint, setCommandHint] = useState([]);
    let [showHint, setShowHint] = useState(false);
    let [showMainCommand, setShowMainCommand] = useState(false);

    let [userobject_information, set_userobject_information] = useState({
        'positionX': 0,
        'positionY': 0,

        'rotate': 0,
        'scale': 1,

        'color': 'rgb(150 114 255)'
    })


    let commandsList = {
        "/move": {
            "to": "eg: 90,50",
        },
        "/rotate": {
            'to': "#90"
        },
        "/scale": {
            'to': "#1.5"
        },
        "/color": {
            'to': "#blue, #salmon (all html colors)"
        }

    };


    useEffect(() => {
        function checkIfKeyEnter(e) {
            if (e.key === 'Enter') {
                setInputCommand('');
            }
        }

        if (isInputTyping) {
            window.addEventListener('keydown', checkIfKeyEnter);
        } else {
            window.removeEventListener('keydown', checkIfKeyEnter);
        }

        // Cleanup function to remove event listener when component unmounts or when isInputTyping changes
        return () => {
            window.removeEventListener('keydown', checkIfKeyEnter);
        };
    }, [isInputTyping]);
    

    useEffect(() => {
        setCommandChanges(userobject_information)
    }, [userobject_information])

    useEffect(() => {
        if (winCondition === true) setInputCommand('')
    }, [winCondition])


    let handleSubmit = (e) => {
        e.preventDefault();
        setInputCommand('')


        // console.log(inputCommand)
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

                            // console.log(command, value)
                            // console.log(prefix, property)

                            setShowMainCommand(false)
                            setCommandHint(Object.entries(commandsList[prefix]));

                            if (commandsList[prefix][property] && value) {
                                // console.log(`Executing command: ${command} with value: ${value}`);

                                if (command.includes('move')) {
                                    const [firstValue, secondValue] = value.split(',').map(Number);

                                    set_userobject_information(prevStyles => ({
                                        ...prevStyles,
                                        positionX: firstValue,
                                        positionY: secondValue
                                    }));
                                }
                                if (command.includes('rotate')) {
                                    // console.log(`${command} with value: ${value} degrees`);

                                    set_userobject_information(prevStyles => ({
                                        ...prevStyles,
                                        rotate: value
                                    }));
                                }
                                if (command.includes('scale')) {
                                    // console.log(`${command} with value: ${value}`);

                                    set_userobject_information(prevStyles => ({
                                        ...prevStyles,
                                        scale: value
                                    }));
                                }
                                if (command.includes('color')) {
                                    // console.log(`${command} with color: ${value}`);

                                    set_userobject_information(prevStyles => ({
                                        ...prevStyles,
                                        color: value
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
            <div className="flex max-md:w-[85%] flex-col w-full max-w-lg items-start space-y-3 absolute bottom-32 max-md:bottom-44 tracking-normal">
                {showHint && (
                    <ScrollArea className="w-[85%] h-[120px] max-md:w-[100%] text-sm rounded-sm border border-gray-300/50 bg-gray-100/70 shadow-xl backdrop-blur-md">
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

                <div className="flex h-12 w-full max-w-lg items-center space-x-3" onSubmit={handleSubmit}>
                    <Input type="text" placeholder="/enter command" value={inputCommand} onChange={(e) => setInputCommand(e.target.value)} onFocus={() => setIsInputTyping(true)} onBlur={() => setIsInputTyping(false)} />
                    {children}
                </div>
            </div>
        </>
    )
}

